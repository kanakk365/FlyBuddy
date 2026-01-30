import axiosInstance from "./axiosInstance";

export const getUserReports = async (period) => {
  const response = await axiosInstance.get(
    `/admin/reports/user?period=${period}`,
  );
  return response.data;
};

export const getBookingReports = async (startDate, endDate) => {
  const response = await axiosInstance.get(
    `/admin/reports/booking?startDate=${startDate}&endDate=${endDate}`,
  );
  return response.data;
};

export const getRevenueReports = async (period) => {
  const response = await axiosInstance.get(
    `/admin/reports/revenue?period=${period}`,
  );
  return response.data;
};

export const getDashboardData = async (filter = "today") => {
  const response = await axiosInstance.get(
    `/admin/reports/dashboard?filter=${filter}`,
  );
  return response.data;
};
