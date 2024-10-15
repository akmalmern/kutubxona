const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;
const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: "authorModel", required:true },
    category: { type: ObjectId, ref: "categoryModel", required: true },
    publishedYear: { type: String },
    summary: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookModel", bookSchema);
