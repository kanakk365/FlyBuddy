import React from 'react'
import Home from '../pages/Home'
import Users from '../pages/Users'
import UserDetails from '../pages/UserDetails'
import Bookings from '../pages/Bookings'
import BookingDetails from '../pages/BookingDetails'
import Notifications from '../pages/Notifications'
import CreateNotification from '../pages/CreateNotification'
import NotificationDetails from '../pages/NotificationDetails'
import RolesAndPermissions from '../pages/RolesAndPermissions'
import CreateRole from '../pages/CreateRole'
import RoleDetails from '../pages/RoleDetails'
import EditRole from '../pages/EditRole'
import Subscriptions from '../pages/Subscriptions'
import SubscriptionDetails from '../pages/SubscriptionDetails'
import Reports from '../pages/Reports'
import Products from '../pages/Products'
import Login from '../pages/Login'
import OTP from '../pages/OTP'
import Success from '../pages/Success'
import { Routes, Route } from 'react-router-dom'
function Routers() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/user-details' element={<UserDetails />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/booking-details' element={<BookingDetails />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/create-notification' element={<CreateNotification />} />
            <Route path='/notification-details' element={<NotificationDetails />} />
            <Route path='/roles-permissions' element={<RolesAndPermissions />} />
            <Route path='/create-role' element={<CreateRole />} />
            <Route path='/role-details' element={<RoleDetails />} />
            <Route path='/edit-role' element={<EditRole />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/subscription-details' element={<SubscriptionDetails />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/otp' element={<OTP />} />
            <Route path='/success' element={<Success />} />
            <Route path='/products' element={<Products />} />
        </Routes>
    </div>
  )
}

export default Routers
