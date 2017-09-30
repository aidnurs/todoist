var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
  task: String,
  required: true
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
