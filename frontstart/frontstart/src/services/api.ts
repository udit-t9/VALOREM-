import axios from "axios";

const API = axios.create({
  baseURL: "https://valorem-backend.onrender.com/api",
});

// ───────── ASSET APIs ─────────

// Get all assets
export const getAssets = () => API.get("/assets");

// Get asset by ID
export const getAssetById = (id) => API.get(`/assets/${id}`);

// Get by category (optional)
export const getAssetsByCategory = (category) =>
  API.get(`/assets/category/${category}`);


// ───────── TRADE APIs ─────────

// Buy tokens
export const buyAsset = (assetId, quantity) =>
  API.post(`/trade/buy?assetId=${assetId}&quantity=${quantity}`);


// ───────── (FUTURE READY) ─────────

// Sell tokens (we’ll implement later)
export const sellAsset = (assetId, quantity) =>
  API.post(`/trade/sell?assetId=${assetId}&quantity=${quantity}`);