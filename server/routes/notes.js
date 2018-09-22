const express = require("express");

const notesController = require("../controllers/notes");

const router = express.Router();

/* PUT note info */
router.put("/:id", (req, res, next) => {
  notesController.update(req, res);
});

module.exports = router;
