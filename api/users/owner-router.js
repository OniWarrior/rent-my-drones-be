import { restricted } from '../auth/auth-middleware';
const { default: jwtDecode } = require('jwt-decode');

/*
 * Author: Stephen Aranda
 * File  : owner-router.js
 * Desc  : endpoints that will be utilized by the owner user type.
 * */
const router = require('express').Router();

router.get('/available-drones', restricted, async (req, res) => {
    try {

        // decode the token
        const decoded = jwtDecode(req.headers.authorization);


    } catch (err) {

    }
})

export default router;