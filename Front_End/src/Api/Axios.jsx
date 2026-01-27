import axios from "axios";



export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const failRequestdata = err.config;

    if (err.response.status === 401 && !failRequestdata._retry &&!failRequestdata.url.includes("/auth/refresh")){
      failRequestdata._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(failRequestdata); 
      } catch (error) {
        window.location.href = "/login";
         return Promise.reject(error);
      }

    }
    return Promise.reject(err);
  },
);
