import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { Plus } from "lucide-react";

function Notifications() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    status: {
      sent: false,
      scheduled: false,
    },
    audience: {
      premium: false,
      free: false,
      all: false,
    },
    sortBy: {
      newest: false,
      oldest: false,
    },
  });

  const notificationsData = [
    {
      id: 1,
      title: "Premium Offer",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Sent",
    },
    {
      id: 2,
      title: "New Feature Launch",
      audience: "All Users",
      date: "Oct 6",
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Reminder: Upload Ticket",
      audience: "Free Users",
      date: "Oct 5",
      status: "Sent",
    },
    {
      id: 4,
      title: "New Feature Launch",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Scheduled",
    },
    {
      id: 5,
      title: "Reminder: Upload Ticket",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Scheduled",
    },
    {
      id: 6,
      title: "New Feature Launch",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Sent",
    },
    {
      id: 7,
      title: "Reminder: Upload Ticket",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Scheduled",
    },
    {
      id: 8,
      title: "Reminder: Upload Ticket",
      audience: "Premium Users",
      date: "Oct 6",
      status: "Scheduled",
    },
  ];

  const filteredNotifications = notificationsData.filter((notification) => {
    // Status filter
    const statusFilter =
      appliedFilters.status.sent || appliedFilters.status.scheduled;
    const matchesStatus =
      !statusFilter ||
      (appliedFilters.status.sent && notification.status === "Sent") ||
      (appliedFilters.status.scheduled && notification.status === "Scheduled");

    // Audience filter
    const audienceFilter =
      appliedFilters.audience.all ||
      appliedFilters.audience.premium ||
      appliedFilters.audience.free;
    const matchesAudience =
      !audienceFilter ||
      (appliedFilters.audience.all && notification.audience === "All Users") ||
      (appliedFilters.audience.premium &&
        notification.audience === "Premium Users") ||
      (appliedFilters.audience.free && notification.audience === "Free Users");

    return matchesStatus && matchesAudience;
  });

  const totalPages = Math.ceil(filteredNotifications.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    endIndex,
  );

  const handleViewNotification = (notificationId) => {
    console.log("Viewing notification:", notificationId);
    navigate("/notification-details");
  };

  const handleCreateNotification = () => {
    console.log("Creating new notification...");
    navigate("/create-notification");
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(appliedFilters).forEach((category) => {
      Object.values(category).forEach((isActive) => {
        if (isActive) count++;
      });
    });
    return count;
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Actions */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">
                  Manage messages and announcements sent to FlyBuddy users.
                </p>
              </div>

              {/* Search and Actions - Top Right */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreateNotification}
                  className="flex items-center px-4 py-1.5 bg-[#acbed7] text-black rounded-lg  transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Notification
                </button>

                {/* Filters Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                    />
                  </svg>
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Audience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentNotifications.map((notification, index) => (
                    <tr
                      key={notification.id}
                      className={`hover:bg-gray-50 ${
                        index === 0 ? "pt-4" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {notification.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {notification.audience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {notification.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        <span
                          className={`inline-flex items-center px-4 py-1 rounded-full text-sm ${
                            notification.status === "Sent"
                              ? "bg-green-100 text-green-800"
                              : notification.status === "Scheduled"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {notification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() =>
                            handleViewNotification(notification.id)
                          }
                          className="px-8 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer "
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} of {filteredNotifications.length}
              </div>
              <div className="flex items-center  divide-x divide-neutral-500">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
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
          </div>
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
          currentFilters={appliedFilters}
          type="notifications"
        />
      </div>
    </MainLayout>
  );
}

export default Notifications;
