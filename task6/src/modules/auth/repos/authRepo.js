import { db } from "../../../index.js";
const registerRepo = async (name, email, hashedPassword) => {
  const result = await db
    .collection("users")
    .insertOne({ name: name, email: email, hashed_password: hashedPassword });
  return result;
};
const checkUserExistanceByEmail = async (input) => {
  const exist = await db.collection("users").findOne({ email: input });
  return exist;
};
export const authRepo = {
  registerRepo,
  checkUserExistanceByEmail,
};
