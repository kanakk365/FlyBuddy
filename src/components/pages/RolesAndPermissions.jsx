import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { Plus } from "lucide-react";

function RolesAndPermissions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    roleName: {
      admin: false,
      superAdmin: false,
      manager: false,
    },
    sortBy: {
      newest: false,
      oldest: false,
    },
  });

  const rolesData = [
    {
      id: 1,
      memberName: "Rohan Mehra",
      roleName: "Super Admin",
      description: "Full access to all modules",
      createdOn: "Oct 1",
    },
    {
      id: 2,
      memberName: "Sia Sharma",
      roleName: "Manager",
      description: "Manage Bookings, Users",
      createdOn: "Oct 2",
    },
    {
      id: 3,
      memberName: "Lily Singh",
      roleName: "Support",
      description: "Can view and verify tickets",
      createdOn: "Oct 3",
    },
  ];

  const filteredRoles = rolesData.filter((role) => {
    // Search filter
    const matchesSearch =
      role.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Role Name filter
    const roleNameFilter =
      appliedFilters.roleName.admin ||
      appliedFilters.roleName.superAdmin ||
      appliedFilters.roleName.manager;
    const matchesRoleName =
      !roleNameFilter ||
      (appliedFilters.roleName.admin && role.roleName === "Admin") ||
      (appliedFilters.roleName.superAdmin && role.roleName === "Super Admin") ||
      (appliedFilters.roleName.manager && role.roleName === "Manager");

    return matchesSearch && matchesRoleName;
  });

  const totalPages = Math.ceil(filteredRoles.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentRoles = filteredRoles.slice(startIndex, endIndex);

  const handleViewRole = (roleId) => {
    console.log("Viewing role:", roleId);
    navigate("/role-details");
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(appliedFilters).forEach((category) => {
      Object.values(category).forEach((isActive) => {
        if (isActive) count++;
      });
    });
    return count;
  };

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: "1.12em" }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl text-gray-900">Roles and Permission</h1>
                <p className="text-gray-600 mt-1">
                  Define and manage access control for FlyBuddy Admin users.
                </p>
              </div>

              {/* Search and Filters - Top Right */}
              <div className="flex items-center space-x-4">
                {/* Create Role Button */}
                <button
                  onClick={() => navigate("/create-role")}
                  className=" flex items-center px-4 py-1.5 bg-[#abbdd6] cursor-pointer text-base text-black rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Role
                </button>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 pr-4 py-1.5 border border-neutral-300 focus:outline-neutral-300 rounded-lg  focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Filters Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Roles Table */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">
                      Member Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Role Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Created On
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRoles.map((role, index) => (
                    <tr
                      key={role.id}
                      className={`hover:bg-gray-50 ${
                        index === 0 ? "pt-4" : ""
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {role.memberName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {role.roleName}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">
                        {role.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {role.createdOn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewRole(role.id)}
                          className="px-8 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer "
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} of {filteredRoles.length}
              </div>
              <div className="flex items-center  divide-x divide-neutral-500">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-l-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
                >
                  <svg
                    className="w-4 h-4"
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
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-r-md text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed bg-[#ABBCD6]"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Modal */}
        <FilterModal
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onApplyFilters={handleApplyFilters}
          currentFilters={appliedFilters}
          type="roles"
        />
      </div>
    </MainLayout>
  );
}

export default RolesAndPermissions;
