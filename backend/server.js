'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const Todo = require('./models/todo.model');
const User = require('./models/user.model');
// const passport = require('passport');
// const LocalStrategy = require('passport-local');
// const session = require('express-session');

/**
 * CORS
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Connect to database
 */
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err, client) => {
        if (err) {
            console.log('Database connection error: ' + err);
        }

        app.use('/api/todos', todoRoutes);
        app.use('/api/users', userRoutes);

        app.use((req, res, next) => {
            res.status(404)
                .type('text')
                .send('Not Found');
        });

        var listener = app.listen(process.env.PORT || 3000, function() {
            console.log('App is listening on port ' + listener.address().port);
        });
    },
);
