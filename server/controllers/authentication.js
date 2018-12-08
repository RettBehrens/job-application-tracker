/* jshint esversion: 6 */

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = function(req, res){
    console.log('register controller hit');
    console.log(req.body);
    let user = new User();
    console.log(user);

    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err) {
        console.log('save hit');
        let token;

        if(err){
            console.log('error saving');
            res.status(404).json(err);
            return;
        }

        token = user.generateJWT();
        res.status(200);
        res.json({
            'token': token
        });
    });
};

module.exports.login = function(req, res){
    passport.authenticate('local', function(err, user, info){
        let token;

        if(err){
            res.status(404).json(err);
            return;
        }

        if(user){
            token = user.generateJWT();
            res.status(200);
            res.json({
                'token': token
            });
        } else {
            res.status(401).json(info);
        }
    })(req,res);
};