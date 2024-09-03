// controllers/memberController.js

const Member = require("../models/Member");

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find()
    res.status(200).json(members);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching members", error: error.message });
  }
};

// Add a new member (Registration)
exports.addMember = async (req, res) => {
  const {
    name,
    email,
    studentId,
    picture,
    description,
    hobbies,
    phoneNumber,
  } = req.body;

  try {
    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res
        .status(400)
        .json({ message: "Member with this email already exists" });
    }

    const newMember = new Member({
      name,
      email,
      studentId,
      picture,
      description,
      hobbies,
      phoneNumber,
    });

    await newMember.save();
    res.status(201).json({ message: "Member registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding member", error: error.message });
  }
};522

// Get a specific member by ID
exports.getMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findById(id)
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching member", error: error.message });
  }
};

// Update a member by ID
exports.updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    studentId,
    picture,
    description,
    hobbies,
    isActive,
    phoneNumber,
  } = req.body;

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        name,
        email,
        studentId,
        picture,
        description,
        hobbies,
        isActive,
        phoneNumber,
      },
      { new: true, runValidators: true } // Return the updated document
    ).select("-password"); // Exclude password field

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating member", error: error.message });
  }
};

// Delete a member by ID
exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMember = await Member.findByIdAndDelete(id);
    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting member", error: error.message });
  }
};
