const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');

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
    const todo = new Todo({
        task: req.body.task,
        status: req.body.status,
    });
    todo.save((err, data) => {
        if (err) {
            return res.status(400).send(error.details[0].message);
        }
        res.json(data);
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
