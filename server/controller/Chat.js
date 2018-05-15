const model = require('../models')

const Chat = model.getModel('Chat')

function addChat(id) {
  return new Promise((reslove, reject) => {
    const query = {
      user: id,
    }
    Chat.find(query, (err, doc) => {
      console.log(doc.length)
      if (doc.length === 0) {
        const chat = new Chat({
          user: id,
          messages: [],
        })
        chat.save(e => {
          if (err) {
            reject(err)
          }
          reslove()
        })
      } else {
        reslove()
      }
    })
  })
}

function saveMessage(from, to, message, mode) {
  return new Promise((reslove, reject) => {
    const unread = mode !== 1
    const query = { user: from }
    const messages = {
      mode,
      unread,
      content: message,
      other: to,
    }
    addChat(from)
      .then(res => {
        Chat.findOne(query, (err, doc) => {
          doc.messages.push(messages)
          console.log(messages)
          doc.save(e => {
            if (e) {
              throw new Error('save er')
            }
            reslove(true)
          })
        })
      })
      .catch(e => {
        console.log('err', e)
      })
    })
}

async function sendMessage(from, to, message) {
    const send = await saveMessage(from, to, message, 1)
    const resive = await saveMessage(to, from, message, 2)
    if (!send || !resive) {
      throw new Error('save err')
    }
    return true
}

function getMessage(user) {
  return new Promise((reslove, reject) => {
    const query = { user }
    Chat.findOne(query)
      .populate({
        path: 'messages.other',
        model: 'User',
        select: 'name avatar',
      })
      .exec((err, doc) => {
        if (err) {
          reject(err)
        }
        if (doc) reslove(doc.messages)
      })
  })
}

function readMessage(id, other) {
  return new Promise((reslove, reject) => {
    const query = {
      user: id,
      'messages.other': other,
    }
    Chat.update(query, { $set: { 'messages.$[i].unread': false } }, { arrayFilters: [{ 'i.unread': true }] }, (err, row) => {
      if (err) {
        reject(err)
      }
      reslove(row)
    })
  })
}

function getUnread(id, other) {
  return new Promise((reslove, reject) => {
    const query = {
      user: id,
    }
    let count = 0
    Chat.findOne(query, (err, doc) => {
      if (err) {
        reject(err)
      }
      doc.messages.forEach(i => {
        if (i.other.toString() === other && i.unread) {
          count += 1
        }
      })
      reslove(count)
    })
  })
}

module.exports = {
  sendMessage,
  getMessage,
  readMessage,
  getUnread,
}
