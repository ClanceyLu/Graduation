const mongoose = require('mongoose')

const Chat = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    requried: true,
  },
  messages: [
    {
      other: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      mode: {
        // 信息类型，1为发送，2为接收
        type: Number,
        default: 1,
      },
      content: {
        type: String,
        required: true,
      },
      unread: {
        type: Boolean,
        default: true,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}

module.exports = Chat
