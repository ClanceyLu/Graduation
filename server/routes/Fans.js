const express = require('express')

const helper = require('./helper')
const Fans = require('../controller/Fans')

const Router = express.Router()

Router.get('/', (req, res) => {
  const { _id } = req.query
  if (!_id) {
    helper.paramsError(res)
  }
  Fans.getFansInfo(_id)
    .then(list => {
      helper.successResponse(res, list)
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

/**
 * 新增fans
 * @praams _id, fansId
 */
Router.post('/add', (req, res) => {
  const { _id, fansId } = req.body
  Fans.addFans(_id, fansId)
    .then(doc => {
      if (doc) {
        helper.successResponse(res, doc)
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

/**
 * 删除fans
 * @params _id, fansId
 */
Router.post('/del', (req, res) => {
  const { _id, fansId } = req.body
  Fans.removeFans(_id, fansId)
    .then(doc => {
      if (doc) {
        helper.successResponse(res, doc)
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
