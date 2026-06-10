import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Calendar, MapPin, Building2, Car, UserCheck, ChevronRight, Search, Filter, ArrowUpRight, X, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const slugify = (text) => {
        return text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/bookings/my', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                    setFilteredBookings(data);
                }
            } catch (error) {
                console.error('Fetch bookings error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user.id) fetchBookings();
        else setLoading(false);
    }, [user.id]);

    useEffect(() => {
        let result = [...bookings];
        if (searchQuery) {
            result = result.filter(booking =>
                booking.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.item_type.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (filterStatus !== 'all') {
            result = result.filter(booking => booking.status === filterStatus);
        }
        setFilteredBookings(result);
    }, [searchQuery, filterStatus, bookings]);

    const getIcon = (type) => {
        switch (type) {
            case 'hotel': return Building2;
            case 'vehicle':
            case 'transportation': return Car;
            case 'guide': return UserCheck;
            case 'place': return MapPin;
            default: return Briefcase;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
            case 'upcoming': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getPaymentStatusBadge = (paymentStatus) => {
        switch (paymentStatus) {
            case 'completed':
                return {
                    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
                    icon: <CheckCircle size={12} />,
                    label: 'Paid'
                };
            case 'pending':
                return {
                    color: 'bg-amber-100 text-amber-700 border-amber-200',
                    icon: <Clock size={12} />,
                    label: 'Pending'
                };
            case 'failed':
                return {
                    color: 'bg-rose-100 text-rose-700 border-rose-200',
                    icon: <XCircle size={12} />,
                    label: 'Failed'
                };
            default:
                return {
                    color: 'bg-slate-100 text-slate-700 border-slate-200',
                    icon: <Clock size={12} />,
                    label: 'Unknown'
                };
        }
    };

    const getPaymentMethodLabel = (method) => {
        switch (method) {
            case 'credit_card': return 'Credit Card';
            case 'debit_card': return 'Debit Card';
            case 'paypal': return 'PayPal';
            case 'bank_transfer': return 'Bank Transfer';
            default: return 'N/A';
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;
        try {
            const response = await fetch(`/api/bookings/${id}/cancel`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.ok) {
                setBookings(prev => prev.map(b => (b.booking_id || b.id) === id ? { ...b, status: 'cancelled' } : b));
            }
        } catch (error) {
            console.error('Cancel error:', error);
        }
    };

    const handleDetails = (booking) => {
        const slug = slugify(booking.item_name);
        if (booking.item_type === 'hotel') navigate(`/hotel/${slug}`);
        else if (booking.item_type === 'place') navigate(`/heritage/${slug}`);
        else if (booking.item_type === 'transportation' || booking.item_type === 'vehicle') navigate('/plan-trip');
        else navigate('/plan-trip');
    };

    // Image Data Sources
    const hotelImages = {
        'Galle Face Hotel': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
        'Heritance Kandalama': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
        'Jetwing Lighthouse': 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600',
        'Cinnamon Grand': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=600',
        'Shangri-La Colombo': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
        'Amangalla': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=600',
        'Tri Lanka Villa': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600',
        'Cape Weligama': 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=600',
        'Amanwella': 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=600',
        'Clock Inn Colombo': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600',
        'Hangover Hostels Ella': 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&q=80&w=600',
        'Zostel Galle': 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&q=80&w=600'
    };

    const placeImages = {
        'Sigiriya': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        'Ella Rock': 'https://images.unsplash.com/photo-1588257833075-514b87e22026?auto=format&fit=crop&q=80&w=800',
        'Mirissa Beach': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
        'Galle Fort': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&q=80&w=800',
        'Yala National Park': 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800',
        'Temple of the Tooth': 'https://images.unsplash.com/photo-1588598142106-963db8746c1c?auto=format&fit=crop&q=80&w=800'
    };

    const getImage = (name, type) => {
        if (type === 'hotel') return hotelImages[name];
        if (type === 'place') return placeImages[name];
        return null;
    };

    return (
        <MainLayout>
            <div className="space-y-12 animate-fade-in pb-20">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-2">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] bg-secondary/5 px-4 py-1.5 rounded-full border border-secondary/10">Reservation Control</span>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                            Personal <span className="text-gradient">Bookings</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg">Manage your upcoming journeys and past explorations.</p>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by destination or service..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-3xl py-5 pl-16 pr-6 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-3 bg-slate-100 p-2 rounded-3xl h-fit shadow-inner">
                        {['all', 'upcoming', 'cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filterStatus === status ? 'bg-white text-primary shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {status === 'upcoming' ? 'Active' : status === 'cancelled' ? 'History' : 'All'}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center space-y-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Accessing Records...</p>
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <div className="py-32 glass rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 border-2 border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                            <Briefcase size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">No Bookings Found</h3>
                        <button onClick={() => navigate('/plan-trip')} className="bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/25 hover:scale-105 transition-all">Begin Planning</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {filteredBookings.map((booking, index) => {
                            const Icon = getIcon(booking.item_type || 'hotel');
                            const bookingId = booking.booking_id || booking.id;
                            const price = booking.total_price || booking.price || 0;
                            const date = booking.booking_date || new Date().toISOString();
                            const imageUrl = getImage(booking.item_name, booking.item_type);

                            return (
                                <div key={bookingId} className="glass rounded-[3rem] p-10 flex flex-col md:flex-row gap-10 items-center border border-white/50 group hover:shadow-hover transition-all animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="w-full md:w-64 h-48 rounded-[2rem] overflow-hidden relative shadow-2xl flex-shrink-0">
                                        {imageUrl ? (
                                            <>
                                                <img src={imageUrl} alt={booking.item_name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-primary opacity-10"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Icon size={64} className="text-primary opacity-30 group-hover:scale-125 transition-transform" />
                                                </div>
                                            </>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg border ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-2"><Icon size={14} /> {booking.item_type}</div>
                                                <h3 className="text-3xl font-black text-gray-900 group-hover:text-primary transition-colors tracking-tight">{booking.item_name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Investment</span>
                                                <PriceDisplay amount={price} from="USD" className="text-3xl text-gray-900" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Reference ID</span>
                                                <span className="text-sm font-black text-gray-900 font-mono tracking-tight">#BK-{bookingId.toString().padStart(6, '0')}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Confirmed On</span>
                                                <div className="flex items-center gap-2 text-sm font-black text-gray-900"><Calendar size={14} className="text-primary" /> {new Date(date).toLocaleDateString()}</div>
                                            </div>
                                            {booking.payment_status && (
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Payment Status</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getPaymentStatusBadge(booking.payment_status).color}`}>
                                                            {getPaymentStatusBadge(booking.payment_status).icon}
                                                            {getPaymentStatusBadge(booking.payment_status).label}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            {booking.payment_method && (
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Payment Method</span>
                                                    <div className="flex items-center gap-2 text-sm font-black text-gray-900">
                                                        <CreditCard size={14} className="text-secondary" /> {getPaymentMethodLabel(booking.payment_method)}
                                                    </div>
                                                </div>
                                            )}
                                            {booking.transaction_id && (
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Transaction ID</span>
                                                    <span className="text-xs font-bold text-gray-600 font-mono">{booking.transaction_id}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col gap-4 w-full md:w-auto">
                                        <button onClick={() => handleDetails(booking)} className="flex-1 md:w-16 md:h-16 rounded-[1.5rem] bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all shadow-xl" title="View Details"><ChevronRight size={24} /></button>
                                        {(booking.status === 'confirmed' || booking.status === 'upcoming') ? (
                                            <button onClick={() => handleCancel(bookingId)} className="flex-1 md:w-16 md:h-16 rounded-[1.5rem] bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl border border-rose-100" title="Cancel Booking"><X size={24} /></button>
                                        ) : (
                                            <button onClick={() => navigate('/plan-trip')} className="flex-1 md:w-16 md:h-16 rounded-[1.5rem] bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-xl border border-emerald-100" title="Book Again"><ArrowUpRight size={24} /></button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Bookings;
