import axios from "axios";
// import { default as jwtDecode } from "jwt-decode";

// Set the default base URL
axios.defaults.baseURL = "http://localhost:4000/api/v1";
// export const axiosAuth = axios.create({
//   baseURL: "http://localhost:4000/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default axios;
