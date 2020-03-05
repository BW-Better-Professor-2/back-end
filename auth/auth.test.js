const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server")

const auth = require("./auth-router");

beforeAll(async () => {
    await db('users').truncate();
  })


    describe('POST /register', () => {
        it('should return 201 and should be a json', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username:"richard",password:"123456"}).then(res => {
            expect(res.type).toMatch(/json/i);
            expect(res.status).toBe(201);
        })
    }) 
  })   
  describe('POST /login', () => {
    it('should return 200 and should be a json', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username:"richard",password:"123456"})
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
    })   
})




