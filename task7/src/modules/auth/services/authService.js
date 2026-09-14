import { authRepo } from "../repos/authRepo.js";
import * as bcrypt from "bcrypt";
import { JWT_SECRET } from "../../../config.js";
import jwt from "jsonwebtoken";
const registerService = async (inputs) => {
  const { email, password, name } = inputs;
  const exist = await authRepo.checkUserExistanceByEmail(email);
  if (exist) {
    throw new Error("user exist", { cause: { status: 409 } });
  } else {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save user
    const result = await authRepo.registerRepo(name, email, hashedPassword);
    return result;
  }
};
const loginService = async (inputs) => {
  //password , email
  //check the user existance by email
  const { email, password } = inputs;
  const userExist = await authRepo.checkUserExistanceByEmail(email);
  if (!userExist) {
    //if not exist error
    throw new Error("user not exist", { cause: { status: 404 } });
  } else {
    //if exist verify password and return user
    const { hashed_password: hashedPassword } = userExist;
    const verified = await bcrypt.compare(password, hashedPassword);
    if (!verified) {
      throw new Error("invalid credintials", { cause: { status: 401 } });
    }
    const token = jwt.sign(
      { id: userExist._id, name: userExist.name },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    return token;
  }
};
export const authService = {
  loginService,
  registerService,
};
