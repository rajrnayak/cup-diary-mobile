import store from "../manage-state/auth-state/store";
import axios from "axios";

const AxiosInstance = axios.create({
	baseURL: "http://192.168.1.9:8000/api/",
	withCredentials: true,
});

AxiosInstance.interceptors.request.use(function (config) {
	if (config.withCredentials) {
		const { token } = store.getState().authUser;
		config.headers["Authorization"] = `Bearer ${token}`;

		return config;
	}
	if (error) {
		return Promise.reject(error);
	}
});

export default AxiosInstance;
