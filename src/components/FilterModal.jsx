import React, { useState } from 'react'

function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters, type = 'users' }) {
  const [activeCategory, setActiveCategory] = useState(
    type === 'bookings' ? 'status' : 
    type === 'notifications' ? 'status' :
    type === 'roles' ? 'roleName' :
    type === 'subscriptions' ? 'paymentType' :
    'plan'
  )
  const [filters, setFilters] = useState(
    type === 'bookings' ? {
      status: {
        verified: false,
        pending: false,
        rejected: false
      },
      sortBy: {
        newest: false,
        oldest: false
      }
    } : type === 'notifications' ? {
      status: {
        sent: false,
        scheduled: false
      },
      audience: {
        premium: false,
        free: false,
        all: false
      },
      sortBy: {
        newest: false,
        oldest: false
      }
    } : type === 'roles' ? {
      roleName: {
        admin: false,
        superAdmin: false,
        manager: false
      },
      sortBy: {
        newest: false,
        oldest: false
      }
    } : type === 'subscriptions' ? {
      paymentType: {
        paid: false,
        unpaid: false
      },
      sortBy: {
        newest: false,
        oldest: false
      },
      currency: {
        inr: false,
        usd: false,
        eur: false
      }
    } : {
      plan: {
        premium: false,
        free: false
      },
      sortBy: {
        newest: false,
        oldest: false
      }
    }
  )

  const categories = type === 'bookings' ? [
    { id: 'status', label: 'Status' },
    { id: 'sortBy', label: 'Sort By' }
  ] : type === 'notifications' ? [
    { id: 'status', label: 'Status' },
    { id: 'audience', label: 'Audience' },
    { id: 'sortBy', label: 'Sort By' }
  ] : type === 'roles' ? [
    { id: 'roleName', label: 'Role Name' },
    { id: 'sortBy', label: 'Sort By' }
  ] : type === 'subscriptions' ? [
    { id: 'paymentType', label: 'Payment Type' },
    { id: 'sortBy', label: 'Sort By' },
    { id: 'currency', label: 'Currency' }
  ] : [
    { id: 'plan', label: 'Plan' },
    { id: 'sortBy', label: 'Sort By' }
  ]

  const options = type === 'bookings' ? {
    status: [
      { id: 'verified', label: 'Verified' },
      { id: 'pending', label: 'Pending' },
      { id: 'rejected', label: 'Rejected' }
    ],
    sortBy: [
      { id: 'newest', label: 'Newest' },
      { id: 'oldest', label: 'Oldest' }
    ]
  } : type === 'notifications' ? {
    status: [
      { id: 'sent', label: 'Sent' },
      { id: 'scheduled', label: 'Scheduled' }
    ],
    audience: [
      { id: 'premium', label: 'Premium' },
      { id: 'free', label: 'Free' },
      { id: 'all', label: 'All' }
    ],
    sortBy: [
      { id: 'newest', label: 'Newest' },
      { id: 'oldest', label: 'Oldest' }
    ]
  } : type === 'roles' ? {
    roleName: [
      { id: 'admin', label: 'Admin' },
      { id: 'superAdmin', label: 'Super Admin' },
      { id: 'manager', label: 'Manager' }
    ],
    sortBy: [
      { id: 'newest', label: 'Newest' },
      { id: 'oldest', label: 'Oldest' }
    ]
  } : type === 'subscriptions' ? {
    paymentType: [
      { id: 'paid', label: 'Paid' },
      { id: 'unpaid', label: 'Unpaid' }
    ],
    sortBy: [
      { id: 'newest', label: 'Newest' },
      { id: 'oldest', label: 'Oldest' }
    ],
    currency: [
      { id: 'inr', label: 'INR' },
      { id: 'usd', label: 'USD' },
      { id: 'eur', label: 'EUR' }
    ]
  } : {
    plan: [
      { id: 'premium', label: 'Premium' },
      { id: 'free', label: 'Free' }
    ],
    sortBy: [
      { id: 'newest', label: 'Newest' },
      { id: 'oldest', label: 'Oldest' }
    ]
  }

  const handleOptionChange = (category, optionId) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [optionId]: !prev[category][optionId]
      }
    }))
  }

  const handleClearAll = () => {
    setFilters(
      type === 'bookings' ? {
        status: {
          verified: false,
          pending: false,
          rejected: false
        },
        sortBy: {
          newest: false,
          oldest: false
        }
      } : type === 'notifications' ? {
        status: {
          sent: false,
          scheduled: false
        },
        audience: {
          premium: false,
          free: false,
          all: false
        },
        sortBy: {
          newest: false,
          oldest: false
        }
      } : type === 'roles' ? {
        roleName: {
          admin: false,
          superAdmin: false,
          manager: false
        },
        sortBy: {
          newest: false,
          oldest: false
        }
      } : type === 'subscriptions' ? {
        paymentType: {
          paid: false,
          unpaid: false
        },
        sortBy: {
          newest: false,
          oldest: false
        },
        currency: {
          inr: false,
          usd: false,
          eur: false
        }
      } : {
        plan: {
          premium: false,
          free: false
        },
        sortBy: {
          newest: false,
          oldest: false
        }
      }
    )
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filter By</h3>
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        </div>

        <div className="flex">
          {/* Categories */}
          <div className="w-1/2 pr-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="w-1/2 pl-4">
            <div className="space-y-3">
              {options[activeCategory]?.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters[activeCategory][option.id]}
                    onChange={() => handleOptionChange(activeCategory, option.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
