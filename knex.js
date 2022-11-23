const Dotenv = require("dotenv");
Dotenv.config();

const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT } = process.env;

module.exports = {
  client: "mysql2",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
  },
};
