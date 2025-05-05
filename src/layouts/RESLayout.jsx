import React from 'react'
import { Link } from 'react-router'
import { Outlet } from 'react-router'
import { FaHome, FaList, FaKey, FaSignOutAlt, FaBars } from 'react-icons/fa'

const RESLayout = () => {
    // Mock data for demonstration

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <FaBars className="w-6 h-6" />
                        </label>
                    </div>
                    <div className="flex-1">
                        <span className="text-xl font-bold">Dashboard</span>
                    </div>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <aside className="bg-base-200 w-64 min-h-screen">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                        <ul className="menu bg-base-200 w-full">
                            <li>
                                <Link to="/new-reservation" className="active">
                                    <FaHome className="h-5 w-5" />
                                    New Reservation
                                </Link>
                            </li>
                            <li>
                                <Link to="/reservation-list">
                                    <FaList className="h-5 w-5" />
                                    Reservation List
                                </Link>
                            </li>
                            <li>
                                <Link to="/change-password">
                                    <FaKey className="h-5 w-5" />
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    <FaSignOutAlt className="h-5 w-5" />
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default RESLayout