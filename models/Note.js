const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('note', NoteSchema);

module.exports = Note;