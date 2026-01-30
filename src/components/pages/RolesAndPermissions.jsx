import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../common/MainLayout";
import FilterModal from "../FilterModal";
import { Plus } from "lucide-react";
import { getRoles, deleteRole } from "../../api/roles";
import { format } from "date-fns";

function RolesAndPermissions() {
  const navigate = useNavigate();

  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await deleteRole(id);
        // Refresh list
        fetchRoles(currentPage);
      } catch (error) {
        console.error("Failed to delete role:", error);
        alert("Failed to delete role");
      }
    }
  };

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

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchRoles = async (page) => {
    try {
      setLoading(true);
      const data = await getRoles(page);
      setRoles(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(currentPage);
  }, [currentPage]);

  // Client-side filtering logic is removed as we are using server-side pagination
  // Typically filters should be passed to the API.
  // For now, we display what the API returns for the current page.
  const currentRoles = roles;

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
                      Member Name / Email
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
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    currentRoles.map((role, index) => (
                      <tr
                        key={role.id}
                        className={`hover:bg-gray-50 ${
                          index === 0 ? "pt-4" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {role.name || role.email || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 capitalize">
                          {role.role}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-500">
                          {role.description || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {role.createdAt
                            ? format(new Date(role.createdAt), "MMM d, yyyy")
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                navigate("/create-role", { state: { role } })
                              }
                              className="px-4 py-1.5 text-black rounded-full text-sm bg-yellow-200 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleViewRole(role.id)}
                              className="px-4 py-1.5 text-black rounded-full text-sm bg-[#acbed7] cursor-pointer "
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteRole(role.id)}
                              className="px-4 py-1.5 text-white rounded-full text-sm bg-red-400 cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {(meta.page - 1) * meta.limit + 1} of {meta.total}
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
                    setCurrentPage(Math.min(meta.totalPages, currentPage + 1))
                  }
                  disabled={currentPage === meta.totalPages}
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
