const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dreamRouts = require('./dream/dreamAPI');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/dreamDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//x-www-form-urlencoded format
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//json format
app.use(bodyParser.json({}));

// Routes http://localhost:3000/dream
app.use('/dream', dreamRouts);


// obrada svih zahteva koji se ne poklapaju sa pravilima iznad
app.use(function (req, res, next) {
  const error = new Error('Zahtev nije podrzan od servera');
  error.status = 405;

  next(error);
});

// Obrada gresaka
app.use(function (error, req, res, next) {
    const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
      status: statusCode,
      stack: error.stack
    },
  });
});




// Izvozenje Express.js aplikacije
module.exports = app;
