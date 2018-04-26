const express = require('express')

const helper = require('./helper')
const Tag = require('../controller/Tag')

const Router = express.Router()

Router.get('/', (req, res) => {
  Tag.getTags()
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/', (req, res) => {
  const { tag } = req.body
  if (!tag) {
    helper.paramsError(res)
    return
  }
  Tag.addTag(tag)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/add_article', (req, res) => {
  const { article, tag } = req.body
  if (!article || !tag) {
    helper.paramsError(res)
    return
  }
  Tag.addArticleToTag(article, tag)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/article', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.parmasError(res)
    return
  }
  Tag.getArticleByTag(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
