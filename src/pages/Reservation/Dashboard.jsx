import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        activeUsers: 0
    });

    useEffect(() => {
        // Load reservations from localStorage
        const loadReservations = () => {
            const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
            setReservations(savedReservations);

            // Calculate statistics
            const stats = {
                total: savedReservations.length,
                confirmed: savedReservations.filter(res => res.status === 'completed').length,
                pending: savedReservations.filter(res => res.status === 'pending').length,
                activeUsers: new Set(savedReservations.map(res => res.customer)).size
            };
            setStats(stats);
            setLoading(false);
        };

        loadReservations();
        // Add event listener for storage changes
        window.addEventListener('storage', loadReservations);
        return () => window.removeEventListener('storage', loadReservations);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Reservation Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaCalendarAlt className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Bookings</div>
                        <div className="stat-value">{stats.total}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-success">
                            <FaCheckCircle className="text-3xl" />
                        </div>
                        <div className="stat-title">Completed</div>
                        <div className="stat-value text-success">{stats.confirmed}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-warning">
                            <FaClock className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-warning">{stats.pending}</div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-info">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Users</div>
                        <div className="stat-value text-info">{stats.activeUsers}</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-xl mb-6">
                <div className="card-body">
                    <h2 className="card-title">Quick Actions</h2>
                    <div className="flex gap-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => window.location.href = '/new-reservation'}
                        >
                            New Booking
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() => window.location.href = '/reservation-list'}
                        >
                            View All Reservations
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Recent Bookings</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Event Type</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.slice(-5).map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.eventType}</td>
                                        <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                        <td>{reservation.location}</td>
                                        <td>
                                            <div className={`badge ${reservation.status === 'completed' ? 'badge-success' :
                                                reservation.status === 'pending' ? 'badge-warning' :
                                                    'badge-error'
                                                }`}>
                                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;