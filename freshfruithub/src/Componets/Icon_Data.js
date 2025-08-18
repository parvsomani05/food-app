import React from "react";

const Icon_Data = () => {
  return (
    <>
      {/* <!-- Part 2 --> */}
      <div
        className="container-fluid"
        style={{ backgroundColor: "rgb(237, 234, 222)" }}
      >
        <div className="container p-4 mr-auto ml-auto">
          <div className="row justify-content-center align-content-center">
            <div className="col-12 col-md-4 col-sm-12 col-xl-4 col-lg-4">
              <div className="media p-3 align-content-center">
                <i className="fa-solid fa-truck-fast mt-4"></i>
                <div className="media-body mt-3">
                  <h6 className="pl-5">Free Shipping</h6>
                  <p className="pl-4">When order over $75</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-sm-12 col-xl-4 col-lg-4">
              <div className="media p-3 align-content-center">
                <i className="fa-solid fa-phone-volume mt-4"></i>
                <div className="media-body mt-3">
                  <h6 className="pl-5">24/17 Support</h6>
                  <p className="pl-4">Get support all day</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-sm-12 col-xl-4 col-lg-4">
              <div className="media p-3 align-content-center">
                <i className="fas fa-sync-alt mt-4"></i>
                <div className="media-body mt-3">
                  <h6 className="pl-5">Refund</h6>
                  <p className="pl-4">Get refund within 3 days!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* part 2 end */}
    </>
  );
};
export default Icon_Data;
