import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import {
    Users,
    Briefcase,
    TrendingUp,
    DollarSign,
    ShieldCheck,
    Search,
    Filter,
    Plus,
    Edit3,
    Trash2,
    ChevronRight,
    Download,
    Calendar,
    AlertCircle,
    LayoutDashboard,
    MapPin,
    Building2,
    Compass
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBookings: 0,
        totalRevenue: 0,
        bookingsByType: [],
        recentBookings: []
    });
    const [districts, setDistricts] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [guides, setGuides] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEntity, setCurrentEntity] = useState(null);
    const [formData, setFormData] = useState({});
    const [modalMode, setModalMode] = useState('add');

    useEffect(() => {
        if (user.role !== 'admin') {
            navigate('/admin/login');
        } else {
            fetchAllData();
        }
    }, [user.role, user.id, navigate]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [statsRes, districtsRes, hotelsRes, placesRes, guidesRes, usersRes] = await Promise.all([
                fetch('/api/admin/stats', { headers }),
                fetch('/api/districts'),
                fetch('/api/hotels'),
                fetch('/api/places'),
                fetch('/api/guides'),
                fetch('/api/admin/users', { headers })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (districtsRes.ok) setDistricts(await districtsRes.json());
            if (hotelsRes.ok) setHotels(await hotelsRes.json());
            if (placesRes.ok) setPlaces(await placesRes.json());
            if (guidesRes.ok) setGuides(await guidesRes.json());
            if (usersRes.ok) setAllUsers(await usersRes.json());
        } catch (error) {
            console.error('Data sync error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to terminate this ${type}?`)) return;

        let endpoint = `/api/${type}s/${id}`;
        if (type === 'user') endpoint = `/api/admin/users/${id}`;
        if (type === 'place') endpoint = `/api/places/${id}`;
        if (type === 'guide') endpoint = `/api/guides/${id}`;

        try {
            const response = await fetch(endpoint, { method: 'DELETE' });
            if (response.ok) fetchAllData();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleOpenModal = (mode, entity = null, type = activeTab) => {
        setModalMode(mode);
        setCurrentEntity({ ...entity, _type: type });
        setFormData(entity || {});
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = currentEntity?._type || activeTab;
        const idKey = type === 'districts' ? 'district_id' : type === 'hotels' ? 'hotel_id' : type === 'places' ? 'place_id' : type === 'guides' ? 'guide_id' : 'id';
        const id = formData[idKey];

        let url = `/api/${type}`;
        if (type === 'users') url = `/api/admin/users/${id}/role`;
        if (modalMode === 'edit') url = `${url}/${id}`;

        try {
            const response = await fetch(url, {
                method: modalMode === 'edit' ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchAllData();
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview': return renderOverview();
            case 'districts': return renderTable('districts', districts, ['district_id', 'district_name', 'province', 'capital_city']);
            case 'hotels': return renderTable('hotels', hotels, ['hotel_id', 'hotel_name', 'category', 'city', 'rating']);
            case 'places': return renderTable('places', places, ['place_id', 'place_name', 'category', 'opening_hours']);
            case 'guides': return renderTable('guides', guides, ['guide_id', 'guide_name', 'contact_number', 'daily_rate_lkr']);
            case 'users': return renderTable('users', allUsers, ['id', 'first_name', 'last_name', 'email', 'role']);
            case 'bookings': return renderTable('bookings', stats.recentBookings || [], ['id', 'item_name', 'item_type', 'price', 'status']);
            default: return <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest bg-slate-50/50 rounded-[3rem]">Archived Data Segment Restricted</div>;
        }
    };

    const renderOverview = () => (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Explorers', value: stats.totalUsers?.count || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Journeys', value: stats.totalBookings?.count || 0, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Revenue', value: `$${stats.totalRevenue?.total || 0}`, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Integrity', value: '99.9%', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((card, i) => (
                    <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-premium group relative overflow-hidden">
                        <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} mb-6 group-hover:rotate-12 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{card.value}</h3>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-black/5 rounded-full blur-3xl" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 glass rounded-[3rem] border border-white/50 shadow-premium overflow-hidden">
                    <div className="p-10 border-b border-white/50 flex justify-between items-center">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Recent Synchronizations</h3>
                        <TrendingUp size={20} className="text-primary" />
                    </div>
                    <div className="p-10 space-y-6">
                        {stats.recentBookings?.map((booking, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl hover:bg-slate-100/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-xs text-primary">{booking.first_name[0]}</div>
                                    <div>
                                        <p className="font-black text-sm text-gray-900">{booking.first_name} {booking.last_name}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase uppercase tracking-widest">{booking.item_name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-sm text-gray-900">${booking.price}</p>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{booking.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-10 rounded-[3rem] border border-white/50 shadow-premium">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-8">Asset Allocation</h3>
                    <div className="space-y-8">
                        {stats.bookingsByType?.map((type, i) => {
                            const percent = Math.round((type.count / (stats.totalBookings?.count || 1)) * 100);
                            return (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{type.item_type}</p>
                                        <span className="text-xs font-black text-gray-900">{percent}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTable = (type, data, cols) => (
        <div className="glass rounded-[3.5rem] border border-white/50 shadow-premium overflow-hidden animate-fade-in">
            <div className="p-10 flex border-b border-white/50 justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">{type} Registry</h2>
                    <p className="text-sm font-medium text-gray-400">Total verified entries: {data.length}</p>
                </div>
                {type !== 'users' && (
                    <button
                        onClick={() => handleOpenModal('add')}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-primary transition-all shadow-xl"
                    >
                        <Plus size={18} /> New Entry
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50">
                            {cols.map(c => <th key={c} className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">{c.replace(/_/g, ' ')}</th>)}
                            <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50/50">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                {cols.map(c => (
                                    <td key={c} className="px-10 py-6 text-sm font-bold text-gray-700">
                                        {c === 'role' ? (
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${row[c] === 'admin' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {row[c]}
                                            </span>
                                        ) : row[c] || '-'}
                                    </td>
                                ))}
                                <td className="px-10 py-6">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleOpenModal('edit', row, type)}
                                            className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:bg-primary hover:text-white transition-all"
                                        ><Edit3 size={14} /></button>
                                        <button
                                            onClick={() => {
                                                const idKey = type === 'districts' ? 'district_id' : type === 'hotels' ? 'hotel_id' : type === 'places' ? 'place_id' : type === 'guides' ? 'guide_id' : 'id';
                                                handleDelete(type.slice(0, -1), row[idKey]);
                                            }}
                                            className="p-3 bg-slate-100 rounded-xl text-slate-400 hover:bg-rose-500 hover:text-white transition-all"
                                        ><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (loading) return (
        <MainLayout>
            <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Accessing Core Clusters...</p>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="space-y-12 pb-20 animate-fade-in">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-3">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Supreme Control Layer</span>
                        <h1 className="text-6xl font-black text-gray-900 tracking-tighter leading-none">Command <span className="text-gradient">Center</span></h1>
                        <p className="text-gray-400 font-medium text-lg">Integrated intelligence and content governance across all TravelGuider nodes.</p>
                    </div>
                    <nav className="flex gap-2 p-2 bg-slate-100/50 rounded-3xl backdrop-blur-3xl border border-white shadow-inner">
                        {[
                            { id: 'overview', icon: LayoutDashboard, label: 'Stats' },
                            { id: 'districts', icon: MapPin, label: 'Nodes' },
                            { id: 'hotels', icon: Building2, label: 'Bespoke' },
                            { id: 'places', icon: Compass, label: 'Terra' },
                            { id: 'guides', icon: Users, label: 'Guides' },
                            { id: 'users', icon: Users, label: 'Entity' },
                            { id: 'bookings', icon: Briefcase, label: 'Orders' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white shadow-xl text-primary' : 'text-slate-400 hover:text-slate-900 group'}`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? 'text-primary' : 'group-hover:text-primary'} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </header>

                <div className="mt-12">{renderTabContent()}</div>

                {/* CRUD MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
                        <div className="relative w-full max-w-2xl bg-white rounded-[3.5rem] shadow-2xl p-12 overflow-hidden animate-slide-up">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">{modalMode === 'add' ? 'New Implementation' : 'Modify Entity'}</h2>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Direct Database Mutation Access</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors font-black">CLOSE</button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Object.keys(formData).map((key) => {
                                        if (key === '_type' || key.includes('id') || key === 'created_at') return null;
                                        return (
                                            <div key={key} className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{key.replace(/_/g, ' ')}</label>
                                                <input
                                                    type="text"
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-primary outline-none font-bold text-slate-900 shadow-sm"
                                                />
                                            </div>
                                        );
                                    })}
                                    {modalMode === 'add' && activeTab === 'districts' && (
                                        ['district_name', 'province', 'capital_city', 'area_sq_km', 'population', 'description'].map(key => (
                                            <div key={key} className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{key.replace(/_/g, ' ')}</label>
                                                <input
                                                    type="text"
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-primary outline-none font-bold text-slate-900 shadow-sm"
                                                />
                                            </div>
                                        ))
                                    )}
                                    {modalMode === 'add' && activeTab === 'guides' && (
                                        ['district_id', 'guide_name', 'languages', 'contact_number', 'experience_years', 'daily_rate_lkr'].map(key => (
                                            <div key={key} className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{key.replace(/_/g, ' ')}</label>
                                                <input
                                                    type="text"
                                                    value={formData[key] || ''}
                                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-primary outline-none font-bold text-slate-900 shadow-sm"
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-primary transition-all shadow-xl">
                                    {modalMode === 'add' ? 'Execute Creation' : 'Commit Changes'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default AdminDashboard;
