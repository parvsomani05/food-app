import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { items: cart, clear, refresh } = useCart();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  useEffect(() => {
    /* cart comes from context */
  }, []);

  const total = cart.reduce(
    (s, i) => s + (i.priceAtAddTime || i.product.price || 0) * i.quantity,
    0
  );

  const payWithRazorpay = async (orderId, amountInPaise) => {
    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "",
        amount: amountInPaise,
        currency: "INR",
        name: "FreshFruitHub",
        order_id: orderId,
        handler: function (response) {
          resolve(response);
        },
        prefill: {
          name: address.fullName,
          contact: address.phone,
        },
        theme: { color: "#3399cc" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", reject);
      rzp.open();
    });
  };

  const placeOrder = async () => {
    try {
      if (paymentMethod === "cod") {
        const { data } = await api.post("/orders", {
          shippingAddress: address,
          paymentMethod: "cod",
        });
        alert("Order placed (COD)");
        // Clear cart only after successful COD order
        await clear();
        await refresh();
        return;
      }

      const amountInPaise = Math.max(1, Math.round(total * 100));
      
      // Step 1: Create Razorpay order
      const order = await api.post("/payments/razorpay/order", { amountInPaise });
      
      // Step 2: Process payment with Razorpay
      let payment;
      try {
        payment = await payWithRazorpay(order.data.id, amountInPaise);
      } catch (paymentError) {
        console.error("Payment failed:", paymentError);
        alert("Payment was cancelled or failed. Your cart items are still saved.");
        return; // Don't clear cart if payment failed
      }

      // Step 3: Create order in database
      const created = await api.post("/orders", {
        shippingAddress: address,
        paymentMethod: "razorpay",
      });

      // Step 4: Verify payment on backend
      try {
        await api.post("/orders/razorpay/paid", {
          orderId: created.data._id,
          razorpay_order_id: order.data.id,
          razorpay_payment_id: payment.razorpay_payment_id,
          razorpay_signature: payment.razorpay_signature,
        });
        
        // Only clear cart after successful payment verification
        alert("Payment successful and order placed!");
        await clear();
        await refresh();
        
      } catch (verificationError) {
        console.error("Payment verification failed:", verificationError);
        alert("Payment completed but verification failed. Please contact support. Order ID: " + created.data._id);
        // Don't clear cart if verification failed - let user contact support
      }

    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Your cart items are still saved. Please try again.");
      // Don't clear cart if order placement failed
    }
  };

  return (
    <div className="container py-4">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Shipping Address</h5>
          <input
            className="form-control mb-2"
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) =>
              setAddress({ ...address, fullName: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            placeholder="Phone"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <input
            className="form-control mb-2"
            placeholder="Address"
            value={address.addressLine1}
            onChange={(e) =>
              setAddress({ ...address, addressLine1: e.target.value })
            }
          />
          <div className="row g-2">
            <div className="col">
              <input
                className="form-control"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
            <div className="col">
              <input
                className="form-control"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="me-3">
              <input
                type="radio"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />{" "}
              Pay Online (Razorpay)
            </label>
            <label className="me-3">
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />{" "}
              Cash on Delivery
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <h5>Order Summary</h5>
          {cart.map((i) => (
            <div
              key={i.product._id || i.product}
              className="d-flex justify-content-between"
            >
              <div>{i.product.name || i.product}</div>
              <div>x{i.quantity}</div>
              <div>₹{i.priceAtAddTime || 0}</div>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>
          <button className="btn btn-primary mt-3" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
