import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Shield, Lock, Key, Eye, Smartphone, AlertTriangle, EyeOff, Save, X } from 'lucide-react';

const Security = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
    const [showPass, setShowPass] = useState({ current: false, next: false, confirm: false });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.next !== passwords.confirm) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.next
                })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage({ type: 'success', text: 'Password updated successfully' });
                setPasswords({ current: '', next: '', confirm: '' });
                setTimeout(() => setShowPasswordModal(false), 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Update failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Connection error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Security & Privacy</h1>
                    <p className="text-gray-600 font-medium">Manage your account security settings</p>
                </div>

                <div className="grid gap-6">
                    {/* Password Section */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <Lock size={28} className="text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Password</h2>
                                <p className="text-sm text-gray-600 font-medium">Last changed 30 days ago</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-hover transition-all"
                        >
                            Change Password
                        </button>
                    </div>

                    {/* Password Change Modal */}
                    {showPasswordModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-2xl font-black text-gray-900">Update Password</h3>
                                    <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                                <form onSubmit={handlePasswordChange} className="p-8 space-y-6">
                                    {message.text && (
                                        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                                            }`}>
                                            {message.type === 'success' ? <Shield size={18} /> : <AlertTriangle size={18} />}
                                            {message.text}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPass.current ? "text" : "password"}
                                                    value={passwords.current}
                                                    onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold text-gray-900 transition-all text-sm"
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowPass({ ...showPass, current: !showPass.current })} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {showPass.current ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPass.next ? "text" : "password"}
                                                    value={passwords.next}
                                                    onChange={e => setPasswords({ ...passwords, next: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold text-gray-900 transition-all text-sm"
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowPass({ ...showPass, next: !showPass.next })} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {showPass.next ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPass.confirm ? "text" : "password"}
                                                    value={passwords.confirm}
                                                    onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none font-bold text-gray-900 transition-all text-sm"
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowPass({ ...showPass, confirm: !showPass.confirm })} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    {showPass.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-primary transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                                    >
                                        <Save size={18} /> {loading ? 'Updating...' : 'Save New Password'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Two-Factor Authentication */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center">
                                <Smartphone size={28} className="text-secondary" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-gray-900">Two-Factor Authentication</h2>
                                <p className="text-sm text-gray-600 font-medium">Add an extra layer of security</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    {/* Login Activity */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <Eye size={28} className="text-amber-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900">Login Activity</h2>
                                <p className="text-sm text-gray-600 font-medium">Monitor your account access</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-900">Windows PC - Chrome</p>
                                    <p className="text-sm text-gray-600">Colombo, Sri Lanka • 2 hours ago</p>
                                </div>
                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">Current</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-900">iPhone - Safari</p>
                                    <p className="text-sm text-gray-600">Kandy, Sri Lanka • 1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* API Keys */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                                <Key size={28} className="text-purple-600" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-gray-900">API Keys</h2>
                                <p className="text-sm text-gray-600 font-medium">Manage your API access tokens</p>
                            </div>
                            <button className="bg-slate-100 text-gray-700 font-bold py-2 px-6 rounded-xl hover:bg-slate-200 transition-all">
                                Generate New Key
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 p-8 rounded-3xl border-2 border-red-200">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                                <AlertTriangle size={28} className="text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-red-900">Danger Zone</h2>
                                <p className="text-sm text-red-700 font-medium">Irreversible actions</p>
                            </div>
                        </div>
                        <button className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-700 transition-all">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Security;
