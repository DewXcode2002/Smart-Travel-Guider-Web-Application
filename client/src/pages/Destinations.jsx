import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Users, Search, Compass, Sparkles } from 'lucide-react';

const Destinations = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const getDestinationSlug = (name) => {
        return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
    };

    const categories = ['All', 'Beaches', 'Heritage & Culture', 'Wildlife & Nature', 'Hill Country & Trekking'];

    const destinations = [
        {
            name: 'Sigiriya Rock Fortress',
            rating: 4.9,
            reviews: '4.8k',
            img: '/sigiriya_rock_fortress.jpg',
            location: 'Central Province (Matale)',
            bestTime: 'Jan - Apr',
            visitors: '1.2M+/year',
            category: 'Heritage & Culture',
            tagline: 'Ancient Palace in the Sky'
        },
        {
            name: 'Nine Arch Bridge',
            rating: 4.9,
            reviews: '3.9k',
            img: 'https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg',
            location: 'Uva Province (Ella)',
            bestTime: 'Dec - Mar',
            visitors: '850k/year',
            category: 'Hill Country & Trekking',
            tagline: 'Bridge in the Sky'
        },
        {
            name: 'Galle Fort & Lighthouse',
            rating: 4.8,
            reviews: '3.6k',
            img: '/galle_fort_lighthouse.jpg',
            location: 'Southern Province (Galle)',
            bestTime: 'Nov - Apr',
            visitors: '900k/year',
            category: 'Heritage & Culture',
            tagline: 'Dutch Heritage Fortress'
        },
        {
            name: 'Temple of the Sacred Tooth Relic',
            rating: 4.9,
            reviews: '5.2k',
            img: '/temple_of_tooth.jpg',
            location: 'Central Province (Kandy)',
            bestTime: 'Year-round (Aug Festival)',
            visitors: '2M+/year',
            category: 'Heritage & Culture',
            tagline: 'Sacred Buddhist Shrine'
        },
        {
            name: 'Mirissa Beach',
            rating: 4.8,
            reviews: '3.1k',
            img: 'https://assets.telegraphindia.com/telegraph/2023/Aug/1691497505_cms001.jpg',
            location: 'Southern Province (Matara)',
            bestTime: 'Nov - Apr',
            visitors: '450k/year',
            category: 'Beaches',
            tagline: 'Whale Watching & Palm Coasts'
        },
        {
            name: 'Yala National Park',
            rating: 4.8,
            reviews: '2.8k',
            img: 'https://www.goyalasafari.com/image/slider/yala-slide/yala_nationalpark_slide1.jpg',
            location: 'Southern / Uva (Hambantota)',
            bestTime: 'Feb - Jul',
            visitors: '400k/year',
            category: 'Wildlife & Nature',
            tagline: 'Kingdom of Leopards & Elephants'
        },
        {
            name: 'Nuwara Eliya & Gregory Lake',
            rating: 4.7,
            reviews: '2.9k',
            img: '/nuwara_eliya_gregory_lake.jpg',
            location: 'Central Province (Nuwara Eliya)',
            bestTime: 'Mar - May, Aug - Sep',
            visitors: '600k/year',
            category: 'Hill Country & Trekking',
            tagline: 'Little England of Sri Lanka'
        },
        {
            name: 'Arugam Bay',
            rating: 4.8,
            reviews: '2.5k',
            img: 'https://www.royalbeacharugambay.com/wp-content/uploads/2018/06/31486864_2092393800812074_7238967897651937280_o.jpg',
            location: 'Eastern Province (Ampara)',
            bestTime: 'May - Sep',
            visitors: '200k/year',
            category: 'Beaches',
            tagline: 'World-Class Surfing Bay'
        },
        {
            name: 'Ella Rock',
            rating: 4.7,
            reviews: '1.5k',
            img: 'https://www.lankatourexperts.com/wp-content/uploads/2023/12/Ella-rock-sunrise.webp',
            location: 'Uva Province (Badulla)',
            bestTime: 'Jan - Mar',
            visitors: '300k/year',
            category: 'Hill Country & Trekking',
            tagline: 'Panoramic Mountain Trek'
        },
        {
            name: "Adam's Peak",
            rating: 4.8,
            reviews: '3.2k',
            img: 'https://4.bp.blogspot.com/-8Cr_uUNS4pU/WvXDlon6L9I/AAAAAAAAEsE/3vgOIzXaKUA3mVJ0dVvGkL62cqPqPB0sACEwYBhgL/s1600/08%2Badams%2Bpeak%2Bsrilanka%2Bwonder%2Btravel%2Bsite%2Bwow.jpg',
            location: 'Central Highlands (Ratnapura/Nuwara Eliya)',
            bestTime: 'Dec - May',
            visitors: '2M+/year',
            category: 'Hill Country & Trekking',
            tagline: 'Sacred Mountain Pilgrimage'
        },
        {
            name: 'Pigeon Island & Nilaveli Beach',
            rating: 4.8,
            reviews: '2.2k',
            img: '/nilaveli_beach.jpg',
            location: 'Eastern Province (Trincomalee)',
            bestTime: 'May - Oct',
            visitors: '350k/year',
            category: 'Beaches',
            tagline: 'Snorkeling Coral Sanctuary'
        },
        {
            name: 'Horton Plains & World\'s End',
            rating: 4.8,
            reviews: '2.7k',
            img: '/horton_plains.jpg',
            location: 'Central Highlands (Nuwara Eliya)',
            bestTime: 'Jan - Mar',
            visitors: '350k/year',
            category: 'Hill Country & Trekking',
            tagline: 'Precipice Viewpoint & Cloud Forest'
        },
        {
            name: 'Nallur Kandaswamy Devasthanam',
            rating: 4.9,
            reviews: '3.5k',
            img: 'https://d3e1m60ptf1oym.cloudfront.net/c822b4ed-7e27-4ea1-be2a-aa8f796c4ca1/JW_011019_1087_uxga.jpg',
            location: 'Northern Province (Jaffna)',
            bestTime: 'Aug (Festival)',
            visitors: '1M+/year',
            category: 'Heritage & Culture',
            tagline: 'Historic Sacred Hindu Temple'
        },
        {
            name: 'Udawalawe National Park',
            rating: 4.8,
            reviews: '2.4k',
            img: '/udawalawe.jpg',
            location: 'Sabaragamuwa (Ratnapura/Monaragala)',
            bestTime: 'Year-round',
            visitors: '380k/year',
            category: 'Wildlife & Nature',
            tagline: 'Home of Wild Elephants'
        },
        {
            name: 'Polonnaruwa Vatadage & Ruins',
            rating: 4.9,
            reviews: '2.1k',
            img: '/polonnaruwa.jpg',
            location: 'North Central (Polonnaruwa)',
            bestTime: 'Jul - Sep',
            visitors: '500k/year',
            category: 'Heritage & Culture',
            tagline: 'Medieval Capital Kingdom'
        },
        {
            name: 'Bentota Golden Beach',
            rating: 4.7,
            reviews: '2.8k',
            img: '/bentota_beach.jpg',
            location: 'Southern Province (Galle/Kalutara)',
            bestTime: 'Oct - Apr',
            visitors: '400k/year',
            category: 'Beaches',
            tagline: 'Water Sports & Luxury Resorts'
        }
    ];

    const filteredDestinations = destinations.filter(dest => {
        const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <MainLayout>
            <div className="space-y-8 pb-16 animate-fade-in">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-primary/90 to-slate-900 text-white rounded-[3rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                    <div className="relative z-10 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-black uppercase tracking-widest text-amber-300">
                            <Sparkles size={14} /> Pearl of the Indian Ocean
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                            Discover Sri Lanka's <br />
                            <span className="text-amber-400">Popular Destinations</span>
                        </h1>
                        <p className="text-gray-300 font-medium text-sm sm:text-base">
                            From ancient rock fortresses to palm-fringed coastlines, pristine tea estates, and wild safari reserves across Sri Lanka.
                        </p>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by destination name, province or feature..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-gray-900 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
                        />
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                                    selectedCategory === cat
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.03]'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Destination Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((dest, i) => (
                        <div key={i} className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dest.img}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                
                                <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                    {dest.category}
                                </span>

                                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                                    <h3 className="text-2xl font-black text-white leading-tight">{dest.name}</h3>
                                    <p className="text-amber-300 text-xs font-bold">{dest.tagline}</p>
                                    <div className="flex items-center gap-2 pt-1">
                                        <span className="bg-amber-400/20 backdrop-blur-sm border border-amber-400/40 text-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-black">
                                            <Star size={14} fill="currentColor" /> {dest.rating}
                                        </span>
                                        <span className="text-white/70 text-xs font-extrabold">({dest.reviews} Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-2.5">
                                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                                        <MapPin size={16} className="text-primary shrink-0" />
                                        <span>{dest.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                                        <Calendar size={16} className="text-primary shrink-0" />
                                        <span>Best Season: {dest.bestTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs font-bold text-gray-600">
                                        <Users size={16} className="text-primary shrink-0" />
                                        <span>{dest.visitors}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/destination/${getDestinationSlug(dest.name)}`)}
                                    className="w-full bg-slate-900 text-white font-black py-3.5 px-6 rounded-2xl hover:bg-primary transition-all duration-300 text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 group-hover:bg-primary"
                                >
                                    <Compass size={16} /> Explore Destination
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 space-y-3">
                        <Compass size={48} className="mx-auto text-gray-300" />
                        <h3 className="text-xl font-black text-gray-800">No destinations found</h3>
                        <p className="text-gray-500 font-medium text-sm">Try searching with a different keyword or select "All" categories.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Destinations;
