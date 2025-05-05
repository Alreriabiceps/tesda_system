import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Outlet } from 'react-router'
import { FaHome, FaList, FaKey, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa'
import ThemeToggle from '../components/ThemeToggle'

const RESLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing tokens, etc.)
        navigate('/login')
    }

    const menuItems = [
        {
            title: 'Dashboard',
            path: '/dashboard',
            icon: <FaKey className="text-xl" />
        },
        {
            title: 'New Reservation',
            path: '/new-reservation',
            icon: <FaHome className="text-xl" />
        },
        {
            title: 'Reservation List',
            path: '/reservation-list',
            icon: <FaList className="text-xl" />
        },
        {
            title: 'Change Password',
            path: '/change-password',
            icon: <FaKey className="text-xl" />
        }

    ]

    return (
        <div className="min-h-screen bg-base-200">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-base-100 shadow-lg transition-all duration-300 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-4 border-b border-base-300">
                        <div className="flex items-center justify-between">
                            {isSidebarOpen && (
                                <h1 className="text-xl font-bold">TESDA</h1>
                            )}
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="btn btn-ghost btn-circle btn-sm"
                            >
                                {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="menu menu-compact">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center ${location.pathname === item.path ? 'active' : ''}`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        {isSidebarOpen && <span>{item.title}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-base-300">
                        <div className="space-y-2">
                            {isSidebarOpen && (
                                <Link to="/" className="flex items-center text-sm opacity-70 hover:opacity-100">
                                    <FaHome className="mr-2" />
                                    Back to Home
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-sm text-error opacity-70 hover:opacity-100 w-full"
                            >
                                <FaSignOutAlt className="mr-2" />
                                {isSidebarOpen && <span>Logout</span>}
                            </button>
                            <div className="flex items-center justify-end">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="bg-base-100 shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold">
                                {menuItems.find(item => item.path === location.pathname)?.title || 'Reservation System'}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="badge badge-primary">Online</div>
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                    <FaUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RESLayout