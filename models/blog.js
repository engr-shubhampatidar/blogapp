const Joi = require("joi");
const { Model } = require("./helper/index");

module.exports = class Blog extends Model {
  static get tableName() {
    return "blogs";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      title: Joi.string().min(3).max(255).required(),
      description: Joi.string().min(3).max(255).required(),
      user_id: Joi.number().integer().greater(0).required(),
    });
  }
  $beforeInsert() {
    const now = new Date();
    this.created_at = now;
  }
};
