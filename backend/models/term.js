const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
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

module.exports = mongoose.model('term', termSchema);
