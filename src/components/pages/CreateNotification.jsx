import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import {
  createNotification,
  updateNotification,
} from "../../api/notifications";

function CreateNotification() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingNotification = location.state?.notification;

  const [formData, setFormData] = useState({
    title: "",
    audience: "FREE_USERS",
    channel: "PUSH",
    deliverAt: "",
    ageGroups: [],
    region: "India",
    message: "",
    sendNow: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingNotification) {
      setFormData({
        title: editingNotification.title || "",
        audience: editingNotification.audience || "FREE_USERS",
        channel: editingNotification.channel || "PUSH",
        deliverAt: editingNotification.deliverAt
          ? new Date(editingNotification.deliverAt).toISOString().slice(0, 16)
          : "",
        ageGroups: editingNotification.ageGroups || [],
        region: editingNotification.region || "India",
        message: editingNotification.message || "",
        sendNow: !editingNotification.deliverAt,
      });
    }
  }, [editingNotification]);

  const audienceOptions = [
    { label: "All Users", value: "ALL_USERS" },
    { label: "Free Users", value: "FREE_USERS" },
    { label: "Premium Users", value: "PREMIUM_USERS" },
  ];

  const channelOptions = [
    { label: "Push Notification", value: "PUSH" },
    { label: "SMS", value: "SMS" },
    { label: "Email", value: "EMAIL" },
    { label: "In App", value: "IN_APP" },
  ];

  const ageGroupOptions = ["18-24", "25-35", "35-45", "45-55", "55+"];

  const regionOptions = [
    "India",
    "Indianapolis",
    "Ireland",
    "Iraq",
    "Iceland",
    "Indonesia",
    "Italy",
    "Israel",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAgeGroupChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => {
      const newAgeGroups = prev.ageGroups.includes(value)
        ? prev.ageGroups.filter((g) => g !== value)
        : [...prev.ageGroups, value];
      return { ...prev, ageGroups: newAgeGroups };
    });
  };

  const handleCancel = () => {
    navigate("/notifications");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        title: formData.title,
        audience: formData.audience,
        channel: formData.channel,
        message: formData.message,
        region: formData.region,
        ageGroups: formData.ageGroups,
        deliverAt: formData.sendNow
          ? new Date().toISOString()
          : new Date(formData.deliverAt).toISOString(),
      };

      if (editingNotification) {
        await updateNotification(editingNotification.id, payload);
      } else {
        await createNotification(payload);
      }
      navigate("/notifications");
    } catch (error) {
      console.error("Error saving notification:", error);
      alert("Failed to save notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/notifications")}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
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
                {editingNotification
                  ? "Edit Notification"
                  : "Create Notification"}
              </h1>
              <p className="text-gray-600 mt-1">
                {editingNotification
                  ? "Update the content of the notification."
                  : "Create the Content for users for notifications."}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic details
            </h3>

            <hr className="border-gray-200 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Notification Title */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Notification Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Short heading (max 50 chars)"
                    className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                    maxLength={50}
                  />
                </div>

                {/* Audience */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Audience
                  </label>
                  <select
                    value={formData.audience}
                    onChange={(e) =>
                      handleInputChange("audience", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  >
                    {audienceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Choose Channel */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Choose Channel
                  </label>
                  <select
                    value={formData.channel}
                    onChange={(e) =>
                      handleInputChange("channel", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  >
                    {channelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Options */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Delivery Options
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={formData.sendNow}
                        onChange={() => handleInputChange("sendNow", true)}
                        className="mr-2"
                      />
                      Send Now
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!formData.sendNow}
                        onChange={() => handleInputChange("sendNow", false)}
                        className="mr-2"
                      />
                      Schedule Later
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Schedule on */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Schedule on
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={formData.deliverAt}
                      onChange={(e) =>
                        handleInputChange("deliverAt", e.target.value)
                      }
                      disabled={formData.sendNow}
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Age group - Multi select */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Age group
                  </label>
                  <div className="p-3 bg-[#f0f3f7] rounded-lg max-h-40 overflow-y-auto">
                    {ageGroupOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center mb-2 last:mb-0 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={option}
                          checked={formData.ageGroups.includes(option)}
                          onChange={handleAgeGroupChange}
                          className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Region - Single select */}
                <div>
                  <label className="block text-sm font-medium text-black mb-4">
                    Region
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                  >
                    {regionOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message (content) - Full width */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-black mb-4">
                Message (content)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Main content or announcement"
                rows={4}
                className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingNotification
                  ? "Update"
                  : formData.sendNow
                    ? "Send Now"
                    : "Schedule"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateNotification;
