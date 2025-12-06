import { restricted } from '../auth/auth-middleware';

/*
 * Author: Stephen Aranda
 * File  : owner-router.js
 * Desc  : endpoints that will be utilized by the owner user type.
 * */
const router = require('express').Router();

router.get('/available-drones', restricted, async (req, res) => {
    try {

    } catch (err) {

    }
})

export default router;