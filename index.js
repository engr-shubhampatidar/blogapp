const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const likeDislikeRouter = require("./routes/likeDislike");

app.use(express.json());
app.use(cookieParser());
// routes
app.use([userRouter, blogRouter, likeDislikeRouter]);

//landing page
app.get("/", (req, res) => {
  res.send(
    "<div style='background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);background-size: 400% 400%;animation: gradient 15s ease infinite;height: 100vh;display:flex;justify-content: space-around;align-items: center;border-radius: 10px;'> <h1 style='color: #ffffff;text-align: center;font-family: monospace;font-size: 10vh;font-weight: 900;font-style: oblique;'>Welcome to the Blog App</h1></div> "
  );
});

app.listen(4001, () => {
  console.log("Server is running on port 4001");
});
