import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/me", data);
  return response.data;
};