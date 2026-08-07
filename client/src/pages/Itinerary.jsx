import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Share2, Download, Clock, MapPin, LayoutList, ArrowRight, Plus, Building2, UserCheck, Car, Users, Sparkles, Camera, Coffee, SlidersHorizontal, CheckCircle2, AlertCircle, Zap, BedDouble, ChevronDown, Award, RefreshCw, Phone, Mail, Globe, ExternalLink, Star, Wifi, Info } from 'lucide-react';
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

    // Target Budget and Hotel Customization State
    const targetBudget = Number(itineraryData?.budget) || 3500;
    const [hotelTier, setHotelTier] = React.useState('luxury'); // 'luxury', 'mid-range', 'budget'
    const [customHotel, setCustomHotel] = React.useState(null);
    const [transportTier, setTransportTier] = React.useState('chauffeur'); // 'chauffeur', 'shuttle', 'budget'

    // Direct Contact Rating State
    const [selectedStarRating, setSelectedStarRating] = React.useState(5);
    const [feedbackText, setFeedbackText] = React.useState('');
    const [ratingSubmitted, setRatingSubmitted] = React.useState(false);

    const hotelTierRates = {
        luxury: 220,
        'mid-range': 95,
        budget: 45
    };

    const transportTierRates = {
        chauffeur: 65,
        shuttle: 35,
        budget: 15
    };

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

    // Ensure all investment summary values are non-zero numbers and dynamically update
    const daysNum = Math.max(1, Number(days) || 1);
    const travelersNum = Math.max(1, Number(travelers) || 1);

    const activeHotelName = customHotel?.hotel_name || hotel?.name || (hotelTier === 'luxury' ? '5-Star Luxury Resort' : hotelTier === 'mid-range' ? 'Heritage & Boutique Hotel' : 'Comfort Budget Inn');

    const currentHotelNightRate = customHotel?.price 
        ? (parseFloat(String(customHotel.price).replace(/[^0-9.]/g, '')) || hotelTierRates[hotelTier])
        : hotelTierRates[hotelTier];

    const computedHotelCost = Math.round(currentHotelNightRate * daysNum);
    const computedTransportCost = Math.round(transportTierRates[transportTier] * daysNum);
    const computedGuideCost = guide ? Math.round(daysNum * 40) : Math.round(daysNum * 25);
    const computedActivitiesCost = (costs?.activities && Number(costs.activities) > 0) 
        ? Number(costs.activities) 
        : Math.round(daysNum * 25 * travelersNum);

    const computedTotalCost = computedHotelCost + computedTransportCost + computedGuideCost + computedActivitiesCost;

    // Platform Service Fee (3% Convenience & Instant Protection Fee for online booking)
    const platformFeeAmount = computedTotalCost * 0.03;
    const totalPayableWithFee = computedTotalCost + platformFeeAmount;

    const isOverBudget = computedTotalCost > targetBudget;
    const budgetVariance = targetBudget - computedTotalCost;

    // Auto-fit function to adjust stay tier to fit target budget
    const handleAutoFitBudget = () => {
        if (computedTotalCost <= targetBudget) return;
        setCustomHotel(null);
        if (hotelTier === 'luxury') {
            setHotelTier('mid-range');
        } else if (hotelTier === 'mid-range') {
            setHotelTier('budget');
            setTransportTier('shuttle');
        } else {
            setTransportTier('budget');
        }
    };

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
                    price: computedTotalCost,
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

                        {/* Hotel Stay & Budget Customizer */}
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-white/10">
                            <div className="relative z-10 space-y-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 text-primary-light rounded-xl flex items-center justify-center border border-primary/30">
                                            <SlidersHorizontal size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black tracking-tight text-white">Customizer: Stay Tier & Budget</h3>
                                            <p className="text-xs text-white/60 font-medium">Adjust accommodation tier to match your target budget</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Target Budget:</span>
                                        <PriceDisplay amount={targetBudget} from="USD" className="text-emerald-400 text-lg font-black" />
                                    </div>
                                </div>

                                {/* Hotel Tier Buttons */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-white/50 uppercase tracking-widest flex items-center gap-2">
                                        <BedDouble size={14} className="text-primary-light" /> Select Hotel Category & Comfort Level
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {[
                                            { id: 'luxury', label: '5-Star Luxury', price: '$220/night', desc: 'Resorts & Villas', icon: '👑' },
                                            { id: 'mid-range', label: 'Middle Class', price: '$95/night', desc: 'Heritage & Boutique', icon: '🏨' },
                                            { id: 'budget', label: 'Budget Stay', price: '$45/night', desc: 'Comfort Guest Inn', icon: '🏡' }
                                        ].map((tier) => {
                                            const isSelected = hotelTier === tier.id && !customHotel;
                                            return (
                                                <button
                                                    key={tier.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setHotelTier(tier.id);
                                                        setCustomHotel(null);
                                                    }}
                                                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                                                        isSelected
                                                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary/40'
                                                            : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xl">{tier.icon}</span>
                                                        <span className="text-xs font-black tracking-tight opacity-90">{tier.price}</span>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-extrabold text-sm leading-tight">{tier.label}</h5>
                                                        <p className="text-[10px] font-medium opacity-70 mt-0.5">{tier.desc}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hotel Selection Dropdown if District Hotels Available */}
                                {recommendations.hotels.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-white/50 uppercase tracking-widest">
                                            Or Choose Specific Hotel in {destination}:
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={customHotel?.hotel_id || ''}
                                                onChange={(e) => {
                                                    const selected = recommendations.hotels.find(h => h.hotel_id === parseInt(e.target.value));
                                                    setCustomHotel(selected || null);
                                                }}
                                                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-4 pr-10 text-white font-bold text-xs outline-none focus:bg-white/20 focus:border-primary appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-slate-900 text-white">Default Category Selected ({activeHotelName})</option>
                                                {recommendations.hotels.map(h => (
                                                    <option key={h.hotel_id} value={h.hotel_id} className="bg-slate-900 text-white">
                                                        {h.hotel_name} — {h.category} ({h.city})
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                                        </div>
                                    </div>
                                )}

                                {/* Hotel Contact Quick Action */}
                                <div className="pt-1 flex items-center justify-between border-t border-white/10">
                                    <span className="text-[10px] font-bold text-white/50">Active Hotel: <strong className="text-white">{activeHotelName}</strong></span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const h = customHotel || recommendations.hotels.find(x => x.hotel_name === activeHotelName) || {
                                                hotel_name: activeHotelName,
                                                category: hotelTier === 'luxury' ? '5-Star Luxury Resort' : hotelTier === 'mid-range' ? 'Middle Class' : 'Budget Inn',
                                                city: destination,
                                                contact_number: '+94 91 223 4000',
                                                email: `info@${activeHotelName.toLowerCase().replace(/[^a-z0-9]/g, '')}.lk`,
                                                website: `www.${activeHotelName.toLowerCase().replace(/[^a-z0-9]/g, '')}.lk`,
                                                address: `${destination}, Sri Lanka`,
                                                rating: 4.9,
                                                amenities: 'Free High-Speed WiFi, Infinity Pool, Ocean View, Breakfast Included, Air Conditioning, Spa & Wellness, Room Service'
                                            };
                                            setSelectedDetail({ type: 'hotel', data: h });
                                        }}
                                        className="text-xs font-black text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg border border-emerald-500/30 transition-all"
                                    >
                                        <Phone size={13} /> View Phone, Email & Details
                                    </button>
                                </div>

                                {/* Auto-Fit Alert banner if over budget */}
                                {isOverBudget && (
                                    <div className="p-4 bg-amber-500/20 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-200">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle size={20} className="text-amber-400 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs font-bold">Total cost exceeds your ${targetBudget.toLocaleString()} target budget!</p>
                                                <p className="text-[10px] text-amber-300/80">Adjust hotel category above or auto-fit below to lower total cost.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAutoFitBudget}
                                            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5 flex-shrink-0"
                                        >
                                            <Zap size={14} /> Auto-Fit Budget
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>
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
                                                        {recommendations.hotels.slice(0, 3).map(hotel => (
                                                            <div key={hotel.hotel_id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all group">
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <h5 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{hotel.hotel_name}</h5>
                                                                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{hotel.category}</span>
                                                                </div>
                                                                <p className="text-[10px] text-gray-400 font-bold mb-3">{hotel.city || hotel.address}</p>
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <button
                                                                        onClick={() => setSelectedDetail({ type: 'hotel', data: hotel })}
                                                                        className="py-2 bg-white text-slate-700 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200 hover:bg-slate-100 transition-all flex items-center justify-center gap-1 shadow-2xs"
                                                                    >
                                                                        <Info size={12} className="text-primary" /> Contact & Details
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setCustomHotel(hotel)}
                                                                        className="py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-primary transition-all shadow-sm"
                                                                    >
                                                                        Select Hotel
                                                                    </button>
                                                                </div>
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
                                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200 mb-4 transform group-hover:rotate-[360deg] transition-transform duration-1000">
                                    <LayoutList size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Investment Summary</h3>
                                <p className="text-xs text-gray-400 font-bold mb-6">Real-time Cost & Budget Tracking</p>

                                {/* Target Budget vs Actual Cost Comparison Banner */}
                                <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-2 text-left">
                                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                        <span>Target Budget Choice:</span>
                                        <PriceDisplay amount={targetBudget} from="USD" className="text-gray-900 font-black text-sm" />
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                        <span>Current Trip Total:</span>
                                        <PriceDisplay amount={computedTotalCost} from="USD" className="text-primary font-black text-base" />
                                    </div>
                                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Budget Match:</span>
                                        {isOverBudget ? (
                                            <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                                                <AlertCircle size={12} /> Over by <PriceDisplay amount={Math.abs(budgetVariance)} from="USD" />
                                            </span>
                                        ) : (
                                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Within Budget (<PriceDisplay amount={budgetVariance} from="USD" /> Saved)
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <div className="text-left">
                                            <span>Luxury / Selected Stay</span>
                                            <span className="text-[9px] text-primary block capitalize font-bold">{activeHotelName}</span>
                                        </div>
                                        <PriceDisplay amount={computedHotelCost} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Elite Transport</span>
                                        <PriceDisplay amount={computedTransportCost} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Expert Guide</span>
                                        <PriceDisplay amount={computedGuideCost} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] border-b border-slate-100 pb-3">
                                        <span>Bespoke Experiences</span>
                                        <PriceDisplay amount={computedActivitiesCost} from="USD" className="text-gray-900 text-base" />
                                    </div>
                                    <div className="flex justify-between items-center text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] border-b border-emerald-100/60 pb-3 bg-emerald-50/50 p-2.5 rounded-xl">
                                        <div className="text-left">
                                            <span>Platform Reservation & Guarantee Fee</span>
                                            <span className="text-[9px] text-emerald-500 block font-bold">Instant Confirmation (3%)</span>
                                        </div>
                                        <PriceDisplay amount={platformFeeAmount} from="USD" className="text-emerald-700 text-sm font-black" />
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="text-left">
                                            <span className="text-gray-900 font-black text-xl tracking-tighter uppercase block">Total Payable</span>
                                            <span className="text-[10px] text-gray-400 font-bold">(Trip Total + Platform Protection)</span>
                                        </div>
                                        <PriceDisplay amount={totalPayableWithFee} from="USD" className="text-3xl text-primary font-black" />
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
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${
                                        selectedDetail.type === 'hotel' ? 'bg-emerald-600 shadow-emerald-200' :
                                        selectedDetail.type === 'guide' ? 'bg-primary shadow-primary/20' : 'bg-secondary shadow-secondary/20'
                                    }`}>
                                        {selectedDetail.type === 'hotel' ? <Building2 size={28} /> :
                                         selectedDetail.type === 'guide' ? <UserCheck size={28} /> : <Car size={28} />}
                                    </div>
                                    <div>
                                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${
                                            selectedDetail.type === 'hotel' ? 'text-emerald-600' :
                                            selectedDetail.type === 'guide' ? 'text-primary' : 'text-secondary'
                                        }`}>
                                            {selectedDetail.type === 'hotel' ? 'Hotel & Accommodation Details' :
                                             selectedDetail.type === 'guide' ? 'Personal Guide Detail' : 'Transport Service Detail'}
                                        </p>
                                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                            {selectedDetail.type === 'hotel' ? (selectedDetail.data.hotel_name || selectedDetail.data.name) :
                                             selectedDetail.type === 'guide' ? selectedDetail.data.name : selectedDetail.data.vehicle}
                                        </h3>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedDetail(null)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-inner">
                                    <Plus size={20} className="rotate-45" />
                                </button>
                            </div>

                            {selectedDetail.type === 'hotel' ? (
                                <div className="space-y-6">
                                    <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Category & Location</p>
                                            <h4 className="font-bold text-gray-900 text-sm">{selectedDetail.data.category || 'Luxury Accommodation'}</h4>
                                            <p className="text-[10px] text-gray-500 font-medium mt-0.5">{selectedDetail.data.city || selectedDetail.data.address || destination}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-amber-500 text-sm font-black flex items-center gap-1">
                                                <Star size={16} fill="currentColor" /> {selectedDetail.data.rating || '4.8'} / 5
                                            </span>
                                            <span className="text-[10px] text-emerald-600 font-bold block mt-1">Verified Property</span>
                                        </div>
                                    </div>

                                    {/* Direct Contact Channels Card with Mandatory Rating Prompt */}
                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                                <Phone size={14} /> Direct Hotel Contact Channels
                                            </h5>
                                            <span className="text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                                                FREE Direct Access
                                            </span>
                                        </div>

                                        {!ratingSubmitted ? (
                                            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-bold text-slate-200">⭐ Rate Your Platform Experience to Unlock Contact Info:</p>
                                                </div>
                                                <div className="flex items-center gap-2 justify-center py-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setSelectedStarRating(star)}
                                                            className="p-1 hover:scale-125 transition-transform"
                                                        >
                                                            <Star
                                                                size={24}
                                                                className={star <= selectedStarRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={feedbackText}
                                                    onChange={(e) => setFeedbackText(e.target.value)}
                                                    placeholder="Optional review note (e.g. Helpful recommendations!)..."
                                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 font-medium"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        setRatingSubmitted(true);
                                                        try {
                                                            const user = JSON.parse(localStorage.getItem('user') || '{}');
                                                            await fetch('/api/ratings/submit', {
                                                                method: 'POST',
                                                                headers: { 'Content-Type': 'application/json' },
                                                                body: JSON.stringify({
                                                                    user_id: user.id || null,
                                                                    item_type: 'hotel',
                                                                    item_id: selectedDetail?.data?.hotel_id || null,
                                                                    item_name: selectedDetail?.data?.hotel_name || 'Selected Stay',
                                                                    rating: selectedStarRating,
                                                                    feedback: feedbackText
                                                                })
                                                            });
                                                        } catch (err) {
                                                            console.error('Rating submit error:', err);
                                                        }
                                                    }}
                                                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                                                >
                                                    Submit Rating & Unlock Direct Contact
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 animate-fade-in">
                                                <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
                                                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                                                    <span>Thank you for rating ({selectedStarRating}★)! Direct contact channels unlocked free.</span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    <a
                                                        href={`tel:${selectedDetail.data.contact_number || '+94912234000'}`}
                                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center gap-3 border border-white/10 transition-all group"
                                                    >
                                                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-500/20">
                                                            <Phone size={18} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Call Direct</span>
                                                            <span className="text-xs font-bold text-white truncate block">{selectedDetail.data.contact_number || '+94 91 223 4000'}</span>
                                                        </div>
                                                    </a>

                                                    <a
                                                        href={`mailto:${selectedDetail.data.email || `info@${(selectedDetail.data.hotel_name || 'hotel').toLowerCase().replace(/[^a-z0-9]/g, '')}.lk`}`}
                                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center gap-3 border border-white/10 transition-all group"
                                                    >
                                                        <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-blue-500/20">
                                                            <Mail size={18} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Send Email</span>
                                                            <span className="text-xs font-bold text-white truncate block">{selectedDetail.data.email || 'info@hotel.lk'}</span>
                                                        </div>
                                                    </a>
                                                </div>

                                                {selectedDetail.data.website && (
                                                    <a
                                                        href={selectedDetail.data.website.startsWith('http') ? selectedDetail.data.website : `https://${selectedDetail.data.website}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-between border border-white/10 transition-all text-xs font-bold text-emerald-400"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Globe size={16} /> Official Website ({selectedDetail.data.website})
                                                        </span>
                                                        <ExternalLink size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Amenities */}
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                            <Wifi size={12} className="text-emerald-500" /> Featured Amenities & Services
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {(selectedDetail.data.amenities || 'Free High-Speed WiFi, Swimming Pool, Ocean View, Breakfast Included, Air Conditioning, Spa & Wellness, Room Service')
                                                .split(',')
                                                .map((item, idx) => (
                                                    <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                                                        ✓ {item.trim()}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCustomHotel(selectedDetail.data);
                                                setSelectedDetail(null);
                                            }}
                                            className="flex-1 py-3.5 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all"
                                        >
                                            Select Hotel For Trip
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedDetail(null);
                                                navigate(`/hotel/${encodeURIComponent(selectedDetail.data.hotel_name || selectedDetail.data.name)}`);
                                            }}
                                            className="px-4 py-3.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all flex items-center gap-1.5"
                                        >
                                            <ExternalLink size={14} /> Full Page
                                        </button>
                                    </div>
                                </div>
                            ) : (
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

                                    <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Direct Verified Contact</p>
                                                <p className="text-xl font-black tracking-tight">{selectedDetail.data.contact || '+94 77 312 4890'}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                                <Phone size={20} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                                            <a
                                                href={`tel:${selectedDetail.data.contact || '+94 77 312 4890'}`}
                                                className="py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all text-center"
                                            >
                                                <Phone size={14} /> Call Now
                                            </a>
                                            <a
                                                href={`https://wa.me/${(selectedDetail.data.contact || '94773124890').replace(/[^0-9]/g, '')}?text=Hello,%20I%20am%20coordinating%20my%20trip%20via%20Smart%20Travel%20Guider.`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="py-3 px-4 bg-teal-500 hover:bg-teal-400 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all text-center"
                                            >
                                                <MessageSquare size={14} /> WhatsApp
                                            </a>
                                        </div>

                                        <p className="text-[10px] text-white/60 font-medium leading-relaxed">
                                            Feel free to coordinate directly with your {selectedDetail.type === 'guide' ? 'certified guide' : 'transport dispatch'} to customize pickup locations, flight arrival times, or special requests.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedDetail(null)}
                                        className={`w-full mt-6 py-4 rounded-xl font-black text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedDetail.type === 'guide' ? 'bg-primary shadow-primary/20 hover:bg-primary-hover' : 'bg-secondary shadow-secondary/20 hover:bg-secondary/90'}`}
                                    >
                                        Back to Itinerary
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                bookingDetails={{
                    totalAmount: totalPayableWithFee,
                    baseAmount: computedTotalCost,
                    platformFee: platformFeeAmount,
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
