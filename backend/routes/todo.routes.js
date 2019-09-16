const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');
const User = require('../models/user.model');

router.get('/', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) {
            return res.status(400).send(error.details[0].message);
        }
        res.send(data);
    });
});

router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(400).send(error.details[0].message);
        }
        res.send(data);
    });
});

router.post('/', (req, res) => {
    User.findOne({ _id: req.body.userId }, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        }
        const todo = new Todo({
            userId: req.body.userId,
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
    Todo.deleteMany({}, (err, data) => {
        res.json(data);
    });
});

router.delete('/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, (err, data) => {
        res.json(data);
    });
});

module.exports = router;
