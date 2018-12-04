/* jshint esversion: 6 */

const db = require('../models/index.js');

function postApplication(req, res){
    if(!req.payload._id){
        res.status(401).json({
            'message' : 'UnauthorizedError: private profile'
        });
    } else {
        db.Application.create({
            company: req.body.company,
            position_applied_for: req.body.position_applied_for,
            date_applied: req.body.date_applied,
            contact_name: req.body.contact_name,
            contact_position: req.body.contact_position,
            contact_phone: req.body.contact_phone,
            contact_email: req.body.contact_email,
            most_recent_follow_up_date: req.body.most_recent_follow_up_date,
            number_of_follow_ups: req.body.number_of_follow_ups,
            status: req.body.status,
            user_id: req.payload._id
        }).then((application) => {
            return db.User.findOneAndUpdate({'_id': req.payload._id}, {$push: {applications: application._id}}, {new: true});
        }).then(function(user){
            res.json(user);
        }).catch(function(err){
            res.json(err);
        });
    }
}

module.exports = {
    postApplication: postApplication
};