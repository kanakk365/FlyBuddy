import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import MainLayout from '../common/MainLayout'

function BookingDetails() {
  const navigate = useNavigate()

  const bookingDetails = {
    ticketId: '#TCK001',
    passengerName: 'Rohan Mehta',
    flightNo: '6E 102',
    pnr: 'XY789Z',
    source: 'Hyderabad-HYD',
    destination: 'Dubai-DXB',
    departureDate: 'Oct 25',
    airline: 'Indigo',
    uploadDate: 'Oct 6',
    status: 'Pending'
  }

  const userInfo = {
    name: 'Rohan Mehta',
    phone: '+91 9654324323',
    joined: 'Oct 6',
    city: 'Bangalore',
    email: 'Rohan24@yahoo.in',
    plan: 'Free',
    ticketsUploaded: 2,
    status: 'Active'
  }

  const handleDownloadTicket = () => {
    console.log('Downloading ticket PDF...')
    // Implement ticket download functionality
  }

  const handleViewProfile = () => {
    navigate('/user-details')
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.15em' }}>
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => navigate('/bookings')}
                  className="mr-6 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl text-gray-900">
                    Booking Details - Ticket {bookingDetails.ticketId}
                  </h1>
                  <p className="text-base text-gray-600 mt-2">
                    Comprehensive view of booking information and passenger details
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
              <div className="flex items-center mb-6">
                <h3 className="text-xl text-gray-900">Booking Information</h3>
              </div>
              <div className="border-b border-gray-200 mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Passenger Name</label>
                  <p className="text-base text-gray-900">{bookingDetails.passengerName}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Flight Number</label>
                  <p className="text-base text-gray-900">{bookingDetails.flightNo}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">PNR Code</label>
                  <p className="text-base text-gray-900">{bookingDetails.pnr}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Departure</label>
                  <p className="text-base text-gray-900">{bookingDetails.source}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Destination</label>
                  <p className="text-base text-gray-900">{bookingDetails.destination}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Departure Date</label>
                  <p className="text-base text-gray-900">{bookingDetails.departureDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Airline</label>
                  <p className="text-base text-gray-900">{bookingDetails.airline}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-neutral-500">Upload Date</label>
                  <p className="text-base text-gray-900">{bookingDetails.uploadDate}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-500">Status</label>
                  <p className="text-base text-gray-900">{bookingDetails.status}</p>
                </div>
              </div>

              {/* Ticket Upload Section */}
              <div className=" text-xs mt-8 text-neutral-500">
                <div className="mb-4">
                  <label className="text-base font-medium text-gray-700">Ticket Uploaded</label>
                </div>
                
                {/* Ticket File Display - Exact Image Design */}
                <button
                  onClick={handleDownloadTicket}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg px-4 py-1.5 flex items-center space-x-3 transition-colors border border-gray-200 hover:border-gray-300 shadow-sm"
                >
                  {/* PDF Icon */}
                  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Filename */}
                  <span className="text-base font-medium text-gray-900 flex-1">Ticket.pdf</span>
                  
                  {/* Download Icon */}
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <h3 className="text-xl text-gray-900">Passenger Information</h3>
                </div>
                <button
                  onClick={handleViewProfile}
                  className="flex items-center px-4 py-2 hover:bg-blue-50 rounded-md transition-colors text-base "
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="flex items-center gap-8">
                {/* User Avatar */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* User Information - Two Rows */}
                <div className="flex-1">
                  <div className="text-base mb-3">
                    <span className="text-gray-900">Name-</span>
                    <span className="text-gray-900">{userInfo.name}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Phone number -</span>
                    <span className="text-gray-900">{userInfo.phone}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Joined On -</span>
                    <span className="text-gray-900">{userInfo.joined}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">City-</span>
                    <span className="text-gray-900">{userInfo.city}</span>
                  </div>
                  <div className="text-base">
                    <span className="text-gray-900">E mail ID-</span>
                    <span className="text-gray-900">{userInfo.email}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Plan-</span>
                    <span className="text-gray-900">{userInfo.plan}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Tickets Uploaded-</span>
                    <span className="text-gray-900">{userInfo.ticketsUploaded}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Status-</span>
                    <span className="text-gray-900">{userInfo.status}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default BookingDetails
