const model = require('../models')

const Follow = model.getModel('Follow')

function getFollow(_id) {
  return new Promise((reslove, reject) => {
    Follow.findOne({user: _id})
      .populate({
        path: 'follow',
        select: '_id name avatar',
        model: 'User',
      })
      .exec((err, doc) => {
        if (err) reject(err)
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
      if (!doc) {
        console.log('no foll')
        const foll = new Follow({
          user: _id,
          follow: [follow]
        })
        foll.save(e => {
          if (e) reject(e)
          reslove()
        })
      } else {
        doc.follow.push(follow)
        doc.save(e => {
          if (e) {
            reject(e)
          }
          reslove()
        })
      }
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
