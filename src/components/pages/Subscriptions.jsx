import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { Plus } from "lucide-react";
function Subscriptions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active-users");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    paymentType: {
      paid: false,
      unpaid: false,
    },
    sortBy: {
      newest: false,
      oldest: false,
    },
    currency: {
      inr: false,
      usd: false,
      eur: false,
    },
  });

  // Metrics for different tabs
  const getMetrics = () => {
    if (activeTab === "active-users") {
      return [
        { label: "Active Subscribers", value: "3,560" },
        { label: "Premium Users", value: "2,310" },
        { label: "Basic Users", value: "1,250" },
        { label: "Monthly Revenue", value: "$23,100" },
      ];
    } else {
      return [
        { label: "Total Plans", value: "3" },
        { label: "Active Plans", value: "3" },
        { label: "Upcoming Offers", value: "1" },
        { label: "Archived Plans", value: "2" },
      ];
    }
  };

  // Active users data
  const activeUsersData = [
    {
      id: 1,
      user: "John Doe",
      plan: "Premium",
      status: "Active",
      amount: "$25",
      purchasedDate: "Oct 5, 2025",
    },
    {
      id: 2,
      user: "Jane Smith",
      plan: "Basic",
      status: "Active",
      amount: "$15",
      purchasedDate: "Oct 4, 2025",
    },
    {
      id: 3,
      user: "Bob Johnson",
      plan: "Premium",
      status: "Active",
      amount: "$25",
      purchasedDate: "Oct 3, 2025",
    },
    {
      id: 4,
      user: "Alice Brown",
      plan: "Basic",
      status: "Active",
      amount: "$15",
      purchasedDate: "Oct 2, 2025",
    },
    {
      id: 5,
      user: "Charlie Wilson",
      plan: "Premium",
      status: "Active",
      amount: "$25",
      purchasedDate: "Oct 1, 2025",
    },
    {
      id: 6,
      user: "Diana Davis",
      plan: "Basic",
      status: "Active",
      amount: "$15",
      purchasedDate: "Sep 30, 2025",
    },
  ];

  // Plans data
  const plansData = [
    {
      id: 1,
      name: "Basic",
      amount: "$10",
      lastUpdated: "Oct 5, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Premium",
      amount: "$25",
      lastUpdated: "Oct 5, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Elite",
      amount: "$45",
      lastUpdated: "Oct 5, 2025",
      status: "InActive",
    },
  ];

  const getFilteredData = () => {
    const data = activeTab === "active-users" ? activeUsersData : plansData;

    return data.filter((item) => {
      if (activeTab === "active-users") {
        return (
          item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.amount.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lastUpdated.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });
  };

  const filteredData = getFilteredData();
  const totalPages = Math.ceil(filteredData.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentData = filteredData.slice(startIndex, endIndex);

  const renderTableContent = () => {
    if (activeTab === "active-users") {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Purchased Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.purchasedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleViewSubscription(user.id)}
                      className="px-8 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Last Updated
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
              {currentData.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewPlan(plan.id)}
                        className="px-6 py-1.5 text-black rounded-full text-sm bg-[#ebeff5] border border-[#acbed7] cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditPlan(plan.id)}
                        className="px-6 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const handleViewSubscription = (subscriptionId) => {
    console.log("Viewing subscription:", subscriptionId);
    navigate("/subscription-details");
  };

  const handleViewPlan = (planId) => {
    console.log("Viewing plan:", planId);
    navigate(`/subscription-plan/${planId}`);
  };

  const handleEditPlan = (planId) => {
    console.log("Editing plan:", planId);
    navigate(`/subscription-plan/${planId}/edit`);
  };

  const handleAddPlan = () => {
    console.log("Adding new plan");
    navigate("/subscription-plan/new");
  };

  const handleApplyFilters = (filters) => {
    console.log("Applying filters:", filters);
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
    setShowFilters(false);
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-medium text-gray-900">
                  Subscriptions
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage active and expired user subscriptions
                </p>
              </div>

              {/* Search and Filters - Top Right */}
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Filters Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-12 px-8">
                {[
                  { id: "active-users", label: "Active Users" },
                  { id: "plans", label: "Plans" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-6 px-2 border-b-2 text-base transition-colors ${
                      activeTab === tab.id
                        ? "border-[#abbcd6] "
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {getMetrics().map((metric, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]"
              >
                <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                <p className="text-2xl font-medium text-gray-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Plans CTA (right-aligned) */}
          {activeTab === "plans" && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={handleAddPlan}
                className="px-6 py-2 flex gap-2 justify-center items-center text-black rounded-md text-sm bg-[#abbcd6] cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4 " />
                Add Plan
              </button>
            </div>
          )}

          {/* Table Section */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
            <div className="p-8">{renderTableContent()}</div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} of {filteredData.length}
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

          {/* Empty State */}
          {getFilteredData().length === 0 && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No data found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}

          {/* Filter Modal */}
          <FilterModal
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onApplyFilters={handleApplyFilters}
            currentFilters={appliedFilters}
            type="subscriptions"
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Subscriptions;
