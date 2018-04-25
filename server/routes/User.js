const express = require('express')
const jwt = require('jwt-simple')
const moment = require('moment')

const helper = require('./helper')
const config = require('../config')
const User = require('../controller/User.js')

const Router = express.Router()

/**
 * 登录
 */
Router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    helper.paramsError(res)
    return
  }
  User.authUser({ email, password })
    .then(doc => {
      const token = jwt.encode({
        iss: doc._id,
        exp: moment().add(1, 'days').valueOf(),
      }, config.TOKEN_SECRET)
      const data = {
        token,
        user: doc,
      }
      helper.successResponse(res, data)
    })
    .catch(err => {
      helper.errorResponse(res, err)
    })
})

/**
 * 注册
 *  @param email password confirmpasswod
 */
Router.post('/register', (req, res) => {
  const { email, password, confirmPwd } = req.body
  if (!email || !password || !confirmPwd) {
    helper.paramsError(res)
  } else {
    if (password !== confirmPwd) {
      helper.errorResponse(res, '密码两次输入不一致')
      return
    }
    const user = {
      email,
      password,
    }
    User.addUser(user)
      .then(doc => {
        helper.successResponse(res, doc)
      })
      .catch(e => {
        helper.errorResponse(res, e)
      })
  }
})

/**
 * 获取用户信息
 * @param id
 */
Router.get('/info', (req, res) => {
  const { _id } = req.query
  console.log('req', req.query)
  if (!_id) {
    helper.paramsError(res)
    return
  }
  User.findById(_id)
    .then(doc => {
      if (doc) {
        helper.successResponse(res, doc)
      } else {
        helper.errorResponse(res, '用户不存在')
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

/**
 * 修改信息
 */
Router.post('/edit', (req, res) => {
  const {
    _id,
    name,
    avatar,
  } = req.body
  User.editUser({ _id, name, avatar })
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
 * 修改密码
 * @param _id, oldPwd, newPwd
 */
Router.post('/resetpwd', (req, res) => {
  const {
    _id,
    oldPwd,
    newPwd,
  } = req.body
  User.resetPassword({ _id, oldPwd, newPwd })
    .then(doc => {
      if (doc) {
        helper.successResponse(res, doc)
      } else {
        helper.errorResponse(res, '用户不存在')
      }
    })
    .catch(e => {
      helper.errorResponse(res, e)
    })
})

module.exports = Router
