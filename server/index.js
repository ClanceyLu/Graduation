const express = require('express')
const bodyParser = require('body-parser')

const Auth = require('./middleware/Auth')
const User = require('./routes/User')

const app = express()

app.use(bodyParser.json())
app.use(Auth)
app.use('/user', User)

app.listen(9090, () => {
  console.log('App is running at http://127.0.0.1:9090')
})
