const express = require("express");
const router = express.Router();
const UserService = require("../services/user");
const services = new UserService();
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../auth/token");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  let password = bcrypt.hashSync(req.body.password, 10);

  let user = await services.findUserByEmail(email);

  if (user) {
    return res.status(400).json({ message: "User already registered" });
  } else {
    await services
      .createUser({ name, email, password })
      .then((user) => {
        res
          .status(201)
          .json({ message: `${user?.name}, you are sign up successfully` });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await services.findUserByEmail(email);
  if (user) {
    let isCorrectPass = bcrypt.compareSync(password, user.password);
    if (isCorrectPass) {
      let access_token = generateToken({ email });
      res.cookie("access_token", access_token, {
        httpOnly: true,
      });
      res.status(200).json({ message: "Login successfully" });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successfully" });
});

router.get("/profile", verifyToken, async (req, res) => {
  const { email } = req;
  await services
    .findUserByEmail(email)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/allUsers", verifyToken, async (req, res) => {
  await services
    .findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/user/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  await services
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
