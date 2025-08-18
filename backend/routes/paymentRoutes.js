const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const { createRazorpayOrder } = require("../controllers/paymentController");

router.post("/razorpay/order", requireAuth, createRazorpayOrder);

module.exports = router;


