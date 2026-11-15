import { z } from "zod";
import mongoose from "mongoose";
export const sendRequestDto = z.object({
  message: z
    .string()
    .length(24)
    .refine((value) => {
      return mongoose.Types.ObjectId.isValid(value);
    }),
});
export const acceptOrRejectDto = z.object({
  reqId: z
    .string()
    .length(24)
    .refine((value) => {
      return mongoose.Types.ObjectId.isValid(value);
    }),
});
