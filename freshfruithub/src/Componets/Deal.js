import React from "react";

const Deal = () => {
  return (
    <>
      <div
        className="container-fluid justify-content-center"
        style={{ marginTop: "90px" }}
      >
        <center>
          <h1>
            {" "}
            Deal Of The <span style={{ color: "orange" }}>Month </span>{" "}
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ut
            quibusdam rem eum?
          </p>
        </center>
        <div className="container mt-3">
          <div className="row text-center text-lg-left">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12 img-margin justify-content-start">
              <img src="IMG/Product-C4.png" className="img-fluid" alt="Image" />
            </div>
            <div
              className="col-lg-6 col-md-12 col-sm-12 col-12"
              style={{ marginTop: "100px" }}
            >
              <h2>Deal Of The Month</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tempor tincidunt turpis, sed posuere metus euismod ac.
              </p>
              <p className="pt-0">Per Kg</p>
              <h3 className="pt-0">
                <b>₹15</b>
              </h3>
              <button className="buy-button mt-1">
                <i className="fa-solid fa-cart-shopping pr-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Deal;
