import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

const ReservationList = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    // Mock data - replace with actual API call
    const reservations = [
        {
            id: 1,
            eventType: 'Meeting',
            date: '2024-03-20',
            location: 'Main Building',
            roomNumber: '101',
            status: 'confirmed',
            description: 'Weekly team meeting'
        },
        {
            id: 2,
            eventType: 'Conference',
            date: '2024-03-21',
            location: 'Conference Center',
            roomNumber: 'A1',
            status: 'pending',
            description: 'Annual tech conference'
        },
        {
            id: 3,
            eventType: 'Workshop',
            date: '2024-03-22',
            location: 'Training Center',
            roomNumber: 'B2',
            status: 'cancelled',
            description: 'Employee training session'
        }
    ]

    const filteredReservations = reservations.filter(reservation => {
        const matchesFilter = filter === 'all' || reservation.status === filter
        const matchesSearch = reservation.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            reservation.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const getStatusBadge = (status) => {
        const statusClasses = {
            confirmed: 'badge-success',
            pending: 'badge-warning',
            cancelled: 'badge-error'
        }
        return (
            <div className={`badge ${statusClasses[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Event Reservations</h2>
                            <Link to="/reservations/new" className="btn btn-primary">
                                New Reservation
                            </Link>
                        </div>

                        {/* Filters Section */}
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="form-control flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by event type, room, or description..."
                                    className="input input-bordered w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="form-control w-full md:w-48">
                                <select
                                    className="select select-bordered"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="pending">Pending</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Event Type</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Room</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReservations.map((reservation) => (
                                        <tr key={reservation.id}>
                                            <td>{reservation.eventType}</td>
                                            <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                            <td>{reservation.location}</td>
                                            <td>{reservation.roomNumber}</td>
                                            <td className="max-w-xs truncate">{reservation.description}</td>
                                            <td>{getStatusBadge(reservation.status)}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() => navigate(`/reservations/${reservation.id}`)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() => navigate(`/reservations/${reservation.id}/edit`)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-error btn-ghost"
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to cancel this reservation?')) {
                                                                // Handle cancellation
                                                                console.log('Cancelling reservation:', reservation.id)
                                                            }
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Empty State */}
                        {filteredReservations.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-500">No reservations found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationList