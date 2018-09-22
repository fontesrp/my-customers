const db = require("../db").db;

const all = ({ size, offset }) =>
  db
    .manyOrNone(
      `SELECT
        cus.id,
        cus.first_name,
        cus.last_name,
        cus.email,
        cus.status,
        cus.created_at,
        nts.id note_id,
        nts.body note_body,
        nts.created_at note_created_at
      FROM
        customers cus
        LEFT OUTER JOIN notes nts ON cus.id = nts.id
      ORDER BY
        cus.id
      LIMIT $1
      OFFSET $2`,
      [size, offset]
    )
    .then((data) =>
      Object.values(
        data.reduce((result, row) => {
          if (!result[row.id]) {
            result[row.id] = {
              id: row.id,
              name: `${row.first_name} ${row.last_name}`,
              first_name: row.first_name,
              last_name: row.last_name,
              email: row.email,
              status: row.status,
              created_at: row.created_at,
              notes: []
            };
          }

          if (row.note_id) {
            result[row.id].notes.push({
              id: row.note_id,
              body: row.note_body,
              created_at: row.note_created_at
            });
          }

          return result;
        }, {})
      )
    );

const update = ({ id, status }) =>
  db.manyOrNone(`UPDATE customers SET status = $1 WHERE id = $2`, [status, id]);

module.exports = {
  all,
  update
};
