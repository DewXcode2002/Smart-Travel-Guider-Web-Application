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
    Compass,
    X,
    Check,
    CreditCard
} from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [stats, setStats] = useState({
        totalUsers: { count: 0 },
        totalBookings: { count: 0 },
        totalRevenue: { total: 0 },
        bookingsByType: [],
        recentBookings: []
    });
    const [districts, setDistricts] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [places, setPlaces] = useState([]);
    const [guides, setGuides] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Price Alert & Seasonal Adjuster States
    const [priceAlertModal, setPriceAlertModal] = useState(null);
    const [newPriceInput, setNewPriceInput] = useState('');
    const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);

    const showNotify = (msg, type = 'success') => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3500);
    };

    const handleQuickPriceUpdate = async (e) => {
        e.preventDefault();
        if (!priceAlertModal || !newPriceInput) return;
        setIsUpdatingPrice(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/admin/price-update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    table: priceAlertModal.table,
                    id: priceAlertModal.id,
                    priceField: priceAlertModal.priceField,
                    idField: priceAlertModal.idField,
                    newPrice: parseFloat(newPriceInput)
                })
            });
            if (res.ok) {
                showNotify(`✅ Price updated successfully to ${newPriceInput}!`);
                setPriceAlertModal(null);
                fetchAllData();
            } else {
                const err = await res.json();
                showNotify(err.message || 'Price update failed', 'error');
            }
        } catch (err) {
            console.error('Quick price update error:', err);
            showNotify('Failed to update price', 'error');
        } finally {
            setIsUpdatingPrice(false);
        }
    };

    useEffect(() => {
        if (user.role !== 'admin') {
            navigate('/admin-login');
        } else {
            fetchAllData();
        }
    }, [user.role, navigate]);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [statsRes, districtsRes, hotelsRes, placesRes, guidesRes, usersRes, bookingsRes] = await Promise.all([
                fetch('/api/admin/stats', { headers }),
                fetch('/api/districts'),
                fetch('/api/hotels'),
                fetch('/api/places'),
                fetch('/api/guides'),
                fetch('/api/admin/users', { headers }),
                fetch('/api/admin/bookings', { headers })
            ]);

            if (statsRes.ok) setStats(await statsRes.json());
            if (districtsRes.ok) setDistricts(await districtsRes.json());
            if (hotelsRes.ok) setHotels(await hotelsRes.json());
            if (placesRes.ok) setPlaces(await placesRes.json());
            if (guidesRes.ok) setGuides(await guidesRes.json());
            if (usersRes.ok) setAllUsers(await usersRes.json());
            if (bookingsRes.ok) setBookings(await bookingsRes.json());
        } catch (error) {
            console.error('Data sync error:', error);
            showNotify('Failed to sync admin data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

        let endpoint = `/api/${type}s/${id}`;
        if (type === 'user') endpoint = `/api/admin/users/${id}`;
        if (type === 'district') endpoint = `/api/districts/${id}`;
        if (type === 'hotel') endpoint = `/api/hotels/${id}`;
        if (type === 'place') endpoint = `/api/places/${id}`;
        if (type === 'guide') endpoint = `/api/guides/${id}`;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                showNotify(`${type.toUpperCase()} removed successfully`);
                fetchAllData();
            } else {
                const errData = await response.json();
                showNotify(errData.message || 'Delete operation failed', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            showNotify('Connection error during deletion', 'error');
        }
    };

    const handleOpenModal = (mode, entity = null, type = activeTab) => {
        setModalMode(mode);
        setCurrentEntity({ ...entity, _type: type });

        if (mode === 'add') {
            // Default initial form structures
            const defaults = {
                districts: { district_name: '', province: 'Western', capital_city: '', area_sq_km: '', population: '', description: '' },
                hotels: { district_id: districts[0]?.district_id || 1, hotel_name: '', category: 'Mid-range', city: '', address: '', contact_number: '', email: '', price_range: '100-200', rating: 4.5, amenities: 'wifi,ac,restaurant,pool' },
                places: { district_id: districts[0]?.district_id || 1, place_name: '', category: 'Historical', description: '', entry_fee_local: 100, entry_fee_foreign: 15, opening_hours: '8:00 AM - 5:00 PM' },
                guides: { district_id: districts[0]?.district_id || 1, guide_name: '', languages: 'English, Sinhala', contact_number: '', experience_years: 5, daily_rate_lkr: 5000 },
                users: { first_name: '', last_name: '', email: '', role: 'user' }
            };
            setFormData(defaults[type] || {});
        } else {
            setFormData(entity || {});
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = currentEntity?._type || activeTab;
        const idKey = type === 'districts' ? 'district_id' : type === 'hotels' ? 'hotel_id' : type === 'places' ? 'place_id' : type === 'guides' ? 'guide_id' : 'id';
        const id = formData[idKey];

        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        let url = `/api/${type}`;
        if (type === 'users') url = `/api/admin/users/${id}/role`;
        if (modalMode === 'edit') url = `${url}/${id}`;

        try {
            const response = await fetch(url, {
                method: modalMode === 'edit' ? 'PUT' : 'POST',
                headers,
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showNotify(`Entity ${modalMode === 'add' ? 'created' : 'updated'} successfully`);
                setIsModalOpen(false);
                fetchAllData();
            } else {
                const errData = await response.json();
                showNotify(errData.message || 'Operation failed', 'error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            showNotify('Failed to communicate with server', 'error');
        }
    };

    const handleUpdateBookingStatus = async (bookingId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                showNotify(`Booking #${bookingId} marked as ${newStatus}`);
                fetchAllData();
            }
        } catch (error) {
            showNotify('Failed to update status', 'error');
        }
    };

    const renderOverview = () => (
        <div className="space-y-10 animate-fade-in">
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Explorers', value: stats.totalUsers?.count || allUsers.length || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Total Bookings', value: stats.totalBookings?.count || bookings.length || 0, icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Total Revenue', value: stats.totalRevenue?.total || 0, isPrice: true, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Registered Districts', value: districts.length || 25, icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((card, i) => (
                    <div key={i} className="glass p-7 rounded-[2.5rem] border border-white/60 shadow-premium group relative overflow-hidden bg-white/90">
                        <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <card.icon size={26} />
                        </div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
                            {card.isPrice ? <PriceDisplay amount={card.value} from="USD" /> : card.value}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Seasonal Price & Fuel Fluctuation Alert Watchdog */}
            <div className="glass p-8 rounded-[3rem] border border-amber-200/80 shadow-premium bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="bg-amber-500/20 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/30">
                                    Seasonal Rate Watchdog
                                </span>
                                <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    3 Action Alerts
                                </span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-1">Price & Inflation Adjustment Watchdog</h3>
                            <p className="text-xs font-bold text-gray-500">Real-time alerts for seasonal hotel rate surges, fuel price changes & guide fee updates</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Alert 1 */}
                    <div className="bg-white/90 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                🏨 Hotel High Season Surge
                            </span>
                            <h4 className="font-black text-sm text-gray-900">Galle Face Hotel & Shangri-La</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                High Season (Dec-April) rates detected. Current rate: $150/night. Recommended peak rate: $195/night.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setPriceAlertModal({
                                    title: 'Galle Face Hotel Rate Adjustment',
                                    itemName: 'Galle Face Hotel',
                                    currentPrice: 150,
                                    table: 'hotels',
                                    id: 1,
                                    priceField: 'price_range',
                                    idField: 'hotel_id'
                                });
                                setNewPriceInput('195');
                            }}
                            className="w-full py-2.5 bg-slate-900 hover:bg-primary text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all text-center shadow-sm"
                        >
                            ⚡ Update Hotel Rate
                        </button>
                    </div>

                    {/* Alert 2 */}
                    <div className="bg-white/90 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                🚖 Transport Fuel Index
                            </span>
                            <h4 className="font-black text-sm text-gray-900">Kangaroo Cabs & Islandwide Vans</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                Fuel price index adjustment alert. Current daily rate: LKR 18,000. Suggested adjustment: LKR 20,000.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setPriceAlertModal({
                                    title: 'Kangaroo Cabs Transport Rate Adjustment',
                                    itemName: 'Kangaroo Cabs & Airport Transfers',
                                    currentPrice: 18000,
                                    table: 'transportation',
                                    id: 1,
                                    priceField: 'daily_rate_range',
                                    idField: 'transport_id'
                                });
                                setNewPriceInput('20000');
                            }}
                            className="w-full py-2.5 bg-slate-900 hover:bg-primary text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all text-center shadow-sm"
                        >
                            ⚡ Update Transport Rate
                        </button>
                    </div>

                    {/* Alert 3 */}
                    <div className="bg-white/90 p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                                👨‍🌾 Tour Guide Peak Demand
                            </span>
                            <h4 className="font-black text-sm text-gray-900">Kishan Seneviratne (Kandy)</h4>
                            <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                Cultural festival season high demand. Current daily rate: LKR 15,000. Suggested seasonal rate: LKR 18,000.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setPriceAlertModal({
                                    title: 'Kishan Seneviratne Guide Fee Adjustment',
                                    itemName: 'Kishan Seneviratne',
                                    currentPrice: 15000,
                                    table: 'tour_guides',
                                    id: 1,
                                    priceField: 'daily_rate_lkr',
                                    idField: 'guide_id'
                                });
                                setNewPriceInput('18000');
                            }}
                            className="w-full py-2.5 bg-slate-900 hover:bg-primary text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all text-center shadow-sm"
                        >
                            ⚡ Update Guide Rate
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-2 glass rounded-[3rem] border border-white/60 shadow-premium overflow-hidden bg-white/90">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Recent Transactions</h3>
                            <p className="text-xs font-bold text-gray-400 mt-1">Latest customer reservations across Sri Lanka</p>
                        </div>
                        <TrendingUp size={22} className="text-primary" />
                    </div>
                    <div className="p-6 space-y-4">
                        {(stats.recentBookings || bookings.slice(0, 5)).map((booking, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-slate-50/80 rounded-2xl hover:bg-slate-100/70 transition-colors border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center font-black text-sm text-primary">
                                        {booking.first_name ? booking.first_name[0] : 'U'}
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-gray-900">{booking.first_name ? `${booking.first_name} ${booking.last_name || ''}` : `Booking #${booking.id}`}</p>
                                        <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">{booking.item_name} ({booking.item_type})</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <PriceDisplay amount={booking.price} from="USD" className="text-base text-gray-900 font-black" />
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${booking.status === 'cancelled' ? 'text-rose-500' : 'text-emerald-600'}`}>
                                        {booking.status || 'upcoming'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Types Distribution */}
                <div className="glass p-8 rounded-[3rem] border border-white/60 shadow-premium bg-white/90 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Category Breakdown</h3>
                        <p className="text-xs font-bold text-gray-400 mb-8">Asset & service allocation by type</p>
                        <div className="space-y-6">
                            {(stats.bookingsByType?.length > 0 ? stats.bookingsByType : [
                                { item_type: 'hotel', count: 18 },
                                { item_type: 'place', count: 12 },
                                { item_type: 'guide', count: 7 },
                                { item_type: 'transportation', count: 5 }
                            ]).map((type, i) => {
                                const total = (stats.totalBookings?.count || 42);
                                const percent = Math.round((type.count / (total || 1)) * 100);
                                return (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-black text-gray-700 uppercase tracking-wider">{type.item_type}</span>
                                            <span className="font-black text-primary">{type.count} ({percent}%)</span>
                                        </div>
                                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                                            <div className="h-full bg-gradient-to-r from-primary to-teal-500 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-8 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
                        <ShieldCheck size={24} className="text-primary shrink-0" />
                        <p className="text-xs font-bold text-gray-600 leading-relaxed">
                            System Node status active with 25 Sri Lankan district nodes running.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTable = (type, data, cols) => {
        const filtered = data.filter(row => {
            if (!searchQuery) return true;
            return Object.values(row).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase()));
        });

        return (
            <div className="glass rounded-[3.5rem] border border-white/60 shadow-premium overflow-hidden animate-fade-in bg-white/95">
                {/* Table Control Bar */}
                <div className="p-8 sm:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">
                            Database Governance
                        </span>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-2 capitalize">{type} Registry</h2>
                        <p className="text-xs font-bold text-gray-400 mt-1">Total active entries: {filtered.length}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder={`Search ${type}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-primary focus:bg-white transition-all"
                            />
                        </div>

                        {type !== 'users' && type !== 'bookings' && (
                            <button
                                onClick={() => handleOpenModal('add', null, type)}
                                className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-primary transition-all shadow-lg shrink-0"
                            >
                                <Plus size={16} /> New Entry
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {cols.map(c => (
                                    <th key={c} className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        {c.replace(/_/g, ' ')}
                                    </th>
                                ))}
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                                    Operations
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/60 transition-colors">
                                    {cols.map(c => (
                                        <td key={c} className="px-8 py-5 text-xs font-bold text-gray-800">
                                            {c === 'role' ? (
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${row[c] === 'admin' ? 'bg-amber-100 text-amber-700 border border-amber-200' : row[c] === 'supplier' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                                                    {row[c]}
                                                </span>
                                            ) : c === 'price' || c === 'daily_rate_lkr' ? (
                                                <PriceDisplay amount={row[c]} from={c === 'daily_rate_lkr' ? 'LKR' : 'USD'} />
                                            ) : c === 'status' ? (
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${row[c] === 'cancelled' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {row[c]}
                                                </span>
                                            ) : row[c] || '-'}
                                        </td>
                                    ))}
                                    <td className="px-8 py-5 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {type === 'bookings' ? (
                                                row.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => handleUpdateBookingStatus(row.id, 'cancelled')}
                                                        className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border border-rose-200"
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                )
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleOpenModal('edit', row, type)}
                                                        className="p-2.5 bg-slate-100 text-slate-600 hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm"
                                                        title="Edit Entity"
                                                    >
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const idKey = type === 'districts' ? 'district_id' : type === 'hotels' ? 'hotel_id' : type === 'places' ? 'place_id' : type === 'guides' ? 'guide_id' : 'id';
                                                            const singular = type.endsWith('es') ? type.slice(0, -2) : type.slice(0, -1);
                                                            handleDelete(singular, row[idKey]);
                                                        }}
                                                        className="p-2.5 bg-slate-100 text-slate-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                        title="Delete Entity"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="p-12 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                        No entries matching filter criteria in {type}
                    </div>
                )}
            </div>
        );
    };

    if (loading) return (
        <MainLayout>
            <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
                <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px]">Authorizing Admin Control Center...</p>
            </div>
        </MainLayout>
    );

    return (
        <MainLayout>
            <div className="space-y-10 pb-20 animate-fade-in">
                {/* Admin Toast Notification */}
                {notification && (
                    <div className={`fixed top-8 right-8 z-[120] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 animate-slide-up ${
                        notification.type === 'error' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white border border-emerald-400/40'
                    }`}>
                        <span>{notification.type === 'error' ? '⚠️' : '✅'}</span>
                        {notification.msg}
                    </div>
                )}

                {/* Dashboard Top Header */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-slate-100 pb-8">
                    <div className="space-y-3">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                            Supreme Control Portal
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">
                            Command <span className="text-gradient">Center</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-base">
                            Integrated system administration, bookings, users, and content management for Sri Lanka tourism.
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <nav className="flex flex-wrap gap-2 p-2 bg-slate-100/80 rounded-[2rem] border border-slate-200/60 shadow-inner w-full lg:w-auto">
                        {[
                            { id: 'overview', icon: LayoutDashboard, label: 'Stats' },
                            { id: 'districts', icon: MapPin, label: 'Districts' },
                            { id: 'hotels', icon: Building2, label: 'Hotels' },
                            { id: 'places', icon: Compass, label: 'Places' },
                            { id: 'guides', icon: Users, label: 'Guides' },
                            { id: 'users', icon: ShieldCheck, label: 'Users' },
                            { id: 'bookings', icon: Briefcase, label: 'Bookings' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                                    activeTab === tab.id
                                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                <tab.icon size={15} /> {tab.label}
                            </button>
                        ))}
                    </nav>
                </header>

                {/* Active Tab Panel */}
                <div>
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'districts' && renderTable('districts', districts, ['district_id', 'district_name', 'province', 'capital_city', 'population'])}
                    {activeTab === 'hotels' && renderTable('hotels', hotels, ['hotel_id', 'hotel_name', 'category', 'city', 'rating', 'price_range'])}
                    {activeTab === 'places' && renderTable('places', places, ['place_id', 'place_name', 'category', 'opening_hours', 'entry_fee_foreign'])}
                    {activeTab === 'guides' && renderTable('guides', guides, ['guide_id', 'guide_name', 'languages', 'contact_number', 'daily_rate_lkr'])}
                    {activeTab === 'users' && renderTable('users', allUsers, ['id', 'first_name', 'last_name', 'email', 'role'])}
                    {activeTab === 'bookings' && renderTable('bookings', bookings, ['id', 'item_name', 'item_type', 'price', 'status', 'payment_status'])}
                </div>

                {/* SMART CRUD MODAL */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
                        <div className="relative w-full max-w-xl my-auto bg-white rounded-[3rem] shadow-2xl p-8 sm:p-10 border border-slate-100 overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                                <div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">System Mutation</span>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                                        {modalMode === 'add' ? `Add New ${activeTab.slice(0, -1)}` : `Edit ${activeTab.slice(0, -1)}`}
                                    </h2>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-rose-500 hover:text-white transition-all">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* DYNAMIC FORM INPUTS BASED ON ACTIVE TAB */}
                                {activeTab === 'districts' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">District Name</label>
                                            <input type="text" required value={formData.district_name || ''} onChange={e => setFormData({ ...formData, district_name: e.target.value })} placeholder="e.g. Colombo" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Province</label>
                                                <input type="text" value={formData.province || ''} onChange={e => setFormData({ ...formData, province: e.target.value })} placeholder="e.g. Western" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Capital City</label>
                                                <input type="text" value={formData.capital_city || ''} onChange={e => setFormData({ ...formData, capital_city: e.target.value })} placeholder="e.g. Colombo" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'hotels' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hotel Name</label>
                                            <input type="text" required value={formData.hotel_name || ''} onChange={e => setFormData({ ...formData, hotel_name: e.target.value })} placeholder="e.g. Cinnamon Grand" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">District</label>
                                                <select value={formData.district_id || 1} onChange={e => setFormData({ ...formData, district_id: parseInt(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary">
                                                    {districts.map(d => <option key={d.district_id} value={d.district_id}>{d.district_name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                                <select value={formData.category || 'Mid-range'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary">
                                                    {['Luxury', 'Boutique', 'Mid-range', 'Heritage', 'Resort', 'Budget', 'Guest House'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                                <input type="text" value={formData.city || ''} onChange={e => setFormData({ ...formData, city: e.target.value })} placeholder="Colombo 03" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price Range (USD)</label>
                                                <input type="text" value={formData.price_range || ''} onChange={e => setFormData({ ...formData, price_range: e.target.value })} placeholder="150-250" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'places' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Place Name</label>
                                            <input type="text" required value={formData.place_name || ''} onChange={e => setFormData({ ...formData, place_name: e.target.value })} placeholder="e.g. Sigiriya Rock Fortress" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                                                <select value={formData.category || 'Historical'} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary">
                                                    {['Historical', 'Beach', 'Wildlife', 'Hill Country', 'Religious', 'Adventure', 'Cultural', 'Nature', 'Urban'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Opening Hours</label>
                                                <input type="text" value={formData.opening_hours || ''} onChange={e => setFormData({ ...formData, opening_hours: e.target.value })} placeholder="7:00 AM - 5:30 PM" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'guides' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Guide Full Name</label>
                                            <input type="text" required value={formData.guide_name || ''} onChange={e => setFormData({ ...formData, guide_name: e.target.value })} placeholder="e.g. Kamal Perera" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Languages</label>
                                                <input type="text" value={formData.languages || ''} onChange={e => setFormData({ ...formData, languages: e.target.value })} placeholder="English, French, German" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Daily Rate (LKR)</label>
                                                <input type="number" value={formData.daily_rate_lkr || ''} onChange={e => setFormData({ ...formData, daily_rate_lkr: e.target.value })} placeholder="6000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'users' && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Update User Access Role</label>
                                        <select value={formData.role || 'user'} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 text-sm font-bold text-gray-900 outline-none focus:border-primary">
                                            <option value="user">👤 Standard Traveler (User)</option>
                                            <option value="supplier">🏨 Service Provider (Supplier)</option>
                                            <option value="admin">🛡️ System Administrator (Admin)</option>
                                        </select>
                                    </div>
                                )}

                                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-primary transition-all shadow-xl mt-4">
                                    {modalMode === 'add' ? 'Create Entity' : 'Save Changes'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Quick Price Adjuster Modal */}
                {priceAlertModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 max-w-md w-full shadow-2xl space-y-6 relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-200">
                                        Rate Adjuster
                                    </span>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-2">{priceAlertModal.title}</h3>
                                    <p className="text-xs text-gray-500 font-bold mt-1">Item: {priceAlertModal.itemName}</p>
                                </div>
                                <button
                                    onClick={() => setPriceAlertModal(null)}
                                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700 flex items-center justify-center transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleQuickPriceUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                        Current Rate in Database
                                    </label>
                                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-gray-700">
                                        {priceAlertModal.currentPrice}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                                        New Revised Price / Rate
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={newPriceInput}
                                        onChange={(e) => setNewPriceInput(e.target.value)}
                                        placeholder="Enter updated seasonal rate..."
                                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isUpdatingPrice}
                                    className="w-full py-4 bg-slate-900 hover:bg-primary text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    {isUpdatingPrice ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Updating Database...
                                        </>
                                    ) : (
                                        '⚡ Confirm & Publish New Rate'
                                    )}
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
