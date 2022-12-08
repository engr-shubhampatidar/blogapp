const LikeDislike = require("../models/likedislike");

module.exports = class LikeDislikeService {
  async createLikeDislike(likeDislike) {
    return await LikeDislike.query().insertGraph(likeDislike);
  }

  async findAllLikeDislikes() {
    return await LikeDislike.query();
  }

  async findLikeDislikeById(id) {
    return await LikeDislike.query().findById(id);
  }
};
