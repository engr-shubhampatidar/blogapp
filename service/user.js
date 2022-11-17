const knex = require("../database/db");
const { generateToken } = require("../auth/auth");

const signup = (req, res) => {
  const { user, email, password } = req.body;
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
            res.send("user created");
          })
          .catch((err) => {
            console.log(err);
            res.send("user not created");
          });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  knex
    .select("*")
    .from("users")
    .where("email", email)
    .then((response) => {
      if (response.length > 0) {
        if (response[0].password === password) {
          const { id, name, email } = response[0];
          let token = generateToken({ id, name, email });
          return res
            .cookie("access_token", token, {
              httpOnly: true,
              // secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌" });
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
};

const logout = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
};

const getUser = (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { signup, login, logout, getUser };
