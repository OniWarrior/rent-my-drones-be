const router = require('express').Router();
const Drone = require('../drones/drones-model');
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



        // retrieve the drones rented by user
        const rented = await Drone.rented(decoded.email);

        //check if the retrieval was successful
        if (rented) {

            // send success response
            return res.status(200).json({ rented: rented });
        }

    } catch (err) {
        // send failure internal server response
        return res.status(500).json({ message: `Server error: ${err.message}` })
    }

})

// path to rent a drone
router.put('/available/:drone_id', async (req, res) => {

    try {

        // get the drone id
        const { drone_id } = req.params;

        // decode token
        const decode = jwtDecode(req.headers.authorization);

        // temp boolean
        const rented = true;

        // rent a drone for user
        const rent = await Drone.rentItem(drone_id, decode.username, rented);

        // check if db op succeeded
        if (rent) {
            // send success response
            return res.status(200).json({ rent: rent });
        }

    } catch (err) {
        // send failure internal server response
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }
})

//path to unrent an item
router.put('/rented/:drone_id', async (req, res) => {

    try {

        // get drone id
        const { drone_id } = req.params;

        // temp boolean
        const rented = false;

        // available is set to ''. this is for the renter username
        const available = null;

        // update availability of drone
        const returnItem = await Drone.returnItem(drone_id, available, rented);

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

