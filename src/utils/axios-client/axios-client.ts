/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            // Handle rate limiting (429 Too Many Requests)
            if (error.response.status === 429 && !originalRequest._retry) {
                originalRequest._retry = true;
                const retryAfter = parseInt(error.response.headers["retry-after"] || "1", 10);

                await new Promise((resolve) => {
                    setTimeout(resolve, retryAfter * 1000);
                });

                return axiosClient(originalRequest);
            }

            // Handle unauthorized access (401 Unauthorized)
            if (error.response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("ADMIN");
                // TODO: Unauthorized access if use this will make the page reload multiple times
                // // Optionally, redirect to login page or refresh token
                // window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    },
);

export default axiosClient;
