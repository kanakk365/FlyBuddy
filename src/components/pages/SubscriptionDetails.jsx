import React from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function SubscriptionDetails() {
  const navigate = useNavigate()

  // Subscription details data
  const userDetails = {
    bookingId: 'FB12345',
    user: 'John Doe',
    email: 'john@yahoo.in',
    phoneNumber: '+91 9864351612',
    flight: 'BLR → DXB',
    date: 'Oct 8, 2025'
  }

  const planDetails = {
    planType: 'Premium',
    status: 'Paid',
    amount: '$25',
    paymentId: 'TXN#123456',
    purchasedDate: 'Oct 5, 2025',
    endingDate: 'Nov 8, 2025'
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.25em' }}>
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/subscriptions')}
              className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Subscription Details</h1>
              <p className="text-lg text-gray-600 mt-2">
                View all the details about the Subscription here
              </p>
            </div>
          </div>

            {/* User Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">User Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Booking ID */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Booking ID</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.bookingId}</p>
                </div>

                {/* User */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">User</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.user}</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.email}</p>
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Phone Number</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.phoneNumber}</p>
                </div>

                {/* Flight */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Flight</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.flight}</p>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Date</label>
                  <p className="text-lg font-semibold text-gray-900">{userDetails.date}</p>
                </div>
              </div>
            </div>

            {/* Plan Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Plan Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Plan Type */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Plan Type</label>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                    {planDetails.planType}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Status</label>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {planDetails.status}
                  </span>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Amount</label>
                  <p className="text-lg font-semibold text-gray-900">{planDetails.amount}</p>
                </div>

                {/* Payment ID */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Payment ID</label>
                  <p className="text-lg font-semibold text-gray-900">{planDetails.paymentId}</p>
                </div>

                {/* Purchased Date */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Purchased Date</label>
                  <p className="text-lg font-semibold text-gray-900">{planDetails.purchasedDate}</p>
                </div>

                {/* Ending Date */}
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-2">Ending Date</label>
                  <p className="text-lg font-semibold text-gray-900">{planDetails.endingDate}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SubscriptionDetails
