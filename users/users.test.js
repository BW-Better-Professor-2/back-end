const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

// beforeAll(async () => {
//     await db('users').truncate();
//   })


describe('testing CRUD on /users', () => {
    it('should return 200 and should be a json', () => {
        return request(server)
        .get('/api/users')
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
        })
        
 
 
        it('should return 200 and should be a json', () => {
            return request(server)
            .get('/api/users/1/students')
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.type).toMatch(/json/i);
            })
            })

})