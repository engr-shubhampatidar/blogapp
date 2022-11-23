const express = require("express");
const router = express.Router();
const UserService = require("../services/user");

router.post("/signup", async (req, res) => {
  await UserService.createUser(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
