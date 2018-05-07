const initState = {
  name: '',
  avatar: '',
  email: '',
  _id: '',
  unread: 0,
}

const user =  (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload }
    case 'LOGOUT':
      return initState
    default:
      return state
  }
}

export default user
