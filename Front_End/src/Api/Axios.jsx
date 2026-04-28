import axios from "axios";

const readStoredToken = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const applyAuthToRequest = (config, token) => {
  if (!token) return;

  config.headers = config.headers || {};
  config.headers.Authorization = `Bearer ${token}`;
  config.headers["x-access-token"] = token;

  if (config.method === "get" || config.method === "delete") {
    config.params = {
      ...config.params,
      token,
    };
  }
};

// Initialize from window global if available (helps with module re-evaluations)
let accessTokenMemory = window.ACCESS_TOKEN_MEMORY || readStoredToken("AccessToken");
let refreshTokenMemory = window.REFRESH_TOKEN_MEMORY || readStoredToken("RefreshToken");
const DEFAULT_API_BASE_URL =
  typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000/api"
    : "https://feathermound.skillforge-ai.com/api";
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || DEFAULT_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const setAuthTokens = (accessToken, refreshToken) => {
  // Only update if explicit values are provided (not undefined)
  if (accessToken !== undefined) {
    accessTokenMemory = accessToken ?? null;
    window.ACCESS_TOKEN_MEMORY = accessTokenMemory;
  }
  if (refreshToken !== undefined) {
    refreshTokenMemory = refreshToken ?? null;
    window.REFRESH_TOKEN_MEMORY = refreshTokenMemory;
  }

  try {
    if (accessToken !== undefined) {
      if (accessToken) localStorage.setItem("AccessToken", accessToken);
      else localStorage.removeItem("AccessToken");
    }
    if (refreshToken !== undefined) {
      if (refreshToken) localStorage.setItem("RefreshToken", refreshToken);
      else localStorage.removeItem("RefreshToken");
    }
  } catch {
    // ignore: localStorage blocked in some mobile browsers
  }

  // Always keep common defaults in sync with memory state
  if (accessTokenMemory) {
    api.defaults.headers.common.Authorization = `Bearer ${accessTokenMemory}`;
    api.defaults.headers.common["x-access-token"] = accessTokenMemory;
  } else {
    delete api.defaults.headers.common.Authorization;
    delete api.defaults.headers.common["x-access-token"];
  }
};

export const clearAuthTokens = () => {
  setAuthTokens(null, null);
};

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    if (accessTokenMemory) {
      applyAuthToRequest(config, accessTokenMemory);
    }

    // Fallback: try persisted storage immediately if memory got cleared by reload/webview re-open.
    if (!config.headers.Authorization) {
      const token = readStoredToken("AccessToken");
      if (token) {
        accessTokenMemory = token;
        window.ACCESS_TOKEN_MEMORY = token;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        api.defaults.headers.common["x-access-token"] = token;
        applyAuthToRequest(config, token);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => {
    // Only update tokens when backend actually returns them.
    // Otherwise we'd clear the in-memory token on normal responses.
    if (res.data?.AccessToken || res.data?.RefreshToken) {
      setAuthTokens(res.data?.AccessToken, res.data?.RefreshToken);
    }
    return res;
  },
  async (err) => {
    const failedRequest = err.config;
    const requestUrl = failedRequest?.url ?? "";
    const refreshToken = refreshTokenMemory ?? readStoredToken("RefreshToken");

    if (
      err?.response?.status === 401 &&
      failedRequest &&
      !failedRequest._retry &&
      !requestUrl.includes("/auth/refresh")
    ) {
      if (!refreshToken) {
        // If we have NO refresh token, we can't refresh. 
        // But DON'T wipe memory tokens yet — it might be a race where they are about to be set.
        return Promise.reject(err);
      }

      failedRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", { RefreshToken: refreshToken });
        const newAccessToken = res.data?.AccessToken;

        if (!newAccessToken) {
          throw new Error("Unable to refresh access token");
        }

        setAuthTokens(newAccessToken, res.data?.RefreshToken);

        failedRequest.headers = failedRequest.headers ?? {};
        applyAuthToRequest(failedRequest, newAccessToken);
        return api(failedRequest);
      } catch (error) {
        clearAuthTokens();
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  },
);
