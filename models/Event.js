// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
