import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Car, MapPin, Phone, Mail, MessageSquare, Star, Search, Filter, ShieldCheck, Sparkles, CheckCircle2, X, Compass, Gauge, Users } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Transport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Direct Contact Modal state
    const [contactModal, setContactModal] = useState(null);
    const [contactStarRating, setContactStarRating] = useState(5);
    const [contactFeedback, setContactFeedback] = useState('');
    const [contactUnlocked, setContactUnlocked] = useState(false);

    const transportProviders = [
        {
            id: 1,
            company_name: 'Kangaroo Cabs & Airport Transfers',
            service_type: 'Islandwide Taxi & Airport Cab',
            district_name: 'Colombo & Islandwide',
            rating: 4.9,
            reviews: 1850,
            contact_number: '+94 11 258 8588',
            whatsapp: '+94 77 733 3888',
            email: 'info@kangaroocabs.com',
            daily_rate_lkr: 18000,
            vehicle_types: ['Sedan Cars', 'Luxury SUVs', 'Toyota HiAce Vans'],
            features: ['Flight Tracking', '24/7 Availability', 'Free Wi-Fi in Vehicle', 'Chauffeur Included'],
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 2,
            company_name: 'Mallika Cabs & Tour Transport',
            service_type: 'Private Chauffeur & Mini Coaches',
            district_name: 'Kandy & Cultural Triangle',
            rating: 4.8,
            reviews: 940,
            contact_number: '+94 81 222 2444',
            whatsapp: '+94 77 780 4500',
            email: 'bookings@mallikacabs.lk',
            daily_rate_lkr: 20000,
            vehicle_types: ['Toyota KDH Vans', 'Mini Buses', 'VIP Sedans'],
            features: ['English Speaking Driver', 'Air Conditioned', 'Unlimited Fuel Packages', 'Mountain Trained'],
            image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 3,
            company_name: 'Cinnamon Premium Chauffeur Tours',
            service_type: 'Luxury Chauffeur & VIP Limousines',
            district_name: 'Islandwide Luxury Services',
            rating: 4.9,
            reviews: 1200,
            contact_number: '+94 11 470 9400',
            whatsapp: '+94 77 301 2200',
            email: 'transports@cinnamontours.lk',
            daily_rate_lkr: 35000,
            vehicle_types: ['Mercedes-Benz E-Class', 'Land Cruiser V8', 'Luxury Sprinter'],
            features: ['VIP Reception', 'Refreshments Included', 'Fully Insured', 'Multilingual Drivers'],
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 4,
            company_name: 'Southern Coast Tuk-Tuk & Cab Express',
            service_type: 'Beach Shuttles & Safari Jeeps',
            district_name: 'Galle, Mirissa & Matara',
            rating: 4.7,
            reviews: 820,
            contact_number: '+94 91 224 5500',
            whatsapp: '+94 77 412 9900',
            email: 'gallecabs@gmail.com',
            daily_rate_lkr: 9500,
            vehicle_types: ['Safari 4x4 Jeeps', 'Beach Tuk-Tuks', 'Compact AC Taxis'],
            features: ['Surfboard Racks', 'Coastal Route Experts', 'Yala Safari Drop', 'Flexible Timings'],
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 5,
            company_name: 'Ella & Hill Country Mountain Express',
            service_type: 'Highland Van & Luggage Transfer',
            district_name: 'Ella, Nuwara Eliya & Badulla',
            rating: 4.8,
            reviews: 670,
            contact_number: '+94 57 222 9911',
            whatsapp: '+94 77 810 5050',
            email: 'ellatransport@gmail.com',
            daily_rate_lkr: 16000,
            vehicle_types: ['4WD Mountain Vans', 'Toyota Coaster', 'Private Cars'],
            features: ['Train Station Pickup', 'Luggage Forwarding', 'Scenic Lookout Stops', 'Experienced Drivers'],
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 6,
            company_name: 'Jaffna Peninsula Tours & Rentals',
            service_type: 'Northern Peninsula Vehicles & Boats',
            district_name: 'Jaffna & Trincomalee',
            rating: 4.7,
            reviews: 510,
            contact_number: '+94 21 222 8888',
            whatsapp: '+94 77 234 1122',
            email: 'jaffnacabs@gmail.com',
            daily_rate_lkr: 14000,
            vehicle_types: ['AC Minibuses', 'Island Ferry Link', 'Sedans'],
            features: ['Delft Island Ferry Integration', 'Temple Tour Routes', 'Local Tamil & English Drivers'],
            image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800'
        }
    ];

    const filteredProviders = transportProviders.filter(p => {
        const matchesSearch = p.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.district_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.service_type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'all' || p.service_type.toLowerCase().includes(selectedCategory);
        return matchesSearch && matchesCat;
    });

    return (
        <MainLayout>
            <div className="space-y-12 animate-fade-in pb-20">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-4">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10 flex items-center gap-1.5 w-fit">
                            <ShieldCheck size={14} className="text-emerald-500" /> Islandwide Certified Fleet
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Transport <span className="text-gradient">Services</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg max-w-xl">
                            Book reliable private drivers, luxury AC vans, airport transfers, and safari jeeps directly with top transport providers in Sri Lanka.
                        </p>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search transport by company, region, or vehicle type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-6 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all"
                        />
                    </div>
                    <div className="relative group min-w-[240px]">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full appearance-none bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-10 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all cursor-pointer"
                        >
                            <option value="all">🚗 All Service Categories</option>
                            <option value="taxi">🚕 Airport & City Cabs</option>
                            <option value="chauffeur">🚘 Private Chauffeur & Vans</option>
                            <option value="luxury">⭐ VIP & Luxury Cars</option>
                            <option value="safari">🛺 Beach Tuks & Safaris</option>
                        </select>
                    </div>
                </div>

                {/* Provider Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProviders.map((provider, index) => (
                        <div
                            key={provider.id}
                            className="glass rounded-[3rem] overflow-hidden border border-white/60 shadow-premium hover:shadow-hover transition-all animate-slide-in group flex flex-col justify-between bg-white"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Image Header */}
                            <div className="relative h-60 overflow-hidden bg-slate-100">
                                <img
                                    src={provider.image}
                                    alt={provider.company_name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                
                                <div className="absolute top-5 left-5">
                                    <span className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                                        📍 {provider.district_name}
                                    </span>
                                </div>

                                <div className="absolute bottom-5 left-5 right-5 text-white">
                                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block">{provider.service_type}</span>
                                    <h3 className="text-xl font-black tracking-tight leading-tight">{provider.company_name}</h3>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="p-7 space-y-6 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                                            <Star size={16} fill="currentColor" />
                                            <span>{provider.rating}</span>
                                            <span className="text-gray-400 font-normal text-xs">({provider.reviews} reviews)</span>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                                            Verified Fleet
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Available Fleet Vehicles</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {provider.vehicle_types.map((v, i) => (
                                                <span key={i} className="bg-slate-100 text-slate-800 text-[10px] font-bold px-3 py-1 rounded-xl">
                                                    🚗 {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                                        {provider.features.map((feat, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                                    ✓
                                                </div>
                                                <span>{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Daily Package Rate</p>
                                        <PriceDisplay amount={provider.daily_rate_lkr} from="LKR" className="text-xl sm:text-2xl font-black text-gray-900" />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setContactModal(provider);
                                            setContactUnlocked(false);
                                            setContactStarRating(5);
                                            setContactFeedback('');
                                        }}
                                        className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center gap-1.5"
                                    >
                                        <Phone size={14} /> Direct Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Direct Contact Modal */}
            {contactModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] border border-white/20 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1 mb-2">
                                    <Sparkles size={12} /> Direct Transport Contact Unlock
                                </span>
                                <h3 className="text-2xl font-black tracking-tight">{contactModal.company_name}</h3>
                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <MapPin size={12} className="text-amber-400" /> {contactModal.district_name}
                                </p>
                            </div>
                            <button
                                onClick={() => setContactModal(null)}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!contactUnlocked ? (
                            <div className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <div className="text-center space-y-1">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-300">Rate Transport Fleet</h4>
                                    <p className="text-[11px] text-gray-300">Please provide a quick star rating to instantly unlock direct telephone & email details.</p>
                                </div>

                                <div className="flex justify-center gap-2 py-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setContactStarRating(star)}
                                            className="hover:scale-125 transition-transform"
                                        >
                                            <Star
                                                size={28}
                                                className={star <= contactStarRating ? 'fill-amber-400 text-amber-400' : 'text-white/30'}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <input
                                    type="text"
                                    value={contactFeedback}
                                    onChange={(e) => setContactFeedback(e.target.value)}
                                    placeholder="Optional note (e.g. Clean AC vans and punctual drivers!)..."
                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 font-medium"
                                />

                                <button
                                    type="button"
                                    onClick={async () => {
                                        setContactUnlocked(true);
                                        try {
                                            const user = JSON.parse(localStorage.getItem('user') || '{}');
                                            await fetch('/api/ratings/submit', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({
                                                    user_id: user.id || null,
                                                    item_type: 'transportation',
                                                    item_id: contactModal.id || null,
                                                    item_name: contactModal.company_name,
                                                    rating: contactStarRating,
                                                    feedback: contactFeedback
                                                })
                                            });
                                        } catch (err) {
                                            console.error('Rating submit error:', err);
                                        }
                                    }}
                                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
                                >
                                    Submit Rating & Unlock Direct Contact
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-fade-in">
                                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-emerald-300 text-xs font-bold">
                                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                                    <span>Rating submitted ({contactStarRating}★)! Direct dispatch channels unlocked.</span>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`tel:${contactModal.contact_number}`}
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">24/7 Hotline Dispatch</span>
                                                <span className="text-sm font-bold text-white">{contactModal.contact_number}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Call Hotline →</span>
                                    </a>

                                    <a
                                        href={`https://wa.me/${contactModal.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(contactModal.company_name)},%20I%20would%20like%20to%20book%20a%20vehicle%20transfer%20via%20Smart%20Travel%20Guider.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                                <MessageSquare size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">WhatsApp Instant Booking</span>
                                                <span className="text-sm font-bold text-white">Chat on WhatsApp</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-teal-400 uppercase tracking-wider">Open Chat →</span>
                                    </a>

                                    <a
                                        href={`mailto:${contactModal.email}`}
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Official Email Address</span>
                                                <span className="text-sm font-bold text-white truncate max-w-[200px] block">{contactModal.email}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Send Email →</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default Transport;
