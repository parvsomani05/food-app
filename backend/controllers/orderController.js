const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const createOrderFromCart = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map((ci) => ({
    product: ci.product._id,
    name: ci.product.name,
    imageUrl: ci.product.imageUrls?.[0] || "",
    price: ci.priceAtAddTime,
    quantity: ci.quantity,
  }));

  const itemsPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingPrice = itemsPrice > 499 ? 0 : 49;
  const taxPrice = Math.round(itemsPrice * 0.05);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = await Order.create({
    user: userId,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    orderStatus: paymentMethod === "cod" ? "pending" : "pending",
  });

  return res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  return res.json(orders);
};

const listAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate({ path: "user", select: "name email" })
    .sort({ createdAt: -1 });
  return res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.orderStatus },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: "Not found" });
  return res.json(order);
};

const setPaidRazorpay = async (req, res) => {
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.paymentResult = { razorpay_order_id, razorpay_payment_id, razorpay_signature, status: "paid" };
  order.orderStatus = "paid";
  await order.save();
  return res.json(order);
};

module.exports = {
  createOrderFromCart,
  getMyOrders,
  listAllOrders,
  updateOrderStatus,
  setPaidRazorpay,
};


