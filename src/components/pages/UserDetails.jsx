import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../common/MainLayout'

function UserDetails() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tickets')

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

  const moreDetails = {
    planDetails: 'Free Plan',
    chatsStarted: '3 chats - Top Match: Dubai',
    matchesFound: 12,
    lastLogin: 'Oct 7, 10:15 AM',
    recentActivity: 'Oct 6 - Uploaded Ticket'
  }

  const ticketsData = [
    {
      id: 1,
      airline: 'Indigo',
      location: 'Dubai',
      date: 'Oct 7, 10:15 AM',
      status: 'Pending'
    },
    {
      id: 2,
      airline: 'Air India',
      location: 'Malaysia',
      date: 'Aug 10, 10:15 AM',
      status: 'Completed'
    }
  ]

  const subscriptionData = [
    {
      id: 1,
      planType: 'Free',
      status: 'Active',
      startDate: 'Oct 1, 2025',
      expiryDate: 'Oct 31, 2025',
      payment: '₹0'
    },
    {
      id: 2,
      planType: 'Premium',
      status: 'Expired',
      startDate: 'Sep 1, 2025',
      expiryDate: 'Sep 30, 2025',
      payment: '₹499'
    }
  ]

  const matchesData = [
    {
      id: 1,
      destination: 'Dubai',
      matchedUser: '@priya88',
      date: 'Oct 6, 2025',
      status: 'Connected'
    },
    {
      id: 2,
      destination: 'Singapore',
      matchedUser: '@arishka',
      date: 'Feb 12, 2025',
      status: 'Pending'
    },
    {
      id: 3,
      destination: 'Goa',
      matchedUser: '@Ria12',
      date: 'Jan 6, 2025',
      status: 'Connected'
    },
    {
      id: 4,
      destination: 'Jaipur',
      matchedUser: '@Sia@123',
      date: 'Dec 12, 2024',
      status: 'Connected'
    }
  ]

  const renderTableContent = () => {
    switch (activeTab) {
      case 'tickets':
        return (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: '1.8em' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Airline</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ticketsData.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-lg font-semibold text-gray-900">{ticket.airline}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{ticket.location}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{ticket.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-base font-semibold ${
                        ticket.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ticket.status === 'Completed' ? (
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      case 'subscription':
        return (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: '1.8em' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Plan Type</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Start Date</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptionData.map((subscription) => (
                  <tr key={subscription.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-lg font-semibold text-gray-900">{subscription.planType}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-base font-semibold ${
                        subscription.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{subscription.startDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{subscription.expiryDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg font-semibold text-gray-900">{subscription.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      case 'matches':
        return (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ fontSize: '1.8em' }}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Destination</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Matched User</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xl font-bold text-gray-800 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matchesData.map((match) => (
                  <tr key={match.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-lg font-semibold text-gray-900">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {match.destination}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{match.matchedUser}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-lg text-gray-600">{match.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-base font-semibold ${
                        match.status === 'Connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          match.status === 'Connected' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        {match.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="p-6 page-zoom-plus-10" style={{ fontSize: '1.15em' }}>
        <div className="max-w-7xl mx-auto">
              {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => navigate('/users')}
                  className="mr-4 p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
                  <p className="text-sm text-gray-500 mt-1 italic">View all the details about the user here</p>
                </div>
              </div>
            </div>

            {/* User Summary Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
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
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-base mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Name-</span>
                      <span className="font-semibold text-gray-900">{userInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Phone number -</span>
                      <span className="font-semibold text-gray-900">{userInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Joined On -</span>
                      <span className="font-semibold text-gray-900">{userInfo.joined}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">City-</span>
                      <span className="font-semibold text-gray-900">{userInfo.city}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-base">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">E mail ID-</span>
                      <span className="font-semibold text-gray-900">{userInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Plan-</span>
                      <span className="font-semibold text-gray-900">{userInfo.plan}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Tickets Uploaded-</span>
                      <span className="font-semibold text-gray-900">{userInfo.ticketsUploaded}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-900 font-medium">Status-</span>
                      <span className="font-semibold text-gray-900">{userInfo.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* More Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">More Details</h3>
              <div className="grid grid-cols-3 gap-x-16 gap-y-8">
                <div>
                  <label className="text-base text-gray-600 block mb-2 font-medium">Plan Details</label>
                  <p className="text-lg font-semibold text-gray-900">{moreDetails.planDetails}</p>
                </div>
                <div>
                  <label className="text-base text-gray-600 block mb-2 font-medium">Chats Started</label>
                  <p className="text-lg font-semibold text-gray-900">{moreDetails.chatsStarted}</p>
                </div>
                <div>
                  <label className="text-base text-gray-600 block mb-2 font-medium">Matches Found</label>
                  <p className="text-lg font-semibold text-gray-900">{moreDetails.matchesFound}</p>
                </div>
                <div>
                  <label className="text-base text-gray-600 block mb-2 font-medium">Last Login</label>
                  <p className="text-lg font-semibold text-gray-900">{moreDetails.lastLogin}</p>
                </div>
                <div>
                  <label className="text-base text-gray-600 block mb-2 font-medium">Recent Activity</label>
                  <p className="text-lg font-semibold text-gray-900">{moreDetails.recentActivity}</p>
                </div>
              </div>
            </div>

            {/* Tabs and Table Section */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7]">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-12 px-8">
                  {[
                    { id: 'tickets', label: 'Tickets' },
                    { id: 'subscription', label: 'Subscription' },
                    { id: 'matches', label: 'Matches' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-6 px-2 border-b-2 font-semibold text-lg transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Table Content */}
              <div className="p-8">
                {renderTableContent()}
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserDetails
