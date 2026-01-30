import axiosInstance from "./axiosInstance";

export const getNotifications = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("/admin/notifications", {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getNotificationFeed = async () => {
  const response = await axiosInstance.get("/admin/notifications/feed/latest");
  return response.data;
};
