const db = require('../data/dbConfig')

function available(){
    return db('drones')
           .returning(['drone_id',
                       'drone_name',
                       'drone_description',
                       'drone_cost',
                       'drone_image',
                       'drone_isRented'])
            .where('drone_isRented',0)
            .orderBy('drone_id')

}

