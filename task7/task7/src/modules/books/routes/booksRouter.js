import { Router } from "express";
import { booksController } from "../controllers/booksController.js";
import { verifyToken } from "../../../common/middleWare/auth.js";
const booksRouter = Router();
// 1. Create anexplicit collection named “books” witha validation ruleto ensurethat each
// document has anon-empty“title” field. (0.5 Grade)
//  URL:POST/collection/books
booksRouter.post("/collection",verifyToken,booksController.createBooksCollection);
// . Createanindexonthebookscollectionforthe title field.(0.5Grade)
//  URL:POST/collection/books/index
booksRouter.post("/index",verifyToken,booksController.createBooksIndex);
// 5. Insert onedocumentintothe bookscollection.(0.5 Grade)
//  URL:POST/books
booksRouter.post("/bookDoc",verifyToken,booksController.createBooksDocument);
// 6. Insertmultipledocumentsintothebookscollectionwithatleastthreerecords.(0.5Grade)
//  URL:POST/books/batch
booksRouter.post("/batch",verifyToken,booksController.createBooksMultiDocs);
// 8. Updatethebookwithtitle“Future”changetheyeartobe2022.(0.5Grade)
//  URL:PATCH/books/Futur
booksRouter.patch("/",verifyToken,booksController.updateBooksWithTitle);
// 9.
// FindaBookwithtitle“BraveNewWorld”.(0.5Grade)
//  URL:GET/books/title=>/books/title?title=BraveNewWorld
booksRouter.get("/title",verifyToken,booksController.findBooksWithTitle);

// 10. Findallbookspublishedbetween1990and2010.(0.5Grade)
//  URL:GET/books/year=>/books/year?from=1990&to=2010
booksRouter.get("/year",verifyToken,booksController.findBooksBetweenTwoYears);

// 11. Findbookswherethegenreincludes"ScienceFiction".(0.5Grade)
//  URL:/books/genre?genre=Science Fiction
booksRouter.get("/genre",verifyToken,booksController.findBooksWithGenres);

// 12. Skipthefirsttwo books,limit theresults to the next three,verifyToken,sorted by yearin descending
// order. (0.5 Grade)
//  URL:GET/books/skip-limi
booksRouter.get("/skip-limit",verifyToken,booksController.skipAndLimitResults);
// 13. Findbookswheretheyearfieldstoredasaninteger.(0.5Grade)
//  URL:GET/books/year-integer
booksRouter.get("/year-integer",verifyToken,booksController.findBooksWithYearInteger);

// 14. Findallbookswherethegenresfield doesnotinclude anyofthegenres"Horror" or
// "Science Fiction". (0.5 Grade)
//  URL:GET/books/exclude-genres
booksRouter.get(
  "/exclude-genres",
  verifyToken,
  booksController.findBooksExcludeGenresFields,
);

// 15. Deleteallbookspublishedbefore2000.(0.5Grade)
//  DELETE:GET/books/before-year?year=2000
booksRouter.delete(
  "/before-year",
  verifyToken,
  booksController.deleteBookdBeforeSpecificYear,
);
booksRouter.get(
  "/before-year",
  verifyToken,
  booksController.deleteBookdBeforeSpecificYear,
);

// 16. Usingaggregation Functions, Filter bookspublished after 2000 and sortthem byyear
// descending. (0.5 Grade)
//  URL:GET/books/aggregate1
booksRouter.get(
  "/aggregate1",
  verifyToken,
  booksController.filterBooksAfterSpecificYearAndSort,
);
// . Usingaggregationfunctions, Find allbookspublished after the year 2000.For each
// matching book, show only the title, author, and year fields. (0.5 Grade)
//  URL:GET/books/aggregate2
booksRouter.get(
  "/aggregate2",
  verifyToken,
  booksController.filterBooksAfterSpecificYearAndProjectFields,
);

// 18. Usingaggregationfunctions,break anarrayofgenresintoseparate documents.(0.5Grade)
//  URL:GET/books/aggregate3
booksRouter.get("/aggregate3",verifyToken, booksController.separateBooksGenres);

// 19. Usingaggregationfunctions,Jointhebookscollection withthelogs collection. (1 Grade)
//  URL:GET/books/aggregate4
booksRouter.get("/aggregate4",verifyToken, booksController.joinBooksWithLogs);

export default booksRouter;
