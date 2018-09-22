const notes = require("../models/notes");

const create = (req, res) => {
  const {
    params: { id },
    body: { body }
  } = req;

  notes
    .create({
      customerId: id,
      body
    })
    .then(() => {
      res.status(201);
      res.send({ success: true });
    })
    .catch((error) => {
      res.status(400);
      res.send({ error });
    });
};

const update = (req, res) => {
  const {
    params: { id },
    body: { body }
  } = req;

  if (!body) {
    res.status(400);
    return res.send({ error: "Invalid field/value" });
  }

  notes
    .update({ id, body })
    .then(() => res.send({ success: true }))
    .catch((error) => {
      res.status(400);
      res.send({ error });
    });
};

module.exports = {
  create,
  update
};
