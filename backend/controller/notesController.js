const Note = require("../model/notes");

const createNote = async (req, res) => {
  try {
    console.log(req.body);
    const { content, done } = req.body;
    const note = new Note({ content, done });
    const savedNote = await note.save();
    res.status(200).json({ status: "SUCCESS", data: savedNote });
  } catch (error) {
    res.status(400).json({ status: "FAIL", error });
  }
};
const getNotes = async (req, res) => {
  try {
    const allNotes = await Note.find({});
    return res.status(200).json({ status: "SUCCESS", data: allNotes });
  } catch (error) {
    res.status(400).json({ status: "FAIL", error });
  }
};
const updateNote = async (req, res) => {
  try {
    const { content, done } = req.body;
    console.log(content, done);
    if (!req.params.id) {
      return res.status(400).json({ status: "FAIL", error: "Must provide a note ID" });
    }

    const note = await Note.findOneAndUpdate({ _id: req.params.id }, { content, done });
    console.log(note);

    res.status(200).json({ status: "SUCCESS", data: note });
  } catch (error) {
    res.status(400).json({ status: "FAIL", error });
  }
};
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: "FAIL", error: "Must provide a note ID" });
    }

    const note = await Note.findOneAndDelete({ _id: id });
    if (!note) {
      return res.status(404).json({ status: "FAIL", error: "No note found" });
    }

    return res.status(200).json({ status: "SUCCESS", data: note });
  } catch (error) {
    res.status(400).json({ status: "FAIL", error });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
