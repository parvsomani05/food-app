import React from "react";

const NewsPage = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div
          className="container text-center align-content-center About-part pt-5"
          style={{ height: "35vh" }}
        >
          <p style={{ color: "orange" }}>News Information</p>
          <h2>News</h2>
        </div>
      </div>

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
        <div className="container pb-5">
          <div className="row mt-5 justify-content-center">
            <div className="col-12 col-md-12 col-sm-12 col-xl-3 col-lg-3 mt-4 p-1">
              <div className="card">
                <img
                  src="IMG/Product-C10.jpg"
                  alt="img"
                  style={{ height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title pt-0 align-content-center justify-content-start">
                    You will vainly look for fruit on it in autumn.
                  </h4>
                  <div className="d-flex icone-text">
                    <i className="fa-regular fa-newspaper p-1"></i>
                    <p className="ml-1 p-1">News</p>
                    <i className="fa-solid fa-calendar-days ml-2 p-1"></i>
                    <p className="ml-1 p-1">Date:DD/MM/YYYY</p>
                  </div>
                  <div className="text-left">
                    New Study Reveals Surprising Health Benefits of Berries" A
                    recent scientific study conducted by Miraculo Dragonfruit"
                    Explorers renowned researchers suggests that consuming
                    berries.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-sm-12 col-xl-3 col-lg-3 mt-4 p-1">
              <div className="card">
                <img
                  src="https://images.pexels.com/photos/2294477/pexels-photo-2294477.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="img"
                  style={{ height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title pt-0">
                    A man's worth has its season, like tomato.
                  </h4>
                  <div className="d-flex icone-text">
                    <i className="fa-regular fa-newspaper p-1"></i>
                    <p className="ml-2 p-1">News</p>
                    <i className="fa-solid fa-calendar-days ml-2 p-1"></i>
                    <p className="ml-1 p-1">Date:DD/MM/YYYY</p>
                  </div>
                  <div className="text-left">
                    Exotic Fruit from Remote Island Discovered: Introducing the
                    Miraculo Dragonfruit" Explorers have stumbled on a remote
                    island where they uncovered a fruit known as the.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-sm-12 col-xl-3 col-lg-3 mt-4 p-1">
              <div className="card">
                <img
                  src="IMG/Product-C9.jpg"
                  alt="img"
                  style={{ height: "350px" }}
                />
                <div className="card-body">
                  <h4 className="card-title pt-0">
                    Good thoughts bear good fresh juicy fruit.
                  </h4>
                  <div className="d-flex icone-text">
                    <i className="fa-regular fa-newspaper p-1"></i>
                    <p className="ml-2 p-1">News</p>
                    <i className="fa-solid fa-calendar-days ml-2 p-1"></i>
                    <p className="ml-1 p-1">Date:DD/MM/YYYY</p>
                  </div>
                  <div className="text-left">
                    Revolutionary Seedless Watermelon Variety Takes the Market
                    by Storm" In a breakthrough development for watermelon
                    lovers, scientists have successfully .
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewsPage;
