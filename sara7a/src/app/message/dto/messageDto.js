import { z } from "zod";
import mongoose from "mongoose";
export const sendMessageDto = z.object({
  content: z.string().min(1).max(200),
  receiver: z
    .string()
    .length(24)
    .refine((value) => {
      return mongoose.Types.ObjectId.isValid(value);
    }),
});
