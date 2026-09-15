import { successResponse } from "../../../index.js";
import { booksService } from "../services/booksService.js";
const createBooksCollection = async (req, res, next) => {
  await booksService.createCollection();
  return successResponse({
    res,
    message: "collection created successfully",
    status: 202,
  });
};
const createBooksIndex = async (req, res, next) => {
  const result = await booksService.createIndex("title");
  return successResponse({
    res,
    message: "Index created successfully",
    status: 202,
    result,
  });
};
const createBooksDocument = async (req, res, next) => {
  console.log(req.body);
  const insertedId = await booksService.createDocument(req.body);
  return successResponse({
    res,
    message: "document created successfully",
    data: insertedId,
    status: 202,
  });
};
const createBooksMultiDocs = async (req, res, next) => {
  console.log(req.body);
  const result = await booksService.createMultiDocs(req.body);
  return successResponse({
    res,
    message: "documents creates successfully",
    status: 202,
    data: result,
  });
};
const updateBooksWithTitle = async (req, res, next) => {
  console.log(req.body);

  console.log(req.query);

  const result = await booksService.updateAbookWithTitle(req.body, req.query);
  return successResponse({
    res,
    message: "document updated successfully",
    status: 200,
    result,
  });
};
const findBooksWithTitle = async (req, res, next) => {
  const result = await booksService.findABookWithTitle(req.query);
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const findBooksBetweenTwoYears = async (req, res, next) => {
  const result = await booksService.findbooksBetweenTwoYearsService(req.query);
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const findBooksWithGenres = async (req, res, next) => {
  const result = await booksService.findABooksWithGenres(req.query);
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const skipAndLimitResults = async (req, res, next) => {
  const result = await booksService.skipAndLimitBooksResults();
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const findBooksWithYearInteger = async (req, res, next) => {
  const result = await booksService.findABooksWithYearInteger();
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const findBooksExcludeGenresFields = async (req, res, next) => {
  const result = await booksService.findABooksExcludeGenresFields(req.query);
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const deleteBookdBeforeSpecificYear = async (req, res, next) => {
  await booksService.deleteABookdBeforeSpecificYear(req.query);
  return successResponse({
    res,
    message: "document deleted successfully",
    status: 200,
  });
};
const filterBooksAfterSpecificYearAndSort = async (req, res, next) => {
  const result = await booksService.filterABooksAfterSpecificYearAndSort(
    req.query,
  );
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const filterBooksAfterSpecificYearAndProjectFields = async (req, res, next) => {
  const result =
    await booksService.filterABooksAfterSpecificYearAndProjectFields(req.query);
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const separateBooksGenres = async (req, res, next) => {
  const result = await booksService.separateGenres();
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};
const joinBooksWithLogs = async (req, res, next) => {
  const result = await booksService.compineBooksWithLogs();
  return successResponse({
    res,
    message: "success",
    status: 200,
    data: result,
  });
};

export const booksController = {
  createBooksCollection,
  createBooksIndex,
  createBooksDocument,
  createBooksMultiDocs,
  updateBooksWithTitle,
  findBooksWithTitle,
  findBooksBetweenTwoYears,
  findBooksWithGenres,
  skipAndLimitResults,
  findBooksWithYearInteger,
  findBooksExcludeGenresFields,
  deleteBookdBeforeSpecificYear,
  filterBooksAfterSpecificYearAndSort,
  filterBooksAfterSpecificYearAndProjectFields,
  separateBooksGenres,
  joinBooksWithLogs,
};
