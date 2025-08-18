import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const itemsTotal = items.reduce(
    (sum, i) => sum + (i.priceAtAddTime || i.product.price || 0) * i.quantity,
    0
  );

  return (
    <div className="container py-4">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Product</th>
                <th style={{ width: 160 }}>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => {
                const id = i.product._id || i.product;
                const price = i.priceAtAddTime || i.product.price || 0;
                return (
                  <tr key={id}>
                    <td>{i.product.name || id}</td>
                    <td>
                      <div className="input-group" style={{ maxWidth: 160 }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateQty(id, Math.max(1, i.quantity - 1))
                          }
                        >
                          -
                        </button>
                        <input
                          className="form-control text-center"
                          value={i.quantity}
                          onChange={(e) =>
                            updateQty(
                              id,
                              Math.max(1, Number(e.target.value) || 1)
                            )
                          }
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateQty(id, i.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₹{price}</td>
                    <td>₹{price * i.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <div>
              <h5>Items Total: ₹{itemsTotal}</h5>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
