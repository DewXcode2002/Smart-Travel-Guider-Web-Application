import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Moon, ArrowRight } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // Handle non-OK responses first
            if (!response.ok) {
                let errorMessage = 'Login failed. Please check your credentials.';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonErr) {
                    errorMessage = `Server Error: ${response.status} ${response.statusText}`;
                }
                alert(errorMessage);
                return;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please ensure the server is running.');
        }
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3.5rem] -z-10" />

            <AuthLayout
                title={<span>Welcome to<br /><span className="text-primary">TravelGuider</span></span>}
                subtitle="Re-enter your private sanctuary of global exploration."
            >
                <div className="space-y-10">
                    <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
                        <div className="space-y-4">
                            <div className="space-y-2 group/input">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 group-focus-within/input:text-primary transition-colors">Explorer Identifier</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. wanderer@travelguider.com"
                                    className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-5 px-8 focus:bg-white focus:border-primary focus:ring-[12px] focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm"
                                    required
                                />
                            </div>

                            <div className="space-y-2 group/input">
                                <div className="flex justify-between items-center px-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-focus-within/input:text-primary transition-colors">Secret Key</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-slate-900 transition-colors">
                                        Lost Access?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50/50 border-2 border-slate-100/50 rounded-2xl py-5 px-8 focus:bg-white focus:border-primary focus:ring-[12px] focus:ring-primary/5 transition-all outline-none font-bold text-slate-900 shadow-sm text-sm"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Authorize Journey <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                        </button>
                    </form>

                    <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <p className="text-slate-400 font-bold text-xs">
                            New to our elite community? {' '}
                            <Link to="/register" className="text-primary font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors ml-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10 hover:bg-primary/10">
                                Enroll Now
                            </Link>
                        </p>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100/80"></div>
                            </div>
                            <div className="relative px-8 bg-white text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] inline-block mx-auto">
                                Universal ID Access
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 flex items-center justify-center h-16 bg-white border-2 border-slate-50 rounded-2xl hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group/social">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 grayscale group-hover/social:grayscale-0 transition-all transform group-hover/social:scale-110" />
                            </button>
                            <button className="flex-1 flex items-center justify-center h-16 bg-white border-2 border-slate-50 rounded-2xl hover:border-primary/20 hover:bg-slate-50 transition-all shadow-sm group/social">
                                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Github" className="w-6 h-6 grayscale group-hover/social:grayscale-0 transition-all transform group-hover/social:scale-110" />
                            </button>
                        </div>
                    </div>
                </div>
            </AuthLayout>

            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <button
                    onClick={() => navigate('/admin/login')}
                    className="text-slate-300 hover:text-slate-900 font-black text-[9px] uppercase tracking-[0.4em] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    <Moon size={12} /> Administrative Access Terminal
                </button>
            </div>
        </div>
    );
};

export default Login;
