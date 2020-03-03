const express = require('express')
const bcrypt = require('bcryptjs')

const API = require('./auth-model')
const signToken = require('../helpers/signToken');

const router = express.Router();

 /** 
* @api {post} api/auth/register Add/Create a new user
* @apiName registerUser
* @apiGroup Login/Register
* 
* @apiParam {String} username User's desired login- can be an email address or a username
* @apiParam {String} password User's desired password
*
* @apiParamExample Example Body:
* {
*	"username": "bruce@banner.com",
*	"password": "pass"   
* }
* @apiSuccess {Number} id User id
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* [
*    3
* ]
*/

router.post('/register', (req, res, next) => {
    const credentials = req.body;

    const hash = bcrypt.hashSync(credentials.password, 10);

    credentials.password = hash;

    API.addUser(credentials)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        console.log('Error registering user.', err);
        res.status(500).json({ error: 'Error registering user.' });
    });
})

 /** 
* @api {post} api/auth/login Login as a user
* @apiName loginUser
* @apiGroup Login/Register
* 
* @apiParam {String} username User's desired login- can be an email address or a username
* @apiParam {String} password User's desired password
*
* @apiParamExample Example Body:
* {
*	"username": "bruce@banner.com",
*	"password": "pass"   
* }
* @apiSuccess {String} token User's token
* @apiSuccess {String} message welcome message with user's username
* @apiSuccess {Number} id user id
* @apiSuccessExample Successful Response
* HTTP/1.1 200 OK
* {
*    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJydWNlQGJhbm5lci5jb20iLCJ1c2VySWQiOjMsImlhdCI6MTU4MDY4OTUzNywiZXhwIjoxNTgwNjkzMTM3fQ.YEJbwZVYl05mG6loRYlsMbAfpce36y3f3J-6fudoxsk",
*    "message": "Welcome bruce@banner.com!",
*    "id": 3
* }
*/

router.post('/login', (req, res, next) => {
    const credentials = req.body;
    const username = credentials.username;
    const password = credentials.password;

    API.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            //sign token
            
            const token = signToken(user);

            //send the token
            res.status(200).json({
                token,
                message: `Welcome ${user.username}!`,
                id: user.id
            });
        } else {
            res.status(401).json({ message: 'You shall not pass!' });
        }
    })
    .catch(error => {
        console.log('Error with login', error);
        res.status(500).json({ error: 'Problem with login.' });
    });
})

router.get('/logout', (req, res) => {
    if (req.session){
        req.session.destroy(err => {
            if (err){
                res.send('error loggin out')
            } else{
                res.send('byeeee');
            }
        })
    }
})

module.exports = router;