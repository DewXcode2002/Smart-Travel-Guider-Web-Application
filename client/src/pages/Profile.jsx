import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { User, Mail, Phone, Globe, Calendar, Lock, Save, Edit2, Shield, Heart, Map, Plane, Compass } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const userLocal = JSON.parse(localStorage.getItem('user') || '{}');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        country: '',
        email: '',
        phone: '',
        password: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`/api/users/${userLocal.id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.dob) data.dob = data.dob.split('T')[0];
                    setFormData({ ...data, password: '' });
                }
            } catch (error) {
                console.error('Fetch profile error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userLocal.id) fetchProfile();
        else setLoading(false);
    }, [userLocal.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch(`/api/users/${userLocal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setIsEditing(false);
                const updatedUser = {
                    ...userLocal,
                    firstName: formData.first_name,
                    lastName: formData.last_name,
                    email: formData.email
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // Trigger profile update event for other components if needed
                window.dispatchEvent(new Event('storage'));
            } else {
                setMessage({ type: 'error', text: data.message || 'Update failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const travelStats = [
        { label: 'Trips Planned', value: '12', icon: Map, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Bookings', value: '08', icon: Compass, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Miles Covered', value: '2.4k', icon: Plane, color: 'text-amber-500', bg: 'bg-amber-50' }
    ];

    if (loading && !isEditing) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-80">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto space-y-10 pb-20">
                {/* Profile Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden group">
                            <div className="h-28 bg-primary relative">
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl">
                                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white overflow-hidden relative">
                                        <User size={64} className="opacity-20 absolute -bottom-4 -right-4 scale-150 rotate-12" />
                                        <h2 className="text-4xl font-black relative z-10">{formData.first_name?.charAt(0)}{formData.last_name?.charAt(0)}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-12 pb-10 px-8 text-center space-y-6">
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors">{formData.first_name} {formData.last_name}</h2>
                                    <p className="text-gray-400 font-bold text-sm tracking-widest uppercase mt-1">{formData.country || 'Global Explorer'}</p>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <span className="px-4 py-1.5 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-wider rounded-lg border border-gray-100 italic">Premium Member</span>
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3"
                                    >
                                        <Edit2 size={18} /> Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Travel Statistics */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-6">
                            <h3 className="text-lg font-black text-gray-900 flex items-center gap-3">
                                <Shield size={20} className="text-primary" /> Your Travel Stats
                            </h3>
                            <div className="space-y-4">
                                {travelStats.map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-gray-100 hover:bg-white transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                                <stat.icon size={22} />
                                            </div>
                                            <span className="text-gray-500 font-bold text-sm">{stat.label}</span>
                                        </div>
                                        <span className="text-xl font-black text-gray-900">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Settings */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-12 space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                            <div className="relative z-10 flex justify-between items-center">
                                <h3 className="text-2xl font-black text-gray-900">Personal Information</h3>
                                {isEditing && (
                                    <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/5 px-4 py-1.5 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Editing Mode
                                    </div>
                                )}
                            </div>

                            {message.text && (
                                <div className={`relative z-10 p-5 rounded-2xl font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                                    }`}>
                                    {message.type === 'success' ? <Shield size={20} /> : <Lock size={20} />}
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">First Name</label>
                                        <div className="relative group">
                                            <input
                                                type="text" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!isEditing}
                                                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all placeholder-gray-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Last Name</label>
                                        <input
                                            type="text" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!isEditing}
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing}
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Phone</label>
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={!isEditing}
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Country</label>
                                        <input
                                            type="text" name="country" value={formData.country} onChange={handleChange} disabled={!isEditing}
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Birth Date</label>
                                        <input
                                            type="date" name="dob" value={formData.dob} onChange={handleChange} disabled={!isEditing}
                                            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-100 focus:border-primary outline-none font-bold text-lg text-gray-900 disabled:opacity-60 transition-all"
                                        />
                                    </div>
                                    {isEditing && (
                                        <div className="space-y-3 md:col-span-2 animate-in fade-in zoom-in-95 duration-300">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-primary">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                                    placeholder="Enter new password to update"
                                                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/20 focus:border-primary outline-none font-bold text-lg text-gray-900 transition-all placeholder-gray-300"
                                                />
                                                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 text-primary opacity-20" size={20} />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-8">
                                        <button
                                            type="submit" disabled={loading}
                                            className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-black rounded-3xl hover:bg-primary-hover shadow-2xl shadow-primary/30 transition-all disabled:opacity-50 text-lg"
                                        >
                                            <Save size={22} /> {loading ? 'Saving...' : 'Save Profile'}
                                        </button>
                                        <button
                                            type="button" onClick={() => setIsEditing(false)}
                                            className="px-10 py-5 bg-gray-100 text-gray-500 font-bold rounded-3xl hover:bg-gray-200 transition-all text-lg"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Additional Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-primary/20 cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900">Privacy Settings</h4>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Manage visibility</p>
                                </div>
                            </div>
                            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-rose-100 cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Heart size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-gray-900">Favorite Places</h4>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">View your wishlist</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
