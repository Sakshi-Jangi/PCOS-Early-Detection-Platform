import api from "./api";

// ==========================================
// Get Period History
// ==========================================

export const getPeriods = async () => {
  const response = await api.get("/periods");
  return response.data;
};

// ==========================================
// Add New Period
// ==========================================

export const addPeriod = async (periodData) => {
  const response = await api.post("/period", periodData);
  return response.data;
};