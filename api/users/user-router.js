const router = require('express').Router()
const Drone = require('../drones/drones-model')
const {default:jwtDecode} = require('jwt-decode')
const { restricted } = require('../auth/auth-middleware')

// retrieve all available drones
router('/available',restricted,(req,res,next)=>{
    Drone.available()
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })

})