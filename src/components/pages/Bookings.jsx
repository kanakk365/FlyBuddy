import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { getBookings } from "../../api/bookings";

function Bookings() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    status: {
      verified: false,
      pending: false,
      rejected: false,
    },
    sortBy: {
      newest: false,
      oldest: false,
    },
  });

  // Fetch bookings when currentPage changes
  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const fetchBookings = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getBookings(page, 10);
      setBookings(data.bookings);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewBooking = (bookingId) => {
    console.log("Viewing booking:", bookingId);
    navigate("/booking-details", { state: { bookingId } });
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
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.12em" }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl  text-gray-900">All Bookings</h1>
                <p className="text-gray-600 mt-1">
                  Manage all uploaded tickets and their verification status.
                </p>
              </div>

              {/* Search and Filters - Top Right */}
              <div className="flex items-center space-x-4">
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

          {/* Bookings Table */}
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
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                        Ticket ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Airline
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking, index) => (
                      <tr
                        key={booking.id}
                        className={`hover:bg-gray-50 ${
                          index === 0 ? "pt-4" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {booking.ticketId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {booking.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {booking.route}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {booking.airline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleViewBooking(booking.id)}
                            className="px-8 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-8 text-gray-500"
                        >
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing{" "}
                {bookings.length > 0
                  ? (pagination.page - 1) * pagination.limit + 1
                  : 0}{" "}
                to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total}
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
          </div>
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
          currentFilters={appliedFilters}
          type="bookings"
        />
      </div>
    </MainLayout>
  );
}

export default Bookings;
