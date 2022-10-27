import axios from "axios";

const host = process.env.VUE_APP_BACKEND_HOST || "";

const apiClient = axios.create({
  baseURL: `${host}`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { apiClient };
