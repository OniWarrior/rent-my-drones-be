const router = require('express').Router()
const Drone = require('../drones/drones-model')
const {default:jwtDecode} = require('jwt-decode')
const { restricted } = require('../auth/auth-middleware')


router('/available',restricted,(req,res,next)=>{
    
})