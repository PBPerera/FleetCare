const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET || 'change_this_secret';

// signup
router.post('/signup', async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    if(!email || !password || !name) return res.status(400).json({message:'Missing fields'});
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message:'Email exists'});
    const hash = await bcrypt.hash(password, 10);
    const u = new User({name,email,password:hash, role: role||'staff'});
    await u.save();
    const token = jwt.sign({id:u._id,email:u.email,role:u.role}, secret, {expiresIn:'7d'});
    res.json({user:{id:u._id,name:u.name,email:u.email,role:u.role}, token});
  }catch(e){
    res.status(500).json({message:e.message});
  }
});

// login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({message:'Missing'});
    const u = await User.findOne({email});
    if(!u) return res.status(400).json({message:'No user'});
    const ok = await bcrypt.compare(password, u.password);
    if(!ok) return res.status(401).json({message:'Invalid'});
    const token = jwt.sign({id:u._id,email:u.email,role:u.role}, secret, {expiresIn:'7d'});
    res.json({user:{id:u._id,name:u.name,email:u.email,role:u.role}, token});
  }catch(e){
    res.status(500).json({message:e.message});
  }
});

module.exports = router;
