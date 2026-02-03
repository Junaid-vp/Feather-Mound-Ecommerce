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

  const [authLoading, setAuthLoading] = useState(true);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/getUser");
        setUser(res?.data?.User);
        setUserData(res?.data?.UserData);
      } catch (err) {
        setUser(null);
        setUserData(null);
      } finally {
        setAuthLoading(false); // ⭐ VERY IMPORTANT
      }
    };
    fetchMe();
  }, [click]);

  const Login = async (userData) => {
    try {
      const loged = await api.post("/auth/login", userData);
      const res = await api.get("/auth/getUser");
      setUser(res?.data?.User);
      setUserData(res?.data?.UserData);

      return loged.data.Role;
    } catch (error) {
      const status = e?.response?.status;

      if (status === 403) {
        toast.error("Your account is blocked. Contact support.");
      } else if (status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const Logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast.success("You’ve been logged out safely.", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "premium-toast success",
      });

      navigate("/login");
    } catch (e) {
      setUser(null);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userData, user, Login, Logout, setUser, setClick, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
