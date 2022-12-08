const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const generateToken = function ({ email }) {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1d" });
};

const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.email = data.email;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { generateToken, verifyToken };
