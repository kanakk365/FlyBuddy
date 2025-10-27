import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function CreateNotification() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: 'Subscribe now',
    audience: 'Free Users',
    channel: 'In app',
    deliveryOptions: 'Schedule later',
    scheduleOn: '9 sep . 10:00AM',
    ageGroup: '18-24',
    region: 'India',
    message: 'Don\'t miss the upcoming travels with Flybuddy Subscribe to premium now'
  })

  const audienceOptions = [
    'All Users',
    'Free Users',
    'Premium Users'
  ]

  const channelOptions = [
    'In app',
    'SMS',
    'Email'
  ]

  const deliveryOptions = [
    'Send now',
    'Schedule later'
  ]

  const ageGroupOptions = [
    '18-24',
    '25-35',
    '35-45',
    '45-55',
    '55+'
  ]

  const regionOptions = [
    'India',
    'Indianapolis',
    'Ireland',
    'Iraq',
    'Iceland',
    'Indonesia',
    'Italy',
    'Israel'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
    navigate('/notifications')
  }

  const handleSchedule = () => {
    console.log('Scheduling notification:', formData)
    // Implement notification scheduling logic
    navigate('/notifications')
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => navigate('/notifications')}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Create Notifications</h1>
                  <p className="text-gray-600 mt-1">
                    Create the Content for users for notifications.
                  </p>
                </div>
              </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Notification Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Short heading (max 50 chars)"
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      maxLength={50}
                    />
                  </div>

                  {/* Audience */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                    <select
                      value={formData.audience}
                      onChange={(e) => handleInputChange('audience', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    >
                      {audienceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Channel */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Choose Channel</label>
                    <select
                      value={formData.channel}
                      onChange={(e) => handleInputChange('channel', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    >
                      {channelOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Delivery Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                    <select
                      value={formData.deliveryOptions}
                      onChange={(e) => handleInputChange('deliveryOptions', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    >
                      {deliveryOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Schedule on */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule on</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.scheduleOn}
                        onChange={(e) => handleInputChange('scheduleOn', e.target.value)}
                        placeholder="Schedule Time and date"
                        className="w-full px-3 py-2 pr-10 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                      />
                      <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Age group - Single select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age group</label>
                    <select
                      value={formData.ageGroup}
                      onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    >
                      {ageGroupOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Region - Single select */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    >
                      {regionOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message (content) - Full width */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (content)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Main content or announcement"
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSchedule}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Schedule
              </button>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateNotification
