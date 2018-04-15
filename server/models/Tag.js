const mongoose = require('mongoose')

const Tag = {
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  articles: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  catead_at: {
    type: Date,
    default: Date.now,
  },
}

module.exports = Tag
