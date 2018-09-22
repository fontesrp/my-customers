const db = require("../db").db;

const create = ({ customerId, body }) =>
  db.manyOrNone(`INSERT INTO notes (customer_id, body) VALUES ($1, $2)`, [
    customerId,
    body
  ]);

const update = ({ id, body }) =>
  db.manyOrNone(`UPDATE notes SET body = $1 WHERE id = $2`, [body, id]);

module.exports = {
  create,
  update
};
