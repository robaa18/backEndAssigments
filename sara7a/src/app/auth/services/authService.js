import { userRepo } from "../../user/repos/userRepo.js";
import { otpRepo } from "../repos/otpRepo.js";
import { sendEmail, toMs } from "../../../common/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
const registerService = async (inputs) => {
  //check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (exist) throw new Error("user already exist", { cause: { status: 409 } });
  //hash password
  inputs.password = await bcrypt.hash(inputs.password, 10);
  //save user
  const user = await userRepo.createUser(inputs);
  //create otp
  const otp = await crypto.randomInt(100000, 999999).toString();
  //generate OTP
  const generatedOtp = await otpRepo.createOtp({
    value: otp,
    email: inputs.email,
    expiredAt: new Date(Date.now() + toMs(10, minutes)),
  });
  //send mail
  await sendEmail(
    inputs.email,
    " verfication code ",
    `<h1>your verfication code is ${otp}</h1>`,
  );
  return user;
};

const verifyAccount = async (inputs) => {
  //user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist)
    throw new Error("user does not exist", { cause: { status: 404 } });
  //isVerified
  if (exist.isVerified) {
    throw new Error("user already Vreified", { cause: { status: 409 } });
  }
  //check otp validation
  const otpExist = await otpRepo.getOtpByEmail(inputs.email);
  if (!otpExist) throw new Error("otp expired", { cause: { status: 404 } });
  //code is not correct
  if (otpExist.value !== inputs.value)
    throw new Error("otp is not valid", { cause: { status: 400 } });
  //switch is verified to true
  const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
    isVerified: true,
  });
  //delete any otps
  await otpRepo.deleteOtpByEmail(inputs.email);
  return updatedUser;
};
const loginService = async (inputs) => {
  //check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist)
    throw new Error("user does not exist", { cause: { status: 404 } });
  //check user is verified
  if (!exist.isVerified) {
    throw new Error("user not Vreified", { cause: { status: 403 } });
    //token----
    
  }
};
export const authService = { registerService, loginService, verifyAccount };
