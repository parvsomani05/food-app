import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/products");
      setProducts(data);
    };
    load();
  }, []);

  const { addItem } = useCart();

  const addToCart = async (product) => {
    await addItem(product, 1);
  };

  return (
    <>
      <div
        className="container-fluid justify-content-center"
        style={{ marginTop: "90px" }}
      >
        <center>
          <h1>
            <span style={{ color: "orange" }}>Our </span> Product
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ut
            quibusdam rem eum?
          </p>
        </center>
        <div className="container mt-5 p-0">
          <div className="row mt-5 justify-content-center p-1">
            {products.map((p) => (
              <div
                key={p._id}
                className="col-12 col-md-6 col-xl-3 col-lg-3 mt-4 p-1"
              >
                <div className="card text-center">
                  <img
                    src={p.imageUrls?.[0] || "/IMG/Product-C1.jpg"}
                    alt={p.name}
                    style={{ height: "330px", objectFit: "cover" }}
                  />
                  <div className="card-body card-button">
                    <h4 className="card-title pt-0">{p.name}</h4>
                    <p className="card-text pt-0">Per Kg</p>
                    <h3 className="card-text pt-0">
                      <b>₹{p.price}</b>
                    </h3>
                    <button onClick={() => addToCart(p)}>
                      <i className="fa-solid fa-cart-shopping pr-1"></i>Add to
                      cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
