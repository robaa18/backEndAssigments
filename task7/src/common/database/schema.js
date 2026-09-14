// 1. Create anexplicit collection named “books” witha validation ruleto ensurethat each
// document has anon-empty“title” field. (0.5 Grade)
//  URL:POST/collection/books
db.createCollection("books", {
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

// 2. Createanimplicitcollectionbyinsertingdatadirectlyinto anewcollectionnamed
// “authors”. (0.5 Grade)
//  URL:POST/collection/authors
db.authors.insertOne({ name: "author1", nationality: "british" });

// 3. Createacappedcollectionnamed“logs”withasizelimitof1MB.(0.5Grade)
//  URL:POST/collection/logs/capped
db.createCollection("logs", { capped: true, size: 1000000 });

// 4. Createanindexonthebookscollectionforthe title field.(0.5Grade)
//  URL:POST/collection/books/index
db.books.createIndex({ title: 1 });

// 5. Insert onedocumentintothe bookscollection.(0.5 Grade)
//  URL:POST/books
db.books.insertOne({
  title: "book1",
  author: "ali",
  year: 1999,
  genres: ["fantasy", "adventure"],
});

// 6. Insertmultipledocumentsintothebookscollectionwithatleastthreerecords.(0.5Grade)
//  URL:POST/books/batch
db.books.insertMany([
  { title: "book2", author: "ali", year: 1993, genres: ["science faction"] },
  {
    title: "book3",
    author: "eyad",
    year: 1992,
    genres: ["classic", "adventure"],
  },
  {
    title: "book4",
    author: "roba",
    year: 1993,
    genres: ["fantasy", "adventure"],
  },
]);

// 7. Insertanewlogintothelogscollection.(0.5Grade)
//  URL:POST/logs
db.logs.insertOne({
  book_id: ObjectId("6aa1e6289b644ecb35d356b4"),
  action: "borrowed",
});

// 8. Updatethebookwithtitle“Future”changetheyeartobe2022.(0.5Grade)
//  URL:PATCH/books/Future
db.books.insertOne({
  title: "Future",
  author: "meme",
  year: 1989,
  genres: ["romantic"],
});
db.books.updateOne({ title: "Future" }, { $set: { year: 2022 } });

// FindaBookwithtitle“BraveNewWorld”.(0.5Grade)
//  URL:GET/books/title=>/books/title?title=BraveNewWorld
db.books.findOne({ title: "Brave New World" });

// 10. Findallbookspublishedbetween1990and2010.(0.5Grade)
//  URL:GET/books/year=>/books/year?from=1990&to=2010
db.books.find({ $and: [{ year: { $gt: 1990, $lt: 2010 } }] });

// 11. Findbookswherethegenreincludes"ScienceFiction".(0.5Grade)
//  URL:/books/genre?genre=Science Fiction
db.books.find({ genres: { $in: ["science faction"] } });

// 12. Skipthefirsttwo books,limit theresults to the next three, sorted by yearin descending
// order. (0.5 Grade)
//  URL:GET/books/skip-limit
db.books.find().skip(2).limit(3).sort({ year: -1 });

// 13. Findbookswheretheyearfieldstoredasaninteger.(0.5Grade)
//  URL:GET/books/year-integer
db.books.find({ year: { $type: "int" } });

// 14. Findallbookswherethegenresfield doesnotinclude anyofthegenres"Horror" or
// "Science Fiction". (0.5 Grade)
//  URL:GET/books/exclude-genres
db.books.find({ genres: { $nin: ["science faction", "horror"] } });

// 15. Deleteallbookspublishedbefore2000.(0.5Grade)
//  DELETE:GET/books/before-year?year=2000
db.books.deleteMany({ year: { $lt: 2000 } });

// 16. Usingaggregation Functions, Filter bookspublished after 2000 and sortthem byyear
// descending. (0.5 Grade)
//  URL:GET/books/aggregate1
db.books.aggregate([
  { $match: { year: { $gt: 2000 } } },
  { $sort: { year: -1 } },
]);

// 17. Usingaggregationfunctions, Find allbookspublished after the year 2000.For each
// matching book, show only the title, author, and year fields. (0.5 Grade)
//  URL:GET/books/aggregate2
db.books.aggregate([
  { $match: { year: { $gt: 2000 } } },
  { $project: { title: 1, year: 1, author: 1, _id: 0 } },
]);

// 18. Usingaggregationfunctions,break anarrayofgenresintoseparate documents.(0.5Grade)
//  URL:GET/books/aggregate3
db.books.aggregate([
  {
    $unwind: {
      path: "$genres",
      preserveNullAndEmptyArrays: true,
    },
  },
]);
// 19. Usingaggregationfunctions,Jointhebookscollection withthelogs collection. (1 Grade)
//  URL:GET/books/aggregate4
db.logs.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "_id",
      as: "books_details",
    },
  },
]);
