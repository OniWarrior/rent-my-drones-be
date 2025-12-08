// Update with your config settings.
require('dotenv').config()



const sharedConfig = {
  client: 'pg',
  migrations: { directory: './api/data/migrations' },
  seeds: { directory: './api/data/seeds' }
}

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      connectionString: process.env.DEV_DATABASE_URL,
      ssl: false,
    },
  },

  testing: {
    ...sharedConfig,
    connection: {
      connectionString: process.env.TESTING_DATABASE_URL,
      ssl: false,
    },
  },

  production: {
    ...sharedConfig,
    connection: {
      connectionString: process.env.DATABASE_URL,
      // Heroku Postgres wants SSL, but we relax cert check
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 2, max: 10 },
  },
};