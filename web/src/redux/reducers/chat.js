const initState = {
  messages: {},
}

const chat = (state = initState, action) => {
  switch (action.type) {
    case 'READ':
      const msg = state.messages
      msg.unread[action.payload.user].unread = 0
      return {message: {...msg}}
    case 'MSG_LIST':
      return {...action.payload}
    default:
      return state
  }
}

export default chat
