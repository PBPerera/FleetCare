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
const secret = process.env.JWT_SECRET || 'dev_secret';


exports.required = (req, res, next) => {
const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
if (!token) return res.status(401).json({ message: 'No token' });
try {
const payload = jwt.verify(token, secret);
req.user = payload;
next();
} catch (err) {
console.error('JWT error', err);
return res.status(401).json({ message: 'Invalid token' });
}
};


exports.optional = (req, res, next) => {
const authHeader = req.headers.authorization;
if (!authHeader) return next();
const token = authHeader.split(' ')[1];
try {
req.user = jwt.verify(token, secret);
} catch (err) {
// ignore
}
next();
};