

/*
 * Author: Stephen Aranda
 * File  : owner-router.js
 * Desc  : endpoints that will be utilized by the owner user type.
 * */
const router = require('express').Router();
import { restricted } from '../auth/auth-middleware';
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

    }
})

export default router;