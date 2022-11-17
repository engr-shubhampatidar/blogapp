const knex = require("../database/db");
const express = require("express");
const { verifyToken } = require("../auth/auth");
const { likeDislike, getLikeDislike } = require("../service/likedislike");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

// create like dislike
router.post("/likedislike", verifyToken, likeDislike);

// get like dislike
router.get("/getlikedislike/:id", verifyToken, getLikeDislike);

module.exports = router;
