



import axios from "axios";

export const axiosi = axios.create({
  baseURL: `https://mernshop-arls.onrender.com/`  ,// Ensure this matches your backend URL
  // baseURL: `http://34.234.66.209/`  ,// Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

;