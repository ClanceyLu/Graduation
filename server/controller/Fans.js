const model = require('../models')
const User = require('../controller/User.js')

const Fans = model.getModel('Fans')

function getFansInfo(_id) {
  return new Promise((reslove, reject) => {
    Fans.findOne({user: _id})
      .populate({
        path: 'fans',
        select: '_id name avatar',
        model: 'User',
      })
      .exec((err, doc) => {
        if (err) reject(err)
        reslove(doc)
      })
  })
}

function addFans(_id, fansId) {
  return new Promise((reslove, reject) => {
    Fans.findOne({user: _id}, (err, doc) => {
      if (err) reject(err)
      if (!doc) {
        const f = new Fans({
          user: _id,
          fans: [fansId],
        })
        f.save(e => {
          if (e) reject(e)
        })
      } else {
        Fans.update({ _id }, { $push: { fans: fansId } }, err => {
          if (err) {
            reject(err)
          }
          reslove(true)
        })
      }
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
