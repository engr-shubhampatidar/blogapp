const express = require("express");
const router = express.Router();
const LikeDislikeService = require("../services/likedislike");
const UserService = require("../services/user");
const services = new LikeDislikeService();
const userServices = new UserService();
const { verifyToken } = require("../auth/token");

router.post("/createLikeDislike", verifyToken, async (req, res) => {
  const { blog_id, like = false, dislike = false } = req.body;
  const { email } = req;
  const { id } = await userServices.findUserByEmail(email).then((user) => {
    return user;
  });
  await services
    .createLikeDislike({ blog_id, user_id: id, like, dislike })
    .then((likeDislike) => {
      res.status(201).json({ message: `LikeDislike created successfully` });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/allLikeDislikes", verifyToken, async (req, res) => {
  await services
    .findAllLikeDislikes()
    .then((likeDislikes) => {
      res.status(200).json(likeDislikes);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/likeDislike/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await services
    .findLikeDislikeById(id)
    .then((likeDislike) => {
      res.status(200).json(likeDislike);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
