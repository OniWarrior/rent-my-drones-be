const router = require('express').Router();
const Drone = require('../drones/drones-model');
const Renter = require('../users/renter-model');
const User = require('../users/user-model');
const { default: jwtDecode } = require('jwt-decode');
const { restricted } = require('../auth/auth-middleware');

/*
 * /available : Endpoint that retrieves all available drones for renter
 *            : or anyone not logged in to the app
 * 
 */
router.get('/available', async (req, res) => {
    try {

        // retrieve all available drones
        const drones = await Drone.available();

        // check if retrieval was successful
        if (drones) {
            // successful return of drones send success response with drones
            return res.status(200).json({ drones: drones });
        }

    } catch (err) {

        // send internal error failure response
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }
})

/*
 * /rented: Endpoint that retrieves all the currently rented drones of the renter
 */
router.get('/rented', restricted, async (req, res) => {
    try {
        // decode token
        const decoded = jwtDecode(req.headers.authorization);

        // retrieve user id of user
        const user = await User.findByEmail(decoded.email);

        // retrieve renter id of user
        const renter = await Renter.getRenterId(user.user_id);

        // retrieve the drones rented by user
        const rented = await Drone.rented(renter.renter_id);

        //check if the retrieval was successful
        if (user && renter && rented) {

            // send success response
            return res.status(200).json({ rented: rented });
        }

    } catch (err) {
        // send failure internal server response
        return res.status(500).json({ message: `Server error: ${err.message}` })
    }

})

/*
 * /available/:drone_id: endpoint that uses drone id to rent drone for renter
 * 
 */
router.put('/available/:drone_id', async (req, res) => {

    try {

        // get the drone id
        const { drone_id } = req.params;

        // decode token
        const decode = jwtDecode(req.headers.authorization);

        // retrieve user id
        const user = await User.findByEmail(decode.email);

        // retrieve renter id
        const renter = await Renter.getRenterId(user.user_id);

        // rent a drone for user
        const rent = await Drone.rentItem(drone_id, renter.renter_id);

        // check if db op succeeded
        if (user && renter && rent) {
            // send success response
            return res.status(200).json({ rent: rent });
        }

    } catch (err) {
        // send failure internal server response
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }
})


/*
 * /rented/:drone_id : endpoint that returns drone that renter used.
 */
router.put('/rented/:drone_id', async (req, res) => {

    try {

        // get drone id
        const { drone_id } = req.params;

        // update availability of drone
        const returnItem = await Drone.returnItem(drone_id);

        // check if db op is successful
        if (returnItem) {
            //send success response
            return res.status(200).json({ returnItem: returnItem });
        }


    } catch (err) {
        //send internal error failure response
        return res.status(500).json({ message: `Server error: ${err.message}` });
    }


})


module.exports = router

