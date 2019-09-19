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

/**
 * @swagger
 *
 * definitions:
 *   Todo:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 */

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
