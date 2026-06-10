import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Real logic would be here
    };

    return (
        <AuthLayout
            title="Reset your"
            subtitle="Enter your email and we'll send you a link to reset your password."
        >
            {submitted ? (
                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-200">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Check your email</h3>
                    <p className="text-gray-500 font-medium mb-8">We've sent a password reset link to <br /><span className="text-gray-900 font-bold">{email}</span></p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-primary font-bold hover:underline"
                    >
                        Didn't receive the email? Try again
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                    >
                        Send Reset Link
                    </button>
                </form>
            )}

            <p className="mt-8 text-center text-gray-500 text-sm">
                Remember your password? {' '}
                <Link to="/login" className="text-primary font-bold">Back to Login</Link>
            </p>
        </AuthLayout>
    );
};

export default ForgotPassword;
