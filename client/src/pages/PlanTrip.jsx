import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Search, Calendar, Users, Camera, MapPin, Coffee, Landmark, Sparkles, ChevronDown, ArrowRight, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PlanTrip = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [districts, setDistricts] = useState([]);

    const preSelectedDistrictId = location.state?.districtId;
    const preSelectedName = location.state?.destinationName || location.state?.destination || '';

    const [formData, setFormData] = useState({
        destination: '',
        districtId: preSelectedDistrictId || '',
        targetPlace: preSelectedName,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        travelers: 2,
        budget: 3500,
        interests: ['sightseeing']
    });

    const fallbackDistricts = [
        { district_id: 1, district_name: 'Ampara', province: 'Eastern' },
        { district_id: 2, district_name: 'Anuradhapura', province: 'North Central' },
        { district_id: 3, district_name: 'Badulla', province: 'Uva' },
        { district_id: 4, district_name: 'Batticaloa', province: 'Eastern' },
        { district_id: 5, district_name: 'Colombo', province: 'Western' },
        { district_id: 6, district_name: 'Galle', province: 'Southern' },
        { district_id: 7, district_name: 'Gampaha', province: 'Western' },
        { district_id: 8, district_name: 'Hambantota', province: 'Southern' },
        { district_id: 9, district_name: 'Jaffna', province: 'Northern' },
        { district_id: 10, district_name: 'Kalutara', province: 'Western' },
        { district_id: 11, district_name: 'Kandy', province: 'Central' },
        { district_id: 12, district_name: 'Kegalle', province: 'Sabaragamuwa' },
        { district_id: 13, district_name: 'Kilinochchi', province: 'Northern' },
        { district_id: 14, district_name: 'Kurunegala', province: 'North Western' },
        { district_id: 15, district_name: 'Mannar', province: 'Northern' },
        { district_id: 16, district_name: 'Matale', province: 'Central' },
        { district_id: 17, district_name: 'Matara', province: 'Southern' },
        { district_id: 18, district_name: 'Monaragala', province: 'Uva' },
        { district_id: 19, district_name: 'Mullaitivu', province: 'Northern' },
        { district_id: 20, district_name: 'Nuwara Eliya', province: 'Central' },
        { district_id: 21, district_name: 'Polonnaruwa', province: 'North Central' },
        { district_id: 22, district_name: 'Puttalam', province: 'North Western' },
        { district_id: 23, district_name: 'Ratnapura', province: 'Sabaragamuwa' },
        { district_id: 24, district_name: 'Trincomalee', province: 'Eastern' },
        { district_id: 25, district_name: 'Vavuniya', province: 'Northern' }
    ];

    useEffect(() => {
        const fetchDistricts = async () => {
            let list = fallbackDistricts;
            try {
                const response = await fetch('/api/districts');
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        list = data;
                    }
                }
            } catch (error) {
                console.error('Error fetching districts:', error);
            }

            setDistricts(list);
            
            if (list.length > 0) {
                let matched = null;
                
                // 1. Match by district ID
                if (preSelectedDistrictId) {
                    matched = list.find(d => d.district_id === parseInt(preSelectedDistrictId));
                }

                // 2. Fallback: match district name or place location keyword
                if (!matched && preSelectedName) {
                    const nameLower = preSelectedName.toLowerCase();
                    // Ella -> Badulla district
                    if (nameLower.includes('ella') || nameLower.includes('nine arch')) {
                        matched = list.find(d => d.district_name.toLowerCase() === 'badulla');
                    } else if (nameLower.includes('sigiriya')) {
                        matched = list.find(d => d.district_name.toLowerCase() === 'matale');
                    } else {
                        matched = list.find(d => 
                            nameLower.includes(d.district_name.toLowerCase()) ||
                            d.district_name.toLowerCase().includes(nameLower)
                        );
                    }
                }

                const selected = matched || list[0];
                setFormData(prev => ({
                    ...prev,
                    destination: selected.district_name,
                    districtId: selected.district_id
                }));
            }
        };
        fetchDistricts();
    }, [preSelectedDistrictId, preSelectedName]);

    const interests = [
        { id: 'sightseeing', label: 'Sightseeing', icon: Camera },
        { id: 'adventure', label: 'Adventure', icon: MapPin },
        { id: 'relaxation', label: 'Relaxation', icon: Coffee },
        { id: 'cultural', label: 'Cultural', icon: Landmark }
    ];

    const handleInterestToggle = (id) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(id)
                ? prev.interests.filter(i => i !== id)
                : [...prev.interests, id]
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.districtId) {
            alert('Please select a destination district first.');
            return;
        }

        setLoading(true);

        try {
            // Call backend API to generate itinerary
            const response = await fetch('/api/trips/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate itinerary');
            }

            const generatedItinerary = await response.json();

            // Navigate to itinerary page with generated data
            navigate('/itinerary', { state: { itinerary: generatedItinerary, districtId: formData.districtId } });

        } catch (error) {
            console.error('Error generating trip:', error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
                <div className="text-center space-y-4">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Tailored Adventures</span>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                        Plan Your <span className="text-gradient">Dream Trip</span>
                    </h1>
                    <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
                        Tell us your preferences and our travel artisans will build the perfect itinerary,
                        crafted specifically for your unique travel style.
                    </p>
                </div>

                <div className="relative">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-soft"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>

                    <form onSubmit={handleSubmit} className="glass p-12 rounded-[3.5rem] shadow-premium space-y-12 border border-white/50 backdrop-blur-2xl">
                        {/* Target Place Customization Badge */}
                        {formData.targetPlace && (
                            <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 flex items-center justify-between animate-fade-in shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black shadow-md">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block">Tailored Itinerary Highlight</span>
                                        <h4 className="text-lg font-black text-gray-900">Day-by-Day Plan centered around <span className="text-primary font-black">{formData.targetPlace}</span></h4>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, targetPlace: '' }))}
                                    className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-all border border-gray-100 shadow-sm"
                                    title="Clear destination highlight"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}

                        {/* Destination Section */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Where to explore?</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-focus-within:bg-primary group-focus-within:text-white transition-all">
                                    <MapPin size={20} />
                                </div>
                                <select
                                    value={formData.districtId}
                                    onChange={(e) => {
                                        const selectedDistrict = districts.find(d => d.district_id === parseInt(e.target.value));
                                        setFormData({
                                            ...formData,
                                            districtId: e.target.value,
                                            destination: selectedDistrict ? selectedDistrict.district_name : ''
                                        });
                                    }}
                                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-10 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all outline-none font-extrabold text-gray-900 text-base appearance-none shadow-sm"
                                >
                                    {districts.length === 0 ? (
                                        <option>Loading districts...</option>
                                    ) : (
                                        districts.map(district => (
                                            <option key={district.district_id} value={district.district_id}>
                                                {district.district_name}
                                            </option>
                                        ))
                                    )}
                                </select>
                                <ChevronDown size={22} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        {/* Dates and Travelers */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400 group-focus-within:bg-secondary group-focus-within:text-white transition-all">
                                        <Calendar size={20} />
                                    </div>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-10 focus:bg-white focus:border-secondary focus:ring-8 focus:ring-secondary/5 transition-all outline-none font-extrabold text-gray-900 text-base shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400 group-focus-within:bg-secondary group-focus-within:text-white transition-all">
                                        <Calendar size={20} />
                                    </div>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        min={formData.startDate}
                                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-10 focus:bg-white focus:border-secondary focus:ring-8 focus:ring-secondary/5 transition-all outline-none font-extrabold text-gray-900 text-base shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Traveling Party</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-gray-400 group-focus-within:bg-secondary group-focus-within:text-white transition-all">
                                        <Users size={20} />
                                    </div>
                                    <select
                                        value={formData.travelers}
                                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-10 focus:bg-white focus:border-secondary focus:ring-8 focus:ring-secondary/5 transition-all outline-none font-extrabold text-gray-900 text-base appearance-none shadow-sm"
                                    >
                                        <option value={1}>Solo Explorer</option>
                                        <option value={2}>Couple</option>
                                        <option value={3}>Small Group (3)</option>
                                        <option value={4}>Family / Large Group (4+)</option>
                                    </select>
                                    <ChevronDown size={22} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:text-secondary transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Budget Slider */}
                        <div className="space-y-8 bg-slate-50/50 p-8 rounded-3xl border border-slate-100 shadow-inner">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Budget Spectrum</label>
                                    <h4 className="text-3xl font-black text-gray-900 tracking-tight">Investment</h4>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-black text-gray-400 uppercase tracking-widest block mb-1">Estimated Total</span>
                                    <span className="text-4xl font-black text-secondary tracking-tighter">${formData.budget.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="px-4">
                                <input
                                    type="range"
                                    min="500"
                                    max="10000"
                                    step="100"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2">Minimalist <span className="w-8 h-px bg-gray-200"></span></span>
                                <span className="flex items-center gap-2"><span className="w-8 h-px bg-gray-200"></span> Ultra Luxurious</span>
                            </div>
                        </div>

                        {/* Interests Grid */}
                        <div className="space-y-6">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Journey Focus</label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {interests.map(item => {
                                    const isSelected = formData.interests.includes(item.id);
                                    return (
                                        <div
                                            key={item.id}
                                            onClick={() => handleInterestToggle(item.id)}
                                            className={`group relative p-8 rounded-3xl flex flex-col items-center gap-4 cursor-pointer transition-all border-2 overflow-hidden ${isSelected
                                                ? 'border-secondary bg-secondary/10 text-secondary shadow-xl -translate-y-1'
                                                : 'border-slate-100 bg-white text-gray-400 hover:border-secondary/30 hover:-translate-y-0.5'
                                                }`}
                                        >
                                            <div className={`p-4 rounded-2xl transition-all ${isSelected ? 'bg-secondary text-white' : 'bg-slate-50 text-gray-300 group-hover:bg-secondary/5 group-hover:text-secondary'}`}>
                                                <item.icon size={32} />
                                            </div>
                                            <span className="font-black text-sm tracking-tight">{item.label}</span>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full"></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-6 bg-primary text-white font-black text-2xl rounded-3xl shadow-2xl shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group ${loading ? 'opacity-75 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <Sparkles size={32} className="animate-spin" />
                                    Crafting Your Journey...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={32} className="animate-pulse" />
                                    Craft My Itinerary
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default PlanTrip;
