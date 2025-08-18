const express = require("express");
const router = express.Router();
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { requireAuth, requireRole } = require("../middleware/auth");

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", requireAuth, requireRole("admin"), createProduct);
router.put("/:id", requireAuth, requireRole("admin"), updateProduct);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProduct);

module.exports = router;


