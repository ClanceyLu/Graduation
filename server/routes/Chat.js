const express = require('express')

const Chat = require('../controller/Chat')
const helper = require('./helper')

const Router = express.Router()

Router.get('/unread', (req, res) => {
  const { id, other } = req.query
  if (!id || !other) {
    helper.paramsError(res)
    return
  }
  Chat.getUnread(id, other)
    .then(count => {
      helper.successResponse(res, count)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/read', (req, res) => {
  const { id, other } = req.query
  if (!id || !other) {
    helper.paramsError(res)
    return
  }
  Chat.readMessage(id, other)
    .then(r => {
      if (r) {
        helper.successResponse(res, 'suc')
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.get('/message', (req, res) => {
  const { user } = req.query
  if (!user) {
    helper.paramsError(res)
    return
  }
  Chat.getMessage(user)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/send', (req, res) => {
  const { from, to, message } = req.body
  if (!from || !to || !message) {
    helper.paramsError(res)
    return
  }
  Chat.sendMessage(from, to, message)
    .then(r => {
      if (r) {
        helper.successResponse(res, r)
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
