/*
 * Author : Stephen Aranda 
 * File   : 20211105105348_tables.js
 * Desc   : File that holds the javascript tables that will be migrated to PostgreSQL db
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('User', users => {
            users.increments('user_id').primary()
            users.string('email', 128).notNullable().unique()
            users.string('password', 128).notNullable()
            users.string('first_name', 30).notNullable()
            users.string('last_name', 30).notNullable()
        })
        .createTable('Renter', renters => {
            renters.increments('renter_id').primary()
            renters.integer('user_id')
                .references('user_id')
                .inTable('User')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('Owner', owners => {
            owners.increments('owner_id').primary()
            owners.integer('user_id')
                .references('user_id')
                .inTable('User')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('Drone', drones => {
            drones.increments('drone_id').primary()
            drones.string('drone_name', 128).notNullable()
            drones.string('drone_description', 800)
            drones.decimal('drone_cost', 10, 2).notNullable()
            drones.string('drone_image')
            drones.integer('owner_id')
                .references('owner_id')
                .inTable('Owner')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('Return', returns => {
            returns.increments('return_id').primary()
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('Drone')
        .dropTableIfExists('Owner')
        .dropTableIfExists('Renter')
        .dropTableIfExists('User')
};
