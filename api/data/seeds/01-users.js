const bcrypt = require('bcrypt');

const users = [
    {

        email: "van@gmail.com",
        password: "789456123456",
        first_name: "Johnny",
        last_name: "Silverhand"



    }



]

// loop through array of objects and assign hashed passwords
for (let i = 0; i < users.length; i++) {
    const rounds = parseInt(process.env.ROUNDS)
    const hash = bcrypt.hashSync(users[i].password, rounds)
    const hashedPassword = hash
    users[i].password = hashedPassword
}



exports.seed = function (knex) {
    return knex('User').insert(users)
}
