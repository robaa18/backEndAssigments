import { userRepo } from "../../user/repos/userRepo.js";
import { otpRepo } from "../repos/otpRepo.js";
import {
  hashPassword,
  generateOTP,
  generateToken,
  comparePassword,
  verifyGoogleToken,
} from "../../../lib/index.js";
import { AppError, sendEmail, toMs } from "../../../pkg/index.js";
import {
  userAlreadyVerified,
  invalidCredintials,
  userNotVerified,
} from "../errors.js";
import { checkOtpValidation } from "./otpService.js";
import { userNotFound, userExist } from "../../user/errors.js";
const registerService = async (inputs) => {
  //check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (exist) throw userExist;
  //hash password
  inputs.password = await hashPassword(inputs.password);
  //save user
  const user = await userRepo.createUser(inputs);
  //create otp
  const otp = await generateOTP();
  //generate OTP
  await otpRepo.createOtp({
    value: otp,
    email: inputs.email,
    expiredAt: new Date(Date.now() + toMs(10, "minutes")),
  });
  //send mail
  const info = await sendEmail(
    inputs.email,
    " your verfication code",
    `<h1>your verfication code is ${otp}</h1>`,
  );
  return { name: user.name, email: user.email, id: user._id };
};
const verifyAccount = async (inputs) => {
  //user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist) throw userNotFound;
  //isVerified
  if (exist.isVerified) {
    throw userAlreadyVerified;
  }
  await checkOtpValidation(inputs);
  //switch is verified to true
  const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
    isVerified: true,
  });
  await otpRepo.deleteOtpByEmail(inputs.email);
  return {
    name: updatedUser.name,
    email: updatedUser.email,
    id: updatedUser._id,
  };
};
const loginService = async (inputs) => {
  // check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist) throw userNotFound;
  //compare password
  const isIdentical = await comparePassword(inputs.password, exist.password);
  if (!isIdentical) throw invalidCredintials;
  //check user is verified
  if (!exist.isVerified) {
    throw userNotVerified;
  }
  //token----
  const token = await generateToken(exist);
  return token;
};
//reset password service
const forgetPassword = async (inputs) => {
  await checkOtpValidation(inputs);
  //hash password
  inputs.password = await hashPassword(inputs.password);
  //update password
  const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
    password: inputs.password,
  });
  //delete otp
  return await otpRepo.deleteOtpByEmail(inputs.email);
};
const resetPassword = async (inputs) => {
  await checkOtpValidation(inputs);
  //hash password
  inputs.newPassword = await hashPassword(inputs.newPassword);
  inputs.oldPassword = await hashPassword(inputs.oldPassword);
  //check old password
  const exist = await userRepo.checkUserExistance(inputs.email);
  //compare old with exist old
  const isIdentical = await comparePassword(inputs.oldPassword, exist.password);
  if (!isIdentical) {
    throw new AppError("old password incorrect", 400);
  }
  //compare old with new
   const isSamePassword = await comparePassword(inputs.oldPassword, inputs.newPassword);
   if(isSamePassword)return await otpRepo.deleteOtpByEmail(inputs.email);
  //update password
  const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
    password: inputs.newPassword,
  });
  //delete otp
  return await otpRepo.deleteOtpByEmail(inputs.email);
};
const authenticateWithGoogleService = async (inputs) => {
  const { credential } = inputs;
  //verify the token
  const payload = await verifyGoogleToken(credential);
  if (!payload?.email || !payload?.email_verified || !payload?.name) {
    throw invalidCredintials;
  }
  // check user existance
  const exist = await userRepo.checkUserExistance(payload.email);
  if (exist) {
    const token = await generateToken(exist);
    return token;
  } else {
    const user = await userRepo.createUser({
      name: payload.name,
      email: payload.email,
      profilePic: payload.picture,
      provider: "google",
      isVerified: true,
    });
    const token = await generateToken(user);
    return token;
  }
};
export const authService = {
  registerService,
  loginService,
  verifyAccount,
  forgetPassword,
  resetPassword,
  authenticateWithGoogleService,
};
