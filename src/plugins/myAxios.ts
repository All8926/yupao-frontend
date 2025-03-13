import axios from "axios";


const myAxios = axios.create({
  baseURL: "http://localhost:8080",
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

    return response.data;
  },
  (error) => {
    console.log("Response was not received");
    return Promise.reject(error);
  }
);

export default myAxios;