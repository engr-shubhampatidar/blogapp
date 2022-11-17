const express = require("express");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("../auth/auth");
const { createBlog, getBlogs, getBlog } = require("../service/blog");

const router = express.Router();
router.use(cookieParser());

// create blog
router.post("/createblog", verifyToken, createBlog);

// get all blog posts
router.get("/getblogs", verifyToken, getBlogs);

// get blog of user
router.get("/getblog/:id", verifyToken, getBlog);

module.exports = router;
