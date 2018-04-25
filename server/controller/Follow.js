const model = require('../models')

const Follow = model.getModel('Follow')

function getFollow(_id) {
  return new Promise((reslove, reject) => {
    Follow.find({ _id }, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc)
    })
  })
}

function addFollow(_id, follow) {
  return new Promise((reslove, reject) => {
    Follow.findOne({ _id }, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.follow.push(follow)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

function removeFollow(_id, follow) {
  return new Promise((reslove, reject) => {
    Follow.findOne({ _id }, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.follow.pull(follow)
      doc.save(e => {
        if (e) {
          reject(e)
        }
        reslove()
      })
    })
  })
}

module.exports = {
  getFollow,
  addFollow,
  removeFollow,
}
