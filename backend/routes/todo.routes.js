const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');
const { User, validate } = require('../models/user.model');
const auth = require('../middleware/auth');

router.use(auth);

/**
 * @swagger
 * /api/todos/:
 *   get:
 *     summary: Get all todos for a specific user
 *     tags:
 *       - todos
 *     responses:
 *       200:
 *         description: List of todos
 *         schema:
 *           type: array
 *           items:
 *              $ref: '#/definitions/Todo'
 */
router.get('/', (req, res) => {
    User.findOne({ _id: req.user._id })
        .populate('todos')
        .exec((err, user) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            res.status(200).json(user.todos);
        });
});

// router.get('/:id', (req, res) => {
//     Todo.findById(req.params.id, (err, data) => {
//         if (err) {
//             return res.status(400).send(error.details[0].message);
//         }
//         res.send(data);
//     });
// });

router.post('/', (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        }
        const todo = new Todo({
            userId: req.user._id,
            task: req.body.task,
            status: req.body.status,
        });
        todo.save();
        user.todos.push(todo);
        user.save();
        res.json(todo);
    });
});

router.delete('/', (req, res) => {
    Todo.deleteMany({ userId: req.user._id }, (err, data) => {
        res.status(200).json(data.deletedCount);
    });
});

router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, data) => {
        res.status(200).json(data);
    });
});

module.exports = router;
