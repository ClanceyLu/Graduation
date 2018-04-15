const mongoose = require('mongoose')

const Follow = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  follow: {
    type: [mongoose.Schema.Types.ObjectId],
  },
}

module.exports = Follow
