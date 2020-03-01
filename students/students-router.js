const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secret.js');
const db = require('../data/dbConfig.js');
const Students = require('./students-model');




/** 
* @api {findAllStudents} /api/students Find All Students
* @apiName FindAllStudents
* @apiGroup Students
* 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
*[
*  {
*    "id": 1,
*    "name": "student name"
*  }
*  {
*    "id": 2,
*    "name": "second student name"
*  }
*]
*/

router.get('/', (req, res) => {
    Students.find()
      .then(students => {
        if (students && students.length >= 1) {
          res.status(200).json(students);
        } else {
          res.status(401).json({
            message: 'There are no students in the database.'
          });
        }
      })
      .catch(err => err(err, req, res));
  });

/** 
* @api {findastudentbyid} /api/students/:id Find A Student By ID
* @apiName FindAtudentById
* @apiGroup Students
* 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
*[
*  {
*    "id": 1,
*    "name": "student name"
*  }
*]
*/

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Students.findById(id)
      .then(student => {
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(401).json({
            message: `There is no student with an id of ${id}.`,
          });
        }
      })
      .catch(err => genericError(err, req, res));
  });
  
/** 
* @api {AddAStudent} /api/students Add a Student
* @apiName Add A Student
* @apiGroup Students
* 
* @apiParam {String} name Student's Name
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 201 OK 
*{
*  "message": "Successfully created student!",
*  "student": {
*    "id": 3,
*    "name": "Student Name"
*  }
*}
*/

  
  router.post('/', (req, res) => {
    Students.add(req.body)
      .then(student => {
        res.status(201).json({
          message: 'Successfully created student!',
          student,
        });
      })
      .catch(err => genericError(err, req, res));
  });

  /** 
* @api {DeleteAStudent} /api/students/:id Delete a Student
* @apiName Delete A Student
* @apiGroup Students
* 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 201 OK 
*{
*  "message": "Successfully deleted student with id of 3!",
*  "student": {
*    "id": 3,
*    "name": "Student Name"
*  }
*}
*/
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Students.remove(id)
      .then(student => {
        if (student) {
          res.status(200).json({
            message: `Successfully deleted student with id of ${id}!`,
            student,
          });
        } else {
          res.status(401).json({
            message: `There is no student with an id of ${id}`,
          });
        }
      })
      .catch(err => genericError(err, res, req));
  })
  
    /** 
* @api {findStudentsProjects} /api/students/:id/projects Find A Student's Project
* @apiName FindProjects for a Student
* @apiGroup Students
* 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
*[ Need to fix this one once i add a project
*  {
*    "id": 1,
*    "name": "student name"
*  }
*  {
*    "id": 2,
*    "name": "second student name"
*  }
*]
*/

router.get('/:id/projects', (req, res) => {
    const { id } = req.params;
  
    Students.findProjectsById(id)
      .then(projects => {
        if (projects && projects.length > 0) {
          return projects;
        } else {
          res.status(401).json({
            messages: `There are no projects associated with the student id ${id}.`,
          });
        }
      })
      .then(projects => getDeadlines(projects, req, res))
      .catch(err => genericError(err, req, res));
  });

  module.exports = router;
