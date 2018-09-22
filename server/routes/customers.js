const express = require("express");

const customersController = require("../controllers/customers");
const notesController = require("../controllers/notes");

const router = express.Router();

/* GET customers listing */
router.get("/", (req, res, next) => {
  customersController.index(req, res);
});

/* POST customer note */
router.post("/:id/notes", (req, res, next) => {
  notesController.create(req, res);
});

/* PUT customer info */
router.put("/:id", (req, res, next) => {
  customersController.update(req, res);
});

module.exports = router;
