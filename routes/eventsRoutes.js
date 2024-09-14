const router = require("express").Router();
const {
  getAllEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const authenticateToken = require("../middlewares/verifyToken");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.get("/", authenticateToken, authenticateAdmin, getAllEvents);
router.post("/", authenticateAdmin, addEvent);
router.get("/:id", authenticateToken, authenticateAdmin, getEvent);
router.put("/:id", authenticateAdmin, updateEvent);
router.delete("/:id", authenticateAdmin, deleteEvent);

module.exports = router;
