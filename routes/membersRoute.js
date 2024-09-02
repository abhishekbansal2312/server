// routes/memberRoutes.js

const router = require("express").Router();
const {
  getAllMembers,
  addMember,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.get("/", getAllMembers);
router.post("/", addMember);
router.get("/:id", getMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;

