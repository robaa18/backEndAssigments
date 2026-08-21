import { User } from "../../DB/models/userModel.js";
export const createUser = async (inputs) => {
  const { name, email, password, role } = inputs;
  const user = User.build({
    name: name,
    email: email,
    password: password,
    role: role,
  });
  const data = await user.save();
  return data;
};
export const createOrUpdateUser = async (inputs) => {
  const { id, name, email, password, role } = inputs;
  const data = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (password !== undefined) data.password = password;
  if (role !== undefined) data.role = role;
  const user = await User.upsert({ id, ...data }, { validate: false });
  return user;
};
export const getUserByEmail = async (inputs) => {
  const { email } = inputs;
  const user = await User.findOne({ where: { email: email } });
  if (user) {
    return user;
  } else {
    throw new Error("email not exist", { cause: { status: 404 } });
  }
};
export const getUserById = async (inputs) => {
  const { id } = inputs;
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ["role"],
    },
  });
  if (user) {
    return user;
  } else {
    throw new Error("user not exist", { cause: { status: 404 } });
  }
};
