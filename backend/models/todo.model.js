const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 *
 * definitions:
 *   Todo:
 *     type: object
 *     required:
 *       - userId
 *       - task
 *     properties:
 *       userId:
 *          $ref: "#/definitions/User"
 *       task:
 *          type: string
 *       status:
 *          type: boolean
 */

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
