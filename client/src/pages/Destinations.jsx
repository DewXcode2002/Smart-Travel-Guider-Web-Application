import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

const Destinations = () => {
    const navigate = useNavigate();

    const getDestinationSlug = (name) => {
        return name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
    };
    const destinations = [
        {
            name: 'Arugam Bay',
            rating: 4.8,
            reviews: '2.5k',
            img: 'https://www.royalbeacharugambay.com/wp-content/uploads/2018/06/31486864_2092393800812074_7238967897651937280_o.jpg',
            location: 'Eastern Province',
            bestTime: 'May - Sep',
            visitors: '200k/year'
        },
        {
            name: 'Ella Rock',
            rating: 4.7,
            reviews: '1.5k',
            img: 'https://www.lankatourexperts.com/wp-content/uploads/2023/12/Ella-rock-sunrise.webp',
            location: 'Uva Province',
            bestTime: 'Jan - Mar',
            visitors: '300k/year'
        },
        {
            name: 'Mirissa Beach',
            rating: 4.8,
            reviews: '3k',
            img: 'https://assets.telegraphindia.com/telegraph/2023/Aug/1691497505_cms001.jpg',
            location: 'Southern Province',
            bestTime: 'Nov - Apr',
            visitors: '450k/year'
        },
        {
            name: "Adam's Peak",
            rating: 4.8,
            reviews: '3.2k',
            img: 'https://4.bp.blogspot.com/-8Cr_uUNS4pU/WvXDlon6L9I/AAAAAAAAEsE/3vgOIzXaKUA3mVJ0dVvGkL62cqPqPB0sACEwYBhgL/s1600/08%2Badams%2Bpeak%2Bsrilanka%2Bwonder%2Btravel%2Bsite%2Bwow.jpg',
            location: 'Central Highlands',
            bestTime: 'Dec - May',
            visitors: '2M+/year'
        },
        {
            name: 'Yala National Park',
            rating: 4.8,
            reviews: '1.8k',
            img: 'https://i.pinimg.com/originals/9b/49/de/9b49de63f818cba9e5273d4f1b42af6c.jpg',
            location: 'Southern Province',
            bestTime: 'Feb - Jul',
            visitors: '400k/year'
        },
        {
            name: 'Nallur Kandaswamy Devasthanam',
            rating: 4.9,
            reviews: '3.5k',
            img: 'https://d3e1m60ptf1oym.cloudfront.net/c822b4ed-7e27-4ea1-be2a-aa8f796c4ca1/JW_011019_1087_uxga.jpg',
            location: 'Jaffna',
            bestTime: 'Aug (Festival)',
            visitors: '1M+/year'
        },
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Popular Destinations</h1>
                    <p className="text-gray-600 font-medium">Discover the most amazing places in Sri Lanka</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((dest, i) => (
                        <div key={i} className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={dest.img}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-2xl font-black text-white mb-2">{dest.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-black">
                                            <Star size={14} fill="currentColor" /> {dest.rating}
                                        </span>
                                        <span className="text-white/60 text-xs font-bold">({dest.reviews} Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={16} className="text-primary" />
                                    <span className="font-medium">{dest.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar size={16} className="text-primary" />
                                    <span className="font-medium">Best: {dest.bestTime}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users size={16} className="text-primary" />
                                    <span className="font-medium">{dest.visitors}</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/destination/${getDestinationSlug(dest.name)}`)}
                                    className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-hover transition-all mt-4"
                                >
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Destinations;
