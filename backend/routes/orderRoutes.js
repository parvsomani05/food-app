const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/auth");
const {
  createOrderFromCart,
  getMyOrders,
  listAllOrders,
  updateOrderStatus,
  setPaidRazorpay,
} = require("../controllers/orderController");

router.post("/", requireAuth, createOrderFromCart);
router.get("/mine", requireAuth, getMyOrders);
router.get("/", requireAuth, requireRole("admin"), listAllOrders);
router.put("/:id/status", requireAuth, requireRole("admin"), updateOrderStatus);
router.post("/razorpay/paid", requireAuth, setPaidRazorpay);

module.exports = router;


