import crypto from "crypto";
export async function generateOTP() {
  const otp = await crypto.randomInt(100000, 999999).toString();
  return otp;
}
