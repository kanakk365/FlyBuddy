import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

function OTP() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(28) // 28 seconds countdown
  const [canResend, setCanResend] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleResend = () => {
    if (canResend) {
      setTimeLeft(30) // Reset to 30 seconds
      setCanResend(false)
      // Here you would typically resend the OTP
      console.log('Resending OTP...')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length === 4) {
      console.log('OTP verified:', otpString)
      // Navigate to success page after successful verification
      navigate('/success')
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(to bottom, #ABBCD6, #B5D8E7, #ABBCD6)'
    }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Flybuddy" className="h-12 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h1>
          <p className="text-gray-500 text-sm">
            Enter the 4-digit code sent to your Email Id
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200 shadow-sm"
                maxLength="1"
              />
            ))}
          </div>

          {/* Resend Section */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Didn't get it {formatTime(timeLeft)}?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend}
                className={`font-semibold text-sm transition-colors duration-200 ${
                  canResend
                    ? 'text-purple-500 hover:text-purple-600 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Resend
              </button>
            </p>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full text-white font-semibold text-sm py-3 px-4 rounded-lg transition-all duration-200 transform focus:outline-none mt-6 cursor-pointer"
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default OTP
