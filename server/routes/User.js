const express = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')

const model = require('../models')
const config = require('../config')

const Router = express.Router()
const User = model.getModel('User')

/**
 *
 */
Router.post('/login', (rea, res) => {
  const { name, password } = req.body
  User.findOne(query, (err, doc) => {
    if (err) {
      helper.errorResponse(res, err)
    } else if (doc) {
      const token = jwt.encode({
        iss: doc._id,
        exp: moment().add('days', 1).valueOf(),
      }, config.TOKEN_SECRET)
      const data = {
        token,
        username: doc.username,
      }
      helper.successResponse(res, data)
    }
  })
})

module.exports = Router
