import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
    Briefcase,
    TrendingUp,
    DollarSign,
    ShieldCheck,
    Plus,
    Edit3,
    Trash2,
    LayoutDashboard,
    Building2,
    Compass,
    UserCheck
} from 'lucide-react';

const SupplierDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        recentBookings: []
    });
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.role !== 'supplier' && user.role !== 'admin') {
            navigate('/login');
        } else {
            fetchSupplierData();
        }
    }, [user, navigate]);

    const fetchSupplierData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const [statsRes, bookingsRes] = await Promise.all([
                fetch('/api/supplier/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('/api/supplier/bookings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            // In a real app, bookingsRes would be processed further
        } catch (error) {
            console.error('Supplier data error:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderOverview = () => (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Bookings', value: stats.totalBookings?.count || 0, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Revenue Earned', value: `$${stats.totalRevenue?.total || 0}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Service Quality', value: '4.8/5.0', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((card, i) => (
                    <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-premium group relative overflow-hidden">
                        <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} mb-6 group-hover:rotate-12 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="glass rounded-[3rem] border border-white/50 shadow-premium overflow-hidden">
                <div className="p-10 border-b border-white/50 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h3>
                    <TrendingUp size={20} className="text-primary" />
                </div>
                <div className="p-10 space-y-6">
                    {stats.recentBookings?.length > 0 ? (
                        stats.recentBookings.map((booking, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl hover:bg-slate-100/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-xs text-primary">{booking.first_name[0]}</div>
                                    <div>
                                        <p className="font-black text-sm text-gray-900">{booking.first_name} {booking.last_name}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{booking.item_name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-sm text-gray-900">${booking.price}</p>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{booking.status}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No recent activity detected.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading) return (
        <MainLayout>
            <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Verifying Supplier Credentials...</p>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="space-y-12 pb-20 animate-fade-in">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-3">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em] bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">Partner Interface</span>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">Supplier <span className="text-gradient secondary">Hub</span></h1>
                        <p className="text-gray-400 font-medium text-lg">Manage your hospitality assets and track reservations in real-time.</p>
                    </div>
                    <nav className="flex gap-2 p-2 bg-slate-100/50 rounded-3xl backdrop-blur-3xl border border-white shadow-inner">
                        {[
                            { id: 'overview', icon: LayoutDashboard, label: 'Stats' },
                            { id: 'listings', icon: Building2, label: 'Services' },
                            { id: 'bookings', icon: UserCheck, label: 'Orders' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white shadow-xl text-secondary' : 'text-slate-400 hover:text-slate-900 group'}`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? 'text-secondary' : 'group-hover:text-secondary'} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="mt-12">
                    {activeTab === 'overview' ? renderOverview() : (
                        <div className="glass p-20 text-center rounded-[3rem] border border-white/50">
                            <Compass size={48} className="mx-auto text-slate-200 mb-6 animate-pulse" />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Section under refinement</p>
                            <p className="text-slate-300 font-medium mt-2">Enhanced service management tools are being synchronized.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default SupplierDashboard;
