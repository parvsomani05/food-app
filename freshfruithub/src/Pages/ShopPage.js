import React from "react";
import Shop from "../Componets/Shop";
import Deal from "../Componets/Deal";

const ShopPage = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div
          className="container text-center align-content-center About-part pt-5"
          style={{ height: "35vh" }}
        >
          <h2 className="pt-3">Shop</h2>
        </div>
      </div>
      <div className="pb-5">
        <Shop />
        <Deal />
      </div>
    </>
  );
};
export default ShopPage;
