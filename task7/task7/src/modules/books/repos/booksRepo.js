import { db } from "../../../index.js";
const createCollectionRepo = async () => {
  await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            pattern: ".*\\S.*",
            minLength: 1,
          },
        },
      },
    },
  });
};
const checkCollectionExist = async (collectionName) => {
  const exist = await db.listCollections({ name: collectionName }).hasNext();
  return exist;
};
const checkIndexExist = async (indexField) => {
  const indexes = await db.indexInformation("books");
  return indexes;
};
const createIndexRepo = async (indexField) => {
  const result = await db.collection("books").createIndex({ [indexField]: 1 });
  return result;
};
const createDocumentRepo = async (inputs) => {
  const result = await db.collection("books").insertOne(inputs);
  return result;
};
const createMultiDocsRepo = async (inputs) => {
  const result = await db.collection("books").insertMany(inputs);
  return result;
};
const updateAbookWithTitleRepo = async (title, updatedData) => {
  const result = await db
    .collection("books")
    .updateOne({ title: title }, { $set: updatedData });
  return result;
};
const findABookWithTitle = async (inputs) => {
  console.log(typeof inputs);
  const result = await db.collection("books").findOne({ title: inputs });
  return result;
};
const findbooksBetweenTwoYearsRepo = async (year1, year2) => {
  const result = await db
    .collection("books")
    .find({ $and: [{ year: { $gt: year1, $lt: year2 } }] })
    .toArray();
  return result;
};
const findABooksWithGenresRepo = async (inputs) => {
  console.log(inputs);
  const result = await db
    .collection("books")
    .find({ genres: { $in: [inputs] } })
    .toArray();
  return result;
};
const skipAndLimitBooksResultsRepo = async () => {
  const result = await db
    .collection("books")
    .find({})
    .skip(2)
    .limit(3)
    .sort({ year: -1 })
    .toArray();
  return result;
};
const findABooksWithYearIntegerRepo = async (inputs) => {
  const result = await db
    .collection("books")
    .find({ year: { $type: "int" } })
    .toArray();
  return result;
};
const findABooksExcludeGenresFieldsRepo = async (inputs) => {
  const genresArray = Array.isArray(inputs)
    ? inputs
    : typeof inputs === "string"
    ? [inputs]
    : ["Horror", "Science Fiction"];
  const result = await db
    .collection("books")
    .find({ genres: { $nin: genresArray } })
    .toArray();
  return result;
};
const deleteABookdBeforeSpecificYearRepo = async (year) => {
  const result = await db
    .collection("books")
    .deleteMany({ year: { $lt: year } });
  return result;
};
const filterABooksAfterSpecificYearAndSortRepo = async (input) => {
  const result = await db
    .collection("books")
    .aggregate([{ $match: { year: { $gt: input } } }, { $sort: { year: -1 } }])
    .toArray();
  return result;
};
const filterABooksAfterSpecificYearAndProjectFieldsRepo = async (input) => {
  const result = await db
    .collection("books")
    .aggregate([
      { $match: { year: { $gt: input } } },
      { $project: { title: 1, year: 1, author: 1, _id: 0 } },
    ])
    .toArray();
  return result;
};
const separateGenresRepo = async () => {
  const result = await db
    .collection("books")
    .aggregate([
      {
        $unwind: {
          path: "$genres",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .toArray();
  return result;
};
const compineBooksWithLogsRepo = async (inputs) => {
  const result = await db
    .collection("logs")
    .aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "books_details",
        },
      },
    ])
    .toArray();
  return result;
};
export const booksRepo = {
  createCollectionRepo,
  createIndexRepo,
  createDocumentRepo,
  createMultiDocsRepo,
  updateAbookWithTitleRepo,
  findbooksBetweenTwoYearsRepo,
  findABooksWithGenresRepo,
  skipAndLimitBooksResultsRepo,
  findABooksWithYearIntegerRepo,
  findABooksExcludeGenresFieldsRepo,
  deleteABookdBeforeSpecificYearRepo,
  filterABooksAfterSpecificYearAndSortRepo,
  filterABooksAfterSpecificYearAndProjectFieldsRepo,
  separateGenresRepo,
  compineBooksWithLogsRepo,
  checkCollectionExist,
  checkIndexExist,
  findABookWithTitle,
};
