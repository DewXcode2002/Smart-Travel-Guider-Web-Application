import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Star, MapPin, Wifi, Wind, Coffee, Waves, Car, Utensils, Dumbbell, ArrowLeft, Calendar, Users, Check, X, Phone, Mail, MessageSquare, CheckCircle2, Sparkles, CreditCard, ShieldCheck, Clock } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const HotelDetail = () => {
    const { hotelName } = useParams();
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    // Instant Hotel Booking Modal state
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [specialRequests, setSpecialRequests] = useState('');
    const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

    // Direct Contact Modal state
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactStarRating, setContactStarRating] = useState(5);
    const [contactFeedback, setContactFeedback] = useState('');
    const [contactUnlocked, setContactUnlocked] = useState(false);

    const getHotelContact = (hotelObj) => {
        if (!hotelObj) return { phone: '+94 11 254 1010', email: 'information@gallefacehotel.net', whatsapp: 'https://wa.me/94112541010' };
        const hotelContacts = {
            'Shangri-La Colombo': { phone: '+94 11 788 8288', email: 'slcb.reservations@shangri-la.com' },
            'Cinnamon Grand Colombo': { phone: '+94 11 243 7437', email: 'grand.res@cinnamonhotels.com' },
            'Galle Face Hotel': { phone: '+94 11 254 1010', email: 'information@gallefacehotel.net' },
            'Cinnamon Red Colombo': { phone: '+94 11 214 5145', email: 'red.res@cinnamonhotels.com' },
            'Clock Inn Colombo': { phone: '+94 11 250 8260', email: 'colombo@clockinn.lk' },
            'Jetwing Beach Negombo': { phone: '+94 31 227 3500', email: 'resv.beach@jetwinghotels.com' },
            'Jetwing Blue Negombo': { phone: '+94 31 227 9000', email: 'resv.blue@jetwinghotels.com' },
            'Camelot Beach Hotel': { phone: '+94 31 223 3369', email: 'info@camelot.lk' },
            'Anantara Kalutara Resort': { phone: '+94 34 222 0222', email: 'kalutara.resort@anantara.com' },
            'Avani Kalutara Resort': { phone: '+94 34 492 2222', email: 'kalutara@avanihotels.com' },
            'Cinnamon Citadel Kandy': { phone: '+94 81 223 4365', email: 'citadel.res@cinnamonhotels.com' },
            "Earl's Regency Kandy": { phone: '+94 81 242 2122', email: 'resv@aitkenspence.lk' },
            'Kandy City Stay': { phone: '+94 81 220 2200', email: 'info@kandycitystay.com' },
            'Heritance Kandalama': { phone: '+94 66 555 5000', email: 'kandalama@heritancehotels.com' },
            'Hotel Sigiriya': { phone: '+94 66 228 6821', email: 'resv.sigiriya@serendibleisure.com' },
            'Grand Hotel Nuwara Eliya': { phone: '+94 52 222 2881', email: 'info@grandhotel.lk' },
            "Jetwing St. Andrew's": { phone: '+94 52 222 2241', email: 'resv.standrews@jetwinghotels.com' },
            'Amangalla': { phone: '+94 91 223 4000', email: 'amangalla@aman.com' },
            'Jetwing Lighthouse': { phone: '+94 91 222 3744', email: 'resv.lighthouse@jetwinghotels.com' },
            'Tamarind Hill Galle': { phone: '+94 91 222 6800', email: 'reservations@tamarindhill.lk' },
            'Zostel Galle': { phone: '+94 91 438 0500', email: 'galle@zostel.com' },
            'Cape Weligama': { phone: '+94 41 740 0000', email: 'reservations@resplendentceylon.com' },
            'Mandara Resort Mirissa': { phone: '+94 41 225 3999', email: 'info@mandararesort.com' },
            'Anantara Peace Haven Tangalle': { phone: '+94 47 748 8888', email: 'tangalle@anantara.com' },
            'Jetwing Yala': { phone: '+94 47 223 9444', email: 'resv.yala@jetwinghotels.com' },
            'Jetwing Jaffna': { phone: '+94 21 211 7100', email: 'resv.jaffna@jetwinghotels.com' },
            'Jaffna Heritage Hotel': { phone: '+94 21 222 1222', email: 'info@jaffnaheritage.com' },
            'The Thinnai Jaffna': { phone: '+94 21 203 0400', email: 'reservations@thethinnai.com' },
            'Iranamadu Heritage Resort': { phone: '+94 21 228 5000', email: 'info@iranamaduheritage.lk' },
            'Shell Coast Resort Mannar': { phone: '+94 23 222 3000', email: 'reservations@shellcoastmannar.lk' },
            'Hotel Birunthavan': { phone: '+94 24 222 2555', email: 'info@birunthavanhotel.com' },
            'Maritimepattu Beach Lodge': { phone: '+94 21 229 0100', email: 'info@maritimepattulodge.lk' },
            'Amaya Beach Pasikuda': { phone: '+94 65 205 0000', email: 'reservations@amayabeach.com' },
            'Sunrise by Jetwing Pasikuda': { phone: '+94 65 205 0800', email: 'resv.sunrise@jetwinghotels.com' },
            'Jetwing Surf Arugam Bay': { phone: '+94 63 205 0000', email: 'resv.surf@jetwinghotels.com' },
            'Hideaway Resort Arugam Bay': { phone: '+94 63 224 8246', email: 'info@hideawayarugambay.com' },
            'Uga Jungle Beach Trincomalee': { phone: '+94 26 225 1000', email: 'junglebeach@ugaescapes.com' },
            'Trinco Blu by Cinnamon': { phone: '+94 26 222 2307', email: 'trincoblu.res@cinnamonhotels.com' },
            'Elephant Rock Hotel Kurunegala': { phone: '+94 37 222 4100', email: 'info@elephantrockhotel.lk' },
            'Bar Reef Resort Kalpitiya': { phone: '+94 32 226 0500', email: 'info@barreefresort.com' },
            'Ulagalla by Uga Escapes': { phone: '+94 25 205 0000', email: 'ulagalla@ugaescapes.com' },
            'Palm Garden Village Hotel': { phone: '+94 25 222 3961', email: 'palmgarden@sltnet.lk' },
            'Ekho Lake House Polonnaruwa': { phone: '+94 27 222 2222', email: 'lakehouse@ekhohotels.com' },
            'Hotel Sudu Araliya': { phone: '+94 27 222 2011', email: 'info@hotelsuduaraliya.com' },
            '98 Acres Resort & Spa Ella': { phone: '+94 57 205 0050', email: 'info@resort98acres.com' },
            '98 Acres Resort & Spa': { phone: '+94 57 205 0050', email: 'info@resort98acres.com' },
            'Melheim Resort Haputale': { phone: '+94 57 226 8055', email: 'info@melheimresorts.com' },
            'Hangover Hostels Ella': { phone: '+94 57 222 8800', email: 'ella@hangoverhostels.com' },
            'Mandara Rosen Kataragama': { phone: '+94 47 223 5220', email: 'info@mandararosen.com' },
            'Centauria Hill Resort': { phone: '+94 45 222 2844', email: 'centauriahill@sltnet.lk' },
            'Elephant Bay Hotel Pinnawala': { phone: '+94 35 226 6755', email: 'info@elephantbayhotel.com' }
        };
        const found = hotelContacts[hotelObj.name] || {
            phone: hotelObj.contact_number || '+94 11 254 1010',
            email: hotelObj.email || `info@${hotelObj.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
        };
        const waNumber = found.phone.replace(/[^0-9]/g, '');
        return {
            phone: found.phone,
            email: found.email,
            whatsapp: `https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(hotelObj.name)},%20I%20would%20like%20to%20inquire%20about%20room%20availability%20via%20Smart%20Travel%20Guider.`
        };
    };

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
            image: 'https://www.myboutiquehotel.com/photos/113791/heritance-kandalama-sigiriya-002-72093-1110x700.jpg',
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
        'jaffna-heritage-hotel': {
            name: 'Jaffna Heritage Hotel',
            location: 'Jaffna, Sri Lanka',
            price: 110,
            rating: 4.7,
            reviews: 430,
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/33054198.jpg?k=b4e3347b59b1faeb7c53d0e98031575e92750e38680bc9b37a3bd4755106190f&o=&hp=1',
            gallery: [
                'https://cf.bstatic.com/xdata/images/hotel/max1024x768/33054198.jpg?k=b4e3347b59b1faeb7c53d0e98031575e92750e38680bc9b37a3bd4755106190f&o=&hp=1',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
            ],
            description: 'Situated in the sacred cultural heart of Nallur, Jaffna Heritage Hotel offers a peaceful sanctuary with traditional Tamil-colonial hospitality, a sparkling outdoor pool, and authentic pure vegetarian cuisine near the Nallur Kovil.',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'parking'],
            features: [
                'Traditional Tamil-colonial architecture',
                'Pure vegetarian heritage restaurant',
                'Outdoor swimming pool and garden',
                'Walking distance to Nallur Kandaswamy Kovil',
                'Cultural tour desk & transport services'
            ],
            policies: {
                checkIn: '2:00 PM',
                checkOut: '12:00 PM',
                cancellation: 'Free cancellation up to 24 hours before check-in',
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
            alert('Please select both check-in and check-out dates first.');
            return;
        }
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        setGuestName(`${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || 'Valued Guest');
        setGuestPhone(currentUser.phone || '+94 77 123 4567');
        setShowBookingModal(true);
    };

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to complete your hotel booking.');
            navigate('/login');
            return;
        }

        setIsSubmittingBooking(true);
        const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
        const totalPrice = hotel.price * nights;

        try {
            const res = await fetch('/api/bookings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    item_type: 'hotel',
                    item_id: hotel.hotel_id || hotel.id || 1,
                    item_name: hotel.name,
                    start_date: checkIn,
                    end_date: checkOut,
                    total_price: totalPrice,
                    notes: `Guests: ${guests} | Name: ${guestName} | Contact: ${guestPhone} | Payment: ${paymentMethod} | Special: ${specialRequests}`
                })
            });

            if (res.ok) {
                setShowBookingModal(false);
                alert(`🎉 Booking Confirmed! Your reservation for ${hotel.name} (${nights} night${nights > 1 ? 's' : ''}) has been successfully saved to your account.`);
                navigate('/bookings');
            } else {
                const err = await res.json();
                alert(`Booking failed: ${err.message || 'Server error'}`);
            }
        } catch (error) {
            console.error('Booking submission error:', error);
            alert('Booking failed due to network error.');
        } finally {
            setIsSubmittingBooking(false);
        }
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

                            <div className="space-y-3 mb-3">
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-primary text-white font-black py-4 px-6 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25"
                                >
                                    Book Now
                                </button>

                                <button
                                    onClick={() => {
                                        setShowContactModal(true);
                                        setContactUnlocked(false);
                                        setContactStarRating(5);
                                        setContactFeedback('');
                                    }}
                                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all"
                                >
                                    <Phone size={16} /> Direct Contact Hotel
                                </button>
                            </div>
                            <p className="text-center text-xs text-gray-400 font-medium">Instant direct phone & email support available</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Direct Contact Modal */}
            {showContactModal && hotel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] border border-white/20 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30 inline-flex items-center gap-1 mb-2">
                                    <Sparkles size={12} /> Direct Contact Unlock
                                </span>
                                <h3 className="text-2xl font-black tracking-tight">{hotel.name}</h3>
                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <MapPin size={12} className="text-amber-400" /> {hotel.location}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowContactModal(false)}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {!contactUnlocked ? (
                            <div className="space-y-4 bg-white/5 border border-white/10 p-5 rounded-2xl">
                                <div className="text-center space-y-1">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-amber-300">Rate Platform Experience</h4>
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
                                    placeholder="Optional note (e.g. Great luxury stays!)..."
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
                                                    item_type: 'hotel',
                                                    item_id: hotel.hotel_id || hotel.id || null,
                                                    item_name: hotel.name,
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
                        ) : (() => {
                            const contactInfo = getHotelContact(hotel);
                            return (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-emerald-300 text-xs font-bold">
                                        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                                        <span>Rating submitted ({contactStarRating}★)! Direct channels unlocked.</span>
                                    </div>

                                    <div className="space-y-3">
                                        <a
                                            href={`tel:${contactInfo.phone}`}
                                            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Call Direct Reception</span>
                                                    <span className="text-sm font-bold text-white">{contactInfo.phone}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Call Now →</span>
                                        </a>

                                        <a
                                            href={contactInfo.whatsapp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                                                    <MessageSquare size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">WhatsApp Reservations</span>
                                                    <span className="text-sm font-bold text-white">Chat on WhatsApp</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-teal-400 uppercase tracking-wider">Open Chat →</span>
                                        </a>

                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                                    <Mail size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Email Reservations</span>
                                                    <span className="text-sm font-bold text-white truncate max-w-[200px] block">{contactInfo.email}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-black text-blue-400 uppercase tracking-wider">Send Email →</span>
                                        </a>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* Instant Hotel Booking Modal */}
            {showBookingModal && hotel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 text-white rounded-[2.5rem] border border-white/20 p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-primary/20 text-primary-light text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/30 inline-flex items-center gap-1 mb-2">
                                    <ShieldCheck size={12} /> Instant Hotel Reservation
                                </span>
                                <h3 className="text-2xl font-black tracking-tight">{hotel.name}</h3>
                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <MapPin size={12} className="text-amber-400" /> {hotel.location}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Booking Summary Box */}
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">Check-In</span>
                                    <span className="font-black text-white text-sm">{checkIn}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">Check-Out</span>
                                    <span className="font-black text-white text-sm">{checkOut}</span>
                                </div>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-300 font-medium">Rate per night</span>
                                <span className="font-bold text-white">${hotel.price} USD</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-300 font-medium">Nights & Guests</span>
                                <span className="font-bold text-white">
                                    {Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))} Night(s) • {guests} Guest(s)
                                </span>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-black uppercase tracking-wider text-amber-300">Total Price</span>
                                <span className="text-2xl font-black text-emerald-400">
                                    ${hotel.price * Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))} USD
                                </span>
                            </div>
                        </div>

                        {/* Guest Details Form */}
                        <form onSubmit={handleConfirmBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-1">Lead Guest Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-1">Contact Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    value={guestPhone}
                                    onChange={(e) => setGuestPhone(e.target.value)}
                                    placeholder="+94 77 123 4567"
                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary font-medium"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-1">Payment Guarantee Method</label>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-primary font-medium cursor-pointer"
                                >
                                    <option value="credit_card">💳 Credit Card (Instant Guarantee)</option>
                                    <option value="debit_card">💳 Debit Card</option>
                                    <option value="paypal">🌐 PayPal</option>
                                    <option value="bank_transfer">🏦 Direct Bank Transfer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-1">Special Requests (Optional)</label>
                                <input
                                    type="text"
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    placeholder="e.g. High floor, airport pickup..."
                                    className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-primary font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmittingBooking}
                                className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-hover hover:to-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmittingBooking ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing Reservation...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={16} /> Confirm & Reserve Hotel Now
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
};

export default HotelDetail;
