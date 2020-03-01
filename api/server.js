const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const studentsRouter = require('../students/students-router.js');
const projectsRouter = require('../projects/projects-routers');
const messagesRouter = require('../messages/messages-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/students', authenticate, studentsRouter);
server.use('/projects', authenticate, projectsRouter);
server.use('/messages', authenticate, messagesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Best Professor App:  documentation located at https://better-professor-bw.herokuapp.com/docs' });
  });

server.use('/docs', express.static('./docs'));  

module.exports = server;
