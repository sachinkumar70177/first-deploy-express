const express = require("express");
const { connection } = require("./db");
require('dotenv').config();


// const { auth } = require("./Middleware/auth.middleware");
const { userRouter } = require("./routes/userroutes");
const { noteRouter } = require("./routes/postroutes");

const app = express();
app.use(express.json());
// const {connection}=require("./db")
app.get("/", (req, res) => {
 
  try {
    res.status(200).send("hey");
  } catch (error) {
    res.status(400).send({ msg: "bhaago" });
  }
});



app.use("/user",userRouter)
app.use("/note",noteRouter)
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("conncted to db");
    console.log("connected to the server");
  } catch (error) {
    console.log(error);
  }
});
