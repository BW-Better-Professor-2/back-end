const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

beforeAll(async () => {
    await db('projects').truncate();
  })


describe('testing CRUD on /projects', () => {
    it('should return 200 and should be a json', () => {
        return request(server)
        .get('/api/projects')
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.type).toMatch(/json/i);
        })
        })
        
 
  it('should add a project', () => {
    return request(server)
    .post('/api/projects')
    .send({
       
        student_id: 2,
        title: "Write Letter of Recommendation",
        due_date: "06-16-2020",
        reminder_time: "12:00 PM",
        notes: "Letter of Recommendation for Lambda"
      })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should edit a project', () => {
    return request(server)
    .put('/api/projects/1')
    .send({
        student_id: 2,
        title: "Write Thank You Note",
        due_date: "06-16-2020",
        reminder_time: "12:00 PM",
        notes: "Thank you note for for Lambda"
      })
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
  it('should delete a project', () => {
    return request(server)
    .delete('/api/projects/1')
  
    .then(res => {
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
  })
  })
})