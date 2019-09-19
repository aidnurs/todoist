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
const config = require('config');
const swaggerJSDoc = require('swagger-jsdoc');

//use config module to get the privatekey, if no private key set, end the application
if (!config.get('myprivatekey')) {
    console.error('FATAL ERROR: myprivatekey is not defined.');
    process.exit(1);
}

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

const swaggerDefinition = {
    info: {
        title: 'Todoist',
        version: '1.0.0',
        description: 'Simple Todoist App',
    },
    basePath: '/',
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*','./models/*'],
};
const swaggerSpec = swaggerJSDoc(options);

// -- routes for docs and generated swagger spec --

app.get('/docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.get('/docs', (req, res) => {
    res.sendFile(process.cwd() + '/public/docs.html');
});

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
