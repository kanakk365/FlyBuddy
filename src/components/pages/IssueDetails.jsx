import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../common/MainLayout";

function IssueDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    if (location.state?.issue) {
      setIssue(location.state.issue);
    } else {
      // If no issue data in state, go back to issues list
      // In a real app, we might fetch by ID from URL params here
      navigate("/issues");
    }
  }, [location, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  if (!issue) {
    return null; // Or a loading spinner
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.15em" }}>
        <div className="max-w-4xl mx-auto">
          {/* Header with Back Button */}
          <div className="mb-6 flex items-center">
            <button
              onClick={() => navigate("/issues")}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
            <h1 className="text-2xl font-semibold text-gray-900">
              Issue Details
            </h1>
          </div>

          {/* Issue Details Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-[#e7e7e7] overflow-hidden">
            {/* Header Section of Card */}
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {issue.title}
                  </h2>
                  <div className="text-sm text-gray-500">
                    Reported on {formatDate(issue.createdAt)}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                  Open
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {issue.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Reported By
                </h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-bold mr-4">
                    {issue.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-900">
                      {issue.user?.name || "Unknown User"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {issue.user?.email}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      User ID: {issue.user?.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default IssueDetails;
