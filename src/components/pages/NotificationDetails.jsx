import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function NotificationDetails() {
  const navigate = useNavigate()

  const notificationData = {
    title: 'Premium Offer',
    audience: 'Premium Users',
    date: 'Oct 6',
    status: 'Sent',
    age: '18-24',
    region: 'India',
    message: 'Don\'t miss the upcoming travels with Flybuddy Subscribe to premium now'
  }


  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.25em' }}>
        <div className="max-w-7xl mx-auto">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => navigate('/notifications')}
                  className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-medium text-gray-900">Notification Details</h1>
                  <p className="text-lg text-gray-600 mt-2">
                    View all the details about the Notification here
                  </p>
                </div>
              </div>

            {/* Notification Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
              <h3 className="text-2xl font-medium text-gray-900 mb-8">Notification Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Title</label>
                    <p className="text-base font-semibold text-gray-900">{notificationData.title}</p>
                  </div>

                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Audience</label>
                    <p className="text-base font-semibold text-gray-900">{notificationData.audience}</p>
                  </div>

                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Date</label>
                    <p className="text-base font-semibold text-gray-900">{notificationData.date}</p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Status</label>
                    <span className="text-base font-semibold text-gray-900 ">
                      {notificationData.status}
                    </span>
                  </div>

                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">CTR</label>
                    <p className="text-base font-semibold text-gray-900">68%</p>
                  </div>

                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Delivered</label>
                    <p className="text-base font-semibold text-gray-900">2,250 / 2,300</p>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Age</label>
                    <p className="text-base font-semibold text-gray-900">{notificationData.age}</p>
                  </div>

                  <div>
                    <label className="block text-base  text-neutral-500 mb-2">Region</label>
                    <p className="text-base font-semibold text-gray-900">{notificationData.region}</p>
                  </div>
                </div>
              </div>

              {/* Message Content - Full width */}
              <div className="mt-8">
                <label className="block text-base  text-neutral-500 mb-4">Message (Content)</label>
                <div className="bg-gray-50 rounded-lg ">
                  <p className="text-base font-medium text-gray-900 leading-relaxed">{notificationData.message}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotificationDetails
