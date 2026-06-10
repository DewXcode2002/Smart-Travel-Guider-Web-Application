import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { UserCheck, MapPin, Phone, Globe, Star, Search, Filter } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Guides = () => {
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [guidesRes, districtsRes] = await Promise.all([
                    fetch('/api/guides'),
                    fetch('/api/districts')
                ]);

                if (guidesRes.ok) setGuides(await guidesRes.json());
                if (districtsRes.ok) setDistricts(await districtsRes.json());
            } catch (error) {
                console.error('Error fetching guides:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.guide_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.languages?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDistrict = selectedDistrict === 'all' || guide.district_id === parseInt(selectedDistrict);
        return matchesSearch && matchesDistrict;
    });

    return (
        <MainLayout>
            <div className="space-y-16 animate-fade-in pb-20">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-4">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] bg-secondary/5 px-4 py-2 rounded-full border border-secondary/10">Expert Guidance</span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Meet Your <span className="text-gradient">Guide</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg max-w-xl">
                            Connect with certified local experts who turn ordinary trips into extraordinary stories.
                        </p>
                    </div>
                </header>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or language..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-6 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all"
                        />
                    </div>
                    <div className="relative group min-w-[200px]">
                        <Filter className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full appearance-none bg-white border-2 border-slate-100 rounded-[2.5rem] py-5 pl-16 pr-10 focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 shadow-premium transition-all cursor-pointer"
                        >
                            <option value="all">All Districts</option>
                            {districts.map(d => (
                                <option key={d.district_id} value={d.district_id}>{d.district_name}</option>
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
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading Experts...</p>
                    </div>
                ) : filteredGuides.length === 0 ? (
                    <div className="py-32 glass rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 border-2 border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                            <UserCheck size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">No Guides Found</h3>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto">Try adjusting your search criteria to find available experts.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedDistrict('all'); }} className="bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/25 hover:scale-105 transition-all">Clear Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGuides.map((guide, index) => (
                            <div key={guide.guide_id} className="glass rounded-[3rem] p-8 border border-white/50 shadow-premium hover:shadow-hover transition-all animate-slide-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center text-slate-300 overflow-hidden relative">
                                        <UserCheck size={32} />
                                    </div>
                                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                        Verified
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-primary transition-colors">{guide.guide_name}</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary"><Globe size={14} /></div>
                                            {guide.languages || 'English'}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary"><Star size={14} /></div>
                                            {guide.experience_years} Years Experience
                                        </div>
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary"><Phone size={14} /></div>
                                            {guide.contact_number}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Daily Rate</p>
                                        <PriceDisplay amount={guide.daily_rate_lkr} from="LKR" className="text-2xl text-gray-900" />
                                    </div>
                                    <button onClick={() => alert('Contact feature coming soon!')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg hover:shadow-primary/25">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Guides;
