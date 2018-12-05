/* jshint esversion: 6 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  company: {
    type: String,
    required: true
  },
  position_applied_for: {
    type: String,
    required: true
  },
  date_applied: {
    type: Date,
    required: true
  },
  contact_name: {
    type: String
  },
  contact_position: {
    type: String
  },
  contact_phone: {
    type: String
  },
  contact_email: {
    type: String
  },
  most_recent_follow_up_date: {
    type: Date
  },
  number_of_follow_ups: {
    type: Number
  },
  status: {
    type: Number
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
