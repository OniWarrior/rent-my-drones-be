const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets/secret');
const {
    checkEmailAvailability,
    checkEmailExists,
    checkForMissingEmailPassword,
    checkForMissingName
} = require('../auth/auth-middleware');

const User = require('../users/user-model');
const Renter = require('../users/renter-model');

// path for registering new account
router.post('/signup', checkForMissingName, checkForMissingEmailPassword, checkEmailAvailability, async (req, res) => {
    try {

        // retrieve password and hash it
        let user = req.body;
        const rounds = parseInt(process.env.ROUNDS);
        const hash = bcrypt.hashSync(user.password, rounds);
        user.password = hash;

        // obj for user record
        const userRecord = {
            email: user.email,
            password: user.password,
            first_name: user.first_name,
            last_name: user.last_name
        }

        // add user to db
        const addedUser = await User.addUser(userRecord);

        // if cases - roles
        const RENTER = "Renter";
        const OWNER = "Owner"

        let addedRenter;
        let addedOwner;

        // look at user type
        if (user.user_type === RENTER) {
            addedRenter = await User.addRenter(addedUser[0].user_id);

        }
        else if (user.user_type === OWNER) {
            addedOwner = await User.addOwner(addedUser[0].user_id);

        }



        // check if db op succeeded
        if (addedUser && addedRenter) {
            return res.status(201).json({ addedUser: addedUser });
        }
        else if (addedUser && addedOwner) {
            return res.status(201).json({ addedUser: addedUser });

        }
    } catch (err) {
        // send internal error failure response.
        return res.status(500).json({ message: `Server error: ${err.message}` })
    }

})


// path for login to existing account
router.post('/login', checkForMissingEmailPassword, checkEmailExists, async (req, res) => {

    try {

        // login credentials
        const { email, password } = req.body;

        // find the user by email
        const user = await User.findByEmail(email);

        // check if user was found and the decrypted password matches the password provided
        if (user && bcrypt.compareSync(password, user.password)) {

            // do a search for renter
            const renter = await Renter.getRenterId(user.user_id);

            // check if renter was found
            if (renter) {
                // renter was found - send success response with role
                // make token
                const token = makeToken(user);

                return res.status(200)
                    .cookie('token', token)
                    .json({
                        message: `welcome back ${user.email}`,
                        role: "Renter",
                        token
                    });

            }

            // do a search for owner
            const owner = await User.findOwnerById(user.user_id);

            // check if owner was found
            if (owner) {
                // owner was found - send success response with role
                // make token
                const token = makeToken(user);

                return res.status(200)
                    .cookie('token', token)
                    .json({
                        message: `welcome back ${user.email}`,
                        role: "Owner",
                        token

                    });

            }



        } else {
            // bad request response sent for invalid creds
            return res.status(401).json({ message: 'Invalid email/password' });
        }



    } catch (err) {
        // internal server error
        return res.status(500).json({ message: `Server error: ${err.message}` });
    }



})

// create token after successful login
const makeToken = (user) => {
    const payload = {
        user_id: user.user_id,
        email: user.email,
        password: user.password
    }

    const option = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, option)

}

module.exports = router