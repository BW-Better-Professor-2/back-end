const express = require('express');

const Students = require('./students-model');

const router = express.Router();

/** 
* @api {get} api/students GET a list of all students
* @apiName getStudents
* @apiGroup Students
*/


router.get('/', (req, res) => {
    Students.getStudents()
    .then(students => {
        res.json(students)
    })
    .catch(err => {
       
        res.status(500).json({errorMessage: "Database failed to get users. Contact your backend"})
    })
 });

/** 
* @api {get} api/students/:id GET a Student by Id
* @apiName getStudentById
* @apiGroup Students
* @apiParam {Number} id Student id
* @apiSuccess {Number} user_id id of user who created that student
* @apiSuccess {String} name Student name
* @apiSuccess {String} email Student email
* @apiSuccess {String} image_url image url for student photo
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*{
*   "id": 3,
*   "professor_id": 1,
*   "name": "John Smith",
*   "email": "john@gmail.com",
*   "image_url": "https://ibb.co/Pr9g04c"
*}
*/

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Students.findStudentById(id)
    .then(student => {
        if (student) {
            res.json(student)
        } else {
            res.status(404).json({message: 'There is no user with that id'})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Failed to get user. Contact your backend'})
    })
});

 /** 
* @api {post} api/students Add/Create a new student
* @apiName addStudent
* @apiGroup Students
* 
* @apiParam {Number} professor_id id of professor the student is connected to 
* @apiParam {String} name student name
* @apiParam {String} email student email
* @apiParam {String} image_url image url, optional field
*
* @apiParamExample Example Body:
* {
*    "professor_id": 3,
*    "name": "Student Name",
*    "email": "email@email.com",
*    "image_url": "https://image.com/image"   
* }
* @apiSuccess {Number} id Student id
* @apiSuccess {Number} professor_id Id of the professor that the student is connected to
* @apiSuccess {String} name Student Name
* @apiSuccess {String} email Student Email
* @apiSuccess {String} image_url image url
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*{
*   "id": 9,
*   "professor_id": 3,
*   "name": "Student Name",
*   "email": "email@email.com",
*   "image_url": "https://image.com/image"
*}
*/

router.post('/', (req, res) => {
    const studentData = req.body;

    Students.addStudent(studentData)
    .then(student => {
        res.status(201).json(student)
        
    })
    .catch(err => {
      
        res.status(500).json({errorMessage: 'Failed to create student. Please contact your backend'})
    })
    
});

 /** 
* @api {put} api/students/:id EDIT a Student by Id
* @apiName editStudent
* @apiGroup Students
* @apiParam {Number} id Student id
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*/

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Students.findStudentById(id)
    .then(student => {
        if (student) {
            Students.updateStudent(changes, id)
            .then(updatedStudent => {
              
                res.status(200).json(updatedStudent);
            })
        } else {
            res.status(404).json({message: "No student with that id exists"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to update student. Contact your backend"})
    })
});

 /** 
* @api {delete} api/students/:id DELETE a Student
* @apiName deleteStudent
* @apiGroup Students
* @apiParam {Number} id Student Id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "removed": 1
* }
*/

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Students.removeStudent(id)
    .then(deleted => {
        if (deleted) {
            res.json({removed: deleted})
        } else {
            res.status(404).json({message: 'No student with that id exists'})
        }
    })
    .catch(err => {
        
        res.status(500).json({errorMessage: "Failed to delete student. Contact your backend"})
    })
});

 /** 
* @api {get} api/students/:id/projects GET a list of Projects belonging to a student
* @apiName getProjectList
* @apiGroup Students
*
* @apiParam {Number} id Student id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* [
*    {
*        "projectId": 2,
*        "title": "Comments on Research Paper Due",
*        "due_date": "03-23-2020",
*        "reminder_time": "4:00",
*        "notes": "Must return comments and edits for midterm paper"
*    },
*    {
*        "projectId": 3,
*        "title": "Give feedback on mock interview",
*        "due_date": "04-28-2020",
*        "reminder_time": "12:00",
*        "notes": "Give feedback for mock interview excercise"
*    }
* ]
*/

router.get('/:id/projects', (req, res) => {
    const {id} = req.params
    
    Students.getProjectList(id)
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Database failed to get projects. Contact your backend"})
    })
 });


 module.exports = router;