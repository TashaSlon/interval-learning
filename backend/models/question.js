const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  answer: [{
    type: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 100,
    },
    text: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1000,
    },
  }],
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
  lastDate: {
    type: Number,
    default: 0,
  },
  nextDate: {
    type: Number,
    default: Date.now,
  },
  repeatCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('question', questionSchema);
