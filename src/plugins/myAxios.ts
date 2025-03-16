import axios from "axios";


const isDev = process.env.NODE_ENV == 'development'
const myAxios = axios.create({
  baseURL: isDev ? "http://localhost:8080" : '线上地址',
});

myAxios.defaults.withCredentials = true

myAxios.interceptors.request.use(
  (config) => {
    console.log("Request was sent");
    return config;
  },
  (error) => {
    console.log("Request was not sent");
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    console.log("Response was received");
    if(response.data?.code === 40100){
        const redirectUrl  = window.location.pathname
        window.location.href = window.location.origin + '/user/login?redirect=' + redirectUrl
    }
    return response.data;
  },
  (error) => {
    console.log("Response was not received");
    return Promise.reject(error);
  }
);

export default myAxios;