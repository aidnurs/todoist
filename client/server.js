var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var url = 'mongodb://test:test@ds151554.mlab.com:51554/todoist';
mongoose.connect(url);

app.get('/api/get', function(req, res) {
  Todo.find({}, function(err, todos) {
    res.send(todos);
  });
});

app.post('/api/post', function(req, res) {
  var input = req.body.input;
  var tmrw = new Todo({ task: input });
  tmrw.save(function(err, tmrw) {});
  res.sendStatus(200);
});

app.put('/api/put', function(req, res) {
  Todo.findById(req.body.id, function(err, todo) {
    todo.task = req.body.input;
    todo.save(function(err) {});
    res.sendStatus(200);
  });
});

app.delete('/api/delete', function(req, res) {
  var input = req.body.input;
  Todo.findOneAndRemove({ task: input }, function(err) {});
  res.sendStatus(200);
});

var todoSchema = mongoose.Schema({
  task: String
});

var Todo = mongoose.model('Todo', todoSchema);

var listener = app.listen(8000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
