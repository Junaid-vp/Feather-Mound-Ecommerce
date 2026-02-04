import axios from "axios";



export const api = axios.create({
  baseURL: "https://feather-mound-ecommerce-1.onrender.com/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const failRequestdata = err.config;

    if (err.response.status === 401 && !failRequestdata.retry &&!failRequestdata.url.includes("/auth/refresh")){
      failRequestdata.retry = true;

      try {
        await api.post("/auth/refresh");
        return api(failRequestdata); 
      } catch (error) {
         return Promise.reject(error);
      }

    }
    return Promise.reject(err);
  },
);
