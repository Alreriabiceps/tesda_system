import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const ChangePassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    })

    const validatePassword = (password) => {
        const errors = []
        if (password.length < 8) errors.push('At least 8 characters')
        if (!/[A-Z]/.test(password)) errors.push('One uppercase letter')
        if (!/[a-z]/.test(password)) errors.push('One lowercase letter')
        if (!/[0-9]/.test(password)) errors.push('One number')
        if (!/[!@#$%^&*]/.test(password)) errors.push('One special character (!@#$%^&*)')
        return errors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }))
        }
    }

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}

        // Validate current password
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required'
        }

        // Validate new password
        const passwordErrors = validatePassword(formData.newPassword)
        if (passwordErrors.length > 0) {
            newErrors.newPassword = passwordErrors
        }

        // Validate password confirmation
        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        try {
            // Here you would typically make an API call to change the password
            console.log('Changing password...')
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Show success message and redirect
            alert('Password changed successfully!')
            navigate('/dashboard')
        } catch (error) {
            setErrors({
                submit: 'Failed to change password. Please try again.'
            })
        }
    }

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-md mx-auto">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl font-bold mb-6">Change Password</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Current Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Current Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword.current ? "text" : "password"}
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full ${errors.currentPassword ? 'input-error' : ''}`}
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => togglePasswordVisibility('current')}
                                    >
                                        {showPassword.current ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.currentPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.currentPassword}</span>
                                    </label>
                                )}
                            </div>

                            {/* New Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">New Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full ${errors.newPassword ? 'input-error' : ''}`}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => togglePasswordVisibility('new')}
                                    >
                                        {showPassword.new ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <div className="mt-2">
                                        <p className="text-error text-sm mb-1">Password must contain:</p>
                                        <ul className="list-disc list-inside text-sm text-error">
                                            {errors.newPassword.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Confirm New Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                    >
                                        {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                                    </label>
                                )}
                            </div>

                            {/* Submit Error */}
                            {errors.submit && (
                                <div className="alert alert-error">
                                    <span>{errors.submit}</span>
                                </div>
                            )}

                            {/* Submit Buttons */}
                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword