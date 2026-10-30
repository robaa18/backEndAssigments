import { otpRepo } from "../repos/otpRepo.js";
import { otpExpired, otpNotValid, userNotVerified } from "../errors.js";
import { generateOTP } from "../../../lib/index.js";
import { sendEmail, toMs } from "../../../pkg/index.js";
import { userRepo } from "../../user/repos/userRepo.js";
import { userNotFound } from "../../user/errors.js";
export const checkOtpValidation = async (inputs) => {
  //check otp validation
  const otpExist = await otpRepo.getOtpByEmail(inputs.email);
  if (!otpExist) throw otpExpired;
  if (otpExist.expiredAt < new Date()) throw otpExpired;
  //code is not correct
  if (otpExist.value !== inputs.value) throw otpNotValid;
};

export const sendOtp = async (inputs) => {
  // check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist) throw userNotFound;
  //delete any otps
  await otpRepo.deleteOtpByEmail(inputs.email);
  //check user is verified
  if (!exist.isVerified) {
    throw userNotVerified;
  }
  //generate OTP
  const otp = await generateOTP();
  await otpRepo.createOtp({
    value: otp,
    email: inputs.email,
    expiredAt: new Date(Date.now() + toMs(10, "minutes")),
  });
  //send mail
  return await sendEmail(
    inputs.email,
    " your verfication code",
    `<h1>your verfication code is ${otp}</h1>`,
  );
};
