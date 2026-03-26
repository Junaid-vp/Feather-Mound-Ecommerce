import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthTokens, clearAuthTokens } from "../Api/Axios";
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
    clearAuthTokens();
  };

  const fetchAuthenticatedUser = async (accessToken) => {
    if (accessToken) {
      return api.get("/auth/getUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-access-token": accessToken,
        },
        params: { token: accessToken },
      });
    }

    return api.get("/auth/getUser");
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetchAuthenticatedUser();
        setUser(res?.data?.User);
        setUserData(res?.data?.UserData);
      } catch (error) {
        if (error?.response?.status === 401) {
          clearAuthTokens();
        }
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
    setAuthTokens(accessToken, refreshToken);

    if (!accessToken) {
      clearAuthState();
      const tokenError = new Error("No access token returned from login.");
      tokenError.code = "MISSING_ACCESS_TOKEN";
      throw tokenError;
    }

    try {
      let res;

      try {
        res = await fetchAuthenticatedUser(accessToken);
      } catch {
        // Some in-app mobile browsers drop the first protected request; retry once.
        res = await fetchAuthenticatedUser(accessToken);
      }

      setUser(res?.data?.User);
      setUserData(res?.data?.UserData);
    } catch {
      clearAuthState();
      const sessionError = new Error("Session verification failed on this browser.");
      sessionError.code = "SESSION_VERIFY_FAILED";
      throw sessionError;
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
