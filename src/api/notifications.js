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

export const createNotification = async (notificationData) => {
  const response = await axiosInstance.post(
    "/admin/notifications",
    notificationData,
  );
  return response.data;
};

export const updateNotification = async (id, notificationData) => {
  const response = await axiosInstance.put(
    `/admin/notifications/${id}`,
    notificationData,
  );
  return response.data;
};

export const getNotificationById = async (id) => {
  const response = await axiosInstance.get(`/admin/notifications/${id}`);
  return response.data;
};
