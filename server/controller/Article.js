const model = require('../models')

const Article = model.getModel('Article')

function getList() {
  return new Promise((reslove, reject) => {
    Article.find()
      .populate({
        path: 'user',
        select: 'name avatar',
        model: 'User',
      })
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        reslove(doc)
      })
  })
}

function getArticle(_id) {
  return new Promise((reslove, reject) => {
    Article.findById(_id)
      .populate({
        path: 'user',
        select: 'name avatar',
        model: 'User',
      })
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        reslove(doc)
      })
  })
}

function getListByUser(user) {
  return new Promise((reslove, reject) => {
    const query = { user }
    Article.find(query, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function addArticle(article) {
  return new Promise((reslove, reject) => {
    const newArticle = new Article({
      ...article,
    })
    newArticle.save(err => {
      if (err) {
        reject(err)
      }
      reslove()
    })
  })
}

function readArticle(_id) {
  return new Promise((reslove, reject) => {
    Article.findByIdAndUpdate(_id, { $inc: { read_count: 1 } }, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function favoriteArticle(_id) {
  return new Promise((reslove, reject) => {
    Article.findByIdAndUpdate(_id, { $inc: { favorite_count: 1 } }, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function addComment(_id, comment) {
  return new Promise((reslove, reject) => {
    Article.findOne({ _id }, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.comments.push(comment)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

function suportComment(_id) {
  return new Promise((reslove, reject) => {
    const query = {
      'comments._id': _id,
    }
    Article.findOneAndUpdate(query, { $inc: { 'comments.$.support_count': 1 } }, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

module.exports = {
  getArticle,
  getListByUser,
  addArticle,
  readArticle,
  favoriteArticle,
  addComment,
  suportComment,
  getList,
}
