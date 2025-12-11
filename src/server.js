import axios from "axios";

const server = axios.create({
  baseURL: "https://ecdsa-node-server-neon.vercel.app",
});

export default server;
