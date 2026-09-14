import { db } from "../../../index.js";
const createAuthorsCollectionRepo = async (inputs) => {
  const result = await db.collection("authors").insertOne(inputs);
  return result;
};
const checkCollectionExist = async (collectionName) => {
  const exist = await db.listCollections({ name: collectionName }).hasNext();
  return exist;
};
export const authorsRepo = {
  createAuthorsCollectionRepo,
  checkCollectionExist,
};
