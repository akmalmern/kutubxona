const express = require("express");
const {
  addCategory,
  getCategory,
  singleCategory,
  updateCategory,
  deletCategory,
} = require("../controller/categoryController");
const router = express.Router();

router.post("/categories", addCategory);
router.get("/categories", getCategory);
router.get("/categories/:id", singleCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deletCategory);

module.exports = router;
