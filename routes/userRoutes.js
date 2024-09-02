const express = require("express");
const router = express.Router();
const {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Define routes
router.get("/", allUsers);
router.post("/", createUser);
router.get("/:id", singleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.use((req, res) => {
  res.status(404).send("<h2>Resource not found</h2>");
});
module.exports = router;
