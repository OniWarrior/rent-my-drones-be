const db = require('../data/dbConfig')

async function available() {
    const drones = await db('drones')
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_isRented'])
        .where('drone_isRented', 0)
        .orderBy('drone_id')

    return drones

}

async function rented(renter_username) {
    const drones = await db('drones')
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_isRented'])
        .where('renter_username', renter_username)
        .orderBy('drone_id')

    return drones

}

async function rentItem(drone_id, username, rented) {
    const drone = await db('drones')
        .update({
            drone_isRented: rented,
            renter_username: username
        })
        .where('drone_id', drone_id)
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_isRented',
            'renter_username'])

    return drone
}

async function returnItem(drone_id, available, rented) {

    const drone = await db('drones')
        .update({
            drone_isRented: rented,
            renter_username: available
        })
        .where('drone_id', drone_id)
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_isRented',
            'renter_username'])
    return drone

}

module.exports = {
    available,
    rented,
    rentItem,
    returnItem
}