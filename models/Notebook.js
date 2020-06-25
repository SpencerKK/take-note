const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notebookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  entries: [
    {
      type: Object
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const Notebook = mongoose.model('notebook', notebookSchema);

module.exports = Notebook;