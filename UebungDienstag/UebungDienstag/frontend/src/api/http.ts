import axios from "axios";

export const http = axios.create({
  baseURL: "", // nutzt Proxy / gleiche Origin
  headers: { "Content-Type": "application/json" },
});
