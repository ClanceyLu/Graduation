const mongoose = require('mongoose')

const config = require('../config')

const User = require('./User')
const Article = require('./Article')
const Topic = require('./Topic')
const Chat = require('./Chat')
const Tag = require('./Tag')
const Fans = require('./Fans')
const Follow = require('./Follow')

mongoose.connect(config.DB_URL)
const db = mongoose.connection
db.on('connected', console.log.bind(console, 'connected success!'))
db.on('disconnected', console.log.bind(console, 'disconnected'))
db.on('error', console.error.bind(console, 'connection error:'))

const models = {
  User,
  Article,
  Topic,
  Chat,
  Tag,
  Fans,
  Follow,
}

const keys = Object.keys(models)
keys.forEach(i => {
  mongoose.model(i, new mongoose.Schema(models[i]))
})

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  },
}
