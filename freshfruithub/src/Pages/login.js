import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = "http://localhost:5000/api/login";

      const response = await axios.post(API_URL, formData);

      console.log("Server Response:", response.data);
      alert("Login Successful!");

      localStorage.setItem("token", response.data.token);
      if (response.data?.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Login Failed: " +
          (error.response?.data?.message || "Invalid credentials")
      );
    }
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#f0f2f5", padding: "50px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className="login-form"
                style={{
                  padding: "30px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}>
                <h2 className="text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="emailInput" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  
                  <Link to="/register">Create Account ?</Link>
                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Login
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

export default LoginPage;
