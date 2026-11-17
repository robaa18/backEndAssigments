import { userRepo } from "../../app/user/repos/userRepo.js";
import AppError from "../../pkg/errorHandling/appError.js";
export const checkAccountIsBanned = async (id) => {
  const exist = await userRepo.checkUserExistanceById(id);
  if (!exist) throw new AppError("user not exist", 404);
  if(exist.isBanned===true)throw new AppError("your account is banned contact us", 403);
  return ;
};

////sdnkds


