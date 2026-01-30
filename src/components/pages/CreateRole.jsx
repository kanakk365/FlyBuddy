import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import { createRole, updateRole } from "../../api/roles";

function CreateRole() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingRole = location.state?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
    phoneNumber: "",
    gender: "Male",
    description: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = ["Male", "Female", "Other"];
  const roleOptions = ["ADMIN", "MANAGER", "SUPPORT_AGENT"]; // Assuming these roles based on context or add more

  useEffect(() => {
    if (editingRole) {
      setFormData({
        name: editingRole.name || "",
        email: editingRole.email || "",
        password: "", // Password usually not sent back, leave empty or handle appropriately
        role: editingRole.role || "MANAGER",
        phoneNumber: editingRole.phoneNumber || "",
        gender: editingRole.gender || "Male",
        description: editingRole.description || "",
      });
    }
  }, [editingRole]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // No changes to handleInputChange

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        description: formData.description,
      };

      // Only include password if it's a new role or if password field is filled (for future update support)
      // For this task, password is required for creation
      if (!editingRole && formData.password) {
        payload.password = formData.password;
      }

      if (editingRole) {
        await updateRole(editingRole.id, payload);
      } else {
        await createRole(payload);
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error saving role:", error);
      alert("Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/roles-permissions");
  };

  const handleCancel = () => {
    navigate("/roles-permissions");
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/roles-permissions")}
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
                Create Role
              </h1>
              <p className="text-gray-600 mt-1">
                Create and assign roles to team members.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Basic details
              </h3>

              <hr className="border-gray-200 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Assigned Member (Name) */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">
                      Assigned Member
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Enter member name"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Email Id */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">
                      Email Id
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Password - Only for Create or if needed for Update */}
                  {!editingRole && (
                    <div>
                      <label className="block text-sm font-medium text-black mb-4">
                        Password
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Enter password"
                        className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                        required={!editingRole}
                      />
                    </div>
                  )}

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                    >
                      {genderOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Role Assigned */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">
                      Role Assigned
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                    >
                      {roleOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Description - Full width */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-black mb-4">
                  Description (content)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Enter role description"
                  rows={4}
                  className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </form>

          {/* Action Buttons */}
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
              className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingRole
                  ? "Update Role"
                  : "Create Role"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {editingRole ? "Role Updated" : "New Role Created"}
              </h3>
              <p className="text-gray-600">Successfully!!</p>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSuccessModalClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default CreateRole;
