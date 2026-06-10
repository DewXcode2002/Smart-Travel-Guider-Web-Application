import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Star, MapPin, Wifi, Wind, Coffee, Waves, Car, Utensils, Dumbbell, ArrowLeft, Calendar, Users, Check, X } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const HotelDetail = () => {
    const { hotelName } = useParams();
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    // Comprehensive hotel data
    const hotelsData = {
        'galle-face-hotel': {
            name: 'Galle Face Hotel',
            location: 'Colombo, Sri Lanka',
            price: 150,
            rating: 4.8,
            reviews: 1250,
            image: 'https://pix10.agoda.net/hotelImages/597/59737/59737_17061614220053737803.jpg?s=1024x768',
            gallery: [
                'https://www.myboutiquehotel.com/photos/118867/galle-face-hotel-lk-017-62516-2220x1400.jpg',
                'https://www.myboutiquehotel.com/photos/118867/galle-face-hotel-lk-014-62515-2220x1400.jpg',
                'https://www.myboutiquehotel.com/photos/118867/galle-face-hotel-lk-011-62514-2220x1400.jpg'
            ],
            description: 'Experience colonial elegance at Galle Face Hotel, a historic landmark overlooking the Indian Ocean. This iconic hotel has been welcoming guests since 1864, offering a perfect blend of heritage charm and modern luxury.',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'gym', 'parking'],
            features: [
                'Ocean-facing rooms with balconies',
                'Multiple dining options including fine dining',
                '24-hour room service',
                'Spa and wellness center',
                'Business center and meeting rooms',
                'Complimentary Wi-Fi throughout'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Free cancellation up to 24 hours before check-in',
                children: 'Children of all ages welcome',
                pets: 'Pets not allowed'
            }
        },
        'heritance-kandalama': {
            name: 'Heritance Kandalama',
            location: 'Dambulla, Sri Lanka',
            price: 220,
            rating: 4.9,
            reviews: 850,
            image: 'https://mysrilankaholidays.com/hotelguide/wp-content/uploads/2009/04/Heritance-Kandalama-Hotel-Sri-Lanka-Holidays.jpg',
            gallery: [
                'https://www.myboutiquehotel.com/photos/113791/heritance-kandalama-sigiriya-002-72093-1110x700.jpg',
                'https://www.remotelands.com/storage/media/1114/conversions/b130716023-banner-size.jpg',
                'https://www.uniqhotels.com/media/hotels/36/kandalama-hotel-07.jpg'
            ],
            description: 'Designed by renowned architect Geoffrey Bawa, Heritance Kandalama is a masterpiece that seamlessly blends with nature. Perched on a rock outcrop, this eco-friendly resort offers stunning views of the Kandalama Lake and surrounding jungle.',
            amenities: ['wifi', 'pool', 'restaurant', 'ac', 'gym'],
            features: [
                'Infinity pool overlooking the jungle',
                'Award-winning architecture',
                'Ayurvedic spa treatments',
                'Bird watching and nature trails',
                'Multiple restaurants with local and international cuisine',
                'Eco-friendly sustainable practices'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '11:00 AM',
                cancellation: 'Free cancellation up to 48 hours before check-in',
                children: 'Children above 12 years welcome',
                pets: 'Pets not allowed'
            }
        },
        'jetwing-lighthouse': {
            name: 'Jetwing Lighthouse',
            location: 'Galle, Sri Lanka',
            price: 180,
            rating: 4.7,
            reviews: 920,
            image: 'https://static.prod.r53.tablethotels.com/media/hotels/slideshow_images_staged/large/1375745.jpg',
            gallery: [
                'https://www.beyondsenses.de/wp-content/uploads/2018/08/Jetwing_Lighthouse_Maharaja_Suite_1.jpg',
                'https://www.eatchillwander.com/wp-content/uploads/2020/04/jetwing-lighthouse-hotel-galle-srilanka41.jpg',
                'https://www.jetwinghotels.com/jetwinglighthouse/wp-content/uploads/sites/24/2020/10/luxury-room-main-wing-1920x656.jpg'
            ],
            description: 'Another Geoffrey Bawa masterpiece, Jetwing Lighthouse sits on a clifftop overlooking the Indian Ocean near historic Galle Fort. This boutique hotel offers contemporary luxury with breathtaking ocean views.',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym'],
            features: [
                'Clifftop infinity pool',
                'Direct beach access',
                'Fine dining restaurant',
                'Spa with ocean views',
                'Close to Galle Fort UNESCO site',
                'Sunset cocktail bar'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Free cancellation up to 24 hours before check-in',
                children: 'Children of all ages welcome',
                pets: 'Pets not allowed'
            }
        },
        'cinnamon-grand': {
            name: 'Cinnamon Grand',
            location: 'Colombo, Sri Lanka',
            price: 195,
            rating: 4.6,
            reviews: 1100,
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/9d/51/dd/cinnamon-grand-main-entrance.jpg?w=900&h=-1&s=1',
            gallery: [
                'https://products.tboacademy.com/cinnamon/images/hotel1.jpg',
                'https://www.yamu.lk/wp-content/uploads/2021/12/cinnamon-g.jpeg',
                'https://www.bestoflanka.com/images/recommended-stays-sri-lanka/stay-in-capitol-colombo-sri-lanka/cinnamon_grand/05.jpg'
            ],
            description: 'Experience world-class service at Cinnamon Grand Colombo, located in the heart of the city. With diverse dining options and luxurious amenities, it is the perfect choice for business and leisure travelers alike.',
            amenities: ['wifi', 'ac', 'restaurant', 'gym', 'pool'],
            features: [
                'Multiple specialty restaurants',
                'Grand ballroom and meeting spaces',
                'Angsana Spa and health club',
                'Proximity to major shopping malls',
                'Outdoor swimming pool'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Free cancellation up to 24 hours before check-in',
                children: 'Children of all ages welcome',
                pets: 'Pets not allowed'
            }
        },
        'shangri-la-colombo': {
            name: 'Shangri-La Colombo',
            location: 'Colombo, Sri Lanka',
            price: 280,
            rating: 4.9,
            reviews: 980,
            image: 'https://images.luxuryescapes.com/q_auto:good/wtbg8r24pvha0mpats',
            gallery: [
                'https://media.architecturaldigest.in/wp-content/uploads/2018/06/Shangri-La-Colombo-Sri-Lanka-lobby-daylight-A.jpg',
                'https://i.pinimg.com/originals/7f/10/da/7f10daeb520db790501062c42ed6d992.jpg',
                'https://www.kayak.com/rimg/himg/1c/f3/a3/ice-122765996-60497686_3XL-942362.jpg?width=1366&height=768&crop=true'
            ],
            description: 'Luxuriate in the elegance of Shangri-La Colombo, offering unparalleled views of the Indian Ocean and the city skyline. This premier hotel sets a new standard for luxury in Sri Lanka.',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'gym'],
            features: [
                'Ocean-view rooms and suites',
                'CHI, The Spa',
                'Signature restaurants and bars',
                'Adjacent to One Galle Face Mall',
                'Horizon Club lounge'
            ],
            policies: {
                checkIn: '3:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'See specific room policy',
                children: 'Children welcome',
                pets: 'Pets not allowed'
            }
        },
        'amangalla': {
            name: 'Amangalla',
            location: 'Galle, Sri Lanka',
            price: 350,
            rating: 4.9,
            reviews: 650,
            image: 'https://www.bambootravel.co.uk/files/img_cache/60786/1400__1589227707_amangalla_sri_lanka_-_exterior_high_res_4478.jpg?1589227769',
            gallery: [
                'https://rohithasperera.com/wp-content/uploads/2024/07/image-1.png',
                'https://www.aman.com/sites/default/files/2022-03/Amangalla-2022-gallery-5.jpg',
                'https://www.telegraph.co.uk/content/dam/Travel/hotels/asia/sri-lanka/amangalla-sri-lanka-pool.jpg'
            ],
            description: 'Set within the historic Galle Fort, Amangalla is a serene sanctuary reflecting the heritage of this UNESCO World Heritage Site. Experience timeless grace in a setting of unmatched beauty.',
            amenities: ['wifi', 'ac', 'restaurant', 'pool'],
            features: [
                'Historic building with colonial charm',
                'The Zaal - iconic Great Hall',
                'Traditional Ayurvedic treatments',
                'Located in the heart of Galle Fort',
                'Verandah overlooking the fort'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Free cancellation up to 72 hours before check-in',
                children: 'Children welcome',
                pets: 'Pets not allowed'
            }
        },
        'tri-lanka-villa': {
            name: 'Tri Lanka Villa',
            location: 'Koggala, Sri Lanka',
            price: 450,
            rating: 4.9,
            reviews: 320,
            image: 'https://expressions-images.imgix.net/destination/sri-lanka/galle-and-south-coast/tri-lanka-exh1885/tri-lanka-sri-lanka-villa-exterior.jpg?w=741&h=434&fit=crop&crop=entropy&auto=format,compress,enhance',
            gallery: [
                'https://www.beyondsenses.de/wp-content/uploads/2018/08/Tri_Koggala_Sri_Lanka_Spezialist_Zimmer_Family_Villa_2.jpg'
            ],
            description: 'A sustainable luxury hotel on Koggala Lake, Tri offers an exceptional balance of style, nature, and wellness. Each suite is designed with precision to offer panoramic lake views.',
            amenities: ['wifi', 'pool', 'restaurant', 'ac'],
            features: [
                'Lake-view infinity pool',
                'Sustainable design philosophy',
                'Ayurvedic spa and wellness',
                'Yoga pavilion',
                'Organic dining experience'
            ],
            policies: {
                checkIn: '3:00 PM',
                checkOut: '11:00 AM',
                cancellation: '72-hour cancellation policy',
                children: 'Adult-oriented resort',
                pets: 'Pets not allowed'
            }
        },
        'cape-weligama': {
            name: 'Cape Weligama',
            location: 'Weligama, Sri Lanka',
            price: 520,
            rating: 4.8,
            reviews: 280,
            image: 'https://www.andbeyond.com/wp-content/uploads/sites/5/Arieal-Cape-Weligama.jpg',
            gallery: [
                'https://cdn.luxuo.com/2014/12/Cape-Weligama-Sri-Lanka.jpg'
            ],
            description: 'Inhabiting 12 pristine acres on a dramatic clifftop, Cape Weligama is a spectacular sanctuary overlooking the shimmering Indian Ocean. A collection of villas and suites await.',
            amenities: ['wifi', 'ac', 'pool', 'restaurant'],
            features: [
                'Crescent infinity pool',
                'Clifftop dining experience',
                'Private butler service',
                'Whale watching excursions',
                'Marine center and diving'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Varies by season',
                children: 'Families welcome',
                pets: 'Pets not allowed'
            }
        },
        'amanwella': {
            name: 'Amanwella',
            location: 'Tangalle, Sri Lanka',
            price: 600,
            rating: 4.9,
            reviews: 210,
            image: 'https://www.travelplusstyle.com/wp-content/gallery/amanwella/rs1798_amanwella-swimming-pool-lpr.jpg',
            gallery: [
                'https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2018/06/IMG_6484.jpg?ssl=1'
            ],
            description: 'Amanwella is a beach-side resort in Tangalle, Sri Lanka, celebrating the country\'s tropical modernist architecture. This secluded retreat offers a peaceful escape with minimalist design.',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym'],
            features: [
                'Private plunge pools',
                'Direct access to a secluded beach',
                'Open-air dining with ocean views',
                'Library and wellness center',
                'Whale watching and nature tours'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Varies per booking',
                children: 'Welcome',
                pets: 'Pets not allowed'
            }
        },
        'clock-inn-colombo': {
            name: 'Clock Inn Colombo',
            location: 'Colombo, Sri Lanka',
            price: 25,
            rating: 4.5,
            reviews: 890,
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145076874.jpg?k=6aecab0f22ec9bd081658947f4cc9d0bdfe6d6c8fe03b000befc36b14a89e2ff&o=&hp=1',
            gallery: [
                'https://dev2.uplist.lk/wp-content/uploads/2022/08/92586727-1.jpg'
            ],
            description: 'Clock Inn Colombo is a budget-friendly hostel located in the heart of the city, offering clean and comfortable dormitory and private rooms for travelers.',
            amenities: ['wifi', 'restaurant'],
            features: [
                'Central city location',
                'Lounge and social area',
                'Travel desk and info',
                'Safe and secure environment',
                'Rooftop hangout space'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '11:00 AM',
                cancellation: '24-hour notice',
                children: '18+ for dorms',
                pets: 'Pets not allowed'
            }
        },
        'hangover-hostels-ella': {
            name: 'Hangover Hostels Ella',
            location: 'Ella, Sri Lanka',
            price: 18,
            rating: 4.6,
            reviews: 1200,
            image: 'https://hostelgeeks.com/wp-content/uploads/2023/02/Hangover-Hostels-Ella-.jpg',
            gallery: [
                'https://hangoverhostels.lk/wp-content/uploads/2024/02/hangoverhostels-ella2335-scaled.jpg'
            ],
            description: 'Vibrant and social hostel in Ella, perfect for backpackers looking to explore the mountains and waterfalls of the Uva Province.',
            amenities: ['wifi', 'restaurant'],
            features: [
                'Social events and pub crawls',
                'Near Ella Town and Railway Station',
                'Mountain views',
                'communal kitchen',
                'Outdoor terrace'
            ],
            policies: {
                checkIn: '1:00 PM',
                checkOut: '10:00 AM',
                cancellation: 'Flexible',
                children: '18+ for dorms',
                pets: 'Pets not allowed'
            }
        },
        'zostel-galle': {
            name: 'Zostel Galle',
            location: 'Galle, Sri Lanka',
            price: 22,
            rating: 4.4,
            reviews: 750,
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/12/20151900/Zostel-Pondicherry-809x455.jpg',
            gallery: [
                'https://cf.bstatic.com/xdata/images/hotel/max1024x768/508040898.jpg?k=7fa0c0aa3388783cec6eb583201b9674e1211823b2b5caaad6370293fb3fd746&o=&hp=1'
            ],
            description: 'Experience the bohemian vibe of Galle at Zostel, a community-driven hostel that blends vibrant art with seaside relaxation.',
            amenities: ['wifi', 'ac'],
            features: [
                'Artistic and vibrant interiors',
                'Close to the beach',
                'Common rooms with games',
                'Group activities and workshops',
                'Safe lockers available'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '11:00 AM',
                cancellation: 'Non-refundable if cancelled late',
                children: '18+ policy',
                pets: 'Pets not allowed'
            }
        }
    };

    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const response = await fetch(`/api/hotels/search/name/${hotelName}`);
                if (!response.ok) throw new Error('Hotel not found');
                const data = await response.json();

                // Parse amenities string to array if needed
                if (data.amenities && typeof data.amenities === 'string') {
                    data.amenities = data.amenities.split(',').map(a => a.trim());
                } else if (!data.amenities) {
                    data.amenities = [];
                }

                // Check if we have curated data for this hotel slug
                const staticHotel = hotelsData[hotelName];

                // Map DB fields to component fields
                const mappedHotel = {
                    ...data,
                    name: data.hotel_name,
                    location: `${data.city}, Sri Lanka`,
                    price: data.price_range ? mapPriceRangeToValue(data.price_range) : 100,
                    // Prioritize curated image if available
                    image: staticHotel?.image || data.img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200',
                    gallery: staticHotel?.gallery || [
                        data.img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'
                    ],
                    // Prioritize curated description
                    description: staticHotel?.description || data.description || 'Experience comfort and luxury in this beautifully appointed hotel, ideally situated to offer you the best of the region.',
                    features: staticHotel?.features || [
                        'Luxury accommodations',
                        'Expert service and hospitality',
                        'Prime location for exploration',
                        'Modern facilities and decor'
                    ],
                    policies: staticHotel?.policies || {
                        checkIn: '2:00 PM',
                        checkOut: '12:00 PM',
                        cancellation: 'Free cancellation up to 24 hours before check-in',
                        children: 'Children of all ages welcome',
                        pets: 'Pets not allowed'
                    }
                };
                setHotel(mappedHotel);
            } catch (error) {
                console.error('Error fetching hotel:', error);
                // Fallback to static data if not found in DB
                const staticHotel = hotelsData[hotelName];
                if (staticHotel) {
                    setHotel(staticHotel);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHotelData();
    }, [hotelName]);

    const mapPriceRangeToValue = (range) => {
        const mapping = {
            '$': 25,
            '$$': 50,
            '$$$': 100,
            '$$$$': 200,
            '$$$$$': 450
        };
        return mapping[range] || 100;
    };

    const getAmenityIcon = (amenity) => {
        const key = amenity.toLowerCase().replace(/\s+/g, '');
        const icons = {
            wifi: { icon: <Wifi size={20} />, label: 'Free Wi-Fi' },
            freewifi: { icon: <Wifi size={20} />, label: 'Free Wi-Fi' },
            ac: { icon: <Wind size={20} />, label: 'Air Conditioning' },
            airconditioning: { icon: <Wind size={20} />, label: 'Air Conditioning' },
            restaurant: { icon: <Utensils size={20} />, label: 'Restaurant' },
            pool: { icon: <Waves size={20} />, label: 'Swimming Pool' },
            swimmingpool: { icon: <Waves size={20} />, label: 'Swimming Pool' },
            gym: { icon: <Dumbbell size={20} />, label: 'Fitness Center' },
            fitnesscenter: { icon: <Dumbbell size={20} />, label: 'Fitness Center' },
            parking: { icon: <Car size={20} />, label: 'Free Parking' },
            freeparking: { icon: <Car size={20} />, label: 'Free Parking' },
            spa: { icon: <Waves size={20} />, label: 'Spa & Wellness' }
        };
        return icons[key] || { icon: <Coffee size={20} />, label: amenity };
    };

    const handleBooking = () => {
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates');
            return;
        }
        // Navigate to plan trip with hotel details
        navigate('/plan-trip', { state: { hotel: hotel.name, checkIn, checkOut, guests } });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-bold">Loading hotel details...</p>
                </div>
            </MainLayout>
        );
    }

    if (!hotel) {
        return (
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                        <X size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">Hotel Not Found</h2>
                    <button onClick={() => navigate('/hotels')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
                        Back to Hotels
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/hotels')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Hotels
                </button>

                {/* Hero Image */}
                <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12 space-y-4">
                        <h1 className="text-6xl font-black text-white tracking-tight">{hotel.name}</h1>
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="font-medium">{hotel.location}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full">
                                <Star size={16} fill="currentColor" />
                                <span className="font-black">{hotel.rating}</span>
                                <span className="text-white/60">({hotel.reviews} reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-3 gap-4">
                    {hotel.gallery.map((img, i) => (
                        <div key={i} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-4">About This Property</h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">{hotel.description}</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {hotel.amenities.map((amenity, i) => {
                                    const { icon, label } = getAmenityIcon(amenity);
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                                {icon}
                                            </div>
                                            <span className="font-bold text-gray-700">{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Features</h2>
                            <ul className="space-y-3">
                                {hotel.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check size={14} className="text-green-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Policies</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-black text-gray-900 mb-2">Check-in / Check-out</h3>
                                    <p className="text-gray-600 font-medium">Check-in: {hotel.policies.checkIn} | Check-out: {hotel.policies.checkOut}</p>
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 mb-2">Cancellation</h3>
                                    <p className="text-gray-600 font-medium">{hotel.policies.cancellation}</p>
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 mb-2">Children & Pets</h3>
                                    <p className="text-gray-600 font-medium">{hotel.policies.children}</p>
                                    <p className="text-gray-600 font-medium">{hotel.policies.pets}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg sticky top-8">
                            <div className="mb-6">
                                <PriceDisplay amount={hotel.price} from="USD" className="text-4xl text-gray-900" />
                                <span className="text-gray-400 font-bold ml-2">/ night</span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2">Check-in</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2">Check-out</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-gray-700 mb-2">Guests</label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none font-medium appearance-none"
                                        >
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full bg-primary text-white font-black py-4 px-6 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 mb-3"
                            >
                                Book Now
                            </button>
                            <p className="text-center text-xs text-gray-400 font-medium">You won't be charged yet</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default HotelDetail;
