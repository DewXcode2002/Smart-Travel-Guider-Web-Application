import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Briefcase, MessageSquare, User, LogOut, Compass, Shield } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Plan a Trip', icon: Map, href: '/plan-trip' },
    { name: 'My Bookings', icon: Briefcase, href: '/bookings' },
    { name: 'Hotels', icon: Compass, href: '/hotels' },
    { name: 'Admin', icon: Shield, href: '/admin' },
    { name: 'Chatbot', icon: MessageSquare, href: '/chatbot' },
    { name: 'Profile', icon: User, href: '/profile' },
];

const Sidebar = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const filteredNavItems = navItems.filter(item => {
        if (item.name === 'Admin') return user.role === 'admin';
        return true;
    });

    return (
        <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-50">
            <div className="p-10 flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
                    <Compass size={28} />
                </div>
                <div>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter block leading-none">Travel</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mt-1">Guider Elite</span>
                </div>
            </div>

            <nav className="flex-1 px-6 space-y-2">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] ml-4 mb-4">Main Navigation</p>
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-4 px-6 py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all group relative overflow-hidden ${isActive
                                ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200'
                                : 'text-slate-400 hover:bg-slate-50 hover:text-primary'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                            )}
                            <item.icon size={18} className={isActive ? 'text-primary' : 'text-slate-300 group-hover:text-primary transition-colors'} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 mt-auto border-t border-slate-50 space-y-6">
                <div className="flex justify-center border-b border-slate-50 pb-6">
                    <CurrencySwitcher />
                </div>
                <button
                    onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                    className="flex items-center gap-4 px-6 py-4 w-full rounded-[1.25rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all group"
                >
                    <LogOut size={18} />
                    <span>Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
