const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

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

router.post('/', (req, res) => {
    User.find({ username: req.body.username }, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        }
        const newUser = new User({
            username: req.body.username,
        });
        newUser.save((err, data) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                res.json(data);
            }
        });
    });
});

module.exports = router;
