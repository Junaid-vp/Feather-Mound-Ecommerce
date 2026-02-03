// ===============================
// 📌 Component Name: AdminRouter
// 📌 Purpose: To protect admin-only routes
// 📌 Logic: Checks user role from localStorage → if admin allow → else redirect
// ===============================

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function AdminRouter() {

// 🔹 Step 1: Fetch logged-in user info from localStorage
  const {userData,authLoading} = useContext(AuthContext)
  // 🔹 Step 2: Check if user is a normal user
  
  if (authLoading) {
   return <div>Checking authentication...</div>;
 }
  const isAdmin = userData?.role === "Admin";

  // 🔹 Step 3: Render page or redirect based on role
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;

}

export default AdminRouter;
