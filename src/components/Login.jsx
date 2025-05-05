import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to authenticate
        console.log('Login attempt with:', formData);
        // For demo purposes, we'll just navigate to home
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-6">Welcome Back</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full mt-6">
                            Log In
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="link link-primary">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login; 