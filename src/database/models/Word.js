const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  word: {
    pt: {
      type: String,
      required: [true, 'Palavra em português é obrigatória'],
      trim: true
    },
    en: {
      type: String,
      trim: true
    }
  },
  quote: {
    pt: {
      type: String,
      required: [true, 'Citação em português é obrigatória'],
      trim: true
    },
    en: {
      type: String,
      trim: true
    }
  },
  reference: {
    pt: {
      type: String,
      trim: true
    },
    en: {
      type: String,
      trim: true
    }
  },
  reflection: {
    pt: {
      type: String,
      required: [true, 'Reflexão em português é obrigatória'],
      trim: true
    },
    en: {
      type: String,
      trim: true
    }
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'published'],
    default: 'draft'
  },
  language: {
    type: String,
    enum: ['pt', 'en'],
    default: 'pt'
  },
  images: {
    word: {
      type: String
    },
    reflection: {
      type: String
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('Word', WordSchema);
