const db = require('../data/dbConfig')




async function findByUsername(username) {
    const account = await db('users')
        .returning(['username', 'password'])
        .where('username', username)
        .first()

    return account
}



async function addUser(user) {
    const addUser = await db('users')
        .returning(['username', 'password'])
        .insert(user)
    return addUser
}

async function findById(id) {
    const account = await db('users')
        .returning(['user_id', 'username', 'password'])
        .where('user_id', id)
        .first()
    return account
}

module.exports = {
    findById,
    addUser,
    findByUsername
}