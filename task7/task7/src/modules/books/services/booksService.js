import { booksRepo } from "../repos/booksRepo.js";
const createCollection = async () => {
  const exist = await booksRepo.checkCollectionExist("books");
  if (exist) {
    throw new Error("collection already exist", { cause: { status: 409 } });
  } else {
    await booksRepo.createCollectionRepo();
  }
};
const createIndex = async (indexField) => {
  const indexes = await booksRepo.checkIndexExist(indexField);
  console.log(indexes);
  const exist = Object.values(indexes).some(
    (index) => index[0][0] === indexField,
  );
  console.log(exist);
  if (exist) {
    throw new Error("Index already exist", { cause: { status: 409 } });
  } else {
    const result = await booksRepo.createIndexRepo(indexField);
    return result;
  }
};
const createDocument = async (inputs) => {
  const { insertedId } = await booksRepo.createDocumentRepo(inputs);
  return insertedId;
};
const createMultiDocs = async (inputs) => {
  console.log(inputs);
  const { insertedIds } = await booksRepo.createMultiDocsRepo(inputs);
  return insertedIds;
};
const updateAbookWithTitle = async (updatedData, identifier) => {
  const { title } = identifier;
  console.log(updatedData);
  const { matchedCount, modifiedCount } =
    await booksRepo.updateAbookWithTitleRepo(title, updatedData);
  if (matchedCount == 0) {
    throw new Error("cannot find book with this title", {
      cause: { status: 404 },
    });
  }
};
const findABookWithTitle = async (inputs) => {
  const { title } = inputs;
  const result = await booksRepo.findABookWithTitle(title);
  return result;
};
const findbooksBetweenTwoYearsService = async (inputs) => {
  const { year1, year2 } = inputs;
  const result = await booksRepo.findbooksBetweenTwoYearsRepo(
    Number(year1),
    Number(year2),
  );
  return result;
};
const findABooksWithGenres = async (inputs) => {
  const { genres } = inputs;
  const result = await booksRepo.findABooksWithGenresRepo(genres);
  return result;
};
const skipAndLimitBooksResults = async (inputs) => {
  const result = await booksRepo.skipAndLimitBooksResultsRepo();
  return result;
};
const findABooksWithYearInteger = async (inputs) => {
  const result = await booksRepo.findABooksWithYearIntegerRepo();
  return result;
};
const findABooksExcludeGenresFields = async (inputs) => {
  const { genres } = inputs;
  const result = await booksRepo.findABooksExcludeGenresFieldsRepo(genres);
  return result;
};
const deleteABookdBeforeSpecificYear = async (inputs) => {
  const { year } = inputs;
  const { deletedCount } = await booksRepo.deleteABookdBeforeSpecificYearRepo(
    Number(year),
  );
  if (deletedCount === 0) {
    throw new Error("book not found", { cause: { status: 404 } });
  }
};
const filterABooksAfterSpecificYearAndSort = async (inputs) => {
  const { year } = inputs;
  const result = await booksRepo.filterABooksAfterSpecificYearAndSortRepo(
    Number(year),
  );
  return result;
};
const filterABooksAfterSpecificYearAndProjectFields = async (inputs) => {
  const { year } = inputs;
  const result =
    await booksRepo.filterABooksAfterSpecificYearAndProjectFieldsRepo(
      Number(year),
    );
  return result;
};
const separateGenres = async () => {
  const result = await booksRepo.separateGenresRepo();
  return result;
};
const compineBooksWithLogs = async () => {
  const result = await booksRepo.compineBooksWithLogsRepo();
  return result;
};
export const booksService = {
  createCollection,
  createIndex,
  createDocument,
  createMultiDocs,
  updateAbookWithTitle,
  findbooksBetweenTwoYearsService,
  findABooksWithGenres,
  findABookWithTitle,
  skipAndLimitBooksResults,
  findABooksWithYearInteger,
  findABooksExcludeGenresFields,
  deleteABookdBeforeSpecificYear,
  filterABooksAfterSpecificYearAndSort,
  filterABooksAfterSpecificYearAndProjectFields,
  separateGenres,
  compineBooksWithLogs,
};
