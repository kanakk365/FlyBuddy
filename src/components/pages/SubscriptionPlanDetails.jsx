import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";

function SubscriptionPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const plan = {
    id,
    name: "Premium",
    amount: "$25",
    status: "Active",
    description:
      "Unlock the best of FlyBuddy with the Premium Plan. Get access to priority support, exclusive travel insights, and full access to all premium features. Enjoy an ad-free experience and faster trip syncs so you can focus on what matters — exploring and capturing every journey effortlessly.",
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-5xl mx-auto">
          {/* Page Header with Back */}
          <div className="mb-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate('/subscriptions')}
                className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-medium text-gray-900">Subscription Plan Details</h1>
                <p className="text-gray-600 mt-1 italic ">View all the details about the Subscription Plan here</p>
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
                <span className="text-base text-[#030229] font-medium">{plan.name}</span>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="text-sm text-gray-500">Amount</span>
                <span className="text-base text-[#030229] font-medium">{plan.amount}</span>
              </div>
              <div className="flex flex-col items-start justify-center gap-3">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-base text-[#030229] font-medium">{plan.status}</span>
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SubscriptionPlanDetails;


