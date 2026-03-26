import React, { useEffect, useState } from "react";
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

  const clearAuthState = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/getUser");
        setUser(res?.data?.User);
        setUserData(res?.data?.UserData);
      } catch {
        setUser(null);
        setUserData(null);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchMe();
  }, [click]);

  const Login = async (userData) => {
    const loged = await api.post("/auth/login", userData);
    const res = await api.get("/auth/getUser");
    setUser(res?.data?.User);
    setUserData(res?.data?.UserData);

    return loged.data.Role;
  };

  const Logout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("You’ve been logged out safely.", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "premium-toast success",
      });
    } catch {
      toast.error("We couldn’t reach the server, so your local session was cleared.");
    } finally {
      clearAuthState();
      navigate("/login");
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
