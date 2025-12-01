const db = require('../data/dbConfig')


/*
 * checkIdentityByEmail: Try to find a user with the provided email param
 * @email: parameter that is going to be used to find a user.
 */
async function checkIdentityByEmail(email) {
    const account = await db('User')
        .returning(['email'])
        .where('email', email)
        .first()

    return account
}

/*
 * findByEmail: Try to find a user by email
 *@email: Parameter that is used to find user if they exists
 */
async function findByEmail(email) {
    const account = await db('User')
        .returning(['user_id', 'email', 'password'])
        .where('email', email)
        .first()

    return account
}


/*
 * addUser: Add user to db.
 * @user: Parameter of user obj that will be added to db
 */
async function addUser(user) {
    const addUser = await db('User')
        .returning(['email', 'password'])
        .insert(user)
    return addUser
}
/*
 * addRenter: Add renter to db
 * @user_id: Parameter of user that will be added to db
 * */



module.exports = {

    addUser,
    findByEmail,
    checkIdentityByEmail
}