const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getMyCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  return res.json(cart || { user: userId, items: [] });
};

const setCart = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body; // [{product, quantity}]
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Items must be an array" });
  }

  const productIds = items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const idToProduct = new Map(products.map((p) => [String(p._id), p]));

  const normalizedItems = items.map((i) => {
    const p = idToProduct.get(String(i.product));
    if (!p) throw new Error("Invalid product in cart");
    return {
      product: p._id,
      quantity: i.quantity,
      priceAtAddTime: p.price,
    };
  });

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { user: userId, items: normalizedItems },
    { new: true, upsert: true }
  ).populate("items.product");

  return res.json(cart);
};

module.exports = { getMyCart, setCart };
