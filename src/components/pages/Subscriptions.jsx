import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { Plus } from "lucide-react";
import {
  getSubscriptions,
  getSubscriptionStats,
} from "../../api/subscriptions";
import { getPlans, getPlanStats, deletePlan } from "../../api/plans";

function Subscriptions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active-users");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [stats, setStats] = useState({
    activeSubscriptions: 0,
    expired: 0,
    autoRenewEnabled: 0,
    monthlyRecurringRevenue: 0,
  });
  const [planStats, setPlanStats] = useState({
    totalPlans: 0,
    activePlans: 0,
    upcomingOffers: 0,
    archivedPlans: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

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

  useEffect(() => {
    fetchStats();
    fetchPlanStats();
  }, []);

  useEffect(() => {
    if (activeTab === "active-users") {
      fetchSubscriptions(currentPage);
    } else if (activeTab === "plans") {
      fetchPlans();
    }
  }, [activeTab, currentPage]);

  const fetchStats = async () => {
    try {
      const data = await getSubscriptionStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch subscription stats", err);
    }
  };

  const fetchPlanStats = async () => {
    try {
      const data = await getPlanStats();
      setPlanStats(data);
    } catch (err) {
      console.error("Failed to fetch plan stats", err);
    }
  };

  const fetchSubscriptions = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getSubscriptions(page, 10);
      setSubscriptions(data.subscriptions);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
      setError("Failed to load subscriptions.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPlans();
      setPlans(data.plans || []);
    } catch (err) {
      console.error("Failed to fetch plans", err);
      setError("Failed to load plans.");
    } finally {
      setIsLoading(false);
    }
  };

  // Metrics for different tabs
  const getMetrics = () => {
    if (activeTab === "active-users") {
      return [
        { label: "Active Subscribers", value: stats.activeSubscriptions },
        { label: "Expired", value: stats.expired },
        { label: "Auto Renew Enabled", value: stats.autoRenewEnabled },
        {
          label: "Monthly Revenue",
          value: `$${stats.monthlyRecurringRevenue}`,
        },
      ];
    } else {
      return [
        { label: "Total Plans", value: planStats.totalPlans },
        { label: "Active Plans", value: planStats.activePlans },
        { label: "Upcoming Offers", value: planStats.upcomingOffers },
        { label: "Archived Plans", value: planStats.archivedPlans },
      ];
    }
  };

  // Plans data
  const getFilteredData = () => {
    if (activeTab === "active-users") {
      return subscriptions;
    } else {
      return plans.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.lastUpdated &&
            item.lastUpdated
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
        );
      });
    }
  };

  const currentData = getFilteredData();
  const totalPages =
    activeTab === "active-users"
      ? pagination.totalPages
      : Math.ceil(currentData.length / 10);

  const displayData =
    activeTab === "active-users"
      ? currentData
      : currentData.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (date.toString() === "Invalid Date") return dateString;
    const options = { 
        year: "numeric", 
        month: "short", 
        day: "numeric",
        ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    return date.toLocaleDateString("en-US", options);
  };

  const renderTableContent = () => {
    if (activeTab === "active-users") {
      if (isLoading) {
        return (
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
        );
      }
      if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
      }
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
              {displayData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.planName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {user.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {formatDate(user.purchasedDate)}
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
              {displayData.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No subscriptions found
                  </td>
                </tr>
              )}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {plan.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {formatDate(plan.lastUpdated)}
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
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="px-6 py-1.5 text-white rounded-full text-sm bg-red-500 hover:bg-red-600 cursor-pointer"
                      >
                        Delete
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

  const handleDeletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deletePlan(planId);
        fetchPlans(); // Refresh the list
        fetchPlanStats(); // Refresh stats
      } catch (err) {
        console.error("Failed to delete plan", err);
        setError("Failed to delete plan");
      }
    }
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
                Showing{" "}
                {activeTab === "active-users"
                  ? subscriptions.length > 0
                    ? (pagination.page - 1) * pagination.limit + 1
                    : 0
                  : displayData.length > 0
                    ? (currentPage - 1) * 10 + 1
                    : 0}{" "}
                to{" "}
                {activeTab === "active-users"
                  ? Math.min(
                      pagination.page * pagination.limit,
                      pagination.total,
                    )
                  : (currentPage - 1) * 10 + displayData.length}{" "}
                of{" "}
                {activeTab === "active-users" ? pagination.total : plans.length}
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
          {displayData.length === 0 && !isLoading && (
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
