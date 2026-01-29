import axiosInstance from "./axiosInstance";

export const getUsers = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/auth/admin/users?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getUserDetails = async (userId) => {
  const response = await axiosInstance.get(`/auth/admin/users/${userId}`);
  return response.data;
};
