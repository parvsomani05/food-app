const Razorpay = require("razorpay");

const getRazorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

const createRazorpayOrder = async (req, res) => {
  try {
    const { amountInPaise, receipt } = req.body;
    if (!amountInPaise || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    const instance = getRazorpayInstance();
    const order = await instance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1,
    });
    return res.json(order);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { createRazorpayOrder };


