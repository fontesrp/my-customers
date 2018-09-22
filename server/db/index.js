const pgp = require("pg-promise")();

const db = pgp({
  host: "localhost",
  port: "5432",
  database: "my_customers"
});

module.exports = {
  pgp,
  db
};
