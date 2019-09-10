'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todosRoute = require('./routes/todo.routes');
const Todo = require('./models/todo.model');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/todos', todosRoute);

var listener = app.listen(process.env.PORT || 3000, function() {
    console.log('App is listening on port ' + listener.address().port);
});
