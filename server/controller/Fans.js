const model = require('../models')
const User = require('../controller/User.js')

const Fans = model.getModel('Fans')

function getFans(_id) {
  return new Promise((reslove, reject) => {
    Fans.findById(_id, (err, doc) => {
      if (err) {
        reject(err)
      }
      reslove(doc._doc)
    })
  })
}

function getFansInfo(_id) {
  return new Promise((reslove, reject) => {
    const fansList = []
    getFans(_id)
      .then(list => {
        if (list) {
          list.forEacth(i => {
            User.findById(i._id)
              .then(user => {
                fansList.push(user)
              })
              .catch(e => {
                reject(e)
              })
          })
        }
      })
      .catch(e => {
        reject(e)
      })
    reslove(fansList)
  })
}

function addFans(_id, fansId) {
  return new Promise((reslove, reject) => {
    Fans.update({ _id }, { $push: { fans: fansId } }, err => {
      if (err) {
        reject(err)
      }
      reslove(true)
    })
  })
}

function removeFans(_id, fansId) {
  return new Promise((reslove, reject) => {
    getFans(_id)
      .then(list => {
        const userIndex = list.findIndex(fansId)
        const newList = list.slice(userIndex, 1)
        Fans.update({ _id }, { fans: newList }, (err, row) => {
          if (err) {
            reject(err)
          }
          reslove(row)
        })
      })
  })
}

module.exports = {
  getFansInfo,
  addFans,
  removeFans,
}
