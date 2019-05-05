const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'me-api'

// Connection
mongoose.connect(`${uri}/${dbName}`, {
  useNewUrlParser: true, // Parses URLs properly
  useCreateIndex: true, // Lets Mongoose work with MongoDB
  useFindAndModify: false, // Fixes deprecation warning
})
