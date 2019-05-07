const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Checks authorization header for jwt and verifies with secret...
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'meapiforredx')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) throw new Error()
    req.user = user // Makes 'user' and 'token' available to request object in route handler...
    req.token = token
    next()
  } catch (err) {
    res.status(401).send({ error: 'Invalid credentials.' })
  }
}

module.exports = auth
