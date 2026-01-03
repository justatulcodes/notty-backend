const express = require("express")
const { getAllNotes, createNote, updateNote, deleteNote } = require("../controllers/notes")

const router = express.Router()

router.route("/")
.get(getAllNotes)
.post(createNote);

router.route("/:noteId")
.patch(updateNote)
.delete(deleteNote);


module.exports = router