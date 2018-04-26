const model = require('../models')

const Chat = model.getModel('Chat')

function addChat(id) {
  const query = {
    user: id,
  }
  Chat.find(query, (err, doc) => {
    if (doc.length === 0) {
      const chat = new Chat({
        user: id,
        messages: [],
      })
      chat.save(e => {
        if (err) {
          console.log(e)
        }
      })
    }
  })
}

function saveMessage(from, to, message, mode) {
  const unread = mode !== 1
  const query = { user: from }
  const messages = {
    mode,
    unread,
    content: message,
    other: to,
  }
  addChat(from)
  Chat.findOne(query, (err, doc) => {
    doc.messages.push(messages)
    doc.save(e => {
      if (e) {
        console.log(e)
      }
      return true
    })
  })
}

function sendMessage(from, to, message) {
  return new Promise((reslove, reject) => {
    const send = saveMessage(from, to, message, 1)
    const resive = saveMessage(to, from, message, 2)
    if (!send || !resive) {
      reject(new Error('save error'))
    }
    reslove(true)
  })
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
        reslove(doc.messages)
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
