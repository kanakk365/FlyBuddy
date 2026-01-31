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

export const createRole = async (data) => {
  const response = await axiosInstance.post("/admin/roles", data);
  return response.data;
};

export const updateRole = async (id, data) => {
  const response = await axiosInstance.put(`/admin/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`/admin/roles/${id}`);
  return response.data;
};
