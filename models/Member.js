// models/Member.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  password: {
    type: String,
    required: true, // Password is required
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
});

// Hash the password before saving the member
memberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare provided password with hashed password
memberSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
