const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user.model');

router.get('/', (req, res) => {
    User.find({})
        .populate('todos')
        .exec((err, data) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            res.json(data);
        });
});

router.get('/current', auth, (req, res) => {
    User.findById(req.user._id)
        .select('-password')
        .exec((err, user) => {
            if (err) {
                return res.status(400).send(error.details[0].message);
            }
            res.json(req.user._id);
        });
});

router.post('/', (req, res) => {
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

module.exports = router;
