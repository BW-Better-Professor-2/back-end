module.exports = {
    genericError,
    generateToken,
    getDeadlines
  }
  
  function genericError(err, req, res) {
    res.status(500).json({
      message: `Failed to ${req.method} ${req.originalUrl} --> ${err.message}`
    });
  }
  
  const jwt = require('jsonwebtoken');
  function generateToken(user) {
    const payload = {
      sub: user.id,
      username: user.username,
    };
  
    const option = {
      expiresIn: '1d',
    }
  
    const result = jwt.sign(
      payload,
      process.env.SECRET,
      option,
    );
    
    return result;
  }
  
  const Projects = require('../projects/projects-model');
  function getDeadlines(projects, req, res) {
    const { id } = req.params;
  
    return Projects.findDeadlines(id)
      .then(deadlines => {
        if (deadlines && deadlines.length > 0) {
          const projectsWithDeadlines = projects.map(project => {
            const relevantDeadlines = deadlines.filter(deadline => project.id === deadline.project_id);
            return {
              ...project,
              deadlines: relevantDeadlines.map(deadline => {
                return { deadline_type: deadline.deadline_type, deadline: deadline.deadline };
              })
            }
          });
          
          res.status(200).json(projectsWithDeadlines);
        } else if (deadlines) {
          res.status(200).json(projects);
        }
    })
    .catch(err => {
      res.status(401).json({
        message: `Failed to Projects.findDeadlines() in GET /projects: ${err.message}`,
      });
    });
  }
  