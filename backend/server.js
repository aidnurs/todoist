'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// app.use((req, res, next) => {
//     next();
// });

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: String,
    status: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/todos', (req, res) => {
    Todo.find({}, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

app.post('/todo', (req, res) => {
    const todo = new Todo({
        task: req.body.task,
        status: req.body.status,
    });
    todo.save((err, data) => {
        res.json(data);
    });
});

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('App is listening on port ' + listener.address().port);
});
