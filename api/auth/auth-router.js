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
        let hash = bcrypt.hashSync(user.password,rounds)
        user.password = hash

        const addedUser = await User.addUser(user)
        
        if(addedUser){
            res.status(201).json(addedUser)
        }
    }catch(err){
        res.status(500).json(`Server error: ${err.message}`)
    }

})

router('/Login',checkForMissingUsernamePassword,checkUsernameExists,(req,res,next)=>{
    const{username,password} = req.body
    User.findByUsername(username)
    

})

const makeToken =(user)=>{
    const payload={
        user_id:user.user_id,
        username:user.username,
        password:user.password
    }

    const option={
        expiresIn:'1d'
    }

    return jwt.sign(payload,JWT_SECRET,option)

}