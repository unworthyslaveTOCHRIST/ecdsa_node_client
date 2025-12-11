import axios from "axios";

const server = axios.create({
  baseURL: "https://ecdsa-node-server-neon.vercel.app:3042",
});

export default server;
