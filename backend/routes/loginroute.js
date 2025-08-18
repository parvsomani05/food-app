const express = require("express");
const router = express.Router();
const { loginUser, registerUser, me } = require("../controllers/logincontrol");
const { requireAuth } = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", requireAuth, me);

module.exports = router;
