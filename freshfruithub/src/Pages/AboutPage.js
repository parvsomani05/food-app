import React from "react";
import Testimonial from "../Componets/Testimonial";

const AboutPage = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div
          className="container text-center align-content-center About-part pt-5"
          style={{ height: "35vh" }}
        >
          <p style={{ color: "orange" }}>WE SALE FRESH FRUITS</p>
          <h2>About</h2>
        </div>
      </div>
      <div className="container mt-5 d-flex">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4 mb-md-5 align-content-center justify-content-center">
            <div className="list-box d-flex">
              <div className="list-icon p-4">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <div className="content">
                <h3>Home Delivery</h3>
                <p>
                  sit voluptatem accusantium dolore mque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
            <div className="list-box d-flex">
              <div className="list-icon p-4">
                <i className="fas fa-money-bill-alt"></i>
              </div>
              <div className="content">
                <h3>Best Price</h3>
                <p>
                  sit voluptatem accusantium dolore mque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-5 mb-md-5">
            <div className="list-box d-flex">
              <div className="list-icon p-4">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="content">
                <h3>Custom Box</h3>
                <p>
                  sit voluptatem accusantium dolore mque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="list-box d-flex">
              <div className="list-icon p-4">
                <i className="fas fa-sync-alt"></i>
              </div>
              <div className="content">
                <h3>Quick Refund</h3>
                <p>
                  sit voluptatem accusantium dolore mque laudantium, totam rem
                  aperiam, eaque ipsa quae ab illo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
    </>
  );
};
export default AboutPage;
