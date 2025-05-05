import React from 'react'
import { Link } from 'react-router'
import ThemeToggle from '../components/ThemeToggle'

const Home = () => {
    const posFeatures = [
        {
            title: 'Quick Sales',
            description: 'Process transactions efficiently with our streamlined POS interface',
            icon: '💰'
        },
        {
            title: 'Inventory Management',
            description: 'Track stock levels and manage product inventory in real-time',
            icon: '📦'
        },
        {
            title: 'Sales Reports',
            description: 'Generate detailed reports and analyze sales performance',
            icon: '📊'
        }
    ]

    const reservationFeatures = [
        {
            title: 'Event Booking',
            description: 'Schedule and manage events with our intuitive booking system',
            icon: '📅'
        },
        {
            title: 'Room Management',
            description: 'Efficiently manage room availability and assignments',
            icon: '🏢'
        },
        {
            title: 'Calendar View',
            description: 'View all reservations in an easy-to-use calendar interface',
            icon: '📆'
        }
    ]

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <div className="hero bg-base-100">
                <div className="hero-content text-center py-12">
                    <div className="max-w-2xl">
                        <div className="flex justify-end mb-4">
                            <ThemeToggle />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Welcome to Your Business Hub</h1>
                        <p className="text-lg opacity-80">
                            Manage your business operations efficiently with our integrated Point of Sale and Reservation System
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Point of Sale Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Point of Sale System</h2>
                        <Link to="/pos-dashboard" className="btn btn-primary">
                            Open POS
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posFeatures.map((feature, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="card-title">{feature.title}</h3>
                                    <p className="opacity-80">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reservation System Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Reservation System</h2>
                        <Link to="/reservation-list" className="btn btn-primary">
                            View Reservations
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reservationFeatures.map((feature, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="card-title">{feature.title}</h3>
                                    <p className="opacity-80">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to="/pos/new-sale" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title">New Sale</h3>
                                <p>Start a new transaction in the POS system</p>
                            </div>
                        </Link>
                        <Link to="/reservations/new" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <h3 className="card-title">New Reservation</h3>
                                <p>Create a new event reservation</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home