const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const AuthRoute = require('./routes/AuthRoute')
const ArticleRoute = require('./routes/ArticleRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/auth', AuthRoute)
app.use('/api/articles', ArticleRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log('Hello from port: 3000')
})
