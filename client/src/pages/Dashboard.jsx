import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { ArrowRight, MessageSquare, Star, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const getSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };
    const destinations = [
        { name: 'Sigiriya', rating: 4.9, reviews: '2k', img: '/images/destinations/sigiriya.jpg' },
        { name: 'Ella Rock', rating: 4.7, reviews: '1.5k', img: '/images/destinations/ella-rock.jpg' },
        { name: 'Mirissa Beach', rating: 4.8, reviews: '3k', img: '/images/destinations/mirissa-beach.jpg' },
    ];

    return (
        <MainLayout>
            <div className="space-y-10 animate-fade-in">
                {/* Hero Welcome Section */}
                <section className="relative h-64 md:h-80 rounded-[3rem] overflow-hidden shadow-2xl group">
                    <img
                        src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1600"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        alt="Sri Lanka Landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-12 flex flex-col justify-center">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/20">
                            Explore Sri Lanka
                        </span>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
                            Discover Your <span className="text-gradient">Paradise</span>
                        </h1>
                        <button
                            onClick={() => navigate('/plan-trip')}
                            className="bg-white text-gray-900 font-black py-4 px-10 rounded-2xl w-fit flex items-center gap-3 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 shadow-xl"
                        >
                            Start Your Journey <ArrowRight size={22} />
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                    <div className="xl:col-span-2 space-y-10">
                        {/* Featured Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Booking Quick View */}
                            <div className="glass p-8 rounded-[2.5rem] shadow-premium flex flex-col border border-white/40">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Current Journey</h3>
                                    <button onClick={() => navigate('/bookings')} className="text-primary font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors">Details</button>
                                </div>
                                <div className="relative group overflow-hidden rounded-3xl p-6 flex-1 shadow-2xl min-h-[180px]">
                                    <img
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="Galle Face Hotel"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-black text-white/90 uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">Active Booking</span>
                                            <span className="text-xs font-black text-amber-400 flex items-center gap-1.5 animate-pulse-soft">
                                                <Clock size={16} /> Ready in 2 days
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-black text-white mb-2 leading-tight">Galle Face Hotel</h4>
                                            <div className="flex items-center gap-2 text-sm text-white/70 font-bold uppercase tracking-wide">
                                                <MapPin size={16} className="text-primary" /> Colombo, Western Province
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Assistant */}
                            <div className="bg-gradient-to-br from-secondary to-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl relative overflow-hidden group">
                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 transform group-hover:rotate-12 transition-transform">
                                            <MessageSquare size={30} />
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight leading-tight">AI Travel <br />Advisor</h3>
                                    </div>
                                    <p className="text-white/80 font-medium text-lg leading-relaxed">
                                        Get instant help with itineraries, budget advice, and local secrets.
                                    </p>
                                    <button
                                        onClick={() => navigate('/chatbot')}
                                        className="px-10 py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:scale-[1.05] active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
                                    >
                                        Inquire Now
                                    </button>
                                </div>
                                {/* Robotic background element */}
                                <div className="absolute -bottom-10 -right-10 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
                                    <img src="https://www.svgrepo.com/show/361517/robot.svg" alt="Bot" className="w-48 h-48" />
                                </div>
                            </div>
                        </div>

                        {/* Large Featured Card */}
                        <div className="relative group overflow-hidden rounded-[3rem] h-[26rem] shadow-premium">
                            <img src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0" alt="Heritage" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-12 flex flex-col justify-end">
                                <span className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full w-fit mb-6 shadow-xl">Handpicked Experience</span>
                                <h2 className="text-5xl font-black text-white mb-4 tracking-tight leading-tight">The Ancient Heart <br /> of Ceylon</h2>
                                <p className="text-white/70 max-w-xl text-xl font-medium leading-relaxed mb-8">
                                    Journey through time in the cultural triangle. Sigiriya, Anuradhapura, and Polonnaruwa await your discovery.
                                </p>
                                <button onClick={() => navigate('/heritage')} className="text-white font-black text-xl flex items-center gap-3 group/btn">
                                    Learn More <span className="w-12 h-1 bg-primary group-hover:w-20 transition-all duration-500"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-10">
                        {/* Popular Sidebar */}
                        <div className="glass rounded-[3rem] p-10 shadow-premium border border-white/40 h-fit">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Popular</h3>
                                <button onClick={() => navigate('/destinations')} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {destinations.map((dest, i) => (
                                    <div
                                        key={i}
                                        onClick={() => navigate(`/destination/${getSlug(dest.name)}`)}
                                        className="group cursor-pointer relative overflow-hidden rounded-[2rem] h-48 shadow-lg border-2 border-transparent hover:border-primary/20 transition-all animate-slide-in"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent p-6 flex flex-col justify-end">
                                            <div className="text-2xl font-black text-white mb-2 transform group-hover:-translate-y-1 transition-transform">{dest.name}</div>
                                            <div className="flex items-center gap-3">
                                                <span className="bg-amber-400 text-amber-950 px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs font-black shadow-lg">
                                                    <Star size={14} fill="currentColor" /> {dest.rating}
                                                </span>
                                                <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">{dest.reviews} Reviews</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
