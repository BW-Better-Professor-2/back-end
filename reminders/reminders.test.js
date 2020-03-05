const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

beforeAll(async () => {
    await db('reminders').truncate();
  })


describe('testing CRUD on /reminders', () => {
    it('should return 200 and should be a json', () => {
        return request(server)
        .get('/api/reminders')
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
        })
        
 
  it('should add a reminder', () => {
    return request(server)
    .post('/api/reminders')
    .send({
       
        message: "Don't forget final is at 8:00AM",
        time_stamp: "2020-03-03 12:00PM",
        user_id: 1
      })
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should edit a reminder', () => {
    return request(server)
    .put('/api/reminders/1')
    .send({
        message: "Don't forget final is at 8:00AM",
        time_stamp: "2020-03-03 12:00PM",
        user_id: 1
      })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should delete a reminder', () => {
    return request(server)
    .delete('/api/reminders/1')
  
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
})