const express = require("express");
// const { connection } = require("./db");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/usermodel");
const { auth } = require("../middleware/auth");

// const { auth } = require("./Middleware/auth.middleware");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 5);
    const user = new UserModel({ username, email, password: hash });
    await user.save();
    res.json("Registered");
  } catch (err) {
    res.json("Error in registering the user");
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id, username: user[0].username },
            "masai"
          );
          res.json({ msg: "Login Successfull", token: token });
        } else {
          res.json("Wrong Credntials");
        }
      });
    } else {
      res.json("Wrong Credntials");
    }
  } catch (err) {
    res.json("Something went wrong");
    console.log(err);
  }
});
userRouter.get("/mo", auth, (req, res) => {
  res.json("movie data......");
});

module.exports = {
  userRouter,
};




