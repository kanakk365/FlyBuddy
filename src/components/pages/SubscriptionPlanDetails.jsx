import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import { getPlanDetails } from "../../api/plans";

function SubscriptionPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPlanDetails(id);
        setPlan(data);
      } catch (err) {
        console.error("Failed to fetch plan details", err);
        setError("Failed to load plan details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

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

  if (error || !plan) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-red-500 text-center">
            {error || "Plan not found"}
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

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Header with Back */}
          <div className="mb-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate("/subscriptions")}
                className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
                <h1 className="text-2xl font-medium text-gray-900">
                  Subscription Plan Details
                </h1>
                <p className="text-gray-600 mt-1 italic ">
                  View all the details about the Subscription Plan here
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-[#e7e7e7]">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">Overview</h2>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="text-sm text-gray-500">Plan Name</span>
                <span className="text-base text-[#030229] font-medium">
                  {plan.name}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-base text-[#030229] font-medium">
                  {plan.amount}
                </span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="text-sm text-gray-500">Description:</span>
                <p className="text-base text-[#030229] leading-9">
                  {plan.description}
                </p>
              </div>
            </div>

            {/* Features Section if available */}
            {plan.features && plan.features.length > 0 && (
              <div className="px-6 pb-6">
                <div className="flex flex-col items-start justify-center gap-3">
                  <span className="text-sm text-gray-500">Features:</span>
                  <ul className="list-disc list-inside text-base text-[#030229] leading-7">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SubscriptionPlanDetails;
