// ============================================================================
// AuthContext.jsx — Authentication provider (Login / Logout / user sync)
// - Exposes: user, Login, Logout, setUser, setClick
// - Reads user from localStorage and re-syncs with API on `click` changes
// ============================================================================

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/Axios";
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  
  const [user, setUser] = useState(null);

  const [click, setClick] = useState(true);

  const [userData,setUserData]= useState(null)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/getUser");
        setUser(res?.data?.User);
        setUserData(res?.data?.UserData)
      } catch (err) {
        setUser(null);
        setUserData(null);
      }
    };
    fetchMe();
  }, [click]);
console.log(userData);

  // Save user to localStorage and update state
  const Login = async (userData) => {
    await api.post("/auth/login", userData);
    const res = await api.get("/auth/getUser");
    setUser(res?.data?.User);
    setUserData(res?.data?.UserData)
    navigate("/");
  };

  // Logout: clear storage, reset state, navigate to login and reload
const Logout = async () => {
  try {
    await api.post("/auth/logout"); 
    setUser(null);               
    toast.success("Logged out successfully");
    navigate("/login");             
  } catch (e) {
    toast.error("Logout failed");
  }finally {
    setUser(null); 
  }
};

  // Provide context values to children
  return (
    <AuthContext.Provider value={{userData, user, Login, Logout, setUser, setClick }}>
      {children}
    </AuthContext.Provider>
  );
};
