const db = require('../data/dbConfig')




async function findByUsername(username){
    const account = await db('users')
                          .returning(['username','password'])
                          .where('username',username)
                          
    return account
}



function addUser(user){
    return db('users')
           .returning(['username','password'])
           .insert(user)
}

async function findById(id){
    const account = await db('users')
                          .returning(['user_id','username','password'])
                          .where('user_id',id)
                          .first()
    return account
}

module.exports={
    findById,
    findByToken,
    addUser,
    findByUsername
}