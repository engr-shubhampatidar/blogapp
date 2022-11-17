// db connection
const Dotenv = require("dotenv");

Dotenv.config();
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
  },
});

// create user table
knex.schema.hasTable("users").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("users", function (t) {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("email", 100);
        t.string("password");
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

// blog table
knex.schema.hasTable("blogs").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("blogs", function (t) {
        t.increments("id").primary();
        t.integer("user_id");
        t.string("title", 100);
        t.string("description", 1000);
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

// like dislike table
knex.schema.hasTable("likesdislike").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("likesdislike", function (t) {
        t.increments("id").primary();
        t.integer("user_id");
        t.integer("blog_id");
        t.boolean("like");
        t.boolean("dislike");
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

module.exports = knex;
