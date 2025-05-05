import React, { useState } from 'react'
import { Link } from 'react-router'

const ItemList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')

    // Mock data - replace with actual API call
    const items = [
        {
            id: 1,
            name: 'Laptop Pro',
            category: 'Electronics',
            price: 1299.99,
            quantity: 15,
            image: 'https://placehold.co/100x100'
        },
        {
            id: 2,
            name: 'Wireless Headphones',
            category: 'Electronics',
            price: 199.99,
            quantity: 30,
            image: 'https://placehold.co/100x100'
        },
        {
            id: 3,
            name: 'Coffee Maker',
            category: 'Home & Kitchen',
            price: 79.99,
            quantity: 20,
            image: 'https://placehold.co/100x100'
        },
        {
            id: 4,
            name: 'Yoga Mat',
            category: 'Sports & Outdoors',
            price: 29.99,
            quantity: 50,
            image: 'https://placehold.co/100x100'
        }
    ]

    const categories = ['all', ...new Set(items.map(item => item.category))]

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold">Inventory Items</h2>
                <Link to="/pos/add-item" className="btn btn-primary">
                    Add New Item
                </Link>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="form-control flex-1">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="form-control w-full md:w-48">
                    <select
                        className="select select-bordered"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-lg">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-medium">{item.name}</td>
                                <td>{item.category}</td>
                                <td>{formatPrice(item.price)}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span>{item.quantity}</span>
                                        {item.quantity < 10 && (
                                            <span className="badge badge-warning">Low Stock</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge ${item.quantity > 0 ? 'badge-success' : 'badge-error'}`}>
                                        {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-ghost"
                                            onClick={() => console.log('Edit item:', item.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error btn-ghost"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this item?')) {
                                                    console.log('Delete item:', item.id)
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-500">No items found</p>
                </div>
            )}

            {/* Summary Section */}
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-title">Total Items</div>
                    <div className="stat-value">{items.length}</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Low Stock Items</div>
                    <div className="stat-value text-warning">
                        {items.filter(item => item.quantity < 10).length}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-title">Out of Stock</div>
                    <div className="stat-value text-error">
                        {items.filter(item => item.quantity === 0).length}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemList