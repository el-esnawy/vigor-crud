const express = require("express");
const NoteController = require("../controller/notesController");
const router = express.Router();

router.get("/notes", NoteController.getNotes);
router.post("/notes", NoteController.createNote);
router.delete("/notes/:id", NoteController.deleteNote);
router.put("/notes/:id", NoteController.updateNote);

module.exports = router;
