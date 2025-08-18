const Product = require("../models/productModel");

const listProducts = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json(products);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json(product);
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json(product);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
