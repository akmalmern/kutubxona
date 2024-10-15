const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  singleBook,
  updateBook,
  deletBook,
  searchBook,
  getBooksByCategory,
  getBooksByAuthors,

} = require("../controller/bookController");

router.post("/books", addBook);
router.get("/books", getBooks);
router.get("/books/search", searchBook);
router.get("/books/:id", singleBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deletBook);

router.get("/books/category/:categoryId", getBooksByCategory);
router.get("/books/author/:authorId", getBooksByAuthors);

module.exports = router;
