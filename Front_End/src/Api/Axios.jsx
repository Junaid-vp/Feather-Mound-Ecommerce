import axios from "axios";

let accessTokenMemory = null;
let refreshTokenMemory = null;

export const api = axios.create({
  baseURL: "https://feather-mound-ecommerce-1.onrender.com/api",
  withCredentials: true,
});

export const setAuthTokens = (accessToken, refreshToken) => {
  accessTokenMemory = accessToken ?? null;
  refreshTokenMemory = refreshToken ?? null;

  try {
    if (accessToken) localStorage.setItem("AccessToken", accessToken);
    if (refreshToken) localStorage.setItem("RefreshToken", refreshToken);
    if (!accessToken) localStorage.removeItem("AccessToken");
    if (!refreshToken) localStorage.removeItem("RefreshToken");
  } catch {
    // ignore: localStorage may be blocked in some mobile browsers
  }

  // Ensure all future requests use the in-memory token too.
  if (accessToken) {
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const clearAuthTokens = () => {
  setAuthTokens(null, null);
};

api.interceptors.request.use(
  (config) => {
    // Always attach token if present in memory.
    config.headers = config.headers ?? {};

    if (!config.headers.Authorization && accessTokenMemory) {
      config.headers.Authorization = `Bearer ${accessTokenMemory}`;
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
        clearAuthTokens();
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
