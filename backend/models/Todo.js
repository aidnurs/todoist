const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: String,
    status: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);
