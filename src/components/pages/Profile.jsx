import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import { Edit, Edit2, LogOut, Check, X } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Sample user data - can be fetched from API or context
  const [userProfile, setUserProfile] = useState({
    name: "Rio Sen",
    email: "Rio@gmail.com",
    password: "RioU387",
    phone: "+91 9086432567",
    initials: "R",
  });

  // State for edited values
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleLogout = () => {
    // Clear user data and navigate to login
    navigate("/");
  };

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      setUserProfile(editedProfile);
    } else {
      // Start editing - copy current values to edited state
      setEditedProfile(userProfile);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
      initials: field === 'name' ? value.charAt(0).toUpperCase() : prev.initials
    }));
  };

  return (
    <MainLayout>
      <div className="p-6 bg-[#f6f6f6] min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your account information and security.
            </p>
          </div>

          {/* Profile Details Card */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-[#e7e7e7] p-8">
            {/* Edit Button */}
            <div className="flex justify-between mb-6">
              <h1 className="text-lg font-semibold text-gray-900">
                Profile details
              </h1>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                      title="Cancel"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={handleEditClick}
                      className="p-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center"
                      title="Save Changes"
                    >
                      <Check className="w-5 h-5 text-green-600" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                    title="Edit Profile"
                  >
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-gray-200 mt-6 mb-6"></div>

            {/* Profile Content */}
            <div className="flex items-start gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white font-semibold text-3xl flex-shrink-0 mb-4"
                  style={{ backgroundColor: "#B8C8E0" }}
                >
                  {userProfile.initials}
                </div>
              </div>

              {/* User Information */}
              <div className="flex-1 grid grid-cols-2 gap-8">
                {/* Name */}
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg text-gray-900 text-base font-medium focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-base font-medium">
                      {userProfile.name}
                    </p>
                  )}
                </div>

                {/* Email ID */}
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Email ID
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg text-gray-900 text-base font-medium focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-base font-medium">
                      {userProfile.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Password
                  </p>
                  {isEditing ? (
                    <input
                      type="password"
                      value={editedProfile.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg text-gray-900 text-base font-medium focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-base font-medium">
                      {userProfile.password}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Phone number
                  </p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-3 py-2 bg-[#f0f3f7] rounded-lg text-gray-900 text-base font-medium focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-900 text-base font-medium">
                      {userProfile.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
          <div className="flex justify-end mt-8 pt-6 ">
            <button
              onClick={handleLogout}
              className="px-8 py-2.5 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
