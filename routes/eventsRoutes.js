const router = require("express").Router();
const {
  getAllEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  addParticipants, // Import the addParticipants controller
} = require("../controllers/eventController");
const authenticateToken = require("../middlewares/verifyToken");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

// Routes accessible by authenticated users
router.get("/", authenticateToken, getAllEvents); // Any authenticated user can view all events
router.get("/:id", authenticateToken, getEvent); // Any authenticated user can view a specific event

// Routes requiring admin access
router.post("/", authenticateToken, authenticateAdmin, addEvent); // Only admin can create an event
router.put("/:id", authenticateToken, authenticateAdmin, updateEvent); // Only admin can update an event
router.delete("/:id", authenticateToken, authenticateAdmin, deleteEvent); // Only admin can delete an event

// Route to add participants to an event by eventId (Admin only)
router.post(
  "/:eventId/participants",
  addParticipants
); // Only admin can add participants

module.exports = router;
