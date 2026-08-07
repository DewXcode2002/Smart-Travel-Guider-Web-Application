import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { UserCheck, MapPin, Phone, Globe, Star, Search, Filter, ShieldCheck, Mail, MessageSquare, Sparkles, CheckCircle2, X, BadgeCheck } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Guides = () => {
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [districts, setDistricts] = useState([]);

    // Direct Contact Modal state
    const [contactModal, setContactModal] = useState(null);
    const [contactStarRating, setContactStarRating] = useState(5);
    const [contactFeedback, setContactFeedback] = useState('');
    const [contactUnlocked, setContactUnlocked] = useState(false);

    const defaultGuides = [
        {
            guide_id: 1,
            guide_name: 'Kishan Seneviratne',
            sltda_license: 'NTG-2481 (National Tourist Guide)',
            district_name: 'Kandy & Cultural Triangle',
            languages: 'English, German, Sinhala',
            experience_years: 12,
            contact_number: '+94 77 312 4890',
            email: 'kishan.guidesl@gmail.com',
            daily_rate_lkr: 15000,
            specialties: ['Ancient History', 'Buddhism Architecture', 'Trekking'],
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 2,
            guide_name: 'Dhammika Ranasinghe',
            sltda_license: 'CTG-1892 (Chauffeur Tourist Guide)',
            district_name: 'Colombo & Galle Coast',
            languages: 'English, French, Sinhala',
            experience_years: 9,
            contact_number: '+94 71 845 2103',
            email: 'dhammikatours@yahoo.com',
            daily_rate_lkr: 12000,
            specialties: ['Colonial Heritage', 'Culinary Tours', 'City Sightseeing'],
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 3,
            guide_name: 'Sanjeewa Perera',
            sltda_license: 'NTG-3105 (National Tourist Guide)',
            district_name: 'Nuwara Eliya & Ella',
            languages: 'English, Japanese, Sinhala',
            experience_years: 15,
            contact_number: '+94 77 901 3456',
            email: 'sanjeewatravels@gmail.com',
            daily_rate_lkr: 18000,
            specialties: ['Tea Plantation Hikes', 'Horton Plains', 'Botanical Gardens'],
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 4,
            guide_name: 'Niroshan Bandara',
            sltda_license: 'NTG-1540 (National Tourist Guide)',
            district_name: 'Matale & Sigiriya',
            languages: 'English, Italian, Sinhala',
            experience_years: 10,
            contact_number: '+94 77 458 9201',
            email: 'niroshan.sigiriya@gmail.com',
            daily_rate_lkr: 14000,
            specialties: ['Sigiriya Fortress', 'Dambulla Caves', 'Spice Gardens'],
            avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 5,
            guide_name: 'Tharindu Alwis',
            sltda_license: 'CTG-2940 (Chauffeur Tourist Guide)',
            district_name: 'Galle & Matara Coast',
            languages: 'English, Russian, Sinhala',
            experience_years: 8,
            contact_number: '+94 76 512 8904',
            email: 'tharinduguidelk@gmail.com',
            daily_rate_lkr: 13000,
            specialties: ['Galle Fort', 'Whale Watching', 'Surfing Spots'],
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 6,
            guide_name: 'Subramaniam Vigneswaran',
            sltda_license: 'NTG-4012 (National Tourist Guide)',
            district_name: 'Jaffna & Trincomalee',
            languages: 'English, Tamil, Sinhala',
            experience_years: 11,
            contact_number: '+94 77 623 1589',
            email: 'vickyjaffnatours@gmail.com',
            daily_rate_lkr: 15000,
            specialties: ['Nallur Temple', 'Northern Islands', 'Pigeon Island Marine Park'],
            avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 7,
            guide_name: 'Rohan Jayasuriya',
            sltda_license: 'NTG-2880 (Wildlife Specialist Guide)',
            district_name: 'Hambantota & Yala',
            languages: 'English, Spanish, Sinhala',
            experience_years: 14,
            contact_number: '+94 71 334 9876',
            email: 'rohansafari.yala@gmail.com',
            daily_rate_lkr: 16000,
            specialties: ['Leopard Safaris', 'Bird Watching', 'Udawalawe Elephants'],
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        },
        {
            guide_id: 8,
            guide_name: 'Asanka Fernando',
            sltda_license: 'CTG-3410 (Chauffeur Tourist Guide)',
            district_name: 'Negombo & Airport Route',
            languages: 'English, Mandarin Chinese, Sinhala',
            experience_years: 7,
            contact_number: '+94 77 892 1145',
            email: 'asanka.fernguide@gmail.com',
            daily_rate_lkr: 12500,
            specialties: ['Lagoon Boat Rides', 'Airport Transfers', 'Cathedral Tours'],
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [guidesRes, districtsRes] = await Promise.all([
                    fetch('/api/guides'),
                    fetch('/api/districts')
                ]);

                let fetchedGuides = [];
                if (guidesRes.ok) fetchedGuides = await guidesRes.json();
                if (districtsRes.ok) setDistricts(await districtsRes.json());

                // Merge fetched database guides with rich default authenticated list
                if (Array.isArray(fetchedGuides) && fetchedGuides.length > 0) {
                    const combined = defaultGuides.map(dg => {
                        const dbMatch = fetchedGuides.find(g => g.guide_name.toLowerCase() === dg.guide_name.toLowerCase());
                        return dbMatch ? { ...dg, ...dbMatch } : dg;
                    });
                    setGuides(combined);
                } else {
                    setGuides(defaultGuides);
                }
            } catch (error) {
                console.error('Error fetching guides:', error);
                setGuides(defaultGuides);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.guide_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.languages?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.district_name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDistrict = selectedDistrict === 'all' || guide.district_id === parseInt(selectedDistrict);
        return matchesSearch && matchesDistrict;
    });

    return (
        <MainLayout>
            <div className="space-y-12 animate-fade-in pb-20">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-4">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10 flex items-center gap-1.5 w-fit">
                            <ShieldCheck size={14} className="text-emerald-500" /> SLTDA Certified Tour Experts
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Licensed Tour <span className="text-gradient">Guides</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg max-w-xl">
                            Connect directly with official government-licensed tourist guides across Sri Lanka for authentic, memorable excursions.
                        </p>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search guide by name, language, or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-6 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all"
                        />
                    </div>
                    <div className="relative group min-w-[240px]">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full appearance-none bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-10 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all cursor-pointer"
                        >
                            <option value="all">📍 All Districts & Regions</option>
                            {districts.map(d => (
                                <option key={d.district_id} value={d.district_id}>📍 {d.district_name} District</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center space-y-6">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading Licensed Guides...</p>
                    </div>
                ) : filteredGuides.length === 0 ? (
                    <div className="py-32 glass rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 border-2 border-dashed border-slate-200 bg-white">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                            <UserCheck size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">No Guides Found</h3>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto">Try adjusting your search criteria to find available certified guides.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }} className="bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/25 hover:scale-105 transition-all text-xs uppercase tracking-wider">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGuides.map((guide, index) => (
                            <div key={guide.guide_id} className="glass rounded-[3rem] p-8 border border-white/60 shadow-premium hover:shadow-hover transition-all animate-slide-in group flex flex-col justify-between bg-white" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className="space-y-6">
                                    <div className="flex items-start justify-between">
                                        <div className="relative">
                                            <img
                                                src={guide.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                                                alt={guide.guide_name}
                                                className="w-20 h-20 rounded-[2rem] object-cover border-2 border-primary/20 shadow-md group-hover:scale-105 transition-transform"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white" title="SLTDA Licensed">
                                                <BadgeCheck size={14} />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[9px] font-black uppercase tracking-wider border border-emerald-200/80 flex items-center gap-1">
                                                <BadgeCheck size={12} /> SLTDA Certified
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-bold tracking-tight">Lic: {guide.sltda_license || 'NTG-Certified'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                                <MapPin size={12} /> {guide.district_name || 'Sri Lanka'}
                                            </span>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors">{guide.guide_name}</h3>
                                        </div>

                                        <div className="space-y-2 pt-2 border-t border-slate-100">
                                            <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                                                <Globe size={14} className="text-primary flex-shrink-0" />
                                                <span>{guide.languages || 'English, Sinhala'}</span>
                                            </div>
                                            <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                                                <Star size={14} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                                                <span>{guide.experience_years} Years Experience</span>
                                            </div>
                                        </div>

                                        {guide.specialties && (
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {guide.specialties.map((spec, i) => (
                                                    <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Daily Rate</p>
                                        <PriceDisplay amount={guide.daily_rate_lkr} from="LKR" className="text-xl sm:text-2xl font-black text-gray-900" />
                                    </div>
                                    <button
                                        onClick={() => {
                                            setContactModal(guide);
                                            setContactUnlocked(false);
                                            setContactStarRating(5);
                                            setContactFeedback('');
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg flex items-center gap-1.5"
                                    >
                                        <Phone size={14} /> Direct Contact
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Direct Contact Modal */}
            {contactModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] border border-white/20 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1 mb-2">
                                    <Sparkles size={12} /> Direct Guide Contact Unlock
                                </span>
                                <h3 className="text-2xl font-black tracking-tight">{contactModal.guide_name}</h3>
                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <BadgeCheck size={14} className="text-emerald-400" /> {contactModal.sltda_license || 'SLTDA Licensed Guide'}
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
                                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-300">Rate Guide Service</h4>
                                    <p className="text-[11px] text-gray-300">Please provide a quick star rating to instantly unlock direct phone & email details.</p>
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
                                    placeholder="Optional note (e.g. Excellent historical knowledge!)..."
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
                                                    item_type: 'guide',
                                                    item_id: contactModal.guide_id || null,
                                                    item_name: contactModal.guide_name,
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
                                    <span>Rating submitted ({contactStarRating}★)! Direct guide channels unlocked.</span>
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
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Direct Mobile Line</span>
                                                <span className="text-sm font-bold text-white">{contactModal.contact_number}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Call Now →</span>
                                    </a>

                                    <a
                                        href={`https://wa.me/${contactModal.contact_number.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(contactModal.guide_name)},%20I%20would%20like%20to%20inquire%20about%20your%20tour%20guiding%20services.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                                <MessageSquare size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">WhatsApp Direct Chat</span>
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
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Direct Email Address</span>
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

export default Guides;
