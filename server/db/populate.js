const path = require("path");

const dbObj = require("./index");
const { pgp, db } = dbObj;

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new pgp.QueryFile(fullPath, { minify: true });
};

db.query(sql("./createTables.sql")).then(() =>
  db.query(sql("./dummyData.sql"))
);
