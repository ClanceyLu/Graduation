const express = require('express')

const helper = require('./helper')
const Topic = require('../controller/Topic')

const Router = express.Router()

Router.get('/', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Topic.getTopic(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorRespones(res, e)
    })
})

Router.post('/add', (req, res) => {
  const { topic } = req.body
  if (!topic) {
    helper.paramsError(res)
    return
  }
  Topic.addTopic(topic)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/list', (req, res) => {
  Topic.getTopics()
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/article', (req, res) => {
  const { article, topic } = req.body
  if (!article || !topic) {
    helper.paramsError(res)
    return
  }
  Topic.addArticle(article, topic)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.successresponse(res, e)
    })
})

Router.post('/manager', (req, res) => {
  const { user, topic } = req.body
  if (!user || !topic) {
    helper.parmasError(res)
    return
  }
  Topic.addManager(user, topic)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/member', (req, res) => {
  const { user, topic } = req.body
  if (!user || !topic) {
    helper.paramsError(res)
    return
  }
  Topic.addMember(user, topic)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
