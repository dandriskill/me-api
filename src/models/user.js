const mongoose = require('mongoose')
const validator = require('validator')

exports.User = mongoose.model('User', {
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
})
