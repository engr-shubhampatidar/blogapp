const Joi = require("joi");
const { Model } = require("./helper/index");

module.exports = class LikeDislike extends Model {
  static get tableName() {
    return "likes";
  }

  static get joiSchema() {
    return Joi.object({
      id: Joi.number().integer().greater(0),
      user_id: Joi.number().integer().greater(0).required(),
      blog_id: Joi.number().integer().greater(0).required(),
      like: Joi.boolean().required(),
      dislike: Joi.boolean().required(),
    });
  }
  $beforeInsert() {
    const now = new Date();
    this.created_at = now;
  }
};
