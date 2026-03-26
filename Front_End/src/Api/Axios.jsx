import axios from "axios";

export const api = axios.create({
  baseURL: "https://feather-mound-ecommerce-1.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => {
    // Save tokens if they are returned in the response
    if (res.data?.AccessToken) localStorage.setItem("AccessToken", res.data.AccessToken);
    if (res.data?.RefreshToken) localStorage.setItem("RefreshToken", res.data.RefreshToken);
    return res;
  },
  async (err) => {
    const failedRequest = err.config;
    const requestUrl = failedRequest?.url ?? "";
    const refreshToken = localStorage.getItem("RefreshToken");

    if (
      err?.response?.status === 401 &&
      failedRequest &&
      !failedRequest._retry &&
      !requestUrl.includes("/auth/refresh")
    ) {
      if (!refreshToken) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        return Promise.reject(err);
      }

      failedRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh", { RefreshToken: refreshToken });
        const newAccessToken = res.data?.AccessToken;

        if (!newAccessToken) {
          throw new Error("Unable to refresh access token");
        }

        localStorage.setItem("AccessToken", newAccessToken);
        if (res.data?.RefreshToken) {
          localStorage.setItem("RefreshToken", res.data.RefreshToken);
        }

        failedRequest.headers = failedRequest.headers ?? {};
        failedRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(failedRequest);
      } catch (error) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  },
);
