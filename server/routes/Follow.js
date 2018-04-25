const express = require('express')

const helper = require('./helper')
const Follow = require('../controller/Follow')

const Router = express.Router()

Router.get('/', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
    return
  }
  Follow.getFollow(_id)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/add', (req, res) => {
  const { _id, follow } = req.body
  if (!_id || !follow) {
    helper.paramsError(res)
    return
  }
  Follow.addFollow(_id, follow)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

Router.post('/del', (req, res) => {
  const { _id, follow } = req.body
  if (!_id || !follow) {
    helper.paramsError(res)
    return
  }
  Follow.removeFollow(_id, follow)
    .then(doc => {
      helper.successResponse(res, doc)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
