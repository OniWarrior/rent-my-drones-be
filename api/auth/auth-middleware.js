const {JWT_SECRET} = require('../secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')

// Verifies json web token in user's authorization header
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


// checks if the username exists when user is signing in.
const checkUsernameExists=(req,res,next)=>{
    const {username} = req.body

    User.findByUsername(username)
    .then(rows=>{
        if(rows.length){
            req.userData = rows[0]
            next()
        }
        else{
            res.status(401).json("Invalid credentials")
        }
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
}


// checks if username is available when registering new account.
const checkUsernameFree=(req,res,next)=>{
    const {username} = req.body

    User.findByUsername(username)
    .then(rows=>{
        if(rows.username){
            res.status(422).json("Username already taken")
        }
        else{
            next()
        }
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
}

// checks whether or not there's a missing or undefined username/password when signing in
// or registering.
const checkForMissingUsernamePassword=(req,res,next)=>{
    const {username,password} = req.body

    if(!username || username==="" ||
       !password || password ===""){
           res.status(400).json("Username and password are required")
    }
    else{
        next()
    }
}

module.exports={
    checkForMissingUsernamePassword,
    checkUsernameExists,
    checkUsernameFree,
    restricted
}

