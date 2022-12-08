const User = require("../models/user");

module.exports = class UserService {
  async createUser(user) {
    return await User.query().insertGraph(user);
  }

  async findUserByEmail(email) {
    return await User.query().findOne({ email });
  }

  async findUserById(id) {
    return await User.query().findById(id);
  }

  async findAllUsers() {
    return await User.query();
  }
};
