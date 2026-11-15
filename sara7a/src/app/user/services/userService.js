import { unlink } from "node:fs/promises";
import { userRepo } from "../repos/userRepo.js";
export const uploadProfilePicture = async (id, path) => {
  //get user email
  const { email, profilePic } = await userRepo.checkUserExistanceById(id);
  if (profilePic) {
    unlink(profilePic);
  }
  return await userRepo.updateUserByEmail(email, { profilePic: path });
};
