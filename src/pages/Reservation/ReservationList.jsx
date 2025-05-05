import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { FaEdit, FaTrash, FaCalendarAlt, FaMapMarkerAlt, FaDoorOpen, FaInfoCircle } from 'react-icons/fa'

const ReservationList = () => {
    const navigate = useNavigate()
    const [reservations, setReservations] = useState([])
    const [filter, setFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        // Load reservations from localStorage
        const loadReservations = () => {
            const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
            setReservations(savedReservations)
        }

        loadReservations()
        // Add event listener for storage changes
        window.addEventListener('storage', loadReservations)
        return () => window.removeEventListener('storage', loadReservations)
    }, [])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            const updatedReservations = reservations.filter(res => res.id !== id)
            localStorage.setItem('reservations', JSON.stringify(updatedReservations))
            setReservations(updatedReservations)
        }
    }

    const handleStatusChange = (id, newStatus) => {
        const updatedReservations = reservations.map(res =>
            res.id === id ? { ...res, status: newStatus } : res
        )
        localStorage.setItem('reservations', JSON.stringify(updatedReservations))
        setReservations(updatedReservations)
    }

    const filteredReservations = reservations.filter(res => {
        const matchesFilter = filter === 'all' || res.status === filter
        const matchesSearch = res.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            res.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'badge-warning'
            case 'completed': return 'badge-success'
            case 'cancelled': return 'badge-error'
            default: return 'badge-ghost'
        }
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Event Reservations</h2>
                            <Link to="/new-reservation" className="btn btn-primary">
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
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="approved">Cancelled</option>
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
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <FaCalendarAlt className="text-primary" />
                                                    {reservation.eventType}
                                                </div>
                                            </td>
                                            <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-primary" />
                                                    {reservation.location}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <FaDoorOpen className="text-primary" />
                                                    {reservation.roomNumber}
                                                </div>
                                            </td>
                                            <td className="max-w-xs truncate">{reservation.description}</td>
                                            <td>
                                                <select
                                                    className={`select select-bordered select-sm ${getStatusBadgeClass(reservation.status)}`}
                                                    value={reservation.status}
                                                    onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => navigate(`/reservations/${reservation.id}`)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-sm text-error"
                                                        onClick={() => handleDelete(reservation.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                    <button
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => {
                                                            // Show description in a modal or tooltip
                                                            alert(reservation.description)
                                                        }}
                                                    >
                                                        <FaInfoCircle />
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