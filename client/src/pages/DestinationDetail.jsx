import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Star, MapPin, Calendar, Users, Clock, DollarSign, Thermometer, Camera, Mountain, Waves, Building, ArrowLeft, Heart, Share2 } from 'lucide-react';

const DestinationDetail = () => {
    const { destinationName } = useParams();
    const navigate = useNavigate();

    // Comprehensive destination data
    const destinationsData = {
        'arugam-bay': {
            name: 'Arugam Bay',
            tagline: 'Surfer\'s Paradise',
            rating: 4.8,
            reviews: '2.5k',
            img: 'https://www.lankatourexperts.com/wp-content/uploads/2023/05/arugam-bay-travel-guide-lanka-tour-experts.webp',
            location: 'Eastern Province',
            bestTime: 'May - Sep',
            visitors: '200k/year',
            description: 'Arugam Bay is a moon-shaped curl of soft sand, considered the best surf spot in the country and one of the best in Asia. With its laid-back vibe, beachfront hammocks, and legendary point breaks, it attracts surfers and chill-seekers from around the globe.',
            highlights: [
                'World-class surf breaks',
                'Whiskey Point',
                'Lagoon Safari',
                'Muhudu Maha Viharaya',
                'Kumana National Park nearby'
            ],
            activities: ['Surfing', 'Lagoon Boat Ride', 'Yoga', 'Bird Watching', 'Beach Parties'],
            entryFee: 'Free',
            duration: '2-3 days recommended',
            difficulty: 'Easy to Challenging (Surfing)',
            tips: [
                'Bring your own surfboard if you\'re a pro',
                'Cash is king here',
                'Book accommodation in advance during peak season',
                'Try the local seafood'
            ],
            districtId: 16
        },
        'ella-rock': {
            name: 'Ella Rock',
            tagline: 'Scenic Mountain Trek',
            rating: 4.7,
            reviews: '1.5k',
            img: 'https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg',
            location: 'Uva Province',
            bestTime: 'Jan - Mar',
            visitors: '300k/year',
            description: 'Ella Rock is a popular hiking destination offering breathtaking views of the surrounding tea plantations, valleys, and mountains. The trek takes you through lush greenery, local villages, and railway tracks, culminating in spectacular 360-degree views from the summit.',
            highlights: [
                'Panoramic views of Ella Gap',
                'Tea plantation trails',
                'Railway track walking',
                'Sunrise and sunset viewpoints',
                'Local village experience'
            ],
            activities: ['Hiking', 'Photography', 'Bird Watching', 'Tea Tasting'],
            entryFee: 'Free',
            duration: '4-5 hours round trip',
            difficulty: 'Moderate to Challenging',
            tips: [
                'Hire a local guide for the best route',
                'Start at dawn for sunrise views',
                'Bring plenty of water and snacks',
                'Watch for trains when crossing tracks'
            ],
            districtId: 22
        },
        'mirissa-beach': {
            name: 'Mirissa Beach',
            tagline: 'Tropical Paradise',
            rating: 4.8,
            reviews: '3k',
            img: 'https://www.sagraphicslk.com/wp-content/uploads/2024/03/Mirissa-Beach-1024x683.jpg',
            location: 'Southern Province',
            bestTime: 'Nov - Apr',
            visitors: '450k/year',
            description: 'Mirissa is a stunning beach town on the southern coast of Sri Lanka, famous for its golden sandy beaches, turquoise waters, and whale watching opportunities. This laid-back paradise offers the perfect blend of relaxation and adventure.',
            highlights: [
                'Blue whale watching (Nov-Apr)',
                'Coconut Tree Hill viewpoint',
                'Secret Beach cove',
                'Surfing and snorkeling',
                'Fresh seafood restaurants'
            ],
            activities: ['Whale Watching', 'Surfing', 'Snorkeling', 'Beach Relaxation', 'Sunset Viewing'],
            entryFee: 'Free (beach access)',
            duration: 'Full day recommended',
            difficulty: 'Easy',
            tips: [
                'Book whale watching tours in advance',
                'Visit Coconut Tree Hill for sunset',
                'Try local seafood at beach restaurants',
                'Bring reef-safe sunscreen'
            ],
            districtId: 8
        },
        'adams-peak': {
            name: "Adam's Peak",
            tagline: "Sacred Mountain Pilgrimage",
            rating: 4.8,
            reviews: "3.2k",
            img: "https://www.urlauberinfos.com/urlaub-sri-lanka/sehenswuerdigkeiten/adamspeak.jpg",
            location: "Central Highlands",
            bestTime: "Dec - May",
            visitors: "2M+/year",
            description: "Adam's Peak (Sri Pada) is a 2,243m tall conical mountain located in central Sri Lanka. It is famous for the 'sacred footprint', a 1.8m rock formation near the summit. A holy pilgrimage site for Buddhists, Hindus, Muslims, and Christians, the climb offers a spiritual journey and breathtaking sunrise views.",
            highlights: [
                "Sacred Footprint (Sri Pada)",
                "Spectacular Sunrise (Ira Sewaya)",
                "6-7km Pilgrimage Trail",
                "Panoramic Mountain Views",
                "Diverse Wildlife & Flora"
            ],
            activities: ["Pilgrimage Trek", "Night Hiking", "Sunrise Viewing", "Photography", "Cultural Observation"],
            entryFee: "Free",
            duration: "5-7 hours round trip",
            difficulty: "Challenging (5500+ steps)",
            tips: [
                "Start your climb around 2 AM for sunrise",
                "Wear warm clothing for the summit",
                "Bring water and energy snacks",
                "Avoid weekends for fewer crowds",
                "Respect the religious significance"
            ],
            districtId: 6
        },
        'yala-national-park': {
            name: 'Yala National Park',
            tagline: 'Wildlife Safari Adventure',
            rating: 4.8,
            reviews: '1.8k',
            img: 'https://www.goyalasafari.com/image/slider/yala-slide/yala_nationalpark_slide1.jpg',
            location: 'Southern Province',
            bestTime: 'Feb - Jul',
            visitors: '400k/year',
            description: 'Yala National Park is Sri Lanka\'s most visited and second-largest national park, famous for having one of the highest leopard densities in the world. The park features diverse ecosystems from scrub jungle to lagoons, providing habitat for elephants, sloth bears, and over 200 bird species.',
            highlights: [
                'Highest leopard density in the world',
                'Asian elephant herds',
                'Sloth bears and crocodiles',
                'Over 200 bird species',
                'Ancient Buddhist sites within park'
            ],
            activities: ['Safari Tours', 'Wildlife Photography', 'Bird Watching', 'Nature Study'],
            entryFee: '$25-40 (safari package)',
            duration: '4-6 hours (half/full day safari)',
            difficulty: 'Easy (vehicle safari)',
            tips: [
                'Book safari early morning or late afternoon',
                'Bring binoculars and camera with zoom lens',
                'Wear neutral colored clothing',
                'Park closes during drought season (Sep-Oct)'
            ],
            districtId: 9
        },
        'nallur-kandaswamy-devasthanam': {
            name: 'Nallur Kandaswamy Devasthanam',
            tagline: 'Sacred Divine Temple',
            rating: 4.9,
            reviews: '3.5k',
            img: 'https://vedicsources.com/wp-content/uploads/2019/07/Nallur-Kandaswamy-temple.jpg',
            location: 'Jaffna',
            bestTime: 'Aug (Festival)',
            visitors: '1M+/year',
            description: 'The Nallur Kandaswamy Devasthanam is a historic Hindu temple complex in Jaffna, dedicated to Lord Murugan. Known for its Dravidian architecture, towering golden gopuram, and strict religious discipline, it is the most significant Hindu temple in Sri Lanka.',
            highlights: [
                'Golden Tower (Gopuram)',
                'Intricate Dravidian architecture',
                'Annual Nallur Festival',
                'Holy Pond',
                'Murugan Shrine'
            ],
            activities: ['Temple Worship', 'Cultural Observation', 'Photography (Exterior)', 'Festival Participation', 'Meditation'],
            entryFee: 'Free',
            duration: '1-2 hours',
            difficulty: 'Easy',
            tips: [
                'Men must enter bare-bodied',
                'Dress modestly (shoulders/knees covered)',
                'No photography inside',
                'Respect the silence and rituals',
                'Remove footwear before entering'
            ],
            districtId: 10
        }
    };

    const destination = destinationsData[destinationName] || destinationsData['arugam-bay'];
    const [nearbyHotels, setNearbyHotels] = useState([]);
    const [loadingHotels, setLoadingHotels] = useState(false);
    const [showHotels, setShowHotels] = useState(false);
    const hotelsSectionRef = useRef(null);

    useEffect(() => {
        if (showHotels && hotelsSectionRef.current) {
            hotelsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showHotels]);

    const fetchNearbyHotels = async () => {
        if (!destination.districtId) return;
        setLoadingHotels(true);
        setShowHotels(true);
        try {
            const response = await fetch(`/api/hotels/district/${destination.districtId}`);
            if (!response.ok) throw new Error('Failed to fetch hotels');
            const data = await response.json();
            setNearbyHotels(data);
        } catch (error) {
            console.error('Error fetching nearby hotels:', error);
            setNearbyHotels([]);
        } finally {
            setLoadingHotels(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        if (difficulty.includes('Easy')) return 'bg-green-100 text-green-700';
        if (difficulty.includes('Moderate')) return 'bg-amber-100 text-amber-700';
        return 'bg-red-100 text-red-700';
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/destinations')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Destinations
                </button>

                {/* Hero Section */}
                <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img
                        src={destination.img}
                        alt={destination.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-primary text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                                {destination.tagline}
                            </span>
                            <div className="flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full">
                                <Star size={16} fill="currentColor" />
                                <span className="font-black">{destination.rating}</span>
                                <span className="text-white/60">({destination.reviews} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-6xl font-black text-white tracking-tight">{destination.name}</h1>
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="font-medium">{destination.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={18} />
                                <span className="font-medium">{destination.visitors}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span className="font-medium">Best: {destination.bestTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-8 right-8 flex gap-3">
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                            <Heart size={20} />
                        </button>
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <DollarSign size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Entry Fee</p>
                        <p className="text-xl font-black text-gray-900">{destination.entryFee}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <Clock size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Duration</p>
                        <p className="text-xl font-black text-gray-900">{destination.duration}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <Mountain size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Difficulty</p>
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black ${getDifficultyColor(destination.difficulty)}`}>
                            {destination.difficulty}
                        </span>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <Thermometer size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Best Season</p>
                        <p className="text-xl font-black text-gray-900">{destination.bestTime}</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - Description & Highlights */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-4">About This Destination</h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">{destination.description}</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Highlights</h2>
                            <ul className="space-y-3">
                                {destination.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                        </div>
                                        <span className="text-gray-700 font-medium">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Travel Tips</h2>
                            <ul className="space-y-3">
                                {destination.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-primary font-black text-lg">•</span>
                                        <span className="text-gray-700 font-medium">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Activities & Booking */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-6">Activities</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {destination.activities.map((activity, i) => (
                                    <span key={i} className="px-4 py-2 bg-slate-50 text-gray-700 rounded-xl text-sm font-bold border border-gray-100">
                                        {activity}
                                    </span>
                                ))}
                            </div>

                            <button
                                onClick={() => navigate('/plan-trip')}
                                className="w-full bg-primary text-white font-black py-4 px-6 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 mb-3"
                            >
                                Plan Your Trip
                            </button>
                            <button
                                onClick={fetchNearbyHotels}
                                className={`w-full font-black py-4 px-6 rounded-2xl transition-all shadow-lg ${showHotels ? 'bg-primary text-white shadow-primary/25' : 'bg-slate-100 text-gray-700 hover:bg-slate-200'}`}
                            >
                                {loadingHotels ? 'Searching...' : 'Find Nearby Hotels'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nearby Hotels Display */}
                {showHotels && (
                    <div ref={hotelsSectionRef} id="nearby-hotels" className="animate-slide-up space-y-8 pt-12 border-t border-slate-100 mt-12">
                        <div className="flex items-center justify-between text-left">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2">Nearby Elite Accommodations</h2>
                                <p className="text-gray-500 font-medium">Curated luxury stays close to {destination.name}</p>
                            </div>
                            <button
                                onClick={() => setShowHotels(false)}
                                className="px-6 py-2 rounded-full border-2 border-slate-100 text-sm font-black text-gray-400 hover:text-primary hover:border-primary transition-all uppercase tracking-widest"
                            >
                                Close
                            </button>
                        </div>

                        {loadingHotels ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-6">
                                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-500 font-bold text-lg animate-pulse">Scouting premium stays...</p>
                            </div>
                        ) : nearbyHotels.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {nearbyHotels.map((hotel, idx) => (
                                    <div
                                        key={idx}
                                        className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer relative overflow-hidden"
                                        onClick={() => navigate(`/hotel/${hotel.hotel_name.toLowerCase().replace(/\s+/g, '-')}`)}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-xs font-black shadow-sm">
                                                ★ {hotel.rating}
                                            </div>
                                            {hotel.category && (
                                                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                                                    {hotel.category}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4 text-left">
                                            <h4 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">{hotel.hotel_name}</h4>
                                            <div className="flex items-center gap-2 text-gray-500 font-bold">
                                                <MapPin size={18} className="text-primary" />
                                                <span className="text-sm">{hotel.city}</span>
                                            </div>
                                            <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Standard Rate</p>
                                                    <p className="text-2xl font-black text-primary">
                                                        {hotel.price_range ? `LKR ${(() => {
                                                            const mapping = { '$': '5,000', '$$': '15,000', '$$$': '35,000', '$$$$': '60,000', '$$$$$': '120,000' };
                                                            return mapping[hotel.price_range] || '25,000';
                                                        })()}` : hotel.price ? `LKR ${hotel.price * 300}` : 'LKR 25,000'}
                                                    </p>
                                                </div>
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                                    <ArrowLeft size={22} className="rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-slate-50/50 rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-100">
                                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-premium">
                                    <MapPin size={40} className="text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3">No Premium Stays Indexed</h3>
                                <p className="text-gray-500 font-medium max-w-md mx-auto">We're currently expanding our database for this region. Please explore our general hotel listings for more options.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default DestinationDetail;
