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
    it('returns a status 200 login successful',async ()=>{
        const createUser =  await request(server)
        .post('/Signup')
        .send({
            username:'hello@gmail.com',
            password:'yellow1234'
         })
        expect(createUser.status).toBe(201)
        const res = await request(server)
                    .post('/Login')
                    .send({
                        username:"hello@gmail.com",
                        password:"yellow1234"
                    })
        expect(res.status).toBe(200)
    })

    it('returns 401 when invalid credentials are entered',async ()=>{
        const createUser =  await request(server)
        .post('/Signup')
        .send({
            username:'hello@gmail.com',
            password:'yellow1234'
         })
        expect(createUser.status).toBe(201)

        const res = await request(server)
                    .post('/Login')
                    .send({
                        username:'hello@gmail.com',
                        password:'yello'
                    })
        expect(res.status).toBe(401)
    })
})


// Integration tests for available get request
describe('[GET] /available',()=>{
    it('returns 200 upon successful retrieval',async ()=>{
        
    })
})