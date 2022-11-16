const express = require("express");
const app = express();

app.use(express.json());

// db connection
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "1Rj14z#T3xbc",
    database: "blogapp",
  },
});

// create user table
knex.schema.hasTable("users").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("users", function (t) {
        t.increments("id").primary();
        t.string("name", 100);
        t.string("email", 100);
        t.string("password");
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

// blog table
knex.schema.hasTable("blogs").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("blogs", function (t) {
        t.increments("id").primary();
        t.integer("user_id");
        t.string("title", 100);
        t.string("description", 1000);
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

// like dislike table
knex.schema.hasTable("likesdislike").then(function (exists) {
  if (!exists) {
    return knex.schema
      .createTable("likesdislike", function (t) {
        t.increments("id").primary();
        t.integer("user_id");
        t.integer("blog_id");
        t.boolean("like");
        t.boolean("dislike");
        t.string("created_at");
      })
      .then((res) => {
        console.log("table created");
      })
      .catch((err) => {
        console.log(err, "table not created");
      });
  }
});

// drop table
/* knex.schema.dropTable("blogs").then((res) => {
  console.log("table dropped");
}); */

//landing page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// signup
app.post("/signup", (req, res) => {
  const { user, email, password } = req.body;
  /* knex("users").whereNotExists(
    knex.select("*").from("users").whereRaw("users.email" = email)
  ); */
  knex
    .select("*")
    .from("users")
    .whereRaw("users.email = ?", [email])
    .then((data) => {
      if (data.length > 0) {
        res.send("user already exists");
      } else {
        knex("users")
          .insert({
            name: user,
            email: email,
            password: password,
            created_at: new Date(),
          })
          .then((data) => {
            console.log(data);
            res.send("user created");
          })
          .catch((err) => {
            console.log(err);
            res.send("user not created");
          });
      }
    });
  console.log(user, email, password);
  //   res.send("signup page");
});

// signin
app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  knex
    .select("*")
    .from("users")
    .where("email", email)
    .then((response) => {
      if (response.length > 0) {
        if (response[0].password === password) {
          res.send("login successful");
        } else {
          res.send("wrong password");
        }
      } else {
        res.send("user not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send("Something went wrong !");
    });
});

// create blog
app.post("/createblog", (req, res) => {
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
});

// get all blog posts
app.get("/getblogs", (req, res) => {
  knex
    .select("*")
    .from("blogs")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

// get blog of user
app.get("/getblog/:id", (req, res) => {
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
});

// create like dislike
app.post("/likedislike", (req, res) => {
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

  /* knex("likesdislike")
    .insert({ user_id, blog_id, like, dislike, created_at: new Date() })
    .then((data) => {
      res.send("like dislike created");
    })
    .catch((err) => {
      console.log(err);
      res.send("like dislike not created");
    }); */
});

// get like dislike
app.get("/getlikedislike/:id", (req, res) => {
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
});

app.get("/users", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
