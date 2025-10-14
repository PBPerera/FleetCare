const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Model = require('../models/Driver');

// list
router.get('/', auth, async (req,res)=> {
  const items = await Model.find().limit(200);
  res.json(items);
});
// get one
router.get('/:id', auth, async (req,res)=> {
  const it = await Model.findById(req.params.id);
  if(!it) return res.status(404).json({message:'Not found'});
  res.json(it);
});
// create
router.post('/', auth, async (req,res)=> {
  const obj = new Model(req.body);
  await obj.save();
  res.json(obj);
});
// update
router.put('/:id', auth, async (req,res)=> {
  const it = await Model.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(it);
});
// delete
router.delete('/:id', auth, async (req,res)=> {
  await Model.findByIdAndDelete(req.params.id);
  res.json({message:'deleted'});
});

module.exports = router;
