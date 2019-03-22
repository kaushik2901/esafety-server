const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    salt: {
        type: String
    }
});

UserSchema.methods.setPassword = function(password) {
    if(!password) {
        throw new Error("Password required");
    }
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 20000, 512, 'sha512').toString('hex');
}

UserSchema.methods.verifyPassword = function(password) {
    if(!password) {
        throw new Error("Password required");
    }
    return this.password == crypto.pbkdf2Sync(password, this.salt, 20000, 512, 'sha512').toString('hex');
}

UserSchema.methods.getToken = () => {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, config.JWT_SECRET);
}

UserSchema.methods.toJSON = () => {
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
    }
}

module.exports = mongoose.model('User', UserSchema);