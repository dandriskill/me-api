const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (!validator.isAlpha(val, 'en-US')) {
        throw new Error('Name can only contain letters.')
      }
      if (val.length > 50) {
        throw new Error('Name is too long.')
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('Invalid email')
      }
      if (val.length > 50) {
        throw new Error('Email too long')
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(val) {
      if (val.length <= 6) {
        throw new Error('Password too short')
      }
      if (val.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word "password"')
      }
    },
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
    validate(val) {
      if (val < 18) {
        throw new Error('You are too young to sign up')
      }
    },
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (!validator.isAlpha(val, 'en-US')) {
        throw new Error('Gender can only contain letters.')
      }
      if (val.length > 50) {
        throw new Error('Gender name is too long.')
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
})

// Generates auth token and concatenates to user's tokens array...
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString() },
    'meapiforredx',
    { expiresIn: '7 days' }
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Removes password and tokens before response JSON object is sent client side...
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

// Finds user with email/password credentials...
userSchema.statics.findByCredentials = async (email, password) => {
  const err = 'Unable to log in.'
  const user = await User.findOne({ email })
  if (!user) throw new Error(err)
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error(err)
  return user
}

// Mongoose hook that ensures the password property is hashed before any save()...
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
