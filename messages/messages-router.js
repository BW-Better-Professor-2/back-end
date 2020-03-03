const router = require("express").Router();
const Messages = require("./messages-model");
const mw = require('../helpers/middleware');


/** 
* @api {GetMessages} /messages/ Get All  Messages 
* @apiName GetMessages
* @apiGroup Messages
* 

} 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 


*{
*  "message": "There are no messages for student with the specified id"
*}
*/

router.get("/", (req, res) => {
    Messages.find()
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json({
        message: `Error retrieving the list of all users: ${error.message}`
      });
    });
});



/** 
* @api {GetMessagesByStudentId} /messages/students/:id Get Messages By Student ID
* @apiName GetMessagesByStudentId
* @apiGroup Messages
* 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
*{
*  "message": "There are no messages for student with the specified id"
*}
*/

// An endpoint for getting all messages of a student with specified id
router.get("/students/:id", (req, res) => {
    const id = req.params.id;
    Messages.findById(id)
      .then(studentMsgs => {
        if (studentMsgs) {
          res.status(200).json(studentMsgs);
        } else {
          res
            .status(401)
            .json({ message: "There are no messages for student with the specified id" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: `Error retrieving the list of messages for a user: ${error.message}`
        });
      });
  });



  router.post("/", mw.validateMessage, (req, res) => {
      
    const user_id = req.decodedToken.user_id;
   
 
    const { text, timestamp, student_id }  = req.newMessage;
    const message = { text, timestamp, user_id, student_id};
    message.send_to_self = (req.newMessage.student_id) ? false : true;

    Messages.add(message)
    .then(savedMsg => {
        res.status(201).json(savedMsg);
      })
      .catch(error => {
        res.status(500).json({
          error: `An error was encountered while creating this message: ${error.message}`
        });
      });
  });

module.exports = router;