const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

// Get all users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// Get user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send()
    res.status(200).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// Update user
router.patch('/users/:id', async (req, res) => {
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
    /* Cannot use findByIdAndUpdate() because it is a newer Mongoose operation
     * that bypasses our mongoose model middleware, which would not allow us,
     * for example, to hash our passwords during a password update on a user
     * object...
     */
    const user = await User.findById(req.params.id)
    // Iterate through dynamic updates
    updates.forEach(u => user[u] = req.body[u])
    await user.save()
    if (!user) return res.status(404).send()
    res.status(202).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).send()
    res.status(200).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
