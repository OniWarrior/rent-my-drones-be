const db = require('../data/dbConfig')


async function findByToken(token){
    const account = await db('users as u')
                          .returning(['u.user_id','u.username','u.password'])
                          .where('u.password',token)
                          .first()
    return account
}

function addUser(user){
    return db('users')
           .returning(['username','password'])
           .insert(user)
}

