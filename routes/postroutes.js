const express = require("express");
const { auth } = require("../middleware/auth");
const { noteModel } = require("../model/postmodel");

const noteRouter = express.Router();

noteRouter.post("/create", auth, async (req, res) => {
  try {
    const payload = req.body;
    const note = new noteModel(payload);
    await note.save();
    res.send("created");
  } catch (error) {
    res.send(error);
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const usernotes = await noteModel.find({ username: req.body.username });
    console.log(usernotes);
    res.send(usernotes);
  } catch (error) {
    res.send({error:error})
  }
});

noteRouter.patch("/update/:id",auth,async(req,res)=>{
  try {
    const { id } = req.params; 
    const { title, notes } = req.body; 

    const note = await noteModel.findById(id);
console.log(note.username,req.body.username)
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.username !== req.body.username) {
      return res.status(403).send("You do not have permission to update this note");
    }

    if (title) {
      note.title = title;
    }
    if (notes) {
      note.notes = notes;
    }

    await note.save();

    res.send("Note updated successfully");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

})
module.exports = {
  noteRouter,
};
