const mongoose = require('mongoose')

const Topic = {
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cover: {
    type: String,
    defalult: '',
  },
  summary: {
    type: String,
  },
  managers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  articles: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}

module.exports = Topic
