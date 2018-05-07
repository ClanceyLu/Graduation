import axios from 'axios'
import Cookie from 'js-cookie'
const SERVER_URL = 'http://localhost:9090'
const checkStatus = (res) => {
  if (res.status === 200) {
    return res.data
  } else {
    throw new Error()
  }
}
const checkCode = (res) => {
  if (res.code === 0) {
    return res.data
  } else {
    throw new Error()
  }
}
const apiRequest = (path, method = 'GET', data = null) => {
  const token = Cookie.get('token') || ''
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
  }
  const url = SERVER_URL + path

  return axios({
    method,
    url,
    data,
    options,
  })
  .then(checkStatus)
  .then(checkCode)
}
const api = {
  topic: {
    getList() {
      return apiRequest('/topic/list')
    }
  },
  user: {
    login(email, password) {
      const data = {
        email,
        password,
      }
      return apiRequest('/user/login', 'POST', data)
    },
    register(email, password, confirmPwd, name) {
      const data = {
        email,
        password,
        confirmPwd,
        name,
      }
      return apiRequest('/user/register', 'POST', data)
    },
    get(id) {
      return apiRequest('/user/info?id=' + id)
    }
  }
}

export default api
