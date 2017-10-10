var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var routes = require('./routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

var url = 'mongodb://test:test@ds151554.mlab.com:51554/todoist';
mongoose.connect(url);

routes(app);

var listener = app.listen(8000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
