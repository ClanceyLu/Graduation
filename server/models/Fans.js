const mongoose = require('mongoose')

const Fans = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fans: {
    type: [mongoose.Schema.Types.ObjectId],
  },
}

module.exports = Fans
