const model = require('../models')

const Tag = model.getModel('Tag')

function getTags() {
  return new Promise((reslove, reject) => {
    Tag.find({}, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function addTag(tag) {
  return new Promise((reslove, reject) => {
    const newTag = new Tag({
      ...tag,
    })
    newTag.save(e => {
      if (e) {
        reject(e)
      }
      reslove()
    })
  })
}

function addArticleToTag(article, tag) {
  return new Promise((reslove, reject) => {
    const query = { _id: tag }
    Tag.findOne(query, (err, doc) => {
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

function getArticleByTag(_id) {
  return new Promise((reslove, reject) => {
    Tag.findOne({ _id })
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

module.exports = {
  getTags,
  addTag,
  addArticleToTag,
  getArticleByTag,
}
