const express = require("express");
let router = express.Router();
var User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

function generateAccessToken(data) {
  return jwt.sign(data, config.get("jwtprivatekey"), {
    expiresIn: "1800s",
  });
}

//register

router.post("/register", async (req, res) => {
  console.log("called");
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User already exists");

  user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();

  let token = generateAccessToken({
    username: user.username,
  });
  console.log(user.username);
  return res.send(token);
});

//login

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Username doesn't exist");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (req.body.password == user.password)
    return res.status(400).send("Password incorrect!");
  let checkRole = (await req.body.role) !== user.role ? false : true;
  if (!checkRole) return res.status(400).send("No user found under this role");

  let token = generateAccessToken({
    username: user.username,
  });
  console.log(user.username);
  return res.send(token);
});

module.exports = router;
