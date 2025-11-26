// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET || 'change_this_secret';
// module.exports = function(req,res,next){
//   const auth = req.headers.authorization;
//   if(!auth) return res.status(401).json({message:'No token'});
//   const parts = auth.split(' ');
//   if(parts.length !==2) return res.status(401).json({message:'Bad token'});
//   const token = parts[1];
//   try{
//     const decoded = jwt.verify(token, secret);
//     req.user = decoded;
//     next();
//   }catch(e){
//     return res.status(401).json({message:'Invalid token'});
//   }
// }

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.header('Authorization') || req.header('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    // attach user id to request
    req.user = { id: decoded.id, role: decoded.role };
    // option: load user record if needed
    // req.currentUser = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error('JWT error', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
