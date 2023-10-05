const router = require("express").Router();
const isAuthenticated = require("../../auth/middleware/authMiddleware");
const {
  subscribe,
  getAllSubscribers,
} = require("../controllers/subscriptionController");

router.post("/", subscribe);
router.get("/", isAuthenticated, getAllSubscribers);

module.exports = router;
