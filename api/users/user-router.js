const router = require('express').Router()
const Drone = require('../drones/drones-model')
const {default:jwtDecode} = require('jwt-decode')
const { restricted } = require('../auth/auth-middleware')

// retrieve all available drones
router.get('/available',restricted,(req,res,next)=>{
    Drone.available()
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })

})

// retrieve all drones rented by the user
router.get('/rented',restricted,(req,res,next)=>{
    const decoded = jwtDecode(req.headers.authorization)
    Drone.rented(decoded.username)
    .then(success=>{
        res.status(200).json(success)
    })
    .catch(err=>{
        res.status(500).json(`Server error: ${err.message}`)
    })
    
})

// path to rent a drone
router.put('/available/:drone_id',(req,res,next)=>{
    const{drone_id} = req.params
    const decode = jwtDecode(req.headers.authorization)
    const rented = req.body.isRented

})

