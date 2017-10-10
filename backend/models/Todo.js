var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  user: String,
  task: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
