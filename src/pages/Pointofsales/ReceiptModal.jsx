import React, { useRef } from 'react'
import { FaTimes, FaPrint, FaStore, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ReceiptModal = ({ isOpen, onClose, cart, total, tax, transactionId, amountPaid, change }) => {
    const receiptRef = useRef(null)

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount)
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        const receiptContent = receiptRef.current.innerHTML

        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body {
                            font-family: 'Courier New', monospace;
                            padding: 20px;
                            max-width: 300px;
                            margin: 0 auto;
                        }
                        .receipt-header {
                            text-align: center;
                            margin-bottom: 20px;
                        }
                        .receipt-items {
                            margin: 20px 0;
                        }
                        .receipt-item {
                            display: flex;
                            justify-content: space-between;
                            margin: 5px 0;
                        }
                        .receipt-total {
                            border-top: 1px dashed #000;
                            margin-top: 20px;
                            padding-top: 10px;
                        }
                        .receipt-footer {
                            text-align: center;
                            margin-top: 20px;
                            font-size: 12px;
                        }
                        @media print {
                            body {
                                width: 80mm;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${receiptContent}
                </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }

    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Transaction Receipt</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-sm">
                        <FaTimes />
                    </button>
                </div>

                <div ref={receiptRef} className="bg-white p-6 rounded-lg">
                    {/* Receipt Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold mb-2">ECA POINT OF SALES</h2>
                        <div className="text-sm space-y-1">
                            <p><FaMapMarkerAlt className="inline mr-2" />Suclayin Arayat Pampanga</p>
                            <p><FaPhone className="inline mr-2" />+639613790777</p>
                            <p><FaEnvelope className="inline mr-2" />ECA-TESDA@gmail.com</p>
                        </div>
                    </div>

                    {/* Transaction Info */}
                    <div className="text-sm mb-4">
                        <p>Transaction ID: {transactionId}</p>
                        <p>Date: {new Date().toLocaleString()}</p>
                    </div>

                    {/* Items */}
                    <div className="border-t border-b border-gray-300 py-4">
                        <div className="grid grid-cols-12 text-sm font-bold mb-2">
                            <div className="col-span-6">Item</div>
                            <div className="col-span-2 text-right">Qty</div>
                            <div className="col-span-4 text-right">Price</div>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 text-sm mb-2">
                                <div className="col-span-6">{item.name}</div>
                                <div className="col-span-2 text-right">{item.quantity}</div>
                                <div className="col-span-4 text-right">{formatCurrency(item.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tax (12%):</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span>{formatCurrency(total + tax)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Amount Paid:</span>
                            <span>{formatCurrency(amountPaid)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Change:</span>
                            <span>{formatCurrency(change)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 text-sm">
                        <p>Thank you for your purchase!</p>
                        <p className="mt-2">Please come again</p>
                    </div>
                </div>

                {/* Print Button */}
                <div className="modal-action">
                    <button onClick={handlePrint} className="btn btn-primary">
                        <FaPrint className="mr-2" />
                        Print Receipt
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    )
}

export default ReceiptModal 