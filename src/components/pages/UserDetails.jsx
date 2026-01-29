import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, X } from "lucide-react";
import MainLayout from "../common/MainLayout";
import { getUserDetails } from "../../api/users";

function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [activeTab, setActiveTab] = useState("tickets");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading by default
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      // If no user ID provided, go back to users list
      navigate("/users");
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUserDetails(userId);
        setUserDetails(data);
      } catch (err) {
        console.error("Failed to fetch user details", err);
        setError("Failed to load user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [userId, navigate]);

  // Format date helper
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (date.toString() === "Invalid Date") return dateString; // Fallback if parsing fails or its not ISO

    const options = { month: "short", day: "numeric", year: "numeric" };
    if (includeTime) {
      options.hour = "numeric";
      options.minute = "numeric";
      options.hour12 = true;
    }
    return date.toLocaleString("en-US", options);
  };

  const renderTableContent = () => {
    switch (activeTab) {
      case "tickets":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                    Airline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userDetails?.tickets?.length > 0 ? (
                  userDetails.tickets.map((ticket, index) => (
                    <React.Fragment key={ticket.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.airline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {ticket.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(ticket.date, true)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-base ${
                              ticket.status === "Completed"
                                ? " text-green-500"
                                : " text-red-500"
                            }`}
                          >
                            {ticket.status === "Completed" ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <X className="w-4 h-4 mr-2" />
                            )}
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                      {index < userDetails.tickets.length - 1 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-0">
                            <hr className="border-gray-200" />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case "subscription":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                    Plan Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                    Payment
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userDetails?.subscriptions?.length > 0 ? (
                  userDetails.subscriptions.map((subscription, index) => (
                    <React.Fragment key={subscription.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.planType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm text-neutral-500
                          `}
                          >
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(subscription.startDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(subscription.expiryDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.payment}
                        </td>
                      </tr>
                      {index < userDetails.subscriptions.length - 1 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-0">
                            <hr className="border-gray-200" />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No subscriptions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      case "matches":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Carrier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {userDetails?.matches?.length > 0 ? (
                  userDetails.matches.map((match, index) => (
                    <React.Fragment key={match.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-3">✈️</span>
                            {match.destination}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {match.carrier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(match.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-base ${
                              match.status === "Connected" // Assuming Connected is a possible status, otherwise Pending/etc.
                                ? " text-green-500"
                                : " text-yellow-500"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${
                                match.status === "Connected"
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            ></div>
                            {match.status}
                          </span>
                        </td>
                      </tr>
                      {index < userDetails.matches.length - 1 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-0">
                            <hr className="border-gray-200" />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No matches found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
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
      </MainLayout>
    );
  }

  if (error || !userDetails) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-red-500 text-center">
            {error || "User not found"}
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/users")}
              className="text-blue-500 hover:underline"
            >
              Go back to Users
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.15em" }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate("/users")}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100"
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
              <div>
                <h1 className="text-2xl text-gray-900">User Details</h1>
                <p className="text-sm text-gray-500 mt-1 italic">
                  View all the details about the user here
                </p>
              </div>
            </div>
          </div>

          {/* User Summary Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-neutral-300 p-8 mb-8">
            <div className="flex items-center gap-8">
              {/* User Avatar */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-200">
                {userDetails.profilePicture ? (
                  <img
                    src={userDetails.profilePicture}
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-500">
                    {userDetails.name?.charAt(0)}
                  </span>
                )}
              </div>

              {/* User Information - Two Rows */}
              <div className="flex-1">
                <div className="text-base mb-3">
                  <span className="text-gray-900">Name-</span>
                  <span className=" text-gray-900">{userDetails.name}</span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">Phone number -</span>
                  <span className=" text-gray-900">
                    {userDetails.phoneNumber || "N/A"}
                  </span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">Joined On -</span>
                  <span className=" text-gray-900">
                    {formatDate(userDetails.joinedOn)}
                  </span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">City-</span>
                  <span className=" text-gray-900">
                    {userDetails.city || "N/A"}
                  </span>
                </div>
                <div className="text-base">
                  <span className="text-gray-900">E mail ID-</span>
                  <span className=" text-gray-900">{userDetails.email}</span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">Plan-</span>
                  <span className=" text-gray-900">{userDetails.plan}</span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">Tickets Uploaded-</span>
                  <span className=" text-gray-900">
                    {userDetails.ticketsUploaded}
                  </span>
                  <span className="mx-4 text-gray-400">•</span>
                  <span className="text-gray-900">Status-</span>
                  <span className=" text-gray-900">{userDetails.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* More Details Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
            <h3 className="text-2xl text-gray-900 mb-4">More Details</h3>
            <hr className="border-gray-200 mb-8" />
            <div className="grid grid-cols-3 gap-x-16 gap-y-8">
              <div>
                <label className="text-sm text-neutral-500 block mb-2 ">
                  Plan Details
                </label>
                <p className="text-base  text-gray-900">
                  {userDetails.planDetails || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-neutral-500 block mb-2">
                  Chats Started
                </label>
                <p className="text-base  text-gray-900">
                  {userDetails.chatsStarted !== undefined
                    ? userDetails.chatsStarted
                    : "N/A"}{" "}
                  chats - Top Match: {userDetails.topMatch || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-neutral-500 block mb-2 ">
                  Matches Found
                </label>
                <p className="text-base  text-gray-900">
                  {userDetails.matchesFound !== undefined
                    ? userDetails.matchesFound
                    : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm text-neutral-500 block mb-2">
                  Last Login
                </label>
                <p className="text-base  text-gray-900">
                  {formatDate(userDetails.lastLogin, true)}
                </p>
              </div>
              <div>
                <label className="text-sm text-neutral-500 block mb-2">
                  Recent Activity
                </label>
                <p className="text-base  text-gray-900">
                  {userDetails.recentActivity
                    ? `${formatDate(userDetails.recentActivity.date)} - ${userDetails.recentActivity.activity}`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs and Table Section */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-12 px-8">
                {[
                  { id: "tickets", label: "Tickets" },
                  { id: "subscription", label: "Subscription" },
                  { id: "matches", label: "Matches" },
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

            {/* Table Content */}
            <div className="p-8">{renderTableContent()}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserDetails;
