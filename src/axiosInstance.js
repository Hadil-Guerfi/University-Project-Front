//axiosInstance.js

import axios from "axios";


const instance = axios.create({
  baseURL: "http://127.0.0.1:4000/api", // Replace with your API base URL
  withCredentials: true,
});

export default instance;

