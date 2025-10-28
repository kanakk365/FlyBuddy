import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import { Ticket, Sparkles, Plane } from "lucide-react"

function MainLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef(null)

  const notifications = [
    {
      id: 1,
      icon: <Ticket className="w-4 h-4 text-[#1f2a37]" />,
      message: 'User Rohan uploaded ticket AI-242 for Dubai.'
    },
    {
      id: 2,
      icon: <Sparkles className="w-4 h-4 text-[#1f2a37]" />,
      message: 'Riya upgraded to Premium.'
    },
    {
      id: 3,
      icon: <Plane className="w-4 h-4 text-[#1f2a37]" />,
      message: 'DEL → DXB route has 30+ chats today.'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 relative">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-600 placeholder-gray-500"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notification Icon */}
              <div className="relative" ref={notificationRef}>
                <button
                  className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                  onClick={() => setShowNotifications((prev) => !prev)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {/* Notification Badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    3
                  </span>
                </button>

                {showNotifications && (
                  <div
                    className="absolute right-0 mt-4 w-[26rem] bg-white rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="px-6 py-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Notifications</h3>
                      <p className="text-sm text-gray-500">You have {notifications.length} new notifications</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div className="max-h-72 overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-[#E8EEF9] flex items-center justify-center">
                              {notification.icon}
                            </div>
                            <p className="text-sm text-gray-700">
                              {notification.message}
                            </p>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg" style={{ backgroundColor: '#B8C8E0' }}>
                    R
                  </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
