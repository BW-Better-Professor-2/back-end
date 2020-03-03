module.exports = () => (req, res, next) => {
    if (user.user_id === req.user.id) {
      next();
    } else {
      res.status(403).json({
        message: "you do not have access to this information "
      });
    }
  };