const express = require("express");

const restrict = require("../middlewares/restrict");

const validateUser = require("../middlewares/validateUser");

const validateMessage = require("../middlewares/validateMessage");

const Reminders = require("./reminders-model");

const remindersRouter = express.Router();

/** 
* @api {get} api/reminders Get All Reminders
* @apiName GetAllReminders
* @apiGroup Reminders
* 

* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*[
*  {
*    "id": 1,
*    "message": "Don't forget final is at 8:00AM",
*    "time_stamp": "2020-03-03 12:00PM",
*    "user_id": 1
*  },
*  {
*    "id": 2,
*    "message": "Don't forget to turn in final",
*    "time_stamp": "2020-03-03 12:01PM",
*    "user_id": 1
*  }
* ]
*/


remindersRouter.get('/', (req, res) => {
  Reminders.findReminders()
  .then(students => {
      res.json(students)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "Database failed to get users. Contact your backend"})
  })
});

/** 
* @api {get} api/reminders/:id Get A Reminder by ID
* @apiName GetReminderById
* @apiGroup Reminders
* 

* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*[
*  {
*    "id": 1,
*    "message": "Don't forget final is at 8:00AM",
*    "time_stamp": "2020-03-03 12:00PM",
*    "user_id": 1
*  },
*]
*/

remindersRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Reminders.findById(id)
    .then(message => {
  
      res.status(200).json(message);
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "Failed to get reminder"
      });
    });
});

/** 
* @api {post} api/reminders Create A Reminder 
* @apiName CreateAReminder
* @apiGroup Reminders
* @apiParamExample Example Body:
* 
*  {
*    "message": "Don't forget final is at 8:00AM sharp",
*    "time_stamp": "2020-03-03 12:00PM",
*    "user_id": 1
*  }
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*[
*  {
*    "id": 1,
*    "message": "Don't forget final is at 8:00AM",
*    "time_stamp": "2020-03-03 12:00PM",
*    "user_id": 1
*  },
*]
*/

remindersRouter.post("/",  (req, res) => {
  const message = req.body;
  console.log(message)

  Reminders.addReminder(message)
    .then(reminder => {
      res.status(200).json(reminder);
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: message.error
      });
    });
});

/** 
* @api {put} api/reminders/:id EDIT a reminder by Id
* @apiName editReminders
* @apiGroup Reminders
* @apiParam {Number} id reminder id
* @apiParam {Number} student_id id of student the reminder is connected to 
* @apiParam {String} title reminder title
* @apiParam {Date} due_date date the project is due
* @apiParam {Time} reminder_time time to send reminder
* @apiParam {String} notes notes
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*{
*  "message": "Your reminder with id of ${id} has been updated"
*}
*/

remindersRouter.put("/:id", (req, res) => {

  const { id } = req.params;
  const changes = req.body;

  Reminders.findById(id)
  .then(reminder => {
      if (reminder) {
        Reminders.updateReminder(changes, id)
        .then(updatedReminder => {
          res.status(201).json({
            message: `Your reminder with id of ${id} has been updated`
          });
        });
      } else {
        res.status(404).json({ message: 'Could not find reminder with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update reminder' });
    });

})

/** 
* @api {delete} api/reminders/:id DELETE a Reminder
* @apiName deleteReminder
* @apiGroup Reminders
*
* @apiParam {Number} id Project Id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "removed": 1
* }
*/

remindersRouter.delete("/:id", (req, res) => {

  const { id } = req.params;

  Reminders.deleteReminder(id)
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

module.exports = remindersRouter;