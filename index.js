const express = require("express");
const Dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

Dotenv.config();
const { PORT } = process.env;

const UserRouter = require("./routes/user");
const BlogRouter = require("./routes/blog");
const LikeDislikeRouter = require("./routes/likedislike");

app.use([UserRouter, BlogRouter, LikeDislikeRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
