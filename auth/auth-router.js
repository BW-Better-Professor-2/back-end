const router = require("express").Router();
const Users = require("./auth-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secrets/secret.js");
const generateToken = require('../helpers/tokenize');

/** 
* @api {register} /api/auth/register Register
* @apiName Register
* @apiGroup Auth
* 
* @apiParam {String} id User id
* @apiParam {String} password Password
*
* @apiParamExample Example Body: 
* {
*	"username": "username",
*	"password": "password"
} 
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
* {
* "message": "Thanks for registering, username!",
*  "user": {
*    "id": 3,
*    "username": "username",
*    "password": "hashed password, long string, not actual password"
*  },
*  "token": "long string, token"
* }
*/

router.post("/register", (req, res) => {
  // implement registration
  let userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 12);
  userData.password = hash;

  Users.insert(userData)
    .then(user => {
      const token = genToken(user);
      res.status(200).json({
        message: `Thanks for registering, ${userData.username}!`,
        user,
        token: token
      });
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

/** 
* @api {login} /api/auth/login Login
* @apiName Login
* @apiGroup Auth
* 
* @apiParam {String} id User id
* @apiParam {String} password Password
*
* @apiParamExample Example Body: 
* {
*	"username": "username",
*	"password": "password"
}
* 
* @apiSuccessExample Successful Response
*   HTTP/1.1 200 OK 
* {
* "message": "Welcome back, username!",
*  "user": {
*    "id": number,
*    "username": "username",
*    "password": "hashed password, long string, not actual password"
*  },
*  "token": "long string, token"
* }
*/

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res
          .status(200)
          .json({ message: `Welcome back, ${username}`, user, token });
      } else {
        res.status(401).json({ message: "invalid username/password" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

router.get("/", (req, res) => {
  Users.find().then(user => {
    res.status(200).json(user);
  });
});

function genToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
   
  };
  const options = {
    expiresIn: "1h"
  };
  const token = jwt.sign(payload, secret.jwtSecret, options);
  return token;
}

module.exports = router;