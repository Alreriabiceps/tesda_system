import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaEdit, FaTrash, FaBox, FaTag, FaHashtag, FaInfoCircle } from 'react-icons/fa'
import ItemDetailsModal from './ItemDetailsModal'

const ItemList = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        // Load items from localStorage
        const loadItems = () => {
            const savedItems = JSON.parse(localStorage.getItem('pos-items') || '[]')
            setItems(savedItems)
        }

        loadItems()
        // Add event listener for storage changes
        window.addEventListener('storage', loadItems)
        return () => window.removeEventListener('storage', loadItems)
    }, [])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const updatedItems = items.filter(item => item.id !== id)
            localStorage.setItem('pos-items', JSON.stringify(updatedItems))
            setItems(updatedItems)
        }
    }

    const handleQuantityChange = (id, newQuantity) => {
        const updatedItems = items.map(item =>
            item.id === id ? {
                ...item,
                quantity: newQuantity,
                status: newQuantity > 0 ? 'in-stock' : 'out-of-stock',
                updatedAt: new Date().toISOString()
            } : item
        )
        localStorage.setItem('pos-items', JSON.stringify(updatedItems))
        setItems(updatedItems)
    }

    const categories = ['all', ...new Set(items.map(item => item.category))]

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
        return matchesSearch && matchesCategory
    })

    const formatPrice = (price) => {
        return `₱${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
                                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="bg-base-300 w-full h-full flex items-center justify-center">
                                                    <FaBox className="text-2xl text-base-content/50" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="font-medium">{item.name}</td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <FaTag className="text-primary" />
                                        {item.category}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-bold">₱</span>
                                        {formatPrice(item.price).replace('₱', '')}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <FaHashtag className="text-primary" />
                                        <input
                                            type="number"
                                            className="input input-bordered input-sm w-20"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                                            min="0"
                                        />
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
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => navigate(`/pos/edit-item/${item.id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm text-error"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => setSelectedItem(item)}
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
                        {items.filter(item => item.quantity < 10 && item.quantity > 0).length}
                    </div>
                </div>
                <div className="stat">
                    <div className="stat-title">Out of Stock</div>
                    <div className="stat-value text-error">
                        {items.filter(item => item.quantity === 0).length}
                    </div>
                </div>
            </div>

            {/* Item Details Modal */}
            {selectedItem && (
                <ItemDetailsModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    )
}

export default ItemList