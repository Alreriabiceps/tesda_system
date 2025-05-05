import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { FaCamera } from 'react-icons/fa'

const EditItem = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        image: null
    })
    const [previewUrl, setPreviewUrl] = useState('')

    const categories = [
        'Electronics',
        'Clothing',
        'Food & Beverages',
        'Home & Kitchen',
        'Beauty & Personal Care',
        'Sports & Outdoors',
        'Books & Stationery',
        'Toys & Games'
    ]

    useEffect(() => {
        // Load item data from localStorage
        const items = JSON.parse(localStorage.getItem('pos-items') || '[]')
        const item = items.find(item => item.id === parseInt(id))

        if (item) {
            setFormData({
                name: item.name,
                category: item.category,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })
            setPreviewUrl(item.image)
        } else {
            // If item not found, redirect to item list
            navigate('/item-list')
        }
    }, [id, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result
                setPreviewUrl(base64String)
                setFormData(prev => ({
                    ...prev,
                    image: base64String
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Get existing items
        const items = JSON.parse(localStorage.getItem('pos-items') || '[]')

        // Update the item
        const updatedItems = items.map(item =>
            item.id === parseInt(id)
                ? {
                    ...item,
                    ...formData,
                    status: formData.quantity > 0 ? 'in-stock' : 'out-of-stock',
                    updatedAt: new Date().toISOString()
                }
                : item
        )

        // Save back to localStorage
        localStorage.setItem('pos-items', JSON.stringify(updatedItems))

        // Navigate back to item list
        navigate('/item-list')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">Edit Item</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Item Image</span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="w-32 h-32 border-2 border-dashed border-base-300 rounded-lg flex items-center justify-center overflow-hidden">
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaCamera className="text-4xl text-base-content/50" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="file-input file-input-bordered w-full"
                                    />
                                    <p className="text-sm text-base-content/70 mt-2">
                                        Recommended size: 500x500px
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Category</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Item Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Enter item name"
                                required
                            />
                        </div>

                        {/* Price and Quantity Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Price */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Price</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input input-bordered w-full pl-8"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Quantity</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="input input-bordered w-full"
                                    placeholder="0"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/item-list')}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditItem 