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
    try {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
    } catch {
      // ignore storage write errors
    }
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
    const loginData = loged?.data;

    // Ensure we can authenticate the immediate follow-up request.
    const accessToken = loginData?.AccessToken;
    const refreshToken = loginData?.RefreshToken;
    try {
      if (accessToken) localStorage.setItem("AccessToken", accessToken);
      if (refreshToken) localStorage.setItem("RefreshToken", refreshToken);
    } catch {
      // ignore storage write errors; we'll still pass Authorization header below
    }

    try {
      const res = await api.get("/auth/getUser", accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined);
      setUser(res?.data?.User);
      setUserData(res?.data?.UserData);
    } catch {
      // Don't block a successful login just because /getUser failed.
      // (Commonly caused by cookie/storage differences on some mobile browsers.)
      setUser(null);
      setUserData(null);
    }

    return loginData?.Role;
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
