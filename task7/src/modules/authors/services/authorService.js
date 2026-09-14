import { authorsRepo } from "../repos/authorRepo.js";
const createCollection = async (inputs) => {
  console.log(inputs);
  const exist = await authorsRepo.checkCollectionExist("authors");
  console.log(exist);
  if (exist) {
    throw new Error("collection already exist", { cause: { status: 409 } });
  } else {
    const result = await authorsRepo.createAuthorsCollectionRepo(inputs);
    return result;
  }
};
export const authorService = {
  createCollection,
};
