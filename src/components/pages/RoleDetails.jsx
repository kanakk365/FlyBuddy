import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function RoleDetails() {
  const navigate = useNavigate()

  const roleData = {
    roleName: 'Super Admin',
    memberName: 'Rohan Mehra',
    description: 'Full access to all modules',
    createdOn: 'October 1',
    email: 'Rohan@yahoo.in',
    phoneNumber: '+91 9875344231',
    gender: 'Male'
  }

  const handleEdit = () => {
    console.log('Editing role...')
    navigate('/edit-role')
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.15em' }}>
        <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate('/roles-permissions')}
                    className="p-3 rounded-xl hover:bg-gray-100 mr-6 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">Role Details - {roleData.roleName}</h1>
                    <p className="text-lg text-gray-600 mt-2">Comprehensive view of role information and permissions</p>
                  </div>
                </div>
                <button
                  onClick={handleEdit}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Role
                </button>
              </div>
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Role Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Role Name */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Role Name</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.roleName}</p>
                </div>

                {/* Member Name */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Member Name</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.memberName}</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Description</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.description}</p>
                </div>

                {/* Created On */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Created On</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.createdOn}</p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Email Address</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.email}</p>
                </div>

                {/* Phone number */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Phone Number</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.phoneNumber}</p>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-base font-medium text-gray-600">Gender</label>
                  <p className="text-lg font-semibold text-gray-900">{roleData.gender}</p>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Role Permissions</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Full System Access</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">User Management</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Content Management</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Analytics Access</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Settings Control</span>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Report Generation</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default RoleDetails
