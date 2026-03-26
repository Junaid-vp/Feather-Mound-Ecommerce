import axios from "axios";

// Initialize from window global if available (helps with module re-evaluations)
let accessTokenMemory = window.ACCESS_TOKEN_MEMORY || null;
let refreshTokenMemory = window.REFRESH_TOKEN_MEMORY || null;

export const api = axios.create({
  baseURL: "https://feather-mound-ecommerce-1.onrender.com/api",
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
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const clearAuthTokens = () => {
  setAuthTokens(null, null);
};

  api.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    if (accessTokenMemory) {
      // Channel 1: Standard Authorization header
      config.headers['Authorization'] = `Bearer ${accessTokenMemory}`;
      
      // Channel 2: Custom header (Bypasses some standard-header stripping)
      config.headers['x-access-token'] = accessTokenMemory;

      // Channel 3: Query parameter fallback for GET/DELETE
      // (Bypasses all header-stripping issues)
      if (config.method === 'get' || config.method === 'delete') {
        config.params = {
          ...config.params,
          token: accessTokenMemory
        };
      }
    }

    // Fallback: try localStorage (in case memory got cleared by reload).
    if (!config.headers.Authorization) {
      try {
        const token = localStorage.getItem("AccessToken");
        if (token) {
          accessTokenMemory = token;
          config.headers.Authorization = `Bearer ${token}`;
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore
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
    const refreshToken =
      refreshTokenMemory ??
      (() => {
        try {
          return localStorage.getItem("RefreshToken");
        } catch {
          return null;
        }
      })();

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
        failedRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(failedRequest);
      } catch (error) {
        clearAuthTokens();
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  },
);
