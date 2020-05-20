require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Note = require("./models/note");
const mongoose = require("mongoose");

app.use(cors());

app.use(express.static("build"));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find({});
  console.log(notes);
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => {
    res.json(note);
  });
});

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
