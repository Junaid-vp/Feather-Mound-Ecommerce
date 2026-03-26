// ===============================
// 📌 Component Name: UserRouter
// 📌 Purpose: To protect user-only pages
// 📌 Logic: Reads user role from localStorage → 
//           If role is "user" → allow access → else redirect to login
// ===============================

import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function UserRouter() {


  // 🔹 Step 1: Fetch logged-in user info from localStorage
  const { userData, user, authLoading } = useContext(AuthContext);
  // 🔹 Step 2: Check if user is a normal user
  
  if (authLoading) {
   return <div>Checking authentication...</div>;
 }
  const role = userData?.role ?? user?.role;
  const isUser = String(role || "").toLowerCase() === "user";

  // 🔹 Step 3: Render page or redirect based on role
  return isUser ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRouter;
