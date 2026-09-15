import { authorsRepo } from "../repos/authorRepo.js";
const createCollection = async (inputs) => {
  const authorData = (inputs && Object.keys(inputs).length > 0)
    ? inputs
    : { name: "Naguib Mahfouz", nationality: "Egyptian" };
  const result = await authorsRepo.createAuthorsCollectionRepo(authorData);
  return result;
};

const getAuthors = async () => {
  const result = await authorsRepo.getAllAuthorsRepo();
  return result;
};

export const authorService = {
  createCollection,
  getAuthors,
};
