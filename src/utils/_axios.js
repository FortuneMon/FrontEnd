import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization",
  },
});

if (process.env.PUBLIC_BASE_URL) {
  axiosInstance.defaults.baseURL = process.env.PUBLIC_BASE_URL;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject((error.response && error.response.data) || "Something went wrong");
  }
);

export default axiosInstance;

if (typeof localStorage !== "undefined") {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
