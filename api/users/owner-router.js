

/*
 * Author: Stephen Aranda
 * File  : owner-router.js
 * Desc  : endpoints that will be utilized by the owner user type.
 * */
const router = require('express').Router();
const { restricted } = require('../auth/auth-middleware');
const { default: jwtDecode } = require('jwt-decode');
const Owner = require('./owner-model');
const User = require('./user-model');

/*
 * /available-drones: endpoint that retrieves owner drones that are available to rent out.
 * */
router.get('/available-drones', restricted, async (req, res) => {
    try {

        // decode the token
        const decoded = jwtDecode(req.headers.authorization);

        // get the user id
        const user = await User.findByEmail(decoded.email);

        // get the owner id
        const owner = await User.findOwnerById(user.user_id);

        // get the drones available
        const drones = await Owner.getOwnerAvailableDrones(owner.owner_id);

        // check if the db queries were successful
        if (user && owner && drones) {
            // successful - send drones with success reponse.
            return res.status(200).json(drones);
        }
    } catch (err) {
        // internal server error - failure response
        return res.status(500).json(`Server error: ${err.message}`);

    }
})

/*
 * /rented-drones: endpoint that retrieves all of the owner's drones that are rented out
 * */
router.get('/rented-drones', restricted, async (req, res) => {
    try {

        // decode the token
        const decoded = jwtDecode(req.headers.authorization);

        // get the user id
        const user = await User.findByEmail(decoded.email);

        // get the owner id
        const owner = await User.findOwnerById(user.user_id);

        // get the drones available
        const drones = await Owner.getOwnerRentedDrones(owner.owner_id);

        // check if the db queries were successful
        if (user && owner && drones) {
            // successful - send drones with success reponse.
            return res.status(200).json(drones);
        }

    } catch (err) {
        // internal server error - failure response
        return res.status(500).json(`Server error: ${err.message}`);

    }
})

/*
 * /all-drones: endpoint that retrieves all of the owner's drones that are rented out or available
 * */
router.get('/all-drones', restricted, async (req, res) => {
    try {

        // decode the token
        const decoded = jwtDecode(req.headers.authorization);

        // get the user id
        const user = await User.findByEmail(decoded.email);

        // get the owner id
        const owner = await User.findOwnerById(user.user_id);

        // get the drones available
        const drones = await Owner.getOwnerDrones(owner.owner_id);

        // check if the db queries were successful
        if (user && owner && drones) {
            // successful - send drones with success reponse.
            return res.status(200).json(drones);
        }

    } catch (err) {
        // internal server error - failure response
        return res.status(500).json(`Server error: ${err.message}`);

    }
})


/*
 * /add-drone: Endpoint that allows the owner user type to add a drone
 * */
router.post('/add-drone', restricted, async (req, res) => {
    try {

        // destructure the req.body
        const {
            drone_name,
            drone_description,
            drone_cost,
            drone_url
        } = req.body


        // decode the token
        const decoded = jwtDecode(req.headers.authorization);

        // find the user id of owner
        const user = await User.findByEmail(decoded.email);

        // find the owner id of the user
        const owner = await User.findOwnerById(user.user_id);

        // is rented temp variable
        const drone_is_rented = false;

        // renter id temp var
        const renter_id = null;

        // create obj for the drone record
        const drone_record = {
            drone_name: drone_name,
            drone_description: drone_description,
            drone_cost: drone_cost,
            drone_image: drone_url,
            owner_id: owner.owner_id,
            drone_is_rented: drone_is_rented,
            renter_id: renter_id
        }

        // add the drone record to the database
        const addedDrone = await Owner.addDrone(drone_record);

        // check if the database operations succeeded
        if (user && owner && addedDrone) {
            // success response
            return res.status(201).json(`Drone successfully added!`);
        }


    } catch (err) {
        // internal server error - failure response
        return res.status(500).json(`Server error: ${err.message}`);

    }
})

module.exports = router;