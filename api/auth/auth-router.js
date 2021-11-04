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
const User = require('../users/user-model')

router('/Signup',checkUsernameFree,checkForMissingUsernamePassword,async(req,res,next)=>{
    try{
        let user = req.body
        let rounds = parseInt(process.env.ROUNDS)

    }catch(err){

    }

})