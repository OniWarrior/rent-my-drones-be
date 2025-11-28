/*
 * Author: Stephen Aranda
 * File  : auth-middleware.js
 * Desc  : Middleware that checks for a valid token, an available email, if an email already
 *       : exists, and a missing email and password.
 * */

const { JWT_SECRET } = require('../secrets/secret')
const jwt = require('jsonwebtoken')
const User = require('../users/user-model')

/*
 * restricted: Middelware that checks the auth header for a valid token
 */
const restricted = async (req, res, next) => {

    try {

        // collect possible token
        const token = req.headers.authorization;

        // check if there's a token
        if (token) {

            // verify if the token is a valid jwt
            jwt.verify(token, JWT_SECRET, (err, decoded) => {
                // check if there's an error
                if (err) {
                    return res.status(401).json({ message: 'Token invalid' });
                }
                // no error send to next middleware function
                else {
                    req.decodedToken = decoded;
                    next();
                }
            })

        } else {
            // no token - send failure response.
            return res.status(401).json({ message: `Token required.` });

        }

    } catch (err) {
        // internal server error
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }

}


/*
 * checkEmailExists: Middleware that checks for an email already in db.
 * */
const checkEmailExists = async (req, res, next) => {

    try {
        // email to check
        const { email } = req.body;

        // try to match email profided with an existing user to confirm identity
        const user = await User.checkIdentityByEmail(email);

        // check if the username was found
        if (user) {
            // go to next middleware function
            next();
        }
        else {
            // send failure response invalid creds
            return res.status(401).json({ message: `Invalid credentials:` });

        }

    } catch (err) {

        // internal server error
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }
}


/*
 * checkEmailAvailability: Middleware to check if email is available
 * */
const checkEmailAvailability = async (req, res, next) => {

    try {
        // email to be checked.
        const { email } = req.body;


        // try to find user based on provided email
        const user = await User.checkIdentityByEmail(email);

        // check if the user was found
        if (!user) {
            // user not found: email is available
            next();
        } else {
            // if email already in use - failure response
            return res.status(422).json({ message: `Email already in use` });

        }

    } catch (err) {

        // internal server error
        return res.status(500).json({ message: `Server Error: ${err.message}` });

    }
}

/*
 * checkForMissingEmailPassword: middleware that checks for null or empty email/password
 * */
const checkForMissingEmailPassword = (req, res, next) => {

    // email and password to be checked.
    const { email, password } = req.body

    if (!email || email === "" ||
        !password || password === "") {
        return res.status(400).json({ message: "Email and password are required" });
    }
    else {
        next();
    }
}

/*
 * checkForMissingName: Middleware that checks for null or empty first name and last name
 */
const checkForMissingName = (req, res, next) => {

}

module.exports = {
    checkForMissingEmailPassword,
    checkEmailExists,
    checkEmailAvailability,
    restricted
}

