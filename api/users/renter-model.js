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

module.exports = {
    getRenterId

}