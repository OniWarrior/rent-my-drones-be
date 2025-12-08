const owners = [
    {

        user_id: 1



    }



]


exports.seed = function (knex) {
    return knex('Owner').insert(owners)
}