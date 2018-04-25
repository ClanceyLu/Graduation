const express = require('express')

const helper = require('./helper')
const Article = require('../controller/Article')

const Router = express.Router()

Router.get('/', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Article.getArticle(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(e)
    })
})

Router.post('/', (req, res) => {
  const { user, article } = req.body
  if (!user || !article) {
    helper.paramsError(res)
    return
  }
  Article.addArticle(user, article)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/user', (req, res) => {
  const { user } = req.query
  if (!user) {
    helper.paramsError(res)
    return
  }
  Article.getListByUser(user)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/read', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Article.readArticle(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/favorite', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Article.favoriteArticle(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/comment', (req, res) => {
  const { _id, comment } = req.body
  if (!_id || !comment) {
    helper.paramsError(res)
    return
  }
  Article.addComment(_id, comment)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/suport_comment', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Article.suportComment(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
