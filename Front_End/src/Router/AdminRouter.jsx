// ===============================
// 📌 Component Name: AdminRouter
// 📌 Purpose: To protect admin-only routes
// 📌 Logic: Checks user role from localStorage → if admin allow → else redirect
// ===============================

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRouter() {

  // 🔹 Step 1: Get logged-in user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Step 2: Check if user role is 'admin'
  const isAdmin = user?.role === "admin";

  // 🔹 Step 3: Conditional page rendering
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRouter;
