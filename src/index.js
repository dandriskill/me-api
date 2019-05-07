const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('./db/mongoose')

const api = express()
const port = process.env.PORT || 3001
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

api.get('/', (req, res) => {
  res.send('API is working!')
})

api.use(cors())
api.use(express.json())
api.use(express.urlencoded({ extended: false }))
api.use(authRouter)
api.use(userRouter)

api.listen(port, () => {
  console.log(`Me API running on port ${port}!`)
})
