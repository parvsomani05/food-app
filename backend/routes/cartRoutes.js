const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { getMyCart, setCart } = require("../controllers/cartController");

router.get("/mine", requireAuth, getMyCart);
router.put("/mine", requireAuth, setCart);

module.exports = router;


