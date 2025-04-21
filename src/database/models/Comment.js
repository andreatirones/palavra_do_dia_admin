const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Word',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, informe um email válido'
    ]
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reply: {
    content: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
