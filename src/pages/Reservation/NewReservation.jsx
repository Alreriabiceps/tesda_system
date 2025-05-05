import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const NewReservation = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        eventType: '',
        date: '',
        location: '',
        roomNumber: '',
        description: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Create new reservation object with ID and timestamp
        const newReservation = {
            id: Date.now(), // Using timestamp as unique ID
            ...formData,
            createdAt: new Date().toISOString(),
            status: 'pending' // Adding status field
        }

        // Get existing reservations from localStorage
        const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]')

        // Add new reservation to the array
        const updatedReservations = [...existingReservations, newReservation]

        // Save updated array back to localStorage
        localStorage.setItem('reservations', JSON.stringify(updatedReservations))

        // Navigate back to reservation list
        navigate('/reservation-list')
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">New Event Reservation</h2>
                            <button
                                type="button"
                                onClick={() => navigate('/reservation-list')}
                                className="btn btn-ghost"
                            >
                                Back to List
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information Section */}
                            <div className="bg-base-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Event Type</span>
                                        </label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleChange}
                                            className="select select-bordered w-full"
                                            required
                                        >
                                            <option value="">Select Event Type</option>
                                            <option value="meeting">Meeting</option>
                                            <option value="conference">Conference</option>
                                            <option value="workshop">Workshop</option>
                                            <option value="seminar">Seminar</option>
                                            <option value="training">Training</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Date</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Location Details Section */}
                            <div className="bg-base-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Location Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Location</span>
                                        </label>
                                        <select
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="select select-bordered w-full"
                                            required
                                        >
                                            <option value="">Select Location</option>
                                            <option value="main-building">Main Building</option>
                                            <option value="conference-center">Conference Center</option>
                                            <option value="training-center">Training Center</option>
                                            <option value="executive-wing">Executive Wing</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Room Number</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="roomNumber"
                                            value={formData.roomNumber}
                                            onChange={handleChange}
                                            className="input input-bordered w-full"
                                            required
                                            placeholder="Enter room number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Event Details Section */}
                            <div className="bg-base-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                                <div className="space-y-6">
                                    <div className="form-control w-full">
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="textarea textarea-bordered h-48 w-full"
                                            placeholder="Please provide details about your event"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/reservations')}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create Reservation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewReservation