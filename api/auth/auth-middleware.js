const {JWT_SECRET} = require('../secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')

const restricted=(req,res,next)=>{
    const token = req.headers.authorization
    

}

