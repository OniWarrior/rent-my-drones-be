const request = require('supertest')
const server = require('../server')
const db = require('../data/dbConfig')

// start with a fresh unaltered db before doing main tests
beforeAll(()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(()=>{
    await db('drones').truncate()
    await db('users').truncate()
    await db.seed.run()
})

afterAll(()=>{
    await db.destroy()
})