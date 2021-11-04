const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../secrets/secret')
const { checkUsernameFree } = require('./auth-middleware')
const {
    checkUsernameExists,
    checkUsernameFree,
    checkForMissingUsernamePassword
} = require('./auth-middleware')
