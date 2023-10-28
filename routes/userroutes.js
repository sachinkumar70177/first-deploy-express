const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/usermodel");
const { auth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 5);
    const user = new UserModel({ username, email, password: hash });
    await user.save();
    res.status(200).json("Registered");
  } catch (err) {
    res.json("Error in registering the user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            "masai"
          );
          res.json({ msg: "Login Successful", token: token });
        } else {
          res.json("Wrong Credentials");
        }
      });
    } else {
      res.json("Wrong Credentials");
    }
  } catch (err) {
    res.json("Something went wrong");
    console.log(err);
  }
});

userRouter.get("/movie", auth, (req, res) => {
  res.json("movie data......");
});

module.exports = {
  userRouter,
};
