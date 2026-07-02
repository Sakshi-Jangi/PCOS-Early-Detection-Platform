import api from "./api";

// ==========================================
// Predict PCOS Risk
// ==========================================

export const predictPCOS = async (predictionData) => {
  const response = await api.post("/predict", predictionData);

  return response.data;
};