

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


    } catch (err) {
        // internal server error - failure response
        return res.status(500).json(`Server error: ${err.message}`);

    }
})

module.exports = router;