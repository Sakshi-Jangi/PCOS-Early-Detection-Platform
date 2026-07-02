import api from "./api";

// ==========================================
// Login User
// ==========================================

export const loginUser = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await api.post("/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

// ==========================================
// Register User
// ==========================================

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);

  return response.data;
};

// ==========================================
// Forgot Password
// ==========================================

export const forgotPassword = async (email) => {
  const response = await api.post("/forgot-password", {
    email,
  });

  return response.data;
};