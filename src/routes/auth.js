const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// Create new user
router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await user.save()
    res.status(201).send({ user, token })
  }
  catch (err) {
    res.status(400).send(err)
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.status(200).send({ user, token })
  }
  catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
