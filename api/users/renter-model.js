const db = require('../data/dbConfig')


/*
 * getRenterId: get the renter id by id parameter
 * @userId: parameter of the user id to retrieve the renter id.
 */
async function getRenterId(userId) {
    const renterId = await db("Renter")
        .select('renter_id')
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

/*
 * addOrder: adds an order into the database using order parameter
 * @order: parameter that will be inserted into db
 */
async function addOrder(order) {
    const addedOrder = await db('Order')
        .returning(['order_id'])
        .insert(order)
    return addedOrder
}

/*
 * addReturn: adds a return into the database using the returnRecord parameter
 * @returnRecord: Parameter that is a return record that will be inserted into the db
 */
async function addReturn(returnRecord) {
    const addedRecord = await db('Return')
        .returning(['return_id'])
        .insert(returnRecord)
    return addedRecord

}

/*
 * getTotalNumRentedDrones: get the total number of rented drones of the renter
 * @renter_id: parameter used to find all drones of renter, then get the total number
 */
async function getTotalNumRentedDrones(renter_id) {
    const maxDrones = await db("Drone")
        .where('renter_id', renter_id)
        .count()
    return maxDrones

}

module.exports = {
    getRenterId,
    getTotalNumRentedDrones,
    getOwnerId,
    addOrder,
    addReturn

}