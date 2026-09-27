import { Schema, model } from "mongoose";
const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sender: {
      type: Schema.Types.ObjectId,
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
const Message = model("Message", messageSchema);
