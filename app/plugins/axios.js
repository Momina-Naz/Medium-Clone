// plugins/axios.js
import axios from "axios";

export default defineNuxtPlugin(() => {
  const api = axios.create({
    baseURL: "https://blog-api-node-express.vercel.app/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    provide: {
      api, // now available as $api
    },
  };
});
