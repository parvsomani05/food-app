import React from "react";

const ContactPage = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div
          className="container text-center align-content-center About-part pt-5"
          style={{ height: "35vh" }}
        >
          <h2 className="pt-4">Contact</h2>
        </div>
      </div>

      <div
        className="container-fluid bg-style pb-5"
        style={{ backgroundColor: "rgba(255, 186, 58, 0.815)" }}
      >
        <div className="container pt-4">
          <div className="row">
            <div className="col-lg-4">
              <img
                src="IMG/Product-C10-removebg-preview.png"
                alt="Contact Image"
                className="img-fluid"
                style={{ height: "100%" }}
              />
            </div>
            <div className="col-lg-8 mt-5">
              <div className="contact-form">
                <h2 className="text-left">Contact Us</h2>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btnc-partc col-12">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;
