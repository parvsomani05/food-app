const express = require("express");
const app = express();
require("dotenv").config();
const connectdb = require("./config/connectdb");
const route = require("./routes/loginroute");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
const cors = require("cors");
connectdb();
app.use(cors());
app.use(express.json());
app.use("/api", route);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`port ${port} is listen`);
});
