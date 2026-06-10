import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Compass } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role === 'admin') {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    navigate('/admin');
                } else {
                    setError('Access Denied: Administrative privileges required.');
                }
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('System connectivity error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md relative z-10">
                <div className="glass p-12 rounded-[3.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl animate-slide-up">
                    <div className="flex flex-col items-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-primary/40 mb-8 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                            <Shield size={40} />
                        </div>
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-black text-white tracking-tight">Supreme Control</h1>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.4em]">Administrative Portal</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="Admin Identifer"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:bg-white/10 focus:border-primary transition-all outline-none font-bold text-white text-sm"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="Secret Key"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:bg-white/10 focus:border-primary transition-all outline-none font-bold text-white text-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primary text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25 group disabled:opacity-50 disabled:cursor-not-wait"
                        >
                            {loading ? 'Authenticating...' : (
                                <>
                                    Authorize Entry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-slate-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                            <Compass size={14} /> Standard Access Terminal
                        </button>
                    </div>
                </div>

                <p className="text-center mt-10 text-slate-600 font-bold text-[10px] uppercase tracking-[0.5em]">
                    TravelGuider Securitized Node 01
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
