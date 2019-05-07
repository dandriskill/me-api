const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

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

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.status(200).send()
  }
  catch (err) {
    res.status(500).send()
  }
})

// Logout all
router.post('/logout-all', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.status(200).send()
  }
  catch (err) {
    res.status(500).send()
  }
})

module.exports = router
