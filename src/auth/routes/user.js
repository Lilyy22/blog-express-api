const router = require("express").Router();
const {
  validateUserMiddleware,
  validateLoginMiddleware,
} = require("../middleware/userMiddleware");
const { register, loginUser } = require("../controllers/userController");

router.post("/register", validateUserMiddleware, register);
router.post("/login", validateLoginMiddleware, loginUser);

module.exports = router;
