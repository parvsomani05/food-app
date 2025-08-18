import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await api.get("/me");
        setIsAdmin(data.role === "admin");
      } catch (e) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  if (loading) return null;
  return isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AdminRoute;


