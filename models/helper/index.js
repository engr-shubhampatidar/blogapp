const { Modal } = require("objection");
const knex = require("../../config/db");

module.exports = Modal.knex(knex);
