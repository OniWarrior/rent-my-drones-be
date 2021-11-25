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

function rented(renter_username){
    return db('drones')
           .returning(['drone_id',
                       'drone_name',
                       'drone_description',
                       'drone_cost',
                       'drone_image',
                       'drone_isRented'])
            .where('renter_username',renter_username)
            .orderBy('drone_id')

}

function rentItem(drone_id,username,rented){
    return db('drones')
           .update({
               drone_isRented:rented,
               renter_username:username
           })
           .where('drone_id',drone_id)
        // Uncomment if testing in postman.
        //    .returning(['drone_id',
        //                'drone_name',
        //                'drone_description',
        //                'drone_cost',
        //                'drone_image',
        //                'drone_isRented',
        //                'renter_username'])
}

function returnItem(drone_id,available,rented){

    return db('drones')
           .update({
               drone_isRented:rented,  
               renter_username:available          
           })
           .where('drone_id',drone_id)
           .returning(['drone_id',
                       'drone_name',
                       'drone_description',
                       'drone_cost',
                       'drone_image',
                       'drone_isRented',
                       'renter_username'])

}

module.exports={
    available,
    rented,
    rentItem,
    returnItem
}