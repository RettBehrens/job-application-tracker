/* jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret || require('../env.js').jwtSecret;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: 'Application'
    }],
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password){
    console.log('set password hit');
    console.log('jwt', jwt);
    console.log('crypto', crypto);
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    console.log('generate jwt hit');
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, jwtSecret);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;