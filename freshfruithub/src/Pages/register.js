import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const API_URL = "http://localhost:5000/api/register";

      const { confirmPassword, ...dataToSend } = formData;

      const response = await axios.post(API_URL, dataToSend);

      console.log("Server Response:", response.data);
      alert("Registration Successful! Please login to continue.");

      navigate("/");
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Registration Failed: " +
          (error.response?.data?.message || "An error occurred.")
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
                className="registration-form"
                style={{
                  padding: "30px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}>
                <h2 className="text-center mb-4">Create Account</h2>
                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="form-group mb-3">
                    <label htmlFor="nameInput" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  {/* Confirm Password Input */}
                  <div className="form-group mb-3">
                    <label
                      htmlFor="confirmPasswordInput"
                      className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPasswordInput"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Register
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

export default RegistrationPage;
