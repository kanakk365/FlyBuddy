import axiosInstance from "./axiosInstance";

export const loginAdmin = async (email, password) => {
  const response = await axiosInstance.post("/auth/admin/login", {
    email,
    password,
  });
  return response.data;
};

export const registerAdmin = async (email, password) => {
  const response = await axiosInstance.post("/auth/admin/register", {
    email,
    password,
  });
  return response.data;
};
