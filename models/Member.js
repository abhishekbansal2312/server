const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  studentId: {
    type: String,
    required: true,
    unique: true, // Student ID must be unique
  },
  picture: {
    type: String, // Store the URL of the picture
  },
  description: {
    type: String, // A brief description of the member
  },
  hobbies: {
    type: [String], // An array of strings to store hobbies
  },
  joinDate: {
    type: Date, // Date when the member joined
    default: Date.now,
  },
  isActive: {
    type: Boolean, // Active status of the member
    default: true,
  },
  phoneNumber: {
    type: String, // Phone number should be a string to handle leading zeros, etc.
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
