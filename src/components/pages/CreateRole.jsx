import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function CreateRole() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    assignedMember: 'Raj Sharma',
    roleAssigned: 'Support Agent',
    emailId: 'Raj@yahoo.in',
    phoneNumber: '+91 9086545621',
    gender: 'Male',
    description: 'Main task for this role is to support backend activities'
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const genderOptions = ['Male', 'Female', 'Other']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating role:', formData)
    // Show success modal instead of navigating immediately
    setShowSuccessModal(true)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    navigate('/roles-permissions')
  }

  const handleCancel = () => {
    navigate('/roles-permissions')
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-6">
                <button
                  onClick={() => navigate('/roles-permissions')}
                  className="p-2 rounded-lg hover:bg-gray-100 mr-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Create Role</h1>
              </div>
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Assigned Member */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned Member</label>
                      <input
                        type="text"
                        value={formData.assignedMember}
                        onChange={(e) => handleInputChange('assignedMember', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Email Id */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Id</label>
                      <input
                        type="email"
                        value={formData.emailId}
                        onChange={(e) => handleInputChange('emailId', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <div className="relative">
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors appearance-none"
                        >
                          {genderOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Role Assigned */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Role Assigned</label>
                      <input
                        type="text"
                        value={formData.roleAssigned}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phoneNumber}
                        readOnly
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Description - Full width */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (content)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Create Role
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                New Role Support Agent created
              </h3>
              <p className="text-gray-600">
                Sucessfully!!
              </p>
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
  )
}

export default CreateRole
