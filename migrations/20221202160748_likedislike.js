exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("likes", (table) => {
      table.increments("id").primary();
      table.integer("user_id");
      table.integer("blog_id");
      table.boolean("like");
      table.boolean("dislike");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

exports.down = function (knex) {
  return knex.schema.dropTable("likes");
};
