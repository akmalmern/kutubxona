const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "muallif ismini yozing"] },
    biography: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("authorModel", authorSchema);
