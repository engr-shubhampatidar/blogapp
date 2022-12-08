exports.up = function (knex) {
  return knex.schema.createTable("blogs", (table) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("blogs");
};
