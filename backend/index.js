const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dataDB = require("./db/db");
const morgan = require("morgan");
const cors = require("cors")
const categoryRouter = require("./routes/categoryRouter");
const authorRouter = require("./routes/authorRouter");
const bookRouter = require("./routes/bookRouter");
// ***************

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
dotenv.config();
dataDB();
// *************?

app.use("/", categoryRouter);
app.use("/", authorRouter);
app.use("/", bookRouter);

// *******************
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("5000-portda ishladi");
});
