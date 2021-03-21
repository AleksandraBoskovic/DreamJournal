const express = require('express')
const router = express.Router();
const Dream = require('./dreamModel');

router.get('/allDream',async function (req, res, next) {
  try {
    const dreams = await Dream.find({}).exec();
    res.status(200).json(dreams);
  } catch (err) {
    next(err);
  }
});

router.get('/allDreamType',async function (req, res, next) {
  try {
    var dreamsType = [];
    for(var key in Dream.DreamType){
      dreamsType.push(Dream.DreamType[key]);
    }
    res.status(200).json(dreamsType);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
