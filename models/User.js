const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true, // Ensures studentId is unique
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Pre-save middleware to hash the password before saving the user
UserSchema.pre("save", async function (next) {
  // Check if the password field is modified
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
