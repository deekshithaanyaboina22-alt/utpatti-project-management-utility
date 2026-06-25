import axios from "axios";

const api = axios.create({
  baseURL: "https://utpatti-project-management-utility-1.onrender.com",
});

export default api;