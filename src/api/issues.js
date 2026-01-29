import axiosInstance from "./axiosInstance";

export const getIssues = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/admin/issues?page=${page}&limit=${limit}`,
  );
  return response.data;
};
