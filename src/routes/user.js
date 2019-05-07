const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// Get user
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

// Update user
router.patch('/users/me', auth, async (req, res) => {
  const availableUpdates = [
    'firstName',
    'email',
    'password',
    'age',
  ]
  const updates = Object.keys(req.body)
  const isValid = updates.every(u => availableUpdates.includes(u))
  if (!isValid) return res.status(400).send({ error: 'Invalid update fields.' })
  try {
    const { user } = req
    // Iterate through dynamic updates
    updates.forEach(u => user[u] = req.body[u])
    await user.save()
    res.status(202).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// Delete user
router.delete('/users/me', auth, async ({ user }, res) => {
  try {
    await user.remove()
    res.status(200).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
