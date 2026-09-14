import { db } from "../../../index.js";
const createLogsCappedTableRepo = async (input) => {
  await db.createCollection("logs", {
    capped: true,
    size: input,
  });
};
const checkCollectionExist = async (collectionName) => {
  const exist = await db.listCollections({ name: collectionName }).hasNext();
  return exist;
};
const insertNewDocRepo = async (bookId, action) => {
  const result = await db
    .collection("logs")
    .insertOne({ book_id: bookId, action });
  return result;
};
export const logsRepo = {
  createLogsCappedTableRepo,
  insertNewDocRepo,
  checkCollectionExist,
};
