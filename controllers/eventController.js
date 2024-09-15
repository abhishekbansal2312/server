const Event = require("../models/Event");
const mongoose = require("mongoose");
const User = require("../models/User");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate(
      "participants",
      "name studentId email"
    );
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Add a new event
exports.addEvent = async (req, res) => {
  const { title, description, date, time, location, link } = req.body;

  try {
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      link,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding event", error: error.message });
  }
};

// Get a specific event by ID
exports.getEvent = async (req, res) => {
  const { id } = req.params;

  // Check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await Event.findById(id).populate(
      "participants",
      "name studentId email"
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching event", error: error.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time, location, link, isLive } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, time, location, link, isLive },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating event", error: error.message });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
};

// Add participants by student IDs
exports.addParticipants = async (req, res) => {
  const { eventId } = req.params;
  const { studentIds } = req.body;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const idsArray = studentIds.split(",").map((id) => id.trim());
    const users = await User.find({ studentId: { $in: idsArray } });

    if (!users.length) {
      return res
        .status(404)
        .json({ message: "No valid users found for the provided IDs" });
    }

    // Add users' ObjectId to event's participants
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { participants: users.map((user) => user._id) } },
      { new: true }
    ).populate("participants", "name studentId email");

    // Update the participatedEvents array for each user
    await User.updateMany(
      { _id: { $in: users.map((user) => user._id) } },
      { $addToSet: { participatedEvents: eventId } }
    );

    res.status(200).json({ message: "Participants added successfully", event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding participants", error: error.message });
  }
};
