import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Shield, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user') || '{}'));

    React.useEffect(() => {
        const handleStorage = () => {
            setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <button onClick={() => navigate('/notifications')} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-slate-100 transition-all relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button onClick={() => navigate('/security')} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-slate-100 transition-all">
                                <Shield size={20} />
                            </button>
                        </div>

                        <div onClick={() => navigate('/profile')} className="flex items-center gap-3 pl-6 border-l border-gray-100 cursor-pointer hover:bg-slate-50 -mr-4 pr-4 py-2 rounded-xl transition-all">
                            <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</div>
                                <div className="text-xs text-gray-500 font-medium">Traveler</div>
                            </div>
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=f1f5f9&color=2563eb`}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-primary/10"
                            />
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
