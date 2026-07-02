import api from "./api";

export const getPredictionHistory = async () => {
  const response = await api.get("/predictions");
  return response.data;
};