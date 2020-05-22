"use strict";

var mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
var url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("connected to mongodb");
})["catch"](function (err) {
  console.log("error connecting to mongodb", err.message);
});
var noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: "You must provide content"
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
});
noteSchema.set("toJSON", {
  transform: function transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});
module.exports = mongoose.model("Note", noteSchema);