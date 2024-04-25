const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  answer: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
  },
  term: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'term',
    required: true,
  },
  /* chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chapter',
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic',
    required: true,
  }, */
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  /* questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question',
    default: [],
  }], */
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('question', questionSchema);
