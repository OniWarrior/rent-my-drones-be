const request = require('supertest')
const server = require('../server')
const db = require('../data/dbConfig')

// start with a fresh unaltered db before doing main tests
beforeAll(async()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async()=>{
    await db('drones').truncate()
    await db('users').truncate()
    await db.seed.run()
})

afterAll(async ()=>{
    await db.destroy()
})

// tests for signup post request
describe('[POST] /Signup',()=>{

})