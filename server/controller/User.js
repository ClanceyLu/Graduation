const model = require('../models')

const User = model.getModel('User')

const filter = {
  password: 0,
  created_at: 0,
  favorite_article: 0,
  topics: 0,
  __v: 0,
}

function addNotNullQuery(obj) {
  const keys = Object.keys(obj)
  const query = {}
  keys.forEach(i => {
    if (obj[i]) {
      query[i] = obj[i]
    }
  })
  return query
}

function findUser(query) {
  return new Promise((reslove, reject) => {
    User.findOne(query, filter, (err, doc) => {
      if (err) reject(err)
      reslove(doc)
    })
  })
}

function findById(_id) {
  return new Promise((reslove, reject) => {
    findUser({ _id })
      .then(doc => {
        reslove(doc)
      })
      .catch(e => {
        reject(e)
      })
  })
}

function editUser({ _id, name, avatar, introduction }) {
  return new Promise((reslove, reject) => {
    User.findByIdAndUpdate(_id, { name, avatar, introduction }, filter, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

/**
 * 修改密码
 */
function resetPassword({ _id, oldPwd, newPwd }) {
  return new Promise((reslove, reject) => {
    const query = {
      _id,
      password: oldPwd,
    }
    const updated = {
      password: newPwd,
    }
    User.findOneAndUpdate(query, updated, filter, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function addUser(user) {
  return new Promise((reslove, reject) => {
    findUser(user)
      .then(res => {
        if (res) {
          reslove(null)
        }
        const newUser = new User({
          ...user,
        })
        newUser.save((err, doc) => {
          if (err) reject(err)
          reslove(doc)
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

function authUser({ _id, email, name, password }) {
  return new Promise((reslove, reject) => {
    if (!password) {
      reject(new Error('密码不能为空'))
    }
    const params = {
      _id,
      email,
      name,
      password,
    }
    const query = addNotNullQuery(params)
    findUser(query)
      .then(doc => {
        reslove(doc)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getList() {
  return new Promise((reslove, reject) => {
    User.find({}, (err, doc) => {
      if (err) reject(err)
      reslove(doc)
    })
  })
}

module.exports = {
  findById,
  authUser,
  addUser,
  editUser,
  resetPassword,
  getList,
}
