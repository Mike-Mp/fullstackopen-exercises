"use strict";

var mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

var password = process.argv[2];
var url = "mongodb+srv://fullstack:".concat(password, "@cluster0-cndmu.mongodb.net/note-app?retryWrites=true&w=majority");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});
var Note = mongoose.model("Note", noteSchema);
Note.find({
  content: {
    $regex: "html",
    $options: "i"
  }
}).then(function (result) {
  result.forEach(function (note) {
    console.log(note);
  });
  mongoose.connection.close();
});