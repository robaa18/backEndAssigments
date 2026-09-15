import { db } from "../../../index.js";
const createAuthorsCollectionRepo = async (inputs) => {
  const result = await db.collection("authors").insertOne(inputs);
  return result;
};
const checkCollectionExist = async (collectionName) => {
  const exist = await db.listCollections({ name: collectionName }).hasNext();
  return exist;
};
const getAllAuthorsRepo = async () => {
  const exist = await checkCollectionExist("authors");
  if (!exist) return [];
  const result = await db.collection("authors").find().toArray();
  return result;
};
export const authorsRepo = {
  createAuthorsCollectionRepo,
  getAllAuthorsRepo,
  checkCollectionExist,
};
