import { userRepo } from "../../user/repos/userRepo.js";
import { otpRepo } from "../repos/otpRepo.js";
import {
  hashPassword,
  comparePassword,
} from "../../../lib/index.js";
import { generateToken } from "../../../lib/index.js";
import { verifyGoogleToken } from "../../../lib/index.js";
import { AppError } from "../../../pkg/index.js";
import {
  userAlreadyVerified,
  invalidCredintials,
  userNotVerified,
} from "../errors.js";
import { checkOtpValidation } from "./otpService.js";
import { userNotFound, userExist } from "../../user/errors.js";
import { otpBaseFunction } from "./otpService.js";
import { cacheProvider } from "../../../lib/cache/init.js";
import { toSeconds } from "../../../pkg/index.js";
const baseVerify = async (inputs, fn) => {
  //user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (!exist) throw userNotFound;
  await checkOtpValidation(inputs);
  const result = fn(exist);
  await otpRepo.deleteOtpByEmail(inputs.email);
  return result;
};

const registerService = async (inputs) => {
  //check user existance
  const exist = await userRepo.checkUserExistance(inputs.email);
  if (exist) throw userExist;
  //hash password
  inputs.password = await hashPassword(inputs.password);
  //save user
  const user = await userRepo.createUser(inputs);
  await otpBaseFunction(inputs);
  return { name: user.name, email: user.email, id: user._id };
};

const verifyAccount = async (inputs) => {
  return baseVerify(inputs, async (exist) => {
    if (exist.isVerified) {
      throw userAlreadyVerified;
    }
    const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
      isVerified: true,
    });
    return {
      name: updatedUser.name,
      email: updatedUser.email,
      id: updatedUser._id,
    };
  });
};

const enableTwoStepVerfication = async (inputs) => {
  return baseVerify(inputs, async () => {
    const updatedUser = await userRepo.updateUserByEmail(inputs.email, {
      twoStepVerification: true,
    });
    return {
      name: updatedUser.name,
      email: updatedUser.email,
      id: updatedUser._id,
    };
  });
};

const verifyTwoStepVerficationCode = async (inputs) => {
  return baseVerify(inputs, async (exist) => {
    if (!exist.twoStepVerification) {
      throw new AppError("enable 2 step verification first", 400);
    }
    const accessToken = await generateToken(exist, "1h");
    const refreshToken = await generateToken(exist, "7d");
    return { accessToken, refreshToken };
  });
};

const loginService = async (inputs) => {
  const cachedKey = `cached-tries:${inputs.email}`;
  let cachedTries = await cacheProvider.get(cachedKey);
  if (cachedTries === 0) {
    await userRepo.updateUserByEmail(inputs.email, { isBanned: true });
    return { isBanned: true };
  }
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
  if (exist.twoStepVerification) {
    await otpBaseFunction(inputs);
    return;
  }
  //token----
  const accessToken = await generateToken(exist, "1h");
  const refreshToken = await generateToken(exist, "7d");
  const cachedTTL = await cacheProvider.ttl(`cached-tries:${inputs.email}`);
  const ttl = cachedTTL <= 0 ? toSeconds(3, "minutes") : cachedTTL;
  cachedTries = cachedTries ?? 5;
  await cacheProvider.set(`cached-tries:${inputs.email}`, cachedTries - 1, ttl);
  return { accessToken, refreshToken };
};

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
  const isSamePassword = await comparePassword(
    inputs.oldPassword,
    inputs.newPassword,
  );
  if (isSamePassword) return await otpRepo.deleteOtpByEmail(inputs.email);
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
  enableTwoStepVerfication,
  verifyTwoStepVerficationCode,
  otpBaseFunction,
};
