const request = require("supertest");
const server = require("./server");


describe('server', () => {
    describe('GET /api/reminders', () => {
        it('should return 200 ', () => {
            return request(server).get('/api/reminders').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).get('/api/reminders').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
})

describe('POST /register', () => {
        
    it('should return 200 OK', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username:"kennyrogers",password:"usersfdsf"})
        .then(res => {
            
            expect(res.status).not.toBe(200);
        })
    })
    it('should return JSON data', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username:"richard",password:"123456"}).then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })    
})

describe('POST /login', () => {
    it('should return 200 OK', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username:"richardm",password:"123456"})
        .then(res => {
            expect(res.status).toBe(401);
        })
    })
    it('should return JSON data', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username:"richardm",password:"123456"})
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})