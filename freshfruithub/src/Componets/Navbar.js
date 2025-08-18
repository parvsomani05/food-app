import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const { count } = useCart();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mr-0" to="/">
          <img src="IMG/Fruit-Logo.png" className="nav-logo" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn && (
            <ul className="navbar-nav ml-auto mr-lg-3">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/News">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          )}

          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">
                    <i className="fa fa-shopping-cart"></i>
                    {count > 0 && (
                      <span
                        className="badge bg-danger position-absolute"
                        style={{ top: 0, right: 0 }}
                      >
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
