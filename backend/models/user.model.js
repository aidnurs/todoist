const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
    //give different access rights if admin or not
    isAdmin: Boolean,
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
    //get the private key from the config file -> environment variable
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
    return token;
};

const User = mongoose.model('User', UserSchema);

//function to validate user
function validateUser(user) {
    const schema = {
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        password: Joi.string()
            .min(3)
            .max(255)
            .required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
