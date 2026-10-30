import bcrypt from "bcrypt";
export const hashPassword = async (password) => {
  password = await bcrypt.hash(password, 10);
  return password;
};
export const comparePassword = async (inputPassword, existPassword) => {
  const isIdentical = await bcrypt.compare(inputPassword, existPassword);
  return isIdentical;
};
