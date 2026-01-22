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

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Local user state (null when not logged in)
  const [user, setUser] = useState(null);
  // toggle used to re-run the effect when needed by other components
  const [click, setClick] = useState(true);

  // Sync: read saved user from localStorage and refresh from API
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // fetch latest user from API and overwrite local state + localStorage
      const fetchUpdaedUser = async () => {
        const updated = await api.get(`/users/${JSON.parse(storedUser).id}`);
        setUser(updated.data);
        localStorage.setItem("user", JSON.stringify(updated.data));
      };
      fetchUpdaedUser();
    }

    // set local user immediately from localStorage (fast fallback)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [click]);

  // Save user to localStorage and update state
  const Login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout: clear storage, reset state, navigate to login and reload
  const Logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
    window.location.reload();
  }, [navigate]);

  // Provide context values to children
  return (
    <AuthContext.Provider value={{ user, Login, Logout, setUser, setClick }}>
      {children}
    </AuthContext.Provider>
  );
};
