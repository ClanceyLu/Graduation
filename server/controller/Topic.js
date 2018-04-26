const model = require('../models')

const Topic = model.getModel('Topic')

function addTopic(topic) {
  return new Promise((reslove, reject) => {
    const newTopic = new Topic({
      ...topic,
    })
    newTopic.save(e => {
      if (e) {
        reject(e)
      }
      reslove()
    })
  })
}

function getTopics() {
  return new Promise((reslove, reject) => {
    Topic.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function getTopic(_id) {
  return new Promise((reslove, reject) => {
    Topic.findOneById(_id)
      .populate({
        path: 'creator',
        model: 'User',
        select: 'name avatar',
      })
      .populate({
        path: 'managers',
        model: 'User',
        select: 'name avatar',
      })
      .populate({
        path: 'members',
        model: 'User',
        select: 'name avatar',
      })
      .populate({
        path: 'articles',
        model: 'Article',
      })
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        reslove(doc)
      })
  })
}

function addArticle(article, topic) {
  return new Promise((reslove, reject) => {
    const query = { _id: topic }
    Topic.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.articles.push(article)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

function addManager(user, topic) {
  return new Promise((reslove, reject) => {
    const query = { _id: topic }
    Topic.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.managers.push(user)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

function addMember(user, topic) {
  return new Promise((reslove, reject) => {
    const query = { _id: topic }
    Topic.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.members.push(user)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

module.exports = {
  addTopic,
  getTopics,
  getTopic,
  addArticle,
  addManager,
  addMember,
}
