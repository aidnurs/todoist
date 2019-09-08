'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

require('mongodb');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// app.use((req, res, next) => {
//     next();
// });

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task: String,
    done: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

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
    Todo.find({}, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(data);
    });
});

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('App is listening on port ' + listener.address().port);
});
