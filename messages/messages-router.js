// const router = require("express").Router();
// const Messages = require("./messages-model");
// const mw = require('../middlewares/validateMessage');


// /** 
// * @api {get} /messages/ Get All  Messages 
// * @apiName GetMessages
// * @apiGroup Messages
// * 
// * 
// * @apiSuccessExample Successful Response
// *   HTTP/1.1 200 OK 

// */

// router.get("/", (req, res) => {
//     Messages.find()
//     .then(messages => {
//       res.status(200).json(messages);
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: `Error retrieving the list of all users: ${error.message}`
//       });
//     });
// });



// /** 
// * @api {get} /messages/students/:id Get Messages By Student ID
// * @apiName GetMessagesByStudentId
// * @apiGroup Messages
// * 
// * 
// * @apiSuccessExample Successful Response
// *   HTTP/1.1 200 OK 
// *{
// *  "message": "There are no messages for student with the specified id"
// *}
// */

// // An endpoint for getting all messages of a student with specified id
// router.get("/students/:id", (req, res) => {
//     const id = req.params.id;
//     Messages.findById(id)
//       .then(studentMsgs => {
//         if (studentMsgs) {
//           res.status(200).json(studentMsgs);
//         } else {
//           res
//             .status(401)
//             .json({ message: "There are no messages for student with the specified id" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: `Error retrieving the list of messages for a user: ${error.message}`
//         });
//       });
//   });



//   router.post("/", mw.validateMessage, (req, res) => {
      
//     const user_id = req.decodedToken.user_id;
   
 
//     const { text, timestamp, student_id }  = req.newMessage;
//     const message = { text, timestamp, user_id, student_id};
//     message.send_to_self = (req.newMessage.student_id) ? false : true;

//     Messages.add(message)
//     .then(savedMsg => {
//         res.status(201).json(savedMsg);
//       })
//       .catch(error => {
//         res.status(500).json({
//           error: `An error was encountered while creating this message: ${error.message}`
//         });
//       });
//   });

// module.exports = router;

const express = require("express");

const restrict = require("../middlewares/restrict");

const validateUser = require("../middlewares/validateUser");

const validateMessage = require("../middlewares/validateMessage");

const Messages = require("../messages/messages-model");

const messagesRouter = express.Router();

messagesRouter.get("/", restrict, validateUser, (req, res) => {
  Messages.findMessages()
    .then(messages => {
      messages.map(message => {
        if (message.send_to_self === 0) {
          return (message.send_to_self = `send to ${message.student_name}`);
        } else {
          return (message.send_to_self = "yes");
        }
      });
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "Failed to get messages"
      });
    });
});

messagesRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  Messages.findById(id)
    .then(message => {
  
      res.status(200).json(message);
    })
    .catch(err => {
      res.status(500).json({
        err,
        message: "Failed to get message"
      });
    });
});

messagesRouter.post("/", validateMessage, (req, res) => {
  const message = req.body;
  Messages.addMessage(message)
    .then(message => {
      res.status(200).json(message);
    })
    .catch(err => {
      res.status(500).json({
        err,
        error: message.error
      });
    });
});
module.exports = messagesRouter;