"use strict";

require("dotenv").config();

var express = require("express");

var app = express();

var cors = require("cors");

var Note = require("./models/note");

var mongoose = require("mongoose");

app.use(cors());
app.use(express["static"]("build"));
app.use(express.json());
app.get("/", function (req, res) {
  res.send("<h1>Hello world!</h1>");
});
app.get("/api/notes", function _callee(req, res) {
  var notes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Note.find({}));

        case 2:
          notes = _context.sent;
          console.log(notes);
          res.json(notes);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/api/notes/:id", function (req, res, next) {
  Note.findById(req.params.id).then(function (note) {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  })["catch"](function (error) {
    return next(error);
  });
});
app.post("/api/notes", function (req, res, next) {
  var body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  var note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });
  note.save().then(function (savedNote) {
    return savedNote.toJSON();
  }).then(function (savedAndFormattedNote) {
    return res.json(savedAndFormattedNote);
  })["catch"](function (error) {
    return next(error);
  });
});
app.put("/api/notes/:id", function (req, res, next) {
  var body = req.body;
  var note = {
    content: body.content,
    important: body.important
  };
  Note.findByIdAndUpdate(req.params.id, note, {
    "new": true
  }).then(function (updatedNote) {
    res.json(updatedNote);
  })["catch"](function (error) {
    return next(error);
  });
});
app["delete"]("/api/notes/:id", function (req, res, next) {
  Note.findByIdAndRemove(req.params.id).then(function (result) {
    return res.status(204).end();
  })["catch"](function (error) {
    return next(error);
  });
});

var errorHandler = function errorHandler(error, req, res, next) {
  console.log("error message: ", error.message);

  if (error.name === "CastError") {
    return res.status(400).send({
      error: "malformatted id"
    });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({
      error: error.message
    });
  }

  next(error);
};

app.use(errorHandler);
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});