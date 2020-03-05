const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

beforeAll(async () => {
    await db('students').truncate();
  })


describe('testing CRUD on /students', () => {
    it('should return 200 and should be a json', () => {
        return request(server)
        .get('/api/students')
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
        })
        
 
  it('should add a student', () => {
    return request(server)
    .post('/api/students')
    .send({
      professor_id: 1, 
      name:"Ricky Bobby", 
      email:"shakeandbake@rickybobby.com"
    })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should edit a student', () => {
    return request(server)
    .put('/api/students/1')
    .send({
      professor_id: 1, 
      name:"Ricky Booby", 
      email:"shakeandbake@rickybobbyinc.com"
    })
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should delete a student', () => {
    return request(server)
    .delete('/api/students/1')
  
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
})