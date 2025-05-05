import React from 'react'
import { FaTimes, FaBox, FaTag, FaDollarSign, FaHashtag, FaCalendarAlt } from 'react-icons/fa'

const ItemDetailsModal = ({ item, onClose }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price)
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString()
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Item Details</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm">
                        <FaTimes />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Section */}
                    <div className="col-span-1">
                        <div className="aspect-square rounded-lg overflow-hidden bg-base-200">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FaBox className="text-6xl text-base-content/50" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="col-span-1 space-y-4">
                        <div>
                            <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FaTag className="text-primary" />
                                    <span>Category: {item.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaDollarSign className="text-primary" />
                                    <span>Price: {formatPrice(item.price)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaHashtag className="text-primary" />
                                    <span>Quantity: {item.quantity}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaBox className="text-primary" />
                                    <span>Status: {
                                        <span className={`badge ${item.quantity > 0 ? 'badge-success' : 'badge-error'
                                            }`}>
                                            {item.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    }</span>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="pt-4 border-t border-base-300">
                            <div className="space-y-2 text-sm text-base-content/70">
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-primary" />
                                    <span>Created: {formatDate(item.createdAt)}</span>
                                </div>
                                {item.updatedAt && (
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-primary" />
                                        <span>Last Updated: {formatDate(item.updatedAt)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-action">
                    <button onClick={onClose} className="btn">Close</button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    )
}

export default ItemDetailsModal 