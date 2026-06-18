import axios from "axios";

const API = axios.create({
  baseURL: "https://valorem-backend.onrender.com/api",
  withCredentials: true, // Required to pass credentials across domains securely
  headers: {
    "Content-Type": "application/json",
  },
});

// ───────── ASSET APIs ─────────

// Get all assets
export const getAssets = () => API.get("/assets");

// Get asset by ID
export const getAssetById = (id: string | number) => API.get(`/assets/${id}`);

// Get by category (optional)
export const getAssetsByCategory = (category: string) =>
  API.get(`/assets/category/${category}`);


// ───────── TRADE & PORTFOLIO APIs ─────────

// Fetch all logged transactions/holdings for the dashboard
export const getPortfolioHoldings = () => API.get("/trade/history");

// Buy tokens
export const buyAsset = (assetId: string | number, quantity: number) =>
  API.post(`/trade/buy?assetId=${assetId}&quantity=${quantity}`);

// Sell tokens
export const sellAsset = (assetId: string | number, quantity: number) =>
  API.post(`/trade/sell?assetId=${assetId}&quantity=${quantity}`);

export default API;