const express = require('express')
const router = express.Router();
const Dream = require('./dreamModel');
const mongoose = require('mongoose');

router.get('/allDreams',async function (req, res, next) {
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

router.post('/addDream', async function (req, res, next) {
  const dreamObj = {
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    type:Dream.DreamType[req.body.type],
  };

  const newDream = new Dream(dreamObj);

  try {
    const savedDream = await newDream.save();
    res.status(201).json({ message: "Dogadjaj je kreiran!", Dream: savedDream });
  } catch (err) {
    next(err);
  }
});

router.get('/:dreamId',async function (req, res, next) {
  const dreamId = req.params.dreamId;

  try {
    const dream = await Dream.findById(dreamId).exec();
    if (dream) {
      res.status(200);
      res.json(dream);
    } else {
      res.status(404);
      res.json({ message: "Ne postoji dogadjaj!" });
    }
  } catch (err) {
    next(err);
  }
});


router.patch('/:dreamId',async function (req, res, next) {

  const dreamId = req.params.dreamId;
  updateOptions = {};
  for (let i = 0; i < req.body.length; i++) {

    let singleUpdate = req.body[i];
    updateOptions[singleUpdate.fieldName] = singleUpdate.newValue;
  }

  try {
    await Dream.updateOne({ _id: dreamId }, { $set: updateOptions }).exec();
    const updated = await Dream.findById(dreamId).exec();
    res.status(200).json({ message: "Dogadjaj je azuriran!", Dream: updated });
  } catch (err) {
    next(err);
  }

});


router.delete( '/:dreamId' , async (req, res, next) => {

  const dreamId = req.params.dreamId;
  try {
    await Dream.deleteOne({ _id : dreamId }).exec();
    res.status(200).json({ msg: 'Event je obrisan' });
  }
  catch (err) {
    next(err);
  }

});





module.exports = router;
