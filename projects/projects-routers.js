const express = require("express");
const router = express.Router();

const Projects = require('./projects-model')

/** 
* @api {get} api/projects/:id GET a Project by Id
* @apiName getProjectById
* @apiGroup Projects
* @apiParam {Number} id Student id
* @apiSuccess {Number} student_id id of the student that this project belongs to
* @apiSuccess {String} title Project title
* @apiSuccess {Date} due_date date the project is due
* @apiSuccess {Time} reminder_time time to send reminder
* @apiSuccess {String} notes notes 
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "id": 1,
*    "student_id": 1,
*    "title": "Write letter of recommendation",
*    "due_date": "03-30-2020",
*    "reminder_time": "17:00",
*    "notes": "Must write recommendation for Billy Madison"
* }
*/

router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Projects.findById(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get project' });
    });
  });

   /** 
* @api {post} api/projects Add/Create a new project
* @apiName addProject
* @apiGroup Projects
* 
* @apiParam {Number} student_id id of student the project is connected to 
* @apiParam {String} title project title
* @apiParam {Date} due_date date the project is due
* @apiParam {Time} reminder_time time to send reminder
* @apiParam {String} notes notes
*
* @apiParamExample Example Body:
* {
*    "student_id": 1,
*    "title": "Final Exam Due",
*    "due_date": "03-13-2020",
*    "reminder_time": "3:00",
*    "notes": "Student must take final exam"
* }
* @apiSuccess {Number} student_id id of student the project is connected to 
* @apiSuccess {String} title project title
* @apiSuccess {Date} due_date date the project is due
* @apiSuccess {Time} reminder_time time to send reminder
* @apiSuccess {String} notes notes
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*{
*    "id": 6,
*    "student_id": 1,
*    "title": "Final Paper Due",
*    "due_date": "03-30-2020",
*    "reminder_time": "18:00",
*    "notes": "Student must submit final paper"
*}
*/

router.post("/", (req, res) => {

    const projectData = req.body;

    Projects.addProject(projectData)
    .then(project => {
        res.status(201).json(project);
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to create new project' });
      });
})

 /** 
* @api {put} api/projects/:id EDIT a Project by Id
* @apiName editProject
* @apiGroup Projects
* @apiParam {Number} id Project id
* @apiParam {Number} student_id id of student the project is connected to 
* @apiParam {String} title project title
* @apiParam {Date} due_date date the project is due
* @apiParam {Time} reminder_time time to send reminder
* @apiParam {String} notes notes
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*/

router.put("/:id", (req, res) => {

    const { id } = req.params;
    const changes = req.body;

    Projects.findById(id)
    .then(project => {
        if (project) {
          Projects.updateProject(changes, id)
          .then(updatedProjects => {
            res.json(updatedProjects);
          });
        } else {
          res.status(404).json({ message: 'Could not find project with given id' });
        }
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to update project' });
      });

})

 /** 
* @api {delete} api/projects/:id DELETE a Project
* @apiName deleteProject
* @apiGroup Projects
* @apiParam {Number} id Project Id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "removed": 1
* }
*/

router.delete("/:id", (req, res) => {

    const { id } = req.params;

    Projects.deleteProject(id)
    .then(deleted => {
        if (deleted) {
          res.json({ removed: deleted });
        } else {
          res.status(404).json({ message: 'Could not find project with given id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Failed to delete project' });
      });

})

module.exports = router;