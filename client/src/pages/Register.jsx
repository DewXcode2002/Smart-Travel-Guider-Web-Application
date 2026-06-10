import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        country: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                const data = await response.json();
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3.5rem] -z-10" />

            <AuthLayout
                title={<span>Welcome to <span className="text-primary">TravelGuider</span></span>}
                subtitle="Join our global elite and unlock a world of bespoke exploration."
            >
                <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">First Name</label>
                                <input type="text" id="firstName" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Last Name</label>
                                <input type="text" id="lastName" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Birth Date</label>
                                <input type="date" id="dob" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Nationality</label>
                                <input type="text" id="country" placeholder="e.g. United Kingdom" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                        </div>

                        <div className="space-y-2 group/input">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Electronic Mail</label>
                            <input type="email" id="email" placeholder="explorer@archive.com" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Choose Your Pathway</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'user' })}
                                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${formData.role === 'user' ? 'bg-primary border-primary text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                >
                                    Global Traveler
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: 'supplier' })}
                                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all ${formData.role === 'supplier' ? 'bg-primary border-primary text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                                >
                                    Service Supplier
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2 group/input">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Contact Number</label>
                            <input type="tel" id="phone" placeholder="+44 7XXX XXXXXX" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Access Key</label>
                                <input type="password" id="password" placeholder="••••••••" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Confirm Key</label>
                                <input type="password" id="confirmPassword" placeholder="••••••••" onChange={handleChange} className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm" required />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative overflow-hidden group/btn"
                    >
                        <span className="relative z-10">Establish Membership</span>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                </form>

                <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <p className="text-slate-400 font-bold text-xs">
                        Already an established explorer? {' '}
                        <Link to="/login" className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors ml-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 hover:bg-primary/10">
                            Enter Sanctuary
                        </Link>
                    </p>
                </div>
            </AuthLayout>
        </div>
    );
};

export default Register;
