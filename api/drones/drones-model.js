const db = require('../data/dbConfig')

/*
 * available: query that retrieves all drones currently not being rented.
 */
async function available() {
    const drones = await db('Drone')
        .returning(
            ['drone_id',
                'drone_name',
                'drone_description',
                'drone_cost',
                'drone_image',
                'owner_id'
            ])
        .where('drone_isRented', 0)
        .orderBy('drone_id')

    return drones

}

async function rented(renter_username) {
    const drones = await db('Drone')
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
    const drone = await db('Drone')
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

    const drone = await db('Drone')
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