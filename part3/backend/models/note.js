const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: "You must provide content",
  },
  date: {
    type: Date,
    default: new Date(),
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
