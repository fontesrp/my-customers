const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const customersRouter = require("./routes/customers");
const notesRouter = require("./routes/notes");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-PINGOTHER, Accept, Content-Type"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
  res.header("Accept", "*/*");
  res.header("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.send({ ok: true });
  } else {
    next();
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/customers", customersRouter);
app.use("/notes", notesRouter);

module.exports = app;
