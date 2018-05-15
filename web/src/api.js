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
    },
    add(topic) {
      return apiRequest('/topic/add', 'POST', {topic})
    },
    get(id) {
      return apiRequest('/topic?id=' + id)
    },
    pushArticle(article, topic) {
      const data = {
        article,
        topic,
      }
      return apiRequest('/topic/article', 'POST', data)
    },
    addManger(user, topic) {
      const data = {
        user,
        topic,
      }
      return apiRequest('/topic/manger', 'POST', data)
    },
    addMember(user, topic) {
      const data = {
        user,
        topic,
      }
      return apiRequest('/topic/member', 'POST', data)
    },
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
      return apiRequest('/user/info?_id=' + id)
    },
    edit(user) {
      return apiRequest('/user/edit', 'POST', user)
    },
    getList() {
      return apiRequest('/user/list')
    }
  },
  fans: {
    getList(id) {
      return apiRequest('/fans?_id=' + id)
    },
    add(user, fans) {
      const data = {
        _id: user,
        fansId: fans,
      }
      return apiRequest('/fans/add', 'POST', data)
    },
    del(user, fans) {
      const data = {
        _id: user,
        fansId: fans,
      }
      return apiRequest('/fans/del', 'POST', data)
    }
  },
  follow: {
    getList(id) {
      return apiRequest('/follow?_id=' + id)
    },
    add(id, follow) {
      const data = {
        follow,
        _id: id,
      }
      return apiRequest('/follow/add', 'POST', data)
    },
    del(id, follow) {
      const data = {
        follow,
        _id: id,
      }
      return apiRequest('/follow/del', 'POST', data)
    },
  },
  article: {
    get(id) {
      return apiRequest('/article?_id=' + id)
    },
    getList() {
      return apiRequest('/article/list')
    },
    getUserList(id) {
      return apiRequest('/article/user?user=' + id)
    },
    add(article) {
      const data = {
        article,
      }
      return apiRequest('/article', 'POST', data)
    },
    read(id) {
      return apiRequest('/article/read?_id=' + id)
    },
    favorite(user, article) {
      return apiRequest(`/article/favorite?user=${user}&article=${article}`)
    },
    comment(article, comment) {
      const data = {
        comment,
        _id: article,
      }
      return apiRequest('/article/comment', 'POST', data)
    },
    suportComment(user, comment) {
      return apiRequest(`/article/suport_comment?user=${user}&comment=${comment}`)
    }
  },
  upload(data) {
    return apiRequest('/upload', 'POST', data)
  },
  chat: {
    getList(user) {
      return apiRequest('/chat/message?user=' + user)
    },
    read(id, other) {
      return apiRequest(`/chat/read?id=${id}&other=${other}`)
    },
  },
}

export default api
