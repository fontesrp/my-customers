const db = require("../db").db;

const prepareSearch = (search) => {
  const { id, name, email, status, createdAt, note } = search;

  const names = (name || "").split(/\s+/);

  const fields = [
    { field: "cus.id::text", value: id },
    { field: "cus.first_name", value: names[0] },
    { field: "cus.last_name", value: names[1] },
    { field: "cus.email", value: email },
    { field: "cus.status::text", value: status },
    { field: "cus.created_at::text", value: createdAt },
    { field: "nts.body", value: note }
  ];

  return fields.reduce(
    (result, curr) => {
      if (curr.value) {
        result.fields.push(curr.field);
        result.values.push(curr.value);
      }

      return result;
    },
    {
      fields: [],
      values: []
    }
  );
};

const whereStmt = (fields, countFrom = 1) =>
  fields.reduce(
    (where, fld, idx) =>
      `${where}${!!where ? " AND " : ""}${fld} ILIKE '%$${countFrom +
        idx}:value%'`,
    ""
  );

const orderByStmt = (orderBy) => {
  const fields = [
    { db: "cus.id", client: "id" },
    { db: "cus.first_name", client: "name" },
    { db: "cus.email", client: "email" },
    { db: "cus.status", client: "status" },
    { db: "cus.created_at", client: "createdAt" }
  ];

  return (fields.find((fld) => fld.client === orderBy) || {}).db;
};

const all = ({ size, offset, search, orderBy }) => {
  const _search = search ? prepareSearch(search) : null;

  let params = [size, offset];

  if (!!_search && _search.values.length > 0) {
    params = [...params, ..._search.values];
  }

  return db
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
      ${
        !!_search && _search.fields.length > 0
          ? `WHERE ${whereStmt(_search.fields, 3)}`
          : ""
      }
      ORDER BY
        ${!!orderBy ? `${orderByStmt(orderBy)},` : ""}
        cus.id
      LIMIT $1
      OFFSET $2`,
      params
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
};

const update = ({ id, status }) =>
  db.manyOrNone(`UPDATE customers SET status = $1 WHERE id = $2`, [status, id]);

const count = () =>
  db
    .one(`SELECT COUNT(1) qtt FROM customers`)
    .then((row) => parseInt(row.qtt, 10));

module.exports = {
  all,
  update,
  count
};
