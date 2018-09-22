const customers = require("../models/customers");

const index = (req, res) => {
  const { page = 1, size = 15 } = req.query;

  customers
    .all({
      size,
      offset: (page - 1) * size
    })
    .then((customers) => res.send(customers));
};

const update = (req, res) => {
  const {
    params: { id },
    body: { status }
  } = req;

  if (!status || !["prospective", "current", "non-active"].includes(status)) {
    res.status(400);
    return res.send({ error: "Invalid field/value" });
  }

  customers
    .update({ id, status })
    .then(() => res.send({ success: true }))
    .catch((error) => {
      res.status(400);
      res.send({ error });
    });
};

module.exports = {
  index,
  update
};
