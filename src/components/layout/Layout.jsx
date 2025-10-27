import React from 'react'
import Routers from '../routers/Routers'
import { BrowserRouter as Router } from 'react-router-dom'
function Layout() {
    return (
        <Router>
            <div>
                <Routers />
            </div>
        </Router>
    )
}

export default Layout
