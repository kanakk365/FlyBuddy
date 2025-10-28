import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit, ChevronLeft } from "lucide-react";
import MainLayout from "../common/MainLayout";

function RoleDetails() {
  const navigate = useNavigate();

  const roleData = {
    roleName: "Super Admin",
    memberName: "Rohan Mehra",
    description: "Full access to all modules",
    createdOn: "October 1",
    email: "Rohan@yahoo.in",
    phoneNumber: "+91 9875344231",
    gender: "Male",
  };

  const handleEdit = () => {
    console.log("Editing role...");
    navigate("/edit-role");
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.15em" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate("/roles-permissions")}
              className="p-3 rounded-xl hover:bg-gray-100 mr-6 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-medium text-gray-900">
                Role Details - {roleData.roleName}
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Comprehensive view of role information and permissions
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
            <div className="flex items-center mb-8">
              <h3 className="text-2xl font-medium text-gray-900">
                Role Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Role Name */}
              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Role Name
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.roleName}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Member Name
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.memberName}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Description
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.description}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Created On
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.createdOn}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Email Address
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.email}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Phone Number
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.phoneNumber}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-base text-neutral-500 mb-2">
                  Gender
                </label>
                <p className="text-base font-semibold text-gray-900">
                  {roleData.gender}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleEdit}
              className="flex items-center px-8 py-1 bg-[#abbcd6] text-black rounded-full text-base cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default RoleDetails;
