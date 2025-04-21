const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true,
    unique: true
  },
  views: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  uniqueUsers: {
    type: Number,
    default: 0
  },
  devices: {
    type: Map,
    of: Number,
    default: {}
  },
  countries: {
    type: Map,
    of: Number,
    default: {}
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stat', StatSchema);
