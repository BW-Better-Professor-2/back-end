

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const usersRouter = require('../users/users.router')
const studentsRouter = require('../students/students-router')
const loginRouter = require('../auth/auth-router')
const projectRouter = require('../projects/projects-routers')
const messagesRouter = require('../messages/messages-router')




const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', loginRouter);

server.use('/api/users', usersRouter);
server.use('/api/students', studentsRouter);
server.use('/api/projects', projectRouter);
server.use('/api/messages', messagesRouter)

server.use('/docs', express.static('./docs'));

server.get('/', (req, res) => {
	res.send("Best Professor App:  documentation located at https://better-professor-bw.herokuapp.com/docs");
});



module.exports = server;
