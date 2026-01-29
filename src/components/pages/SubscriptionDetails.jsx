import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import MainLayout from "../common/MainLayout";
import { getSubscriptionDetails } from "../../api/subscriptions";

function SubscriptionDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const subscriptionId = location.state?.subscriptionId;

  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subscriptionId) {
      navigate("/subscriptions");
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getSubscriptionDetails(subscriptionId);
        setSubscription(data);
      } catch (err) {
        console.error("Failed to fetch subscription details", err);
        setError("Failed to load subscription details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [subscriptionId, navigate]);

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (date.toString() === "Invalid Date") return dateString;

    const options = { month: "short", day: "numeric", year: "numeric" };
    if (includeTime) {
      options.hour = "numeric";
      options.minute = "numeric";
      options.hour12 = true;
    }
    return date.toLocaleString("en-US", options);
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

  if (error || !subscription) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-red-500 text-center">
            {error || "Subscription not found"}
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/subscriptions")}
              className="text-blue-500 hover:underline"
            >
              Go back to Subscriptions
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const { userDetails, planDetails } = subscription;

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.25em" }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/subscriptions")}
              className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-medium text-gray-900">
                Subscription Details
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                View all the details about the Subscription here
              </p>
            </div>
          </div>

          {/* User Details Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
            <h3 className="text-2xl font-medium text-gray-900 mb-8">
              User Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Booking ID */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Booking ID
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {userDetails?.bookingId || "N/A"}
                </p>
              </div>

              {/* User */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  User
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {userDetails?.user}
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Email
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {userDetails?.email}
                </p>
              </div>

              {/* Phone number */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Phone Number
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {userDetails?.phoneNumber || "N/A"}
                </p>
              </div>

              {/* Flight */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Flight
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {userDetails?.flight || "N/A"}
                </p>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Date
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(userDetails?.date)}
                </p>
              </div>
            </div>
          </div>

          {/* Plan Details Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
            <h3 className="text-2xl font-medium text-gray-900 mb-8">
              Plan Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Plan Type */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Plan Type
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {planDetails?.planType}
                </p>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Status
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {planDetails?.status}
                </p>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Amount
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {planDetails?.amount}
                </p>
              </div>

              {/* Payment ID */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Payment ID
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {planDetails?.paymentId || "N/A"}
                </p>
              </div>

              {/* Purchased Date */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Purchased Date
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(planDetails?.purchasedDate)}
                </p>
              </div>

              {/* Ending Date */}
              <div className="space-y-2">
                <label className="block text-sm text-neutral-500 mb-2">
                  Ending Date
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(planDetails?.endingDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SubscriptionDetails;
