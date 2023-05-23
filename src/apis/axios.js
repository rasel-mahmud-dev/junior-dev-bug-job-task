import axios from "axios";

export const backend = process.env.REACT_APP_SERVER_URL;

export const apis = axios.create({
    baseURL: backend,
    headers: {
        'Content-Type': 'application/json'
    }
})


apis.interceptors.request.use(function (config){
    config.headers["authorization"] = window.localStorage.getItem("token")
    return config;
})
