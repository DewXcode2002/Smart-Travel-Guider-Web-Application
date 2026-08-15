import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Briefcase, MessageSquare, User, LogOut, Compass, Shield, UserCheck, Car, X } from 'lucide-react';
import CurrencySwitcher from './CurrencySwitcher';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Plan a Trip', icon: Map, href: '/plan-trip' },
    { name: 'My Bookings', icon: Briefcase, href: '/bookings' },
    { name: 'Hotels', icon: Compass, href: '/hotels' },
    { name: 'Tour Guides', icon: UserCheck, href: '/guides' },
    { name: 'Transport', icon: Car, href: '/transport' },
    { name: 'Admin', icon: Shield, href: '/admin' },
    { name: 'Chatbot', icon: MessageSquare, href: '/chatbot' },
    { name: 'Profile', icon: User, href: '/profile' },
];

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const filteredNavItems = navItems.filter(item => {
        if (item.name === 'Admin') return user.role === 'admin';
        return true;
    });

    const sidebarContent = (
        <aside className="w-80 bg-white border-r border-slate-100 flex flex-col h-full z-50">
            <div className="p-6 sm:p-10 flex items-center justify-between gap-4 mb-2 lg:mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3 transform hover:rotate-0 transition-transform duration-500">
                        <Compass size={24} className="sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter block leading-none">Travel</span>
                        <span className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.4em] block mt-1">Guider Elite</span>
                    </div>
                </div>
                {/* Mobile close button */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 sm:px-6 space-y-1.5 overflow-y-auto">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] ml-4 mb-3">Main Navigation</p>
                {filteredNavItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            onClick={onClose}
                            className={`flex items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all group relative overflow-hidden ${isActive
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

            <div className="p-6 sm:p-8 mt-auto border-t border-slate-50 space-y-4 sm:space-y-6">
                <div className="flex justify-center border-b border-slate-50 pb-4 sm:pb-6">
                    <CurrencySwitcher />
                </div>
                <button
                    onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
                    className="flex items-center gap-4 px-5 py-3.5 sm:px-6 sm:py-4 w-full rounded-[1.25rem] font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all group"
                >
                    <LogOut size={18} />
                    <span>Terminate Session</span>
                </button>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop fixed sidebar */}
            <div className="hidden lg:block h-screen sticky top-0 z-50">
                {sidebarContent}
            </div>

            {/* Mobile Drawer Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                        onClick={onClose}
                    />
                    <div className="relative flex-1 max-w-xs w-full bg-white shadow-2xl z-50 animate-slide-in">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
