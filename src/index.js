const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('./db/mongoose')

const api = express()
const port = process.env.PORT || 3001
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

api.use((req, res, next) => {
  if (req.path.includes('/users')) {
    res.status(400).send('Auth is required!')
  }
  next()
})

api.use(express.json())
api.use(userRouter)
api.use(authRouter)
api.use(cors())

api.listen(port, () => {
  console.log(`Me API running on port ${port}!`)
})
