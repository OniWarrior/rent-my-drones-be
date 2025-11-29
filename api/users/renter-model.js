const db = require('../data/dbConfig')


/*
 * getRenterId: get the renter id by id parameter
 * @userId: parameter of the user id to retrieve the renter id.
 */
async function getRenterId(userId) {
    const renterId = await db("Renter")
        .returning(['renter_id'])
        .where('user_id', userId)
        .first()
    return renterId
}

/*
 * getOwnerId: get the owner id of the owner of drone using drone id parameter
 * @drone_id : parameter that will be used to retrieve owner id
 */
async function getOwnerId(drone_id) {
    const owner = await db('Drone')
        .returning(['owner_id'])
        .where('drone_id', drone_id)
        .first()
    return owner
}

module.exports = {
    getRenterId,
    getOwnerId

}