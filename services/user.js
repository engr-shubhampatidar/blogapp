const User = require("../models/user");

module.exports = class UserService {
  static async createUser(user) {
    return await User.query().insert(user);
  }
};
