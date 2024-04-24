import axios from "axios";
import { TOKEN_REFRESH_API } from "./constants/api_constant";
import { LOGIN } from "./constants/page_constant";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetcher = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

fetcher.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem("access_token");
        request.headers.Authentication = `Bearer ${accessToken}`;
        return request;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
)

fetcher.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if(error.response.status === 401) {
            await tokenRefresh();
            const accessToken = localStorage.getItem("access_token");
            error.config.headers['Authentication'] = `Bearer ${accessToken}`;
            const response = await axios.request(error.config);
            return response;
        }
        if(error.response.status === 403) {
            alert("해당 페이지 권한이 없습니다");
        }
        return Promise.reject(error);
    }
)

const tokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    try{
        const formData = new FormData();
        formData.append("refreshToken", refreshToken);

        const response = await axios.post(
            API_BASE_URL + TOKEN_REFRESH_API,
            formData
        );

        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        localStorage.setItem("authority", response.data.authority);
    }catch(error) {
        window.location.href = LOGIN;
    }
}

export default fetcher;