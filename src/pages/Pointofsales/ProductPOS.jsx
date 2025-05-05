import React, { useState, useEffect } from 'react'
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaSearch, FaTag } from 'react-icons/fa'
import ReceiptModal from './ReceiptModal'

const ProductPOS = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [total, setTotal] = useState(0)
    const [showReceipt, setShowReceipt] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [amountPaid, setAmountPaid] = useState('')
    const [change, setChange] = useState(0)

    useEffect(() => {
        // Load products from localStorage
        const loadProducts = () => {
            const savedProducts = JSON.parse(localStorage.getItem('pos-items') || '[]')
            setProducts(savedProducts)
        }

        loadProducts()
        window.addEventListener('storage', loadProducts)
        return () => window.removeEventListener('storage', loadProducts)
    }, [])

    useEffect(() => {
        // Calculate total whenever cart changes
        const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        setTotal(newTotal)
    }, [cart])

    useEffect(() => {
        // Calculate change whenever amount paid changes
        const paid = parseFloat(amountPaid) || 0
        setChange(paid - total)
    }, [amountPaid, total])

    const handleAddToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id)

        if (existingItem) {
            // Update quantity if item exists
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            // Add new item to cart
            setCart([...cart, { ...product, quantity: 1 }])
        }
    }

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId))
    }

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveFromCart(productId)
            return
        }

        setCart(cart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ))
    }

    const handleCheckout = () => {
        // Generate transaction ID
        const newTransactionId = `TRX-${Date.now()}`
        setTransactionId(newTransactionId)

        // Update product quantities in localStorage
        const updatedProducts = products.map(product => {
            const cartItem = cart.find(item => item.id === product.id)
            if (cartItem) {
                return {
                    ...product,
                    quantity: product.quantity - cartItem.quantity
                }
            }
            return product
        })

        // Save updated products
        localStorage.setItem('pos-items', JSON.stringify(updatedProducts))

        // Show receipt modal
        setShowReceipt(true)
    }

    const handleCloseReceipt = () => {
        setShowReceipt(false)
        setCart([]) // Clear cart after closing receipt
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
        return matchesSearch && matchesCategory && product.quantity > 0
    })

    const categories = ['all', ...new Set(products.map(product => product.category))]

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount)
    }

    const tax = total * 0.12

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="form-control flex-1">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="input input-bordered w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-square">
                                <FaSearch />
                            </button>
                        </div>
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

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="card bg-base-100 shadow-xl">
                            <figure className="px-4 pt-4">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-32 w-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="h-32 w-full bg-base-300 rounded-lg flex items-center justify-center">
                                        <FaTag className="text-4xl text-base-content/50" />
                                    </div>
                                )}
                            </figure>
                            <div className="card-body p-4">
                                <h3 className="card-title text-lg">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold">{formatCurrency(product.price)}</span>
                                    <span className="text-sm opacity-70">Stock: {product.quantity}</span>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cart Section */}
            <div className="card bg-base-100 shadow-xl h-fit">
                <div className="card-body">
                    <h2 className="card-title mb-4">
                        <FaShoppingCart className="mr-2" />
                        Shopping Cart
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 bg-base-200 rounded-lg">
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm opacity-70">{formatCurrency(item.price)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-sm text-error"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="divider"></div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(total * 0.88)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (12%):</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="divider"></div>
                    <div className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Amount Paid</span>
                            </label>
                            <div className="input-group">
                                <span>₱</span>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="input input-bordered w-full"
                                    value={amountPaid}
                                    onChange={(e) => setAmountPaid(e.target.value)}
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-base-200 rounded-lg">
                            <span className="font-medium">Change:</span>
                            <span className={`text-lg font-bold ${change < 0 ? 'text-error' : 'text-success'}`}>
                                {formatCurrency(change)}
                            </span>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                        className="btn btn-primary mt-4"
                        onClick={handleCheckout}
                        disabled={cart.length === 0 || parseFloat(amountPaid) < total}
                    >
                        Checkout
                    </button>
                </div>
            </div>

            {/* Receipt Modal */}
            <ReceiptModal
                isOpen={showReceipt}
                onClose={handleCloseReceipt}
                cart={cart}
                total={total * 0.88}
                tax={tax}
                transactionId={transactionId}
                amountPaid={parseFloat(amountPaid)}
                change={change}
            />
        </div>
    )
}

export default ProductPOS