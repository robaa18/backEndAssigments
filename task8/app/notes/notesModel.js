import { Schema , model} from "mongoose";
//  title(String,required)
// • content(String,required)
// • userId(reftoUsers,required)
// • createdAt(Timestamp)
// • updatedAt(Timestamp)
// 1. Addacustomvalidatortothe“title”fieldthat ensurethetitleisnot entirelyuppercase.For
// example (“FIRST NOTE” )(“First Note” ). (0.5 Grade)
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (V) {
          // FIRST NOTE
          return V !== V.toUpperCase();
        },
        message: "title cannot be full upperCase",
      },
    },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);
export const Note = model("Note", noteSchema);
