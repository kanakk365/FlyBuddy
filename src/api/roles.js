import axiosInstance from "./axiosInstance";

export const getRoles = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("/admin/roles", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getRoleById = async (id) => {
  const response = await axiosInstance.get(`/admin/roles/${id}`);
  return response.data;
};
