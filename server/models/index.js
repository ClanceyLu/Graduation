const mongoose = require('mongoose')

const User = require('./User')
const Article = require('./Article')
const Topic = require('./Topic')
const Chat = require('./Chat')
const Tag = require('./Tag')
const Fans = require('./Fans')
const Follow = require('./Follow')

const models = {
  User,
  Article,
  Topic,
  Chat,
  Tag,
  Fans,
  Follow,
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
}
