import React from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
  const navigate = useNavigate()

  const handleGoToDashboard = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(to bottom, #ABBCD6, #B5D8E7, #ABBCD6)'
    }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{
            background: '#ABBCD6'
          }}>
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            OTP verified Successfully!!
          </h1>
        </div>

        {/* Go to Dashboard Button */}
        <button
          onClick={handleGoToDashboard}
          className="w-full text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none cursor-pointer"
          style={{
            background: '#D597C1',
            boxShadow: '0 2px 8px rgba(213, 151, 193, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#C485B0'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#D597C1'
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Success

