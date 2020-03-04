const request = require('supertest');
const server = require('../api/server.js');
const login = require('./auth-router.js');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const pass = bcrypt.hashSync('pass', 12);



describe('Login Route', () => {

    describe('Post /api/auth/login', () => {


  
      it("should return a status 201", async () => {
        await db('users').insert({ username: "richardm", password: "123456" })
        console.log(username)
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: "richardm", password: "123456" });
        expect(res.status).toBe(200);
  
      })
  
      it('should return JSON', () => {
        return request(server)
        .post('/api/auth/login')
        .then(res => {
          expect(res.type).toBe('application/json')
        })
      })
    })
  })
