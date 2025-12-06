/*
 * Author : Stephen Aranda
 * File   : owner-model.js
 * Desc   : File that contains the knex queries that will be sent to the db.
 * */

const db = require('../data/dbConfig');

/*
 * getOwnerAvailableDrones: retrieve all of the owner's drones that are available to be rented out
 * */
const getOwnerAvailableDrones = async (owner_id) => {
    const drones = await db("Drone")
        .select('drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'renter_id'
        )
        .where('owner_id', owner_id)
        .first()
    return drones

}

module.exports = {
    getOwnerAvailableDrones
}