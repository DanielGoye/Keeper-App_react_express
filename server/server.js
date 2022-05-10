require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.LOCALMONGODB);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("note", noteSchema);

app
  .route("/api/notes")
  .get((req, res) => {
    Note.find((err, foundNotes) => {
      if (!err) {
        res.send(foundNotes);
      } else {
        console.log(err);
      }
    });
  })
  .post((req, res) => {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    newNote.save();
  })
  .delete((req, res) => {
    Note.findOneAndDelete({ title: req.body.title }, (err, foundItem) => {
      if (!err) {
        res.send(foundItem);
      } else {
        console.log(err);
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
