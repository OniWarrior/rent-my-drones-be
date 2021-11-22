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
    it('returns a status of 201 Created',async ()=>{
        const res =  await request(server)
                     .post('/Signup')
                     .send({
                         username:'hello@gmail.com',
                         password:'yellow123456ghsty'
                      })
        expect(res.status).toBe(201)
    })
    it('returns a status of 400 to indicate failure of request',async ()=>{
        const res = await request(server)
                    .post('/Signup')
                    .send({
                        username:"",
                        password:""
                    })
        expect(res.status).toBe(400)
    })
    
})

// integrations tests for login request
describe('[POST] /Login',()=>{
    
})