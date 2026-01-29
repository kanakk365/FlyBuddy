import axiosInstance from "./axiosInstance";

export const getSubscriptions = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/admin/subscriptions?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getSubscriptionDetails = async (id) => {
  const response = await axiosInstance.get(`/admin/subscriptions/${id}`);
  return response.data;
};

export const getSubscriptionStats = async () => {
  const response = await axiosInstance.get("/admin/subscriptions/stats");
  return response.data;
};
