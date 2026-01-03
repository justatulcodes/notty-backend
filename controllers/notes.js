const Note = require("../models/note");
const mongoose = require("mongoose")

async function getAllNotes(req, res) {
  try {
    const UserId = req.user.id;
    const allNotesOfUser = await Note.find({
      userId: UserId,
    });
    console.log(UserId);
    return res.send({ message: "Success", notes: allNotesOfUser });
  } catch (error) {
    return res.status(500).send({ message: "Failure : " + error });
  }
}

async function createNote(req, res) {
  try {
    const userId = req.user.id;
    const { title, content, tags, isPinned } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Please enter a title of the note",
      });
    }

    await Note.create({
      title,
      content,
      tags,
      userId,
      isPinned,
    });

    return res.status(201).json({
      message: "Note created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create note",
      error: error.message,
    });
  }
}

async function updateNote(req, res) {
  try {
    const userId = req.user.id;
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const allowedFields = ["title", "content", "tags", "isPinned"];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId }, // 🔐 ownership check
      { $set: updates },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to update note",
      error: err.message
    });
  }
}



async function deleteNote(req, res) {
  try {
    const userId = req.user.id;
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    await Note.findOneAndDelete(
      { _id: noteId, userId }
    );

    return res.status(200).send({ message: "Note deleted successfully!" });
  } catch (err) {
    return res.status(500).send({ message: "Failed to update note" });
  }
}


module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
