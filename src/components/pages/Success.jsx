import React from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
  const navigate = useNavigate()

  const handleGoToDashboard = () => {
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: 'linear-gradient(to bottom, #ABBCD6, #B5D8E7, #ABBCD6)'
    }}>
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-xl text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl" style={{
            background: '#ABBCD6'
          }}>
            <svg
              className="w-14 h-14 text-white"
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
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            OTP verified Successfully!!
          </h1>
          <p className="text-gray-500 text-base">
            Go to Dashboard
          </p>
        </div>

        {/* Go to Dashboard Button */}
        <button
          onClick={handleGoToDashboard}
          className="w-full text-white font-semibold text-lg py-5 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
          style={{
            background: '#D597C1',
            boxShadow: '0 4px 15px rgba(213, 151, 193, 0.4)'
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

