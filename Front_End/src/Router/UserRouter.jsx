// ===============================
// 📌 Component Name: UserRouter
// 📌 Purpose: To protect user-only pages
// 📌 Logic: Reads user role from localStorage → 
//           If role is "user" → allow access → else redirect to login
// ===============================

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRouter() {

  // 🔹 Step 1: Fetch logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Step 2: Check if user is a normal user
  const isUser = user?.role === "user";

  // 🔹 Step 3: Render page or redirect based on role
  return isUser ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRouter;
