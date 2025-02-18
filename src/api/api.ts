import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/"
});

api.interceptors.request.use(
    (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = localStorage.getItem("jwt_token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest.isRetry) {
            originalRequest.isRetry = true;

            const refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                try {
                    const response: any = await api.post(
                        "auth/refresh-token",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        }
                    );
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem("jwt_token", newAccessToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (e) {
                    console.error("Token refresh failed:", e);
                    window.location.href = "/login";
                }
            } else {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
)