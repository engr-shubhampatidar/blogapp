const knex = require("../database/db");

const likeDislike = (req, res) => {
  const { user_id, blog_id, like = false, dislike = false } = req.body;
  knex
    .select("*")
    .from("likesdislike")
    .where("user_id", user_id)
    .andWhere("blog_id", blog_id)
    .then((data) => {
      if (data.length > 0) {
        knex("likesdislike")
          .where("user_id", user_id)
          .andWhere("blog_id", blog_id)
          .update({ like, dislike })
          .then((data) => {
            console.log(data);
            res.send("updated");
          })
          .catch((err) => {
            console.log(err);
            res.send("not updated");
          });
      } else {
        knex("likesdislike")
          .insert({ user_id, blog_id, like, dislike, created_at: new Date() })
          .then((data) => {
            console.log(data);
            res.send("created");
          })
          .catch((err) => {
            console.log(err);
            res.send("not created");
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("something went wrong");
    });
};

const getLikeDislike = (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("likesdislike")
    .where("blog_id", id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports = { likeDislike, getLikeDislike };
