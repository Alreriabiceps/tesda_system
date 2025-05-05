import React from 'react'
import { Link } from 'react-router'



const Dashboard = () => {
    // Mock data for demonstration
    const stats = [
        { title: 'Total Users', value: '1,234', icon: '👥', change: '+12%' },
        { title: 'Revenue', value: '$12,345', icon: '💰', change: '+8%' },
        { title: 'Active Projects', value: '42', icon: '📊', change: '+5%' },
        { title: 'Tasks', value: '89', icon: '✅', change: '+23%' }
    ]

    const recentActivity = [
        { user: 'John Doe', action: 'completed task', time: '2 hours ago' },
        { user: 'Jane Smith', action: 'added new project', time: '4 hours ago' },
        { user: 'Mike Johnson', action: 'updated profile', time: '5 hours ago' },
        { user: 'Sarah Wilson', action: 'commented on task', time: '6 hours ago' }
    ]

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-300 lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <span className="text-xl font-bold">Dashboard</span>
                    </div>
                </div>

                {/* Main content */}
                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="stats shadow">
                                <div className="stat">
                                    <div className="stat-figure text-primary text-3xl">
                                        {stat.icon}
                                    </div>
                                    <div className="stat-title">{stat.title}</div>
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-desc text-success">{stat.change}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Recent Activity</h2>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentActivity.map((activity, index) => (
                                            <tr key={index}>
                                                <td>{activity.user}</td>
                                                <td>{activity.action}</td>
                                                <td>{activity.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    New Reservation
                                </Link>
                            </li>
                            <li>
                                <Link to="/reservation-list">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Reservation List
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/tasks">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/team">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Logout
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/settings">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Dashboard