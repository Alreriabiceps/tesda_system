import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const AddItem = () => {
    const navigate = useNavigate()
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
            setFormData(prev => ({
                ...prev,
                image: file
            }))
            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically make an API call to save the item
        console.log('Item data:', formData)
        // Navigate back to products list
        navigate('/pos/products')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">Add New Item</h2>

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
                                        <span className="text-4xl">📷</span>
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
                                onClick={() => navigate('/pos/products')}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Add Item
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddItem