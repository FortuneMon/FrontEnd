import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://43.201.162.24:8080", //TODO 추후 .env 파일로 베이스 URL 받아오고 ""로 수정
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

// 기존 코드
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     return Promise.reject((error.response && error.response.data) || "Something went wrong");
//   }
// );

// 토큰 재발급이 추가된 코드
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error)
      prom.reject(error); // 실패한 경우: 기다리던 요청들도 전부 실패 처리
    else prom.resolve(token); // 성공한 경우: 새 토큰을 전달해서 요청 재시도
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 및 재시도 설정 안 된 요청이면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const {
          data: { accessToken: newAccessToken },
        } = await axios.post(
          "http://43.201.162.24:8080/users/refresh",
          { refreshToken }, // 백엔드 요구에 따라 body or header
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // 🔁 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // refresh도 실패 → 로그아웃 처리 login 페이지로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

if (typeof localStorage !== "undefined") {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
