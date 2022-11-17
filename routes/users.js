const express = require("express");
const cookieParser = require("cookie-parser");
const { signup, login, getUser, logout } = require("../service/user");
const { verifyToken } = require("../auth/auth");

const router = express.Router();
router.use(cookieParser());

// signup
router.post("/signup", signup);

// login
router.post("/signin", login);

// logout
router.get("/logout", verifyToken, logout);

// get user
router.get("/users", verifyToken, getUser);

module.exports = router;
