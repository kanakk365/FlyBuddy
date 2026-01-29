import axiosInstance from "./axiosInstance";

export const getBookings = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/auth/admin/bookings?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getBookingDetails = async (bookingId) => {
  const response = await axiosInstance.get(`/auth/admin/bookings/${bookingId}`);
  return response.data;
};
