import { Schema, Model, model } from "mongoose";
import { type } from "node:os";
//  name(String,required)
// • email(String,Unique,required)
// • Password(String,required)
// • Phone(String,required)
// • age(Number)(Mustbebetween18and60)
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, min: 18, max: 60 },
});
export const User = model("User", userSchema);
