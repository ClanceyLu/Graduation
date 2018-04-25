const mongoose = require('mongoose')

const Article = {
  title: {
    type: String,
    requied: true,
  },
  publish: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  favorite_count: {
    type: Number,
    default: 0,
  },
  read_count: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
  },
  category: {
    type: String,
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    support_count: {
      type: Number,
      default: 0,
    },
    reply: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  }],
}

module.exports = Article
