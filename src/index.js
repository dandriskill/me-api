const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const api = express()
const port = process.env.PORT || 3000
const userRouter = require('./routes/user')

api.use(express.json())
api.use(userRouter)
api.use(cors())

exports.api = api.listen(port, () => {
  console.log(`Me API running on port ${port}!`)
})
