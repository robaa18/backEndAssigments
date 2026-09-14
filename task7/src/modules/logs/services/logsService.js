import { logsRepo } from "../repos/logsRepo.js";
import { ObjectId } from "mongodb";
const createLogsCappedTable = async (query) => {
  const { size } = query;
  const exist = await logsRepo.checkCollectionExist("logs");
  if (exist) {
    throw new Error("collection already exist", { cause: { status: 409 } });
  } else {
    await logsRepo.createLogsCappedTableRepo(Number(size));
  }
};
const insertNewDocService = async (inputs) => {
  const { bookId, action } = inputs;
  const result = await logsRepo.insertNewDocRepo(new ObjectId(bookId), action);
  return result;
};
export const logsService = {
  createLogsCappedTable,
  insertNewDocService,
};
