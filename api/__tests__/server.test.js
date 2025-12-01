const request = require('supertest')
const server = require('../server')
const db = require('../data/dbConfig')

// start with a fresh unaltered db before doing main tests
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})



afterAll(async () => {
    await db.destroy()
})

// tests for signup post request
describe('[POST] /signup', () => {
    it('returns a status of 201 Created', async () => {
        const res = await request(server)
            .post('/api/auth/signup')
            .send({
                email: 'hello@gmail.com',
                password: 'yellow123456ghsty',
                first_name: "John",
                last_name: "Doe",
                user_type: "Renter"
            })

        expect(res.status).toBe(201)
    })
    it('returns a status of 400 to indicate failure of request', async () => {
        const res = await request(server)
            .post('/api/auth/signup')
            .send({
                email: "",
                password: "",
                first_name: '',
                last_name: 'hello',
                user_type: "lol"
            })
        expect(res.status).toBe(400)
    })

})

// integrations tests for login request
describe('[POST] /login', () => {
    it('returns a status 200 login successful', async () => {

        const res = await request(server)
            .post('/api/auth/login')
            .send({
                email: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
        expect(res.status).toBe(200)
    })

    it('returns 401 when invalid credentials are entered', async () => {


        const res = await request(server)
            .post('/api/auth/Login')
            .send({
                username: 'hello@gmail.com',
                password: 'yello'
            })
        expect(res.status).toBe(401)
    })
})


// Integration tests for available get request
describe('[GET] /available', () => {
    it('returns 200 upon successful retrieval', async () => {

        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .get('/api/users/available')
                    .set("Authorization", token)
                    .then(successCode => {
                        expect(successCode.status).toBe(200)
                    })
            })
    })
})

//integration test for rented get request
describe('[GET] /rented', () => {
    it('should return 200 after completing', async () => {
        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .get('/api/users/rented')
                    .set("Authorization", token)
                    .then(successCode => {
                        expect(successCode.status).toBe(200)
                    })
            })
    })

})

// Integration test for renting a drone
describe('[PUT] /available/:id', () => {
    it('returns 200 after completing', async () => {
        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .put('/api/users/available/1')
                    .set("Authorization", token)
                    .send({
                        isRented: true
                    })
                    .then(successCode => {
                        expect(successCode.status).toBe(200)
                    })
            })


    })

    it('returns 500 after error', async () => {
        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .put('/api/users/available/1')
                    .send({
                        isRented: true
                    })
                    .then(successCode => {
                        expect(successCode.status).toBe(500)
                    })
            })
    })

})


// Integration test for unrenting drone
describe('[PUT] /rented/:id', () => {
    it('returns 200', async () => {
        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .put('/api/users/available/1')
                    .set("Authorization", token)
                    .send({
                        isRented: true
                    })
                    .then(() => {
                        request(server)
                            .put('/api/users/rented/1')
                            .set("Authorization", token)
                            .send({
                                isRented: false,
                                renter_username: null
                            })
                            .then(successCode => {
                                expect(successCode.status).toBe(200)
                            })
                    })
            })
    })

    it('returns 500 after failing', async () => {
        const login = await request(server)
            .post('/api/auth/Login')
            .send({
                username: "hello@gmail.com",
                password: "yellow123456ghsty"
            })
            .then((success) => {
                let token = success.text.slice(51, 332)
                request(server)
                    .put('/api/users/available/1')
                    .set("Authorization", token)
                    .send({
                        isRented: true
                    })
                    .then(() => {
                        request(server)
                            .put('/api/users/rented/1')
                            .set("Authorization", token)
                            .send({
                                isRented: false,
                                renter_username: "fdsfdeedd"
                            })
                            .then(successCode => {
                                expect(successCode.status).toBe(500)
                            })
                    })
            })
    })


})