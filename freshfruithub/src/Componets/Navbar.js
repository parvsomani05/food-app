import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");
  const { count } = useCart();

  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const { data } = await api.get("/me");
          setUserRole(data.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole("user");
        }
      }
      setLoading(false);
    };
    
    fetchUserRole();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    navigate("/");
  };

  // Show loading state
  if (loading && isLoggedIn) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mr-0" to="/">
          <img src="IMG/Fruit-Logo.png" className="nav-logo" alt="Logo" />
        </Link>
        <div className="navbar-nav ml-auto">
          <span className="navbar-text">Loading...</span>
        </div>
      </nav>
    );
  }

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
              {userRole === "admin" && isAdminRoute ? (
                // Admin Navigation
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">
                      <i className="fa fa-tachometer-alt me-1"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link dropdown-toggle" 
                      href="#" 
                      id="manageDropdown" 
                      role="button" 
                      data-bs-toggle="dropdown" 
                      aria-expanded="false"
                    >
                      <i className="fa fa-cogs me-1"></i>
                      Manage
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="manageDropdown">
                      <li>
                        <Link className="dropdown-item" to="/admin?tab=products">
                          <i className="fa fa-box me-2"></i>
                          Manage Products
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin?tab=orders">
                          <i className="fa fa-shopping-cart me-2"></i>
                          Manage Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin?tab=users">
                          <i className="fa fa-users me-2"></i>
                          Manage Users
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      <i className="fa fa-eye me-1"></i>
                      View Site
                    </Link>
                  </li>
                </>
              ) : (
                // Client Navigation
                <>
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
                  {userRole === "admin" && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        <i className="fa fa-shield-alt me-1"></i>
                        Admin Panel
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          )}

          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <>
                {/* Hide cart and search for admin routes */}
                {!isAdminRoute && (
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
                  </>
                )}
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link"
                  >
                    <i className="fa fa-sign-out-alt me-1"></i>
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
