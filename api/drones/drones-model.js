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
        .where('drone_is_rented', 0)
        .orderBy('drone_id')

    return drones

}

async function rented(renterId) {
    const drones = await db('Drone')
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_isRented'])
        .where('renter_id', renterId)
        .orderBy('drone_id')

    return drones

}

/*
 * rentItem: Rents drone for user
 * @drone_id : parameter that's used to update drone status
 * @renter_id: parameter that's used to identify the renter of the drone
 * */
async function rentItem(drone_id, renterId) {
    const drone = await db('Drone')
        .update({
            drone_isRented: true,
            renter_id: renterId
        })
        .where('drone_id', drone_id)
        .returning(['drone_id',
            'drone_name',
            'drone_description',
            'drone_cost',
            'drone_image',
            'drone_is_rented',
            'renter_id'])

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