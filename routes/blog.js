const express = require("express");
const router = express.Router();
const BlogService = require("../services/blog");
const UserService = require("../services/user");
const services = new BlogService();
const userServices = new UserService();
const { verifyToken } = require("../auth/token");

router.post("/createBlog", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const { email } = req;
  const { id } = await userServices.findUserByEmail(email).then((user) => {
    return user;
  });
  await services
    .createBlog({ title, description, user_id: id })
    .then((blog) => {
      res.status(201).json({ message: `Blog created successfully` });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/allBlogs", verifyToken, async (req, res) => {
  await services
    .findAllBlogs()
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/blog/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await services
    .findBlogById(id)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
