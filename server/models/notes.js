const db = require("../db").db;

const allForUsers = (userIds) =>
  db.manyOrNone(
    `SELECT
      id,
      body,
      created_at,
      customer_id
    FROM
      notes
    WHERE
      customer_id IN (${userIds.map((_, idx) => `$${idx + 1}`).join(",")})
    ORDER BY
      created_at DESC`,
    [...userIds]
  );

const create = ({ customerId, body }) =>
  db.manyOrNone(`INSERT INTO notes (customer_id, body) VALUES ($1, $2)`, [
    customerId,
    body
  ]);

const update = ({ id, body }) =>
  db.manyOrNone(`UPDATE notes SET body = $1 WHERE id = $2`, [body, id]);

module.exports = {
  allForUsers,
  create,
  update
};
