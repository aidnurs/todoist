const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
    status: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
