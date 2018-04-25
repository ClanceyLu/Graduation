const jwt = require('jwt-simple')
const models = require('../models')

const config = require('../config')

const User = models.getModel('User')

function Auth(req, res, next) {
  // TODO: next 不需要验证的路由
  const { url } = req
  if (url !== '/user/login/aaa') {
    next()
  } else {
    const token = req.headers['x-access-token']
    if (token) {
      const decode = jwt.decode(token, config.TOKEN_SECRET)
      if (token.exp <= Date.now()) {
        res.sendStatus(401)
      } else {
        User.findOne({ _id: decode.iss }, (err, doc) => {
          if (doc) {
            next()
          } else {
            res.sendStatus(401)
          }
        })
      }
    } else {
      res.sendStatus(401)
    }
  }
}

module.exports = Auth
