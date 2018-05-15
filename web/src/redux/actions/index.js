export const login = user => ({
  type: 'LOGIN',
  payload: user,
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const read = () => ({
  type: 'READ',
})

export const msgList = messages => ({
  type: 'MSG_LIST',
  payload: messages
})
