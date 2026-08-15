import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Shield, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || '{}'));
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        const handleStorage = () => {
            setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 sm:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-sm/50">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-md">
                        {/* Mobile Hamburger Menu Toggle */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
                            aria-label="Open Menu"
                        >
                            <Menu size={22} />
                        </button>

                        <div className="relative w-full max-w-xs sm:max-w-sm">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-slate-100/80 border-none rounded-full py-2 pl-9 pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="flex gap-1.5 sm:gap-3">
                            <button onClick={() => navigate('/notifications')} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all relative">
                                <Bell size={18} className="sm:w-5 sm:h-5" />
                                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button onClick={() => navigate('/security')} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all">
                                <Shield size={18} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div onClick={() => navigate('/profile')} className="flex items-center gap-2.5 sm:gap-3 pl-3 sm:pl-6 border-l border-slate-100 cursor-pointer hover:bg-slate-50 py-1.5 rounded-xl transition-all">
                            <div className="text-right hidden sm:block">
                                <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">{user.firstName} {user.lastName}</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Traveler</div>
                            </div>
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.firstName || 'U'}+${user.lastName || 'S'}&background=f1f5f9&color=2563eb`}
                                alt="User"
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/10 shadow-sm"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
