import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import { createPlan, updatePlan, getPlanDetails } from "../../api/plans";

function AddEditSubscriptionPlan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mode = useMemo(() => (id ? "edit" : "create"), [id]);

  const [planName, setPlanName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(mode === "edit");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchDetails = async () => {
        setIsFetching(true);
        try {
          const data = await getPlanDetails(id);
          setPlanName(data.name || "");
          // Remove any non-numeric characters (like currency symbols) to ensure it works with type="number" input
          setAmount(
            data.amount ? String(data.amount).replace(/[^0-9.]/g, "") : "",
          );
          setDescription(data.description || "");
        } catch (err) {
          console.error("Failed to fetch plan details", err);
          setError("Failed to load plan details.");
        } finally {
          setIsFetching(false);
        }
      };

      fetchDetails();
    }
  }, [mode, id]);

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const payload = {
      name: planName,
      amount: Number(amount), // Send as number
      description: description,
    };

    try {
      if (mode === "create") {
        await createPlan(payload);
      } else {
        await updatePlan(id, payload);
      }
      navigate("/subscriptions");
    } catch (err) {
      console.error("Failed to save plan", err);
      setError("Failed to save plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
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

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-5xl mx-auto">
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
                  {mode === "edit"
                    ? "Edit Subscription Plan Details"
                    : "Create Plan"}
                </h1>
                <p className="text-gray-600 mt-1 italic ">
                  {mode === "edit"
                    ? "Edit all the details about the Subscription Plan here"
                    : "Set up a new plan to manage pricing, duration, and user benefits"}
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic details
            </h3>
            <hr className="border-gray-200 mb-6" />

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-4">
                  Plan Name
                </label>
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
                <label className="block text-sm font-medium text-black mb-4">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="25.00"
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter numeric value
                </p>
              </div>

              <div />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-4">
                  Message (content)
                </label>
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
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors flex items-center"
                disabled={isLoading}
              >
                {isLoading && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                )}
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
