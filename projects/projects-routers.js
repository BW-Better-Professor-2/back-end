const express = require('express');

const Projects = require('./projects-model');
const { genericError, getDeadlines } = require('../helpers/helpers');

const router = express.Router();

router.get('/', (req, res) => {
  Projects.find() 
    .then(projects => {
      if (projects && projects.length > 0) {
        return projects;
      } else {
        res.status(401).json({
          message: 'There are no projects in the database.'
        });
      }
    })
    .then(projects => getDeadlines(projects, req, res))
    .catch(err => genericError(err, req, res));
});

module.exports = router;