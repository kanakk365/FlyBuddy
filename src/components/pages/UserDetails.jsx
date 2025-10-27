import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
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
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">Airline</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {ticketsData.map((ticket, index) => (
                  <React.Fragment key={ticket.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.airline}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{ticket.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{ticket.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-base ${
                          ticket.status === 'Completed'
                            ? ' text-green-500'
                            : ' text-red-500'
                        }`}>
                          {ticket.status === 'Completed' ? (
                            <Check className="w-4 h-4 mr-2" />
                          ) : (
                            <X className="w-4 h-4 mr-2" />
                          )}
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                    {index < ticketsData.length - 1 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-0">
                          <hr className="border-gray-200" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      case 'subscription':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">Plan Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">Payment</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {subscriptionData.map((subscription, index) => (
                  <React.Fragment key={subscription.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.planType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm text-neutral-500
                          `}>
                          {subscription.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{subscription.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{subscription.expiryDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscription.payment}</td>
                    </tr>
                    {index < subscriptionData.length - 1 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-0">
                          <hr className="border-gray-200" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
      
      case 'matches':
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tl-xl">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Matched User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider rounded-tr-xl">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {matchesData.map((match, index) => (
                  <React.Fragment key={match.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                        <span className="text-blue-500 mr-3">✈️</span>
                          {match.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{match.matchedUser}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{match.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-base ${
                          match.status === 'Connected'
                            ? ' text-green-500'
                            : ' text-yellow-500'
                        }`}>
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            match.status === 'Connected' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></div>
                          {match.status}
                        </span>
                      </td>
                    </tr>
                    {index < matchesData.length - 1 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-0">
                          <hr className="border-gray-200" />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
                  <h1 className="text-2xl text-gray-900">User Details</h1>
                  <p className="text-sm text-gray-500 mt-1 italic">View all the details about the user here</p>
                </div>
              </div>
            </div>

            {/* User Summary Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-neutral-300 p-8 mb-8">
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
                    <span className=" text-gray-900">{userInfo.name}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Phone number -</span>
                    <span className=" text-gray-900">{userInfo.phone}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Joined On -</span>
                    <span className=" text-gray-900">{userInfo.joined}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">City-</span>
                    <span className=" text-gray-900">{userInfo.city}</span>
                  </div>
                  <div className="text-base">
                    <span className="text-gray-900">E mail ID-</span>
                    <span className=" text-gray-900">{userInfo.email}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Plan-</span>
                    <span className=" text-gray-900">{userInfo.plan}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Tickets Uploaded-</span>
                    <span className=" text-gray-900">{userInfo.ticketsUploaded}</span>
                    <span className="mx-4 text-gray-400">•</span>
                    <span className="text-gray-900">Status-</span>
                    <span className=" text-gray-900">{userInfo.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* More Details Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border-[#e7e7e7] p-8 mb-8">
              <h3 className="text-2xl text-gray-900 mb-4">More Details</h3>
              <hr className="border-gray-200 mb-8" />
              <div className="grid grid-cols-3 gap-x-16 gap-y-8">
                <div>
                  <label className="text-sm text-neutral-500 block mb-2 ">Plan Details</label>
                  <p className="text-base  text-gray-900">{moreDetails.planDetails}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500 block mb-2">Chats Started</label>
                  <p className="text-base  text-gray-900">{moreDetails.chatsStarted}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500 block mb-2 ">Matches Found</label>
                  <p className="text-base  text-gray-900">{moreDetails.matchesFound}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500 block mb-2">Last Login</label>
                  <p className="text-base  text-gray-900">{moreDetails.lastLogin}</p>
                </div>
                <div>
                  <label className="text-sm text-neutral-500 block mb-2">Recent Activity</label>
                  <p className="text-base  text-gray-900">{moreDetails.recentActivity}</p>
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
                      className={`py-6 px-2 border-b-2 text-base transition-colors ${
                        activeTab === tab.id
                          ? 'border-[#abbcd6] '
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
