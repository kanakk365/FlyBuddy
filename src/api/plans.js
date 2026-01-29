import axiosInstance from "./axiosInstance";

export const getPlans = async () => {
  const response = await axiosInstance.get("/admin/plans");
  return response.data;
};

export const getPlanStats = async () => {
  const response = await axiosInstance.get("/admin/plans/stats");
  return response.data;
};

export const getPlanDetails = async (id) => {
  const response = await axiosInstance.get(`/admin/plans/${id}`);
  return response.data;
};

export const createPlan = async (data) => {
  const response = await axiosInstance.post("/admin/plans", data);
  return response.data;
};

export const updatePlan = async (id, data) => {
  const response = await axiosInstance.put(`/admin/plans/${id}`, data);
  return response.data;
};

export const deletePlan = async (id) => {
  const response = await axiosInstance.delete(`/admin/plans/${id}`);
  return response.data;
};
