const knex = require('knex')
const config = require('../../knexfile')
const environment = process.env.TESTING_DATABASE_URL || 'testing'

module.exports = knex(config[environment])