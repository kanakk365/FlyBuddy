import axiosInstance from "./axiosInstance";

export const getUserReports = async (period) => {
  try {
    const response = await axiosInstance.get(
      `/admin/reports/user?period=${period}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingReports = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      `/admin/reports/booking?startDate=${startDate}&endDate=${endDate}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRevenueReports = async (period) => {
  try {
    const response = await axiosInstance.get(
      `/admin/reports/revenue?period=${period}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
