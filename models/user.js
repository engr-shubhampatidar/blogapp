const Joi = require("joi");
const { Model } = require("./helper/index");

module.exports = class User extends Modal {
  static get tableName() {
    return "users";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(12).required(),
    });
  }
  $beforeInsert() {
    const now = new Date().toISOString();
    this.created_at = now;
  }
};
