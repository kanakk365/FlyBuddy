import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout";

function AddEditSubscriptionPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mode = useMemo(() => (id ? "edit" : "create"), [id]);

  const [planName, setPlanName] = useState(id ? "Premium" : "");
  const [status, setStatus] = useState(id ? "Active" : "Active");
  const [amount, setAmount] = useState(id ? "$25" : "");
  const [description, setDescription] = useState(
    id
      ? "•Unlock the best of FlyBuddy with the Premium Plan.\n\n•Get access to priority support, exclusive travel insights, and full access to all premium features. \n\n•Enjoy an ad-free experience and faster trip syncs so you can focus on what matters — exploring and capturing every journey effortlessly."
      : ""
  );

  const handleCancel = () => navigate(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/subscriptions");
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-5xl mx-auto">
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
                <h1 className="text-2xl font-medium text-gray-900">
                  {mode === "edit" ? "Edit Subscription Plan Details" : "Create Plan"}
                </h1>
                <p className="text-gray-600 mt-1 italic ">
                  {mode === "edit" ? "Edit all the details about the Subscription Plan here" : "Set up a new plan to manage pricing, duration, and user benefits"}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic details</h3>
            <hr className="border-gray-200 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-4">Plan Name</label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Premium"
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-4">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                >
                  <option>Active</option>
                  <option>InActive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-4">Amount</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="$25"
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  required
                />
              </div>

              <div />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-4">Message (content)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Main content or announcement"
                  rows={6}
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                {mode === "edit" ? "Save Changes" : "Create Plan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddEditSubscriptionPlan;


