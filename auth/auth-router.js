const router = require("express").Router();
const Users = require("./auth-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../secrets/secret.js");

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
          .json({ message: `Welcome back, ${username}`, user, token: token });
      } else {
        res.status(401).json({ message: "invalid username/password" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "failed to retrieve database", err });
    });
});

// router.get("/", (req, res) => {
//   Users.find().then(user => {
//     res.status(200).json(user);
//   });
// });

// function genToken(user) {
//   const payload = {
//     userId: user.id,
//     username: user.username
//   };
//   const options = {
//     expiresIn: "1h"
//   };
//   const token = jwt.sign(payload, secret.jwtSecret, options);
//   return token;
// }

module.exports = router;