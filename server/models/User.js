const mongoose = require('mongoose')

const User = {
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    lowercase: true,
    unique: true,
  },
  role_id: {
    type: Number,
    default: 1,
  },
  avatar: {
    type: String,
    default: 'http://git.3geyue.com/avatars/45?s=290',
  },
  introduction: String,
  favorite_article: [mongoose.Schema.Types.ObjectId],
  topics: [mongoose.Schema.Types.ObjectId],
  created_at: {
    type: Date,
    default: Date.now,
  },
}

module.exports = User
