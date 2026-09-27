import { Otp } from "../models/otpModel.js";
const createOtp = async (inputs) => {
  const otp = await Otp.create(inputs);
  return otp;
};
const getOtpByEmail = async (email) => {
  const otp = await Otp.findOne({ email });
  return otp;
};
const deleteOtpByEmail = async(email) => {
  return await Otp.deleteMany({ email });
};
export const otpRepo = { createOtp, getOtpByEmail,deleteOtpByEmail};
