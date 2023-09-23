const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  notes: String,
  userId: String,
  username: String,
});

const noteModel = mongoose.model("notes", noteSchema);
module.exports = {
  noteModel,
};
