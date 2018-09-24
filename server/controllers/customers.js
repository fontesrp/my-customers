const customers = require("../models/customers");

const index = (req, res) => {
  const { start = 0, stop = 15, search, orderBy } = req.query;

  let _search;

  try {
    _search = JSON.parse(search);
  } catch (e) {
    _search = null;
  }

  let items;

  customers
    .all({
      size: stop - start + 1,
      offset: start,
      search: _search,
      orderBy
    })
    .then((result) => {
      items = result;
      return customers.count();
    })
    .then((result) => res.send({ items, total: result }))
    .catch((error) => {
      res.status(500);
      res.send({ error });
    });
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
