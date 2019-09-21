const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');
const config = require('config');
const jwt = require('jsonwebtoken');

router.get('/', auth, (req, res) => {
    User.find({})
        .populate('todos')
        .exec((err, data) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            res.json(data);
        });
});

router.get('/me', auth, (req, res) => {
    User.findById(req.user._id)
        .select('-password -todos')
        .exec((err, user) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            res.json(user);
        });
});

router.post('/signup', (req, res) => {
    // validate the request body first
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    User.findOne({ username: req.body.username }, (err, data) => {
        if (data) {
            return res.status(400).send('User already registered.');
        }
    });

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return res.status(400).send(error.details[0].message);
        }
        user.password = hash;
        user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send({
            _id: user._id,
            username: user.username,
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(400).send(error.details[0].message);
        }
        bcrypt.compare(req.body.password, user.password, (err, isRightPassword) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            if (!isRightPassword) {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect username or password',
                });
            } else {
                const token = jwt.sign(
                    { _id: user._id, isAdmin: user.isAdmin },
                    config.get('myprivatekey'),
                );
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token,
                });
            }
        });
    });
});

module.exports = router;
