import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

const isMobileTesting = process.env.REACT_APP_MOBILE_TESTING;
const DEFAULT_API_ENDPOINT = "http://10.0.0.16:3030";

const API_ENDPOINT = import.meta.env.VITE_API_URL || DEFAULT_API_ENDPOINT;

const axiosInstance = axios.create({
  timeout: 10000, // Increase timeout to 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const restClient = rest(API_ENDPOINT);
const client = feathers();

client.configure(restClient.axios(axiosInstance));

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default client;
