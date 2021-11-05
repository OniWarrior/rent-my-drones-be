
exports.up = function(knex) {
    return knex.schema
      .createTable('users',users=>{
          users.increments('user_id')
          users.string('username',128).notNullable().unique()
          users.string('password',128).notNullable()
      })
      .createTable('drones',drones=>{
          drones.increments('drone_id')
          drones.string('drone_name',128).notNullable()
          drones.string('drone_description',800)
          drones.decimal('drone_cost',10,2).notNullable()
          drones.string('drone_image')
          drones.boolean('drone_isRented').defaultTo(0)
          drones.string('renter_username')
            .references('username')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
      })  
};

exports.down = function(knex) {
    return knex.schema
     .dropTableIfExists('drones')
     .dropTableIfExists('users')  
};
