const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets/secret')
const {
    checkUsernameFree, checkUsernameExists, checkForMissingUsernamePassword
} = require('../auth/auth-middleware')

const User = require('../users/user-model')

// path for registering new account
router.post('/signup', checkForMissingUsernamePassword, checkUsernameFree, async (req, res) => {
    try {

        // retrieve password and hash it
        let user = req.body;
        const rounds = parseInt(process.env.ROUNDS);
        const hash = bcrypt.hashSync(user.password, rounds);
        user.password = hash;

        // add user to db
        const addedUser = await User.addUser(user);

        // check if db op succeeded
        if (addedUser) {
            return res.status(201).json({ addedUser: addedUser });
        }
    } catch (err) {
        // send internal error failure response.
        return res.status(500).json({ message: `Server error: ${err.message}` })
    }

})


// path for login to existing account
router.post('/login', checkForMissingUsernamePassword, checkUsernameExists, async (req, res) => {

    try {

        const { username, password } = req.body;

        // find the user by username
        const user = await User.findByUsername(username);

        // check if user was found and the decrypted password matches the password provided
        if (user && bcrypt.compareSync(password, user.password)) {

            // make token
            const token = makeToken(user);

            return res.status(200)
                .cookie('token', token)
                .json({
                    message: `welcome back ${user.username}`,
                    token
                });
        } else {
            return res.status(401).json({ message: 'Invalid username/password' });
        }



    } catch (err) {
        return res.status(500).json({ message: `Server error: ${err.message}` });
    }



})

// create token after successful login
const makeToken = (user) => {
    const payload = {
        user_id: user.user_id,
        username: user.username,
        password: user.password
    }

    const option = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, option)

}

module.exports = router