const express = require('express')
const bodyParser = require('body-parser')

const Auth = require('./middleware/Auth')
const userRouter = require('./routes/User')
const fansRouter = require('./routes/Fans')
const chatRouter = require('./routes/Chat')
const articleRouter = require('./routes/Article')
const followRouter = require('./routes/Follow')
const tagRouter = require('./routes/Tag')
const topicRouter = require('./routes/Topic')
const uploadRouter = require('./routes/Upload')

const app = express()

app.use(bodyParser.json())

// 允许跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,content-length,Authorization,Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '3.2.1')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(Auth)
app.use('/user', userRouter)
app.use('/fans', fansRouter)
app.use('/chat', chatRouter)
app.use('/article', articleRouter)
app.use('/follow', followRouter)
app.use('/tag', tagRouter)
app.use('topic', topicRouter)
app.use('/upload', uploadRouter)

app.listen(9090, () => {
  console.log('App is running at http://127.0.0.1:9090')
})
