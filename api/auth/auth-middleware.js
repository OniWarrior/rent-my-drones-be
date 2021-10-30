const {JWT_SECRET} = require('../secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')

const restricted=(req,res,next)=>{
    const token = req.headers.authorization

    if(!token){
        res.status(401).json("Token required")
    }
    else{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(401).json('Token invalid')
            }
            else{
                req.decodedToken = decoded
                next()
            }
        })
    }


}

