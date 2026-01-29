import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import { getIssues } from "../../api/issues";

function Issues() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchIssues(currentPage);
  }, [currentPage]);

  const fetchIssues = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getIssues(page, 10);
      setIssues(data.issues);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Failed to fetch issues", err);
      setError("Failed to load issues. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewIssue = (issue) => {
    navigate("/issue-details", { state: { issue } });
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.12em" }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl text-gray-900 flex items-center gap-2">
              Issues
            </h1>
            <p className="text-gray-600 mt-1">
              View and manage reported issues from users.
            </p>
          </div>

          {/* Issues Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <svg
                  className="animate-spin h-8 w-8 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-separate border-spacing-0">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                          Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {issues.map((issue, index) => (
                        <tr
                          key={issue.id}
                          className={`hover:bg-gray-50 ${
                            index === 0 ? "pt-4" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-sm text-neutral-900 font-medium">
                            {issue.title}
                          </td>
                          <td
                            className="px-6 py-4 text-sm text-neutral-500 max-w-[200px] truncate"
                            title={issue.description}
                          >
                            {issue.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            <div className="flex flex-col">
                              <span className="text-gray-900 font-medium">
                                {issue.user?.name || "Unknown"}
                              </span>
                              <span className="text-xs text-gray-400">
                                {issue.user?.email || ""}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {formatDate(issue.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleViewIssue(issue)}
                              className="px-6 py-1.5 text-black rounded-full text-sm bg-[#acbed7] hover:bg-[#97adc9] transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                      {issues.length === 0 && (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-10 text-center text-gray-500"
                          >
                            No issues found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    {issues.length > 0
                      ? (pagination.page - 1) * pagination.limit + 1
                      : 0}{" "}
                    to{" "}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )}{" "}
                    of {pagination.total}
                  </div>
                  <div className="flex items-center divide-x divide-neutral-500">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-2 rounded-l-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(pagination.totalPages, currentPage + 1),
                        )
                      }
                      disabled={currentPage === pagination.totalPages}
                      className="p-2 rounded-r-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Issues;
