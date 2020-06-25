//@ts-nocheck
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Note = require('../../models/Note');
const User = require('../../models/User');
const authMid = require('../../middleware/authMid');

//  POST
//  api/note
//  Create new note
//  Private
router.post(
  '/',
  [
    authMid,
    [check('title', 'A title is required on a note...').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content } = req.body;
      let user = req.user.id;

      let note = await Note.findOne({ title: title });
      let userModel = await User.findById(user);

      if (note && note.user.toString() === user) {
        // This is where the update happens in the note is found.
        note = await Note.findOneAndUpdate(
          { title: title },
          { $set: { "title": title, "content": content } },
          { $new: true },
        );
        await note.save();
        return res.json(note);
      } else {
        const newNote = new Note({
          title,
          content,
          user,
        });
        note = await newNote.save();
        userModel.notes.unshift(newNote);
        await userModel.save();
        res.json(note);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//  GET
//  api/note/myNotes
//  Get logged in user's notes
//  Private
router.get('/myNotes', authMid, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  DELETE
//  api/note
//  Delete
//  Private
router.delete('/:note_id', authMid, async (req, res) => {
  try {
    let userModel = await User.findById(req.user.id);
    const note = await Note.findById(req.params.note_id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    // get remove index
    const removeIndex = userModel.notes
      .map((note) => note._id.toString())
      .indexOf(req.params.note_id);
    userModel.notes.splice(removeIndex, 1);
    await userModel.save();

    res.json(userModel);

    await note.remove();
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
