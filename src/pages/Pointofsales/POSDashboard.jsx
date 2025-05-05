import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FaBox, FaDollarSign, FaShoppingCart, FaExclamationTriangle, FaChartLine, FaPlus, FaList, FaHistory } from 'react-icons/fa'

const POSDashboard = () => {
    const [stats, setStats] = useState({
        totalItems: 0,
        lowStock: 0,
        outOfStock: 0,
        totalValue: 0
    })

    useEffect(() => {
        // Load items from localStorage
        const items = JSON.parse(localStorage.getItem('pos-items') || '[]')

        // Calculate statistics
        const totalItems = items.length
        const lowStock = items.filter(item => item.quantity < 10 && item.quantity > 0).length
        const outOfStock = items.filter(item => item.quantity === 0).length
        const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        setStats({
            totalItems,
            lowStock,
            outOfStock,
            totalValue
        })
    }, [])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount)
    }

    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/add-item" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaPlus className="text-2xl text-primary" />
                            </div>
                            <div>
                                <h3 className="card-title">Add New Item</h3>
                                <p className="text-sm opacity-70">Add a new product to inventory</p>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/item-list" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaList className="text-2xl text-primary" />
                            </div>
                            <div>
                                <h3 className="card-title">View Inventory</h3>
                                <p className="text-sm opacity-70">Manage your product inventory</p>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to="/product-pos" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="card-body">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaShoppingCart className="text-2xl text-primary" />
                            </div>
                            <div>
                                <h3 className="card-title">New Sale</h3>
                                <p className="text-sm opacity-70">Start a new transaction</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow-xl">
                    <div className="stat-figure text-primary">
                        <FaBox className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value">{stats.totalItems}</div>
                </div>

                <div className="stat bg-base-100 shadow-xl">
                    <div className="stat-figure text-warning">
                        <FaExclamationTriangle className="text-3xl" />
                    </div>
                    <div className="stat-title">Low Stock</div>
                    <div className="stat-value text-warning">{stats.lowStock}</div>
                </div>

                <div className="stat bg-base-100 shadow-xl">
                    <div className="stat-figure text-error">
                        <FaExclamationTriangle className="text-3xl" />
                    </div>
                    <div className="stat-title">Out of Stock</div>
                    <div className="stat-value text-error">{stats.outOfStock}</div>
                </div>


            </div>

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaHistory className="text-xl text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Inventory Updated</h3>
                                <p className="text-sm opacity-70">Last updated: {new Date().toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FaChartLine className="text-xl text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">System Status</h3>
                                <p className="text-sm opacity-70">All systems operational</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default POSDashboard