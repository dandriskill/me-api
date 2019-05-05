const express = require('express')
const router = new express.Router()
const { User } = require('../models/user')

// Create new user
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  }
  catch (err) {
    res.status(400).send(err)
  }
})

// Get all users
router.get('/users', async (req, res) => {
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
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!user) return res.status(404).send()
    res.status(202).send(user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

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
