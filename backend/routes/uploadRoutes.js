const express = require("express");
const multer = require("multer");
const path = require("path");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\W+/g, "-");
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  requireAuth,
  requireRole("admin"),
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const filename = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;
    return res.status(201).json({ filename, url: fileUrl });
  }
);

module.exports = router;
