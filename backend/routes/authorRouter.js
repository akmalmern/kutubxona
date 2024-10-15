const express = require("express");
const {
  addAuthor,
  getAuthors,
  singleAuthor,
  updateAuthor,
  deletAuthor,
} = require("../controller/authorsController");
const router = express.Router();

router.post("/authors", addAuthor);
router.get("/authors", getAuthors);
router.get("/authors/:id", singleAuthor);
router.put("/authors/:id", updateAuthor);
router.delete("/authors/:id", deletAuthor);

module.exports = router;
