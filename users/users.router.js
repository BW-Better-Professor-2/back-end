const express = require('express');

const Users = require('./users-model');

const router = express.Router();

/** 
* @api {get} api/users GET a list of all users
* @apiName getUsers
* @apiGroup Users
*/

router.get('/', (req, res) => {
    Users.getUsers()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Database failed to get users. Contact your backend"})
    })
 });

 /** 
* @api {get} api/users/:id GET a User by Id
* @apiName getUserById
* @apiGroup Users
* @apiParam {Number} id User id
* @apiSuccess {Number} id User id
* @apiSuccess {String} username User email
* @apiSuccess {String} password User password
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*{
*   "id": 2,
*   "username": "test2@test.com",
*   "password": "pass"
*}
*/

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Users.findUserById(id)
    .then(user => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({message: 'There is no user with that id'})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Failed to get user. Contact your backend'})
    })
});

 /** 
* @api {put} api/users/:id EDIT a User by Id
* @apiName editUser
* @apiGroup Users
* @apiParam {Number} id User id
* @apiParam {String} username User email is used for username
* @apiParam {String} password user password
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*/

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Users.findUserById(id)
    .then(user => {
        if (user) {
            Users.updateUser(changes, id)
            .then(updatedUser => {
                res.json(updatedUser);
            })
        } else {
            res.status(404).json({message: "No user with that id exists"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to update user. Contact your backend"})
    })
});

 /** 
* @api {delete} api/users/:id DELETE a User
* @apiName deleteUser
* @apiGroup Users
* @apiParam {Number} id User id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "removed": 1
* }
*/

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Users.removeUser(id)
    .then(deleted => {
        if (deleted) {
            res.json({removed: deleted})
        } else {
            res.status(404).json({message: 'No user with that id exists'})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Failed to delete user. Contact your backend"})
    })
});

 /** 
* @api {get} api/users/:id/students GET a list of Students belonging to a professor/user
* @apiName getStudentList
* @apiGroup Users
*
* @apiParam {Number} id User id
*
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
*[
*    {
*        "studentId": 1,
*        "name": "Calvin Riley",
*        "email": "calvin@gmail.com",
*        "image_url": "https://ibb.co/D517kWp"
*    },
*    {
*        "studentId": 2,
*        "name": "Cindy Lou",
*        "email": "cindy@gmail.com",
*        "image_url": "https://ibb.co/gjnrsxT"
*    },
*    {
*        "studentId": 3,
*        "name": "John Smith",
*        "email": "john@gmail.com",
*        "image_url": "https://ibb.co/Pr9g04c"
*    },
*   {
*        "studentId": 4,
*        "name": "Julian Mills",
*        "email": "julian@gmail.com",
*        "image_url": "https://ibb.co/R6kSgDG"
*    },
* ]
*/

router.get('/:id/students', (req, res) => {
    const {id} = req.params

    Users.getStudentList(id)
    .then(students => {
        res.json(students)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "Database failed to get users. Contact your backend"})
    })
 });

module.exports = router;