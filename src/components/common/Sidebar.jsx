import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/Top.png'

function Sidebar({ collapsed, onToggleCollapse }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems = [
    { name: 'Dashboard', icon: 'grid', path: '/home' },
    { name: 'Users', icon: 'users', path: '/users' },
    { name: 'Bookings', icon: 'book', path: '/bookings' },
    { name: 'Notifications', icon: 'bell', path: '/notifications' },
    { name: 'Roles & Permissions', icon: 'document', path: '/roles-permissions' },
    { name: 'Subscriptions', icon: 'calendar', path: '/subscriptions' },
    { name: 'Reports', icon: 'chart', path: '/reports' }
  ]

  const getIcon = (iconName) => {
    const icons = {
      grid: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zm-8 8h6v6H3v-6zm8 0h6v6h-6v-6z"/>
        </svg>
      ),
      users: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-3.31 0-6 2.69-6 6v2h12v-2c0-3.31-2.69-6-6-6z"/>
        </svg>
      ),
      book: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      bell: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      ),
      document: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      calendar: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
      chart: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
        </svg>
      )
    }
    return icons[iconName] || null
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-20' : 'w-72'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        
        {/* Logo and Collapsible Button */}
        <div className="px-3 pt-6 pb-4 flex items-center justify-between">
          <div className="w-full">
            <img
              src={logo}
              alt="Flybuddy"
              className="w-full h-10 object-cover"
            />
          </div>

          {/* Collapsible Button - Sticking out from sidebar */}
          <div className="flex items-start z-10 -mr-6">
            <button
              onClick={onToggleCollapse}
              className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors bg-white border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {collapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>
        </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path
            return (
              <li key={index}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-100 text-gray-800'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                  title={collapsed ? item.name : ''}
                >
                  <span className="flex-shrink-0">{getIcon(item.icon)}</span>
                  {!collapsed && <span className="ml-4 text-[15px] font-medium">{item.name}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

        {/* User Profile */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0" style={{ backgroundColor: '#B8C8E0' }}>
                  R
                </div>
            {!collapsed && (
              <>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="text-xs text-gray-500 flex items-center">
                    Welcome 👋
                  </div>
                  <div className="text-[15px] font-semibold text-gray-900 truncate">Ria</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
