import axios from "axios";

const API_URL = "https://stageapi.monkcommerce.app/task/products";
const API_KEY = import.meta.env.VITE_SECRET_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export const searchProducts = async (query = "", page = 0, limit = 10) => {
  try {
    const response = await api.get(
      `/search?search=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default api;
