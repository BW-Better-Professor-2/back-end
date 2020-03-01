const Users = require("../students/students-model");
const jwt = require("jsonwebtoken");

module.exports = {
  validateStudent,
  validateStudentId,
  validateNewUser,
  validateMessage,
  restricted
};

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: err.message });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}

function validateNewUser(req, res, next) {
  let user = req.body;
  if (!user) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.username) {
    res
      .status(400)
      .json({
        message: "missing required username field for a new user record"
      });
  } else if (!user.password) {
    res
      .status(400)
      .json({
        message: "missing required password field for a new user record"
      });
  } else {
    req.user = user;
    next();
  }
}

function validateStudent(req, res, next) {
  let student = req.body;
  if (!student) {
    res.status(400).json({ message: "missing student data" });
  } else if (!student.name) {
    res
      .status(400)
      .json({ message: "missing required name field for student record" });
  } else {
    req.student = student;
    next();
  }
}

function validateStudentId(req, res, next) {
  Users.findById(req.params.id)
    .then(student => {
      if (student) {
        next();
      } else {
        res.status(400).json({ message: "invalid student id" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Something terrible happend while checking student id: ${error.message}`
      });
    });
}

function validateMessage(req, res, next) {
  let newMessage = req.body;
  if (!newMessage) {
    res.status(400).json({ message: "missing message data" });
  } else if (!newMessage.text) {
    res
      .status(400)
      .json({
        message: "missing required text field for a new user record"
      });
  } else if (!newMessage.timestamp) {
    res
      .status(400)
      .json({
        message: "missing required timestamp field for a new user record"
      });
  } 
   else {
    req.newMessage = newMessage;
    next();
  }
}