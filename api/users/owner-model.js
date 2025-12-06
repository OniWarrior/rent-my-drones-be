/*
 * Author : Stephen Aranda
 * File   : owner-model.js
 * Desc   : File that contains the knex queries that will be sent to the db.
 * */

const db = require('../data/dbConfig');

/*
 * getOwnerAvailableDrones: retrieve all of the owner's drones that are available to be rented out
 * @owner_id: param of the owner's id. Used to retrieve drones.
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
        .where('drone_is_rented', false)

    return drones

}

/*
 * getOwnerRentedDrones: retrieve all of the owner's drones that have been rented out
 * @owner_id: param that is used to retrieve owner's drones.
 * 
 * */
const getOwnerRentedDrones = async (owner_id) => {
    const drones = await db('Drone')
        .select('drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'renter_id'
        )
        .where('owner_id', owner_id)
        .where('drone_is_rented', true)
    return drones

}

/*
 * getOwnerDrones: retrieve all of the owner's drones whether they're rented out or not
 * @owner_id : param that helps to retrieve owner's drones
 *  */
const getOwnerDrones = async (owner_id) => {
    const drones = await db('Drone')
        .select('drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'renter_id'
        )
        .where('owner_id', owner_id)

    return drones

}


module.exports = {
    getOwnerAvailableDrones,
    getOwnerRentedDrones,
    getOwnerDrones
}