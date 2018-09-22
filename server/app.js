const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const customersRouter = require("./routes/customers");
const notesRouter = require("./routes/notes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/customers", customersRouter);
app.use("/notes", notesRouter);

module.exports = app;
