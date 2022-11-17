const knex = require("../database/db");

const createBlog = (req, res) => {
  const { title, description, user_id } = req.body;
  knex("blogs")
    .insert({ user_id, title, description, created_at: new Date() })
    .then((data) => {
      console.log(data);
      res.send("blog created");
    })
    .catch((err) => {
      console.log(err);
      res.send("blog not created");
    });
};

const getBlogs = (req, res) => {
  console.log("blogs of all users");
  knex
    .select("*")
    .from("blogs")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

const getBlog = (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("blogs")
    .where("user_id", id)
    .then((data) => {
      res.send(data);
      console.log("blogs of user");
    })
    .catch((err) => console.log(err));
};

module.exports = { createBlog, getBlogs, getBlog };
