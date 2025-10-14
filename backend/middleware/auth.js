const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'change_this_secret';
module.exports = function(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({message:'No token'});
  const parts = auth.split(' ');
  if(parts.length !==2) return res.status(401).json({message:'Bad token'});
  const token = parts[1];
  try{
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  }catch(e){
    return res.status(401).json({message:'Invalid token'});
  }
}
