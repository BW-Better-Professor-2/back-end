const jwt = require('jsonwebtoken')
const secret= require('../secrets/secret')
module.exports = (req,res,next)=>{

  const token = req.headers.authorization;
  if(token){
    jwt.verify(token,secret.jwtSecret,(err,decodeToken)=>{
  if(err)
  { 
    res.status(400).json({message:'you shall not pass!'})
  }
  else{
    req.user= {username:decodeToken.username}
    next()}
  })
  } else{
    res.status(400).json({message:'no token'})
  }
}