import { Schema, model } from "mongoose";
const requestSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
    },
    message: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Message",
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const Request = model("Request", requestSchema);

