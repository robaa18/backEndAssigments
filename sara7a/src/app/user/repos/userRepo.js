import { User } from "../models/userModel.js";
const checkUserExistance = async (userEmail) => {
  const userExist = await User.findOne({ email: userEmail });
  return userExist;
};
const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};
const updateUserByEmail = async (email, data) => {
  const user = await User.findOneAndUpdate({ email }, data, {
    returnDocument: "after",
  });
  return user;
};
export const userRepo = { checkUserExistance, createUser, updateUserByEmail };
