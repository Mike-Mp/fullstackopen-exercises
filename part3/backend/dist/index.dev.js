"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var express = require("express");

var app = express();
app.use(express.json());
var notes = [{
  id: 1,
  content: "HTML is easy",
  date: "2019-05-30T17:30:31.098Z",
  important: true
}, {
  id: 2,
  content: "Browser can execute only Javascript",
  date: "2019-05-30T18:39:34.091Z",
  important: false
}, {
  id: 3,
  content: "GET and POST are the most important methods of HTTP protocol",
  date: "2019-05-30T19:20:14.298Z",
  important: true
}];
app.get("/", function (req, res) {
  res.send("<h1>Hello world!</h1>");
});
app.get("/api/notes", function (req, res) {
  res.json(notes);
});
app.get("/api/notes/:id", function (req, res) {
  var id = Number(req.params.id);
  var note = notes.find(function (n) {
    return n.id === id;
  });

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.post("/api/notes", function (req, res) {
  var maxId = notes.length > 0 ? Math.max.apply(Math, _toConsumableArray(notes.map(function (n) {
    return n.id;
  }))) : 0;
  var body = req.body;

  if (!body.content) {
    res.status(400).json({
      error: "content missing"
    });
  }

  var note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: maxId + 1
  };
  notes = notes.concat(note);
  res.json(note);
});
app["delete"]("/api/notes/:id", function (req, res) {
  var id = Number(req.params.id);
  notes = notes.filter(function (n) {
    return n.id !== id;
  });
  res.status(204).end();
});
var PORT = 3001;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});