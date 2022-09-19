const mongoose = require("mongoose");

const schema = mongoose.Schema({
  content: { type: String, required: true },
  done: {
    type: Boolean,
    required: true,
  },
});

const noteModel = mongoose.model("Notes", schema);

module.exports = noteModel;
