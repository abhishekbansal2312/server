const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { studentId, name, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the user directly; password will be hashed by the pre-save middleware
    user = await User.create({ studentId, name, email, password });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Use matchPassword method to check if passwords match
    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "nobodyknows",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict",
    });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};
