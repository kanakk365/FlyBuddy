import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'
import FilterModal from '../FilterModal'

function RolesAndPermissions() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({
    roleName: {
      admin: false,
      superAdmin: false,
      manager: false
    },
    sortBy: {
      newest: false,
      oldest: false
    }
  })

  const rolesData = [
    {
      id: 1,
      memberName: 'Rohan Mehra',
      roleName: 'Super Admin',
      description: 'Full access to all modules',
      createdOn: 'Oct 1'
    },
    {
      id: 2,
      memberName: 'Sia Sharma',
      roleName: 'Manager',
      description: 'Manage Bookings, Users',
      createdOn: 'Oct 2'
    },
    {
      id: 3,
      memberName: 'Lily Singh',
      roleName: 'Support',
      description: 'Can view and verify tickets',
      createdOn: 'Oct 3'
    }
  ]

  const filteredRoles = rolesData.filter(role => {
    // Search filter
    const matchesSearch = role.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Role Name filter
    const roleNameFilter = appliedFilters.roleName.admin || appliedFilters.roleName.superAdmin || appliedFilters.roleName.manager
    const matchesRoleName = !roleNameFilter ||
                           (appliedFilters.roleName.admin && role.roleName === 'Admin') ||
                           (appliedFilters.roleName.superAdmin && role.roleName === 'Super Admin') ||
                           (appliedFilters.roleName.manager && role.roleName === 'Manager')
    
    return matchesSearch && matchesRoleName
  })

  const handleViewRole = (roleId) => {
    console.log('Viewing role:', roleId)
    navigate('/role-details')
  }

  const handleCreateRole = () => {
    console.log('Creating new role...')
    navigate('/create-role')
  }

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters)
    setAppliedFilters(filters)
    setShowFilters(false)
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10">
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Roles and Permission</h1>
                  <p className="text-gray-600 mt-1">
                    Define and manage access control for FlyBuddy Admin users.
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* Create Role Button */}
                  <button
                    onClick={handleCreateRole}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Role
                  </button>

                  {/* Filters Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Roles Table */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200" style={{ fontSize: '1.8em' }}>
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Member Name
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Role Name
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Created On
                      </th>
                      <th className="px-3 py-2 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRoles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg font-semibold text-gray-900">{role.memberName}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{role.roleName}</div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="text-lg text-gray-600">{role.description}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="text-lg text-gray-600">{role.createdOn}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <button
                            onClick={() => handleViewRole(role.id)}
                            className="px-4 py-2 bg-blue-200 text-gray-800 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Empty State */}
            {filteredRoles.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
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
  )
}

export default RolesAndPermissions

