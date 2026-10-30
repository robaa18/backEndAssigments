import { z } from "zod";
export const registerDto = z.object({
  name: z.string().min(3).max(20).trim().toLowerCase(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
  provider: z.enum(["system", "google", "facebook"]).default("system"),
});
export const loginDto = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(6),
});
export const verifyAccountDto = z.object({
  email: z.string().trim().toLowerCase().email(),
  value: z.string().length(6),
});
export const forgetPasswordDto = z.object({
  email: z.string().trim().toLowerCase().email(),
  value: z.string().length(6),
  password: z.string().min(6),
});
export const resetPasswordDto = z.object({
  email: z.string().trim().toLowerCase().email(),
  value: z.string().length(6),
  oldPassword: z.string().min(6),
  newPassword:z.string().min(6)
});
export const sendOtpDto = z.object({
  email: z.string().trim().toLowerCase().email(),
});
