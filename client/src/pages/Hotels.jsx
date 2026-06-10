import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Wind, Coffee, Waves, Car, Utensils, Dumbbell, Search } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Hotels = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hotels');
    const [searchQuery, setSearchQuery] = useState('');

    const allAccommodations = {
        hotels: [
            {
                id: 1,
                name: 'Galle Face Hotel',
                location: 'Colombo, Sri Lanka',
                price: 150,
                rating: 4.8,
                reviews: 1250,
                image: 'https://4.bp.blogspot.com/-u1smN3ygCXY/UmEa75T4UrI/AAAAAAAAASM/hL7VAIHeOmM/s1600/galle_face_hotel.jpg',
                tag: 'Popular',
                amenities: ['wifi', 'ac', 'restaurant', 'pool'],
                type: 'hotels'
            },
            {
                id: 2,
                name: 'Heritance Kandalama',
                location: 'Dambulla, Sri Lanka',
                price: 220,
                rating: 4.9,
                reviews: 850,
                image: 'https://dayouting.lk/img_uploads/uploads/3481541647963252min.jpg',
                tag: 'Best Value',
                amenities: ['wifi', 'pool', 'restaurant'],
                type: 'hotels'
            },
            {
                id: 3,
                name: 'Jetwing Lighthouse',
                location: 'Galle, Sri Lanka',
                price: 180,
                rating: 4.7,
                reviews: 920,
                image: 'https://www.eatchillwander.com/wp-content/uploads/2020/04/jetwing-lighthouse-hotel-galle-srilanka43.jpg',
                amenities: ['wifi', 'ac', 'pool'],
                type: 'hotels'
            },
            {
                id: 4,
                name: 'Cinnamon Grand',
                location: 'Colombo, Sri Lanka',
                price: 195,
                rating: 4.6,
                reviews: 1100,
                image: 'https://d18slle4wlf9ku.cloudfront.net/www.cinnamonhotels.com-1302818674/cms/cache/v2/66bd61ab411ad.jpg/1920x1080/fit/80/e025f0c5fa81a93236d946f06d436f9c.jpg',
                amenities: ['wifi', 'ac', 'restaurant', 'gym'],
                type: 'hotels'
            },
            {
                id: 5,
                name: 'Shangri-La Colombo',
                location: 'Colombo, Sri Lanka',
                price: 280,
                rating: 4.9,
                reviews: 980,
                image: 'https://images.luxuryescapes.com/q_auto:good/wtbg8r24pvha0mpats',
                tag: 'Luxury',
                amenities: ['wifi', 'ac', 'restaurant', 'pool', 'gym'],
                type: 'hotels'
            },
            {
                id: 6,
                name: 'Amangalla',
                location: 'Galle, Sri Lanka',
                price: 350,
                rating: 4.9,
                reviews: 650,
                image: 'https://www.aman.com/sites/default/files/2023-10/amangalla-exterior.jpg',
                tag: 'Luxury',
                amenities: ['wifi', 'ac', 'restaurant', 'pool'],
                type: 'hotels'
            }
        ],
        villas: [
            {
                id: 7,
                name: 'Tri Lanka Villa',
                location: 'Koggala, Sri Lanka',
                price: 450,
                rating: 4.9,
                reviews: 320,
                image: 'https://www.beyondsenses.de/wp-content/uploads/2018/08/Tri_Koggala_Sri_Lanka_Spezialist_Zimmer_Family_Villa_2.jpg',
                tag: 'Exclusive',
                amenities: ['wifi', 'pool', 'restaurant', 'ac'],
                type: 'villas'
            },
            {
                id: 8,
                name: 'Cape Weligama',
                location: 'Weligama, Sri Lanka',
                price: 520,
                rating: 4.8,
                reviews: 280,
                image: 'https://smartflyercdn.s3.amazonaws.com/wp-content/uploads/20230509143148/Cape-Weligama-Large107.jpg',
                tag: 'Luxury',
                amenities: ['wifi', 'ac', 'pool', 'restaurant'],
                type: 'villas'
            },
            {
                id: 9,
                name: 'Amanwella',
                location: 'Tangalle, Sri Lanka',
                price: 600,
                rating: 4.9,
                reviews: 210,
                image: 'https://www.theluxevoyager.com/wp-content/uploads/2018/02/Amanwella-Sri-Lanka-pool.jpg',
                tag: 'Luxury',
                amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym'],
                type: 'villas'
            }
        ],
        hostels: [
            {
                id: 10,
                name: 'Clock Inn Colombo',
                location: 'Colombo, Sri Lanka',
                price: 25,
                rating: 4.5,
                reviews: 890,
                image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145076874.jpg?k=6aecab0f22ec9bd081658947f4cc9d0bdfe6d6c8fe03b000befc36b14a89e2ff&o=&hp=1',
                tag: 'Budget',
                amenities: ['wifi', 'restaurant'],
                type: 'hostels'
            },
            {
                id: 11,
                name: 'Hangover Hostels Ella',
                location: 'Ella, Sri Lanka',
                price: 18,
                rating: 4.6,
                reviews: 1200,
                image: 'https://hostelgeeks.com/wp-content/uploads/2023/02/Hangover-Hostels-Ella-.jpg',
                tag: 'Popular',
                amenities: ['wifi', 'restaurant'],
                type: 'hostels'
            },
            {
                id: 12,
                name: 'Zostel Galle',
                location: 'Galle, Sri Lanka',
                price: 22,
                rating: 4.4,
                reviews: 750,
                image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/12/20151900/Zostel-Pondicherry-809x455.jpg',
                amenities: ['wifi', 'ac'],
                type: 'hostels'
            }
        ]
    };

    const getAmenityIcon = (amenity) => {
        const icons = {
            wifi: <Wifi size={20} />,
            ac: <Wind size={20} />,
            restaurant: <Utensils size={20} />,
            pool: <Waves size={20} />,
            gym: <Dumbbell size={20} />,
            parking: <Car size={20} />
        };
        return icons[amenity] || <Coffee size={20} />;
    };

    const currentAccommodations = allAccommodations[activeTab];

    const filteredAccommodations = currentAccommodations.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <MainLayout>
            <div className="space-y-16 animate-fade-in pb-20">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                    <div className="space-y-4">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">Bespoke Living</span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Find Your <span className="text-gradient">Sanctuary</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg max-w-xl">
                            A curated selection of Sri Lanka's most prestigious accommodations,
                            from colonial estates to ultra-modern beachfront villas.
                        </p>
                    </div>

                    <div className="flex bg-slate-100/50 p-2 rounded-[2rem] shadow-inner border border-slate-100 w-full lg:w-auto backdrop-blur-sm">
                        {['hotels', 'villas', 'hostels'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-10 py-4 font-black text-xs uppercase tracking-widest rounded-[1.5rem] transition-all ${activeTab === tab
                                    ? 'bg-white text-primary shadow-xl shadow-slate-200/50 scale-[1.02]'
                                    : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="relative group max-w-3xl">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-focus-within:bg-primary group-focus-within:text-white transition-all">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, city, or unique characteristic..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-24 pr-10 py-7 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-premium focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900 text-lg transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {filteredAccommodations.map((hotel, index) => (
                        <div
                            key={hotel.id}
                            className="glass rounded-[3.5rem] overflow-hidden border border-white/50 shadow-premium hover:shadow-hover transition-all group animate-slide-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                {hotel.tag && (
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-white/90 backdrop-blur-xl px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-2xl border border-white">
                                            {hotel.tag}
                                        </span>
                                    </div>
                                )}

                                <button
                                    onClick={(e) => { e.stopPropagation(); alert('Added to wishlist!'); }}
                                    className="absolute top-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-rose-500 hover:scale-110 active:scale-95 transition-all shadow-xl"
                                >
                                    <Star size={24} className={hotel.rating > 4.7 ? 'fill-current' : ''} />
                                </button>

                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                    <div className="text-white space-y-1">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80">
                                            <MapPin size={12} className="text-secondary" /> {hotel.location}
                                        </div>
                                        <h3 className="text-2xl font-black tracking-tight">{hotel.name}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                                            <div key={idx} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-all shadow-sm">
                                                {getAmenityIcon(amenity)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1.5 font-black text-amber-500 justify-end mb-1">
                                            <Star size={18} fill="currentColor" />
                                            <span className="text-lg">{hotel.rating}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{hotel.reviews} Expert Reviews</span>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-slate-100"></div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Starting from</span>
                                        <div className="flex items-baseline gap-1">
                                            <PriceDisplay amount={hotel.price} from="USD" className="text-4xl text-gray-900" />
                                            <span className="text-gray-400 font-black text-xs uppercase tracking-widest">/ Night</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/hotel/${getSlug(hotel.name)}`)}
                                        className="px-10 py-5 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:scale-[1.05] active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
                                    >
                                        Inquire Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAccommodations.length === 0 && (
                    <div className="text-center py-32 glass rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 mb-6">
                            <Search size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">No sanctuaries discovered</h3>
                        <p className="text-gray-400 font-bold max-w-xs mx-auto mb-10">We couldn't find any results matching your prestigious criteria.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/25 hover:scale-105 transition-all"
                        >
                            Reset Search
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Hotels;
