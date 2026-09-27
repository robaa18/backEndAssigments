import { Schema, model } from "mongoose";
const otpSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
      length: 6,
    },
    email: {
      type: String,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);
export const Otp = model("Otp", otpSchema);
