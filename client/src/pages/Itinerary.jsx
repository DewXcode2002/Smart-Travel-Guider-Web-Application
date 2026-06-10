import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Share2, Download, Clock, MapPin, LayoutList, ArrowRight, Plus, Building2, UserCheck, Car, Users, Sparkles, Camera, Coffee } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';
import PaymentModal from '../components/PaymentModal';

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const itineraryData = location.state?.itinerary;
    const districtId = location.state?.districtId;
    const [recommendations, setRecommendations] = React.useState({
        places: [],
        hotels: [],
        guides: [],
        transportation: []
    });
    const [loading, setLoading] = React.useState(true);
    const [selectedDetail, setSelectedDetail] = React.useState(null);
    const [showPaymentModal, setShowPaymentModal] = React.useState(false);

    React.useEffect(() => {
        const fetchRecommendations = async () => {
            if (!districtId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`/api/districts/${districtId}/recommendations`);
                if (response.ok) {
                    const data = await response.json();
                    setRecommendations(data);
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [districtId]);

    // If no itinerary data, show message
    if (!itineraryData) {
        return (
            <MainLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Itinerary Found</h2>
                    <p className="text-gray-600 mb-6">Please generate an itinerary from the Plan Trip page.</p>
                    <button
                        onClick={() => navigate('/plan-trip')}
                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all"
                    >
                        Plan a Trip
                    </button>
                </div>
            </MainLayout>
        );
    }

    const { destination, days, travelers, hotel, costs, itinerary, startDate, guide, transport } = itineraryData;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getActivityBadgeColor = (type) => {
        const colors = {
            cultural: 'bg-purple-100 text-purple-700',
            historical: 'bg-amber-100 text-amber-700',
            scenic: 'bg-blue-100 text-blue-700',
            hiking: 'bg-green-100 text-green-700',
            wildlife: 'bg-orange-100 text-orange-700',
            'water-sports': 'bg-cyan-100 text-cyan-700',
            adventure: 'bg-red-100 text-red-700',
            beach: 'bg-teal-100 text-teal-700',
            wellness: 'bg-pink-100 text-pink-700',
            culinary: 'bg-yellow-100 text-yellow-700'
        };
        return colors[type] || 'bg-emerald-100 text-emerald-700';
    };

    const handleProceedToBooking = () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
            alert('Please login to proceed with booking');
            navigate('/login');
            return;
        }
        setShowPaymentModal(true);
    };

    const handlePaymentComplete = async (paymentInfo) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        try {
            // Create booking with payment information
            const response = await fetch('/api/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    user_id: user.id,
                    item_type: 'hotel',
                    item_name: hotel?.name || 'Travel Package',
                    item_id: null,
                    price: costs.total,
                    status: 'upcoming',
                    payment_status: paymentInfo.payment_status,
                    payment_method: paymentInfo.payment_method,
                    payment_date: paymentInfo.payment_date,
                    transaction_id: paymentInfo.transaction_id
                })
            });

            if (response.ok) {
                setShowPaymentModal(false);
                localStorage.setItem('currentItinerary', JSON.stringify(itineraryData));
                navigate('/bookings');
            } else {
                alert('Failed to create booking. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error connecting to server.');
        }
    };

    const handleBookItem = async (type, name, price, itemId) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.id) {
            alert('Please login to book items');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('/api/bookings/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    item_type: type,
                    item_name: name,
                    item_id: itemId,
                    price: price, // This should probably be handled as LKR base in DB
                    status: 'upcoming'
                })
            });

            if (response.ok) {
                alert(`${name} added to your bookings!`);
            } else {
                alert('Failed to book item. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Error connecting to server.');
        }
    };

    return (
        <MainLayout>
            <div className="space-y-6 animate-fade-in pb-12">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
                    <div className="relative z-10">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-1 block">Your Personalized Escape</span>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
                            {destination} <span className="text-primary">Adventure</span>
                        </h1>
                        <div className="flex items-center gap-4 text-gray-400 font-bold text-xs">
                            <div className="flex items-center gap-1.5">
                                <Clock size={14} /> {days} Luxury Days
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={14} /> {travelers} Travelers
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 relative z-10">
                        <button
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({
                                            title: `My ${destination} Adventure`,
                                            text: `Check out my travel itinerary for ${destination}!`,
                                            url: window.location.href
                                        });
                                    } catch (err) {
                                        console.error('Share failed:', err);
                                    }
                                } else {
                                    alert('Sharing not supported on this browser. URL copied to clipboard!');
                                    navigator.clipboard.writeText(window.location.href);
                                }
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-bold text-xs rounded-lg hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
                        >
                            <Share2 size={16} /> Share
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
                        >
                            <Download size={16} /> Export PDF
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hero Section */}
                        <div className="w-full">
                            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl w-full h-[28rem]">
                                <img
                                    src="https://www.travelvoice.lk/wp-content/uploads/2024/08/1588843579185.jpg"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    alt="Temple of the Tooth"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                                    <h4 className="text-white font-black text-5xl tracking-tight mb-2 font-display">Island of Serendipity.</h4>
                                    <p className="text-white/80 font-bold text-xl flex items-center gap-2">
                                        <MapPin size={24} className="text-primary" /> Sri Lanka
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Day by Day <span className="text-primary italic">Plan</span></h2>

                            {itinerary.map((day, index) => (
                                <div key={index} className="space-y-4 relative pl-8 border-l border-dashed border-slate-300 ml-3 pb-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="absolute -left-3 top-0 w-6 h-6 bg-white border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-[10px] z-10">
                                        {index + 1}
                                    </div>

                                    <div className="flex justify-between items-end mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">Day {day.dayNumber}</h3>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatDate(day.date)}</span>
                                    </div>

                                    <div className="grid gap-3">
                                        {[day.morning, day.afternoon, day.evening].filter(Boolean).map((act, actIdx) => (
                                            <div key={actIdx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-all items-center">
                                                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 text-primary">
                                                    {act.type === 'sightseeing' ? <Camera size={18} /> :
                                                        act.type === 'adventure' ? <MapPin size={18} /> :
                                                            act.type === 'relaxation' ? <Coffee size={18} /> :
                                                                <Sparkles size={18} />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-0.5 block">
                                                                {actIdx === 0 ? 'Morning' : actIdx === 1 ? 'Afternoon' : 'Evening'}
                                                            </span>
                                                            <h4 className="text-sm font-bold text-gray-900 truncate">
                                                                {act.name}
                                                            </h4>
                                                        </div>
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getActivityBadgeColor(act.type)}`}>
                                                            {act.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-1 mt-1">
                                                        {act.description}
                                                    </p>
                                                    <div className="flex gap-4 mt-2">
                                                        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                                                            <Clock size={10} />
                                                            {actIdx === 0 ? '09:00 AM' : actIdx === 1 ? '02:00 PM' : '05:30 PM'}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] uppercase">
                                                            <MapPin size={10} />
                                                            {act.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => navigate('/plan-trip')}
                                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs hover:bg-slate-50 hover:text-primary transition-all flex items-center justify-center gap-2 group"
                                        >
                                            <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                                <Plus size={14} />
                                            </div>
                                            Inject New Experience
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="space-y-8">
                        {loading ? (
                            <div className="glass p-8 rounded-[2rem] text-center border border-white/40 shadow-premium">
                                <div className="relative w-16 h-16 mx-auto mb-6">
                                    <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Curating Excellence</h4>
                                <p className="text-gray-400 font-bold text-xs tracking-wide">Selecting bespoke local recommendations...</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="glass rounded-[2rem] p-6 overflow-hidden relative border border-white/40 shadow-premium">
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                                <Sparkles size={20} />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Curated <span className="text-primary italic">Selects</span></h3>
                                        </div>

                                        <div className="space-y-6">
                                            {recommendations.places.length > 0 && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                        Top Sites <span className="h-px flex-1 bg-slate-100"></span>
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {recommendations.places.slice(0, 3).map(place => (
                                                            <div key={place.place_id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <h5 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{place.place_name}</h5>
                                                                    <PriceDisplay amount={place.entry_fee_foreign || 0} from="USD" className="text-[10px] text-secondary" />
                                                                </div>
                                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">{place.category}</p>
                                                                <button
                                                                    onClick={() => handleBookItem('place', place.place_name, place.entry_fee_foreign || 0, place.place_id)}
                                                                    className="w-full py-2 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {recommendations.hotels.length > 0 && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                        Elite Stays <span className="h-px flex-1 bg-slate-100"></span>
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {recommendations.hotels.slice(0, 2).map(hotel => (
                                                            <div key={hotel.hotel_id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <h5 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{hotel.hotel_name}</h5>
                                                                    <PriceDisplay amount={parseFloat(hotel.price_range?.split('-')[0] || 0)} from="USD" className="text-[10px] text-secondary" />
                                                                </div>
                                                                <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-3">{hotel.category}</p>
                                                                <button
                                                                    onClick={() => handleBookItem('hotel', hotel.hotel_name, 0, hotel.hotel_id)}
                                                                    className="w-full py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-primary transition-all shadow-sm"
                                                                >
                                                                    Reserve
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -mb-16 -mr-16"></div>
                                </div>
                            </div>
                        )}

                        {/* Selected Logistics */}
                        {(guide || transport) && (
                            <div className="glass p-6 rounded-[2rem] border border-white/40 shadow-premium relative overflow-hidden group hover:shadow-2xl transition-all">
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black text-gray-900 mb-6 tracking-tight flex items-center gap-3">
                                        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-white shadow-lg shadow-secondary/20">
                                            <Car size={16} />
                                        </div>
                                        Ready to Go
                                    </h4>
                                    <div className="space-y-4">
                                        {guide && (
                                            <button
                                                onClick={() => setSelectedDetail({ type: 'guide', data: guide })}
                                                className="w-full text-left flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-white transition-all border border-slate-100 hover:shadow-md group/card"
                                            >
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-slate-100 group-hover/card:bg-primary group-hover/card:text-white transition-all">
                                                    <UserCheck size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Expert Guide</p>
                                                    <h5 className="font-bold text-gray-900 text-sm leading-tight">{guide.name}</h5>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{guide.languages}</p>
                                                </div>
                                                <ArrowRight size={14} className="text-slate-300 group-hover/card:translate-x-1 transition-transform" />
                                            </button>
                                        )}
                                        {transport && (
                                            <button
                                                onClick={() => setSelectedDetail({ type: 'transport', data: transport })}
                                                className="w-full text-left flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-white transition-all border border-slate-100 hover:shadow-md group/card"
                                            >
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-slate-100 group-hover/card:bg-secondary group-hover/card:text-white transition-all">
                                                    <Car size={18} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Private Transport</p>
                                                    <h5 className="font-bold text-gray-900 text-sm leading-tight">{transport.vehicle}</h5>
                                                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{transport.company}</p>
                                                </div>
                                                <ArrowRight size={14} className="text-slate-300 group-hover/card:translate-x-1 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-[30px] -mr-8 -mt-8"></div>
                            </div>
                        )}

                        <div className="glass p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white group">
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-6 transform group-hover:rotate-[360deg] transition-transform duration-1000">
                                    <LayoutList size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Investment Summary</h3>

                                <div className="w-full space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Luxury Stays</span>
                                        <PriceDisplay amount={costs.hotel} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Elite Transport</span>
                                        <PriceDisplay amount={costs.transport} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Expert Guide</span>
                                        <PriceDisplay amount={costs.guide || 0} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Bespoke Experiences</span>
                                        <PriceDisplay amount={costs.activities} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-gray-900 font-black text-xl tracking-tighter uppercase">Total Experience</span>
                                        <PriceDisplay amount={costs.total} from="USD" className="text-3xl text-primary" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleProceedToBooking}
                                    className="w-full py-4 bg-primary text-white font-black text-lg rounded-xl shadow-xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                >
                                    Confirm & Secure Booking
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mt-6">
                                    Trusted by 50,000+ Premium Travelers
                                </p>
                            </div>
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
                        </div>
                    </aside>
                </div>
            </div>
            {/* Details Modal */}
            {selectedDetail && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={() => setSelectedDetail(null)}></div>
                    <div className="relative glass w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden animate-zoom-in">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${selectedDetail.type === 'guide' ? 'bg-primary shadow-primary/20' : 'bg-secondary shadow-secondary/20'}`}>
                                        {selectedDetail.type === 'guide' ? <UserCheck size={28} /> : <Car size={28} />}
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${selectedDetail.type === 'guide' ? 'text-primary' : 'text-secondary'}`}>
                                            {selectedDetail.type === 'guide' ? 'Personal Guide Detail' : 'Transport Service Detail'}
                                        </p>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                            {selectedDetail.type === 'guide' ? selectedDetail.data.name : selectedDetail.data.vehicle}
                                        </h3>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedDetail(null)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-inner">
                                    <Plus size={20} className="rotate-45" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                            {selectedDetail.type === 'guide' ? 'Languages' : 'Company'}
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {selectedDetail.type === 'guide' ? selectedDetail.data.languages : selectedDetail.data.company}
                                        </p>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                                            {selectedDetail.type === 'guide' ? 'Daily Rate' : 'Service Type'}
                                        </p>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {selectedDetail.type === 'guide' ? `LKR ${selectedDetail.data.rate?.toLocaleString()}` : selectedDetail.data.type}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Direct Contact</p>
                                            <p className="text-xl font-black tracking-tight">{selectedDetail.data.contact || '+94 77 123 4567'}</p>
                                        </div>
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-lg">
                                            <Clock size={24} />
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white/60 font-medium leading-relaxed">
                                        Feel free to coordinate directly with your {selectedDetail.type === 'guide' ? 'guide' : 'transport provider'} to customize your pickup times and specific requirements.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedDetail(null)}
                                className={`w-full mt-8 py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedDetail.type === 'guide' ? 'bg-primary shadow-primary/20 hover:bg-primary-hover' : 'bg-secondary shadow-secondary/20 hover:bg-secondary/90'}`}
                            >
                                Back to Itinerary
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                bookingDetails={{
                    totalAmount: costs.total,
                    destination: destination,
                    days: days,
                    travelers: travelers
                }}
                onPaymentComplete={handlePaymentComplete}
            />
        </MainLayout>
    );
};

export default Itinerary;
