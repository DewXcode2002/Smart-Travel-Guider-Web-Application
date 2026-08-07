import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Wind, Coffee, Waves, Car, Utensils, Dumbbell, Search, Filter, Building2, ChevronDown, Check, Phone, Mail, MessageSquare, CheckCircle2, X, Sparkles } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const Hotels = () => {
    const navigate = useNavigate();
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', '5star', 'middle', 'budget'
    const [activeType, setActiveType] = useState('all'); // 'all', 'hotels', 'villas', 'hostels'
    const [searchQuery, setSearchQuery] = useState('');
    const [districtsList, setDistrictsList] = useState([]);

    // Direct Contact Modal state
    const [contactModal, setContactModal] = useState(null);
    const [contactStarRating, setContactStarRating] = useState(5);
    const [contactFeedback, setContactFeedback] = useState('');
    const [contactUnlocked, setContactUnlocked] = useState(false);

    const getHotelContact = (hotel) => {
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

        const found = hotelContacts[hotel.name] || {
            phone: hotel.contact_number || '+94 11 254 1010',
            email: hotel.email || `info@${hotel.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
        };

        const waNumber = found.phone.replace(/[^0-9]/g, '');
        return {
            phone: found.phone,
            email: found.email,
            whatsapp: `https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(hotel.name)},%20I%20would%20like%20to%20inquire%20about%20room%20availability%20via%20Smart%20Travel%20Guider.`
        };
    };

    // 25 Districts of Sri Lanka list fallback
    const allDistricts = [
        'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
        'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
        'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
        'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
        'Monaragala', 'Ratnapura', 'Kegalle'
    ];

    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const response = await fetch('/api/districts');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setDistrictsList(data.map(d => d.district_name));
                    }
                }
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };
        fetchDistricts();
    }, []);

    const districts = districtsList.length > 0 ? districtsList : allDistricts;

    // Comprehensive accommodations database across all 25 districts
    const accommodationsData = [
        // COLOMBO
        {
            id: 1,
            name: 'Shangri-La Colombo',
            district: 'Colombo',
            city: 'Colombo 02',
            price: 280,
            rating: 4.9,
            reviews: 980,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://images.luxuryescapes.com/q_auto:good/wtbg8r24pvha0mpats',
            tag: '5-Star Luxury',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'gym']
        },
        {
            id: 2,
            name: 'Cinnamon Grand Colombo',
            district: 'Colombo',
            city: 'Colombo 03',
            price: 195,
            rating: 4.8,
            reviews: 1100,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://d18slle4wlf9ku.cloudfront.net/www.cinnamonhotels.com-1302818674/cms/cache/v2/66bd61ab411ad.jpg/1920x1080/fit/80/e025f0c5fa81a93236d946f06d436f9c.jpg',
            tag: '5-Star Luxury',
            amenities: ['wifi', 'ac', 'restaurant', 'gym', 'pool']
        },
        {
            id: 3,
            name: 'Galle Face Hotel',
            district: 'Colombo',
            city: 'Colombo 03',
            price: 150,
            rating: 4.7,
            reviews: 1250,
            category: 'middle',
            categoryLabel: 'Middle Class / Heritage',
            type: 'hotels',
            image: 'https://4.bp.blogspot.com/-u1smN3ygCXY/UmEa75T4UrI/AAAAAAAAASM/hL7VAIHeOmM/s1600/galle_face_hotel.jpg',
            tag: 'Heritage 4-Star',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'parking']
        },
        {
            id: 4,
            name: 'Cinnamon Red Colombo',
            district: 'Colombo',
            city: 'Colombo 03',
            price: 90,
            rating: 4.5,
            reviews: 820,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://pix10.agoda.net/hotelImages/677327/-1/788876c4ea6b25ea325d2c2069bfa467.jpg?ca=9&ce=1&s=1024x768',
            tag: '3-Star Modern',
            amenities: ['wifi', 'ac', 'restaurant', 'pool']
        },
        {
            id: 5,
            name: 'Clock Inn Colombo',
            district: 'Colombo',
            city: 'Colombo 03',
            price: 25,
            rating: 4.4,
            reviews: 890,
            category: 'budget',
            categoryLabel: 'Budget / Hostel',
            type: 'hostels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/145076874.jpg?k=6aecab0f22ec9bd081658947f4cc9d0bdfe6d6c8fe03b000befc36b14a89e2ff&o=&hp=1',
            tag: 'Budget Hostel',
            amenities: ['wifi', 'restaurant']
        },

        // GAMPAHA
        {
            id: 6,
            name: 'Jetwing Beach Negombo',
            district: 'Gampaha',
            city: 'Negombo',
            price: 210,
            rating: 4.8,
            reviews: 740,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/18257007.jpg?k=66a33aefdb195e26bf4c6e94e433f39a4897f2620a2e79fa6dd9f83a45c22501&o=&hp=1',
            tag: '5-Star Beach',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 7,
            name: 'Jetwing Blue Negombo',
            district: 'Gampaha',
            city: 'Negombo',
            price: 140,
            rating: 4.6,
            reviews: 650,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/18256247.jpg?k=4241c7b3cae432c6686aa01e9d1bf7623910c2e3dddfd06b83f3e1b12b5fb0e1&o=&hp=1',
            tag: '4-Star Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 8,
            name: 'Camelot Beach Hotel',
            district: 'Gampaha',
            city: 'Negombo',
            price: 45,
            rating: 4.3,
            reviews: 320,
            category: 'budget',
            categoryLabel: 'Budget',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/49156689.jpg?k=31cbddaa19b0d2d3a95be7ff8e3e4a2d8a43ef37f68c347f89d380e227f27ef5&o=&hp=1',
            tag: 'Budget Beach',
            amenities: ['wifi', 'ac', 'pool']
        },

        // KALUTARA
        {
            id: 9,
            name: 'Anantara Kalutara Resort',
            district: 'Kalutara',
            city: 'Kalutara',
            price: 260,
            rating: 4.9,
            reviews: 610,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'villas',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/84511082.jpg?k=a8d810237c1a85116aa60c49bcbf07e4719c8f0015b672722b406e2329bd2a21&o=&hp=1',
            tag: '5-Star Luxury',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 10,
            name: 'Avani Kalutara Resort',
            district: 'Kalutara',
            city: 'Kalutara',
            price: 130,
            rating: 4.6,
            reviews: 480,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47387063.jpg?k=b83dd61026048d067c2957973059ef8bbcfb66d8e874972e2cfc216c52a0a2df&o=&hp=1',
            tag: '4-Star Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // KANDY
        {
            id: 11,
            name: 'Cinnamon Citadel Kandy',
            district: 'Kandy',
            city: 'Kandy',
            price: 180,
            rating: 4.8,
            reviews: 950,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/15079633.jpg?k=8e411b518df41999e078ea43ce0ee03ed11efc6ec519c2356c9a3e5c7075c3db&o=&hp=1',
            tag: '5-Star Riverfront',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 12,
            name: "Earl's Regency Kandy",
            district: 'Kandy',
            city: 'Kandy',
            price: 135,
            rating: 4.6,
            reviews: 840,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://pix10.agoda.net/hotelImages/443/4436/4436_17032917540051980838.jpg?s=1024x768',
            tag: '4-Star Luxury',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 13,
            name: 'Kandy City Stay',
            district: 'Kandy',
            city: 'Kandy Center',
            price: 35,
            rating: 4.4,
            reviews: 290,
            category: 'budget',
            categoryLabel: 'Budget',
            type: 'hostels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/228186178.jpg?k=c5ecf0ed4d53860bb4f31c8eb1ceb0439c2863959bc2cb4fbfbd6fbcbf6cb5dd&o=&hp=1',
            tag: 'Budget Stay',
            amenities: ['wifi', 'ac']
        },

        // MATALE (Sigiriya / Dambulla)
        {
            id: 14,
            name: 'Heritance Kandalama',
            district: 'Matale',
            city: 'Dambulla',
            price: 220,
            rating: 4.9,
            reviews: 850,
            category: '5star',
            categoryLabel: '5-Star Eco Luxury',
            type: 'hotels',
            image: 'https://www.myboutiquehotel.com/photos/113791/heritance-kandalama-sigiriya-002-72093-1110x700.jpg',
            tag: '5-Star Eco',
            amenities: ['wifi', 'pool', 'restaurant', 'gym']
        },
        {
            id: 15,
            name: 'Hotel Sigiriya',
            district: 'Matale',
            city: 'Sigiriya',
            price: 110,
            rating: 4.6,
            reviews: 620,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/15077271.jpg?k=42f4c1e40562e6e300d8fc143714b2d56a2bb52bbef3d537f59d57a911a37cfa&o=&hp=1',
            tag: '4-Star View',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // NUWARA ELIYA
        {
            id: 16,
            name: 'Grand Hotel Nuwara Eliya',
            district: 'Nuwara Eliya',
            city: 'Nuwara Eliya',
            price: 240,
            rating: 4.9,
            reviews: 1120,
            category: '5star',
            categoryLabel: '5-Star Colonial',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/27532398.jpg?k=42dbb9e289bf6b9b3e100344d932ef919cf629bb72efd02a0a2dfa03ab0e9a59&o=&hp=1',
            tag: 'Heritage 5-Star',
            amenities: ['wifi', 'ac', 'restaurant', 'parking', 'gym']
        },
        {
            id: 17,
            name: "Jetwing St. Andrew's",
            district: 'Nuwara Eliya',
            city: 'Nuwara Eliya',
            price: 150,
            rating: 4.7,
            reviews: 730,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/18256515.jpg?k=9fb1074e23114d6fb35cb96e95c1c045b6db2aa75a5e3b97b0a3ef56e50f3b7d&o=&hp=1',
            tag: 'Colonial 4-Star',
            amenities: ['wifi', 'restaurant', 'parking']
        },

        // GALLE
        {
            id: 18,
            name: 'Amangalla',
            district: 'Galle',
            city: 'Galle Fort',
            price: 350,
            rating: 4.9,
            reviews: 650,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://www.aman.com/sites/default/files/2023-10/amangalla-exterior.jpg',
            tag: '5-Star Heritage',
            amenities: ['wifi', 'ac', 'restaurant', 'pool']
        },
        {
            id: 19,
            name: 'Jetwing Lighthouse',
            district: 'Galle',
            city: 'Galle',
            price: 180,
            rating: 4.7,
            reviews: 920,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://www.eatchillwander.com/wp-content/uploads/2020/04/jetwing-lighthouse-hotel-galle-srilanka43.jpg',
            tag: '5-Star Clifftop',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 20,
            name: 'Tamarind Hill Galle',
            district: 'Galle',
            city: 'Galle',
            price: 140,
            rating: 4.6,
            reviews: 410,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            tag: 'Boutique 4-Star',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 21,
            name: 'Zostel Galle',
            district: 'Galle',
            city: 'Galle Fort',
            price: 22,
            rating: 4.4,
            reviews: 750,
            category: 'budget',
            categoryLabel: 'Budget / Hostel',
            type: 'hostels',
            image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/12/20151900/Zostel-Pondicherry-809x455.jpg',
            tag: 'Budget Hostel',
            amenities: ['wifi', 'ac']
        },

        // MATARA
        {
            id: 22,
            name: 'Cape Weligama',
            district: 'Matara',
            city: 'Weligama',
            price: 520,
            rating: 4.9,
            reviews: 280,
            category: '5star',
            categoryLabel: '5-Star Villa Resort',
            type: 'villas',
            image: 'https://smartflyercdn.s3.amazonaws.com/wp-content/uploads/20230509143148/Cape-Weligama-Large107.jpg',
            tag: 'Ultra Luxury Villa',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 23,
            name: 'Mandara Resort Mirissa',
            district: 'Matara',
            city: 'Mirissa',
            price: 130,
            rating: 4.6,
            reviews: 510,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Beach Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // HAMBANTOTA
        {
            id: 24,
            name: 'Anantara Peace Haven Tangalle',
            district: 'Hambantota',
            city: 'Tangalle',
            price: 340,
            rating: 4.9,
            reviews: 820,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=800',
            tag: '5-Star Ocean Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 25,
            name: 'Jetwing Yala',
            district: 'Hambantota',
            city: 'Yala',
            price: 170,
            rating: 4.7,
            reviews: 690,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&q=80&w=800',
            tag: 'Safari 4-Star',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // JAFFNA
        {
            id: 26,
            name: 'Jetwing Jaffna',
            district: 'Jaffna',
            city: 'Jaffna Town',
            price: 170,
            rating: 4.8,
            reviews: 580,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
            tag: '5-Star City Hotel',
            amenities: ['wifi', 'ac', 'restaurant', 'gym']
        },
        {
            id: 27,
            name: 'Jaffna Heritage Hotel',
            district: 'Jaffna',
            city: 'Nallur, Jaffna',
            price: 110,
            rating: 4.7,
            reviews: 430,
            category: 'middle',
            categoryLabel: 'Middle Class / Heritage',
            type: 'hotels',
            image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/33054198.jpg?k=b4e3347b59b1faeb7c53d0e98031575e92750e38680bc9b37a3bd4755106190f&o=&hp=1',
            tag: 'Heritage 4-Star',
            amenities: ['wifi', 'ac', 'restaurant', 'pool', 'parking']
        },
        {
            id: 28,
            name: 'The Thinnai Jaffna',
            district: 'Jaffna',
            city: 'Jaffna',
            price: 125,
            rating: 4.6,
            reviews: 380,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            tag: 'All-Suite Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // KILINOCHCHI
        {
            id: 29,
            name: 'Iranamadu Heritage Resort',
            district: 'Kilinochchi',
            city: 'Iranamadu',
            price: 60,
            rating: 4.4,
            reviews: 140,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1588257833075-514b87e22026?auto=format&fit=crop&q=80&w=800',
            tag: 'Eco Resort',
            amenities: ['wifi', 'ac', 'restaurant']
        },

        // MANNAR
        {
            id: 30,
            name: 'Shell Coast Resort Mannar',
            district: 'Mannar',
            city: 'Mannar Island',
            price: 65,
            rating: 4.3,
            reviews: 190,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            tag: 'Coastal Resort',
            amenities: ['wifi', 'ac', 'restaurant']
        },

        // VAVUNIYA
        {
            id: 31,
            name: 'Hotel Birunthavan',
            district: 'Vavuniya',
            city: 'Vavuniya',
            price: 55,
            rating: 4.3,
            reviews: 210,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
            tag: 'Standard Hotel',
            amenities: ['wifi', 'ac', 'restaurant']
        },

        // MULLAITIVU
        {
            id: 32,
            name: 'Maritimepattu Beach Lodge',
            district: 'Mullaitivu',
            city: 'Mullaitivu Coast',
            price: 50,
            rating: 4.2,
            reviews: 95,
            category: 'budget',
            categoryLabel: 'Budget',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&q=80&w=800',
            tag: 'Beach Lodge',
            amenities: ['wifi', 'restaurant']
        },

        // BATTICALOA
        {
            id: 33,
            name: 'Amaya Beach Pasikuda',
            district: 'Batticaloa',
            city: 'Pasikuda',
            price: 210,
            rating: 4.8,
            reviews: 790,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
            tag: '5-Star Beach Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 34,
            name: 'Sunrise by Jetwing Pasikuda',
            district: 'Batticaloa',
            city: 'Pasikuda',
            price: 135,
            rating: 4.6,
            reviews: 460,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // AMPARA
        {
            id: 35,
            name: 'Jetwing Surf Arugam Bay',
            district: 'Ampara',
            city: 'Arugam Bay',
            price: 240,
            rating: 4.9,
            reviews: 520,
            category: '5star',
            categoryLabel: '5-Star Luxury Cabanas',
            type: 'villas',
            image: 'https://www.royalbeacharugambay.com/wp-content/uploads/2018/06/31486864_2092393800812074_7238967897651937280_o.jpg',
            tag: 'Eco Luxury Surf',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },
        {
            id: 36,
            name: 'Hideaway Resort Arugam Bay',
            district: 'Ampara',
            city: 'Arugam Bay',
            price: 120,
            rating: 4.7,
            reviews: 680,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
            tag: 'Boutique Surf Resort',
            amenities: ['wifi', 'pool', 'restaurant']
        },

        // TRINCOMALEE
        {
            id: 37,
            name: 'Uga Jungle Beach Trincomalee',
            district: 'Trincomalee',
            city: 'Kuchchaveli',
            price: 280,
            rating: 4.9,
            reviews: 810,
            category: '5star',
            categoryLabel: '5-Star Luxury',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
            tag: '5-Star Jungle Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 38,
            name: 'Trinco Blu by Cinnamon',
            district: 'Trincomalee',
            city: 'Trincomalee',
            price: 130,
            rating: 4.6,
            reviews: 940,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Beach Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // KURUNEGALA
        {
            id: 39,
            name: 'Elephant Rock Hotel Kurunegala',
            district: 'Kurunegala',
            city: 'Kurunegala',
            price: 70,
            rating: 4.4,
            reviews: 240,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
            tag: 'City Hotel',
            amenities: ['wifi', 'ac', 'restaurant']
        },

        // PUTTALAM
        {
            id: 40,
            name: 'Bar Reef Resort Kalpitiya',
            district: 'Puttalam',
            city: 'Kalpitiya',
            price: 140,
            rating: 4.6,
            reviews: 310,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
            tag: 'Kite Surfing Resort',
            amenities: ['wifi', 'pool', 'restaurant']
        },

        // ANURADHAPURA
        {
            id: 41,
            name: 'Ulagalla by Uga Escapes',
            district: 'Anuradhapura',
            city: 'Thirappane',
            price: 350,
            rating: 4.9,
            reviews: 730,
            category: '5star',
            categoryLabel: '5-Star Eco Villa',
            type: 'villas',
            image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=800',
            tag: 'Ultra Luxury Estate',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 42,
            name: 'Palm Garden Village Hotel',
            district: 'Anuradhapura',
            city: 'Anuradhapura',
            price: 110,
            rating: 4.5,
            reviews: 610,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Village Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // POLONNARUWA
        {
            id: 43,
            name: 'Ekho Lake House Polonnaruwa',
            district: 'Polonnaruwa',
            city: 'Polonnaruwa',
            price: 200,
            rating: 4.8,
            reviews: 540,
            category: '5star',
            categoryLabel: '5-Star Heritage',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
            tag: 'Lakefront Heritage',
            amenities: ['wifi', 'ac', 'restaurant', 'pool']
        },
        {
            id: 44,
            name: 'Hotel Sudu Araliya',
            district: 'Polonnaruwa',
            city: 'Polonnaruwa',
            price: 95,
            rating: 4.5,
            reviews: 420,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Lake Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // BADULLA (Ella / Haputale)
        {
            id: 45,
            name: '98 Acres Resort & Spa Ella',
            district: 'Badulla',
            city: 'Ella',
            price: 290,
            rating: 4.9,
            reviews: 1450,
            category: '5star',
            categoryLabel: '5-Star Mountain Resort',
            type: 'villas',
            image: 'https://www.lankatourexperts.com/wp-content/uploads/2023/12/Ella-rock-sunrise.webp',
            tag: '5-Star Mountain Luxury',
            amenities: ['wifi', 'ac', 'pool', 'restaurant', 'gym']
        },
        {
            id: 46,
            name: 'Melheim Resort Haputale',
            district: 'Badulla',
            city: 'Haputale',
            price: 130,
            rating: 4.7,
            reviews: 610,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1588257833075-514b87e22026?auto=format&fit=crop&q=80&w=800',
            tag: 'Cliffside Boutique',
            amenities: ['wifi', 'ac', 'restaurant']
        },
        {
            id: 47,
            name: 'Hangover Hostels Ella',
            district: 'Badulla',
            city: 'Ella',
            price: 18,
            rating: 4.6,
            reviews: 1200,
            category: 'budget',
            categoryLabel: 'Budget / Hostel',
            type: 'hostels',
            image: 'https://hostelgeeks.com/wp-content/uploads/2023/02/Hangover-Hostels-Ella-.jpg',
            tag: 'Popular Hostel',
            amenities: ['wifi', 'restaurant']
        },

        // MONARAGALA
        {
            id: 48,
            name: 'Mandara Rosen Kataragama',
            district: 'Monaragala',
            city: 'Kataragama',
            price: 90,
            rating: 4.5,
            reviews: 350,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
            tag: '4-Star Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // RATNAPURA
        {
            id: 49,
            name: 'Centauria Hill Resort',
            district: 'Ratnapura',
            city: 'Ratnapura',
            price: 85,
            rating: 4.4,
            reviews: 280,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1542384661-3959fe41a66a?auto=format&fit=crop&q=80&w=800',
            tag: 'Hilltop Resort',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        },

        // KEGALLE
        {
            id: 50,
            name: 'Elephant Bay Hotel Pinnawala',
            district: 'Kegalle',
            city: 'Pinnawala',
            price: 95,
            rating: 4.6,
            reviews: 790,
            category: 'middle',
            categoryLabel: 'Middle Class',
            type: 'hotels',
            image: 'https://images.unsplash.com/photo-1534732806146-b3bf32171b48?auto=format&fit=crop&q=80&w=800',
            tag: 'Riverview Hotel',
            amenities: ['wifi', 'ac', 'pool', 'restaurant']
        }
    ];

    const getAmenityIcon = (amenity) => {
        const icons = {
            wifi: <Wifi size={18} />,
            ac: <Wind size={18} />,
            restaurant: <Utensils size={18} />,
            pool: <Waves size={18} />,
            gym: <Dumbbell size={18} />,
            parking: <Car size={18} />
        };
        return icons[amenity] || <Coffee size={18} />;
    };

    // Filter Logic
    const filteredAccommodations = accommodationsData.filter(item => {
        // District filter
        const matchesDistrict = selectedDistrict === 'all' || item.district.toLowerCase() === selectedDistrict.toLowerCase();

        // Star category filter
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

        // Property type filter
        const matchesType = activeType === 'all' || item.type === activeType;

        // Search text
        const matchesSearch = searchQuery === '' ||
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesDistrict && matchesCategory && matchesType && matchesSearch;
    });

    const getSlug = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <MainLayout>
            <div className="space-y-12 animate-fade-in pb-20">
                {/* Header Title Section */}
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-slate-100 pb-10">
                    <div className="space-y-4">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                            Sri Lanka Islandwide Stay
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Find Your <span className="text-gradient">Sanctuary</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg max-w-2xl">
                            Explore hotels across all 25 districts of Sri Lanka, categorized from 5-Star Luxury Estates to Middle-Class & Budget accommodations.
                        </p>
                    </div>

                    {/* Property Type Tabs */}
                    <div className="flex bg-slate-100/70 p-1.5 rounded-[2rem] shadow-inner border border-slate-200/60 w-full lg:w-auto backdrop-blur-sm">
                        {[
                            { id: 'all', label: 'All Stays' },
                            { id: 'hotels', label: 'Hotels' },
                            { id: 'villas', label: 'Villas' },
                            { id: 'hostels', label: 'Hostels' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveType(tab.id)}
                                className={`px-6 py-3 font-black text-xs uppercase tracking-wider rounded-[1.5rem] transition-all ${
                                    activeType === tab.id
                                        ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                                        : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Filter Controls Card */}
                <div className="glass p-6 sm:p-8 rounded-[3rem] shadow-premium border border-white/60 space-y-6 bg-white/90">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        {/* District Selector Dropdown */}
                        <div className="md:col-span-5 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <MapPin size={14} className="text-primary" /> Filter by District (25 Districts)
                            </label>
                            <div className="relative group">
                                <select
                                    value={selectedDistrict}
                                    onChange={(e) => setSelectedDistrict(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-4 pl-5 pr-12 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-gray-900 text-base appearance-none shadow-sm cursor-pointer transition-all"
                                >
                                    <option value="all">📍 All 25 Districts (Whole Island)</option>
                                    {districts.map(dist => (
                                        <option key={dist} value={dist}>
                                            📍 {dist} District
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        {/* Search Input Bar */}
                        <div className="md:col-span-7 space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 ml-1">
                                <Search size={14} className="text-primary" /> Search Accommodation
                            </label>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                    <Search size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by hotel name, town, or feature..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none font-bold text-gray-900 text-base shadow-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hotel Category / Star Tier Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest shrink-0">
                            <Filter size={14} className="text-primary" /> Star Rating / Class:
                        </div>
                        <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                            {[
                                { id: 'all', label: 'All Classes' },
                                { id: '5star', label: '⭐ 5-Star Luxury' },
                                { id: 'middle', label: '🏨 Middle Class (3-4 Star)' },
                                { id: 'budget', label: '💵 Budget & Hostels' }
                            ].map(cat => {
                                const isSelected = selectedCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-sm ${
                                            isSelected
                                                ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
                                                : 'bg-slate-100/90 text-gray-600 hover:bg-slate-200/80 hover:text-gray-900'
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Filter Summary Status */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
                    <div className="text-gray-600 font-bold text-sm">
                        Showing <span className="text-primary font-black">{filteredAccommodations.length}</span> accommodations
                        {selectedDistrict !== 'all' && <span> in <span className="text-gray-900 font-black">{selectedDistrict} District</span></span>}
                        {selectedCategory !== 'all' && <span> ({selectedCategory === '5star' ? '5-Star Luxury' : selectedCategory === 'middle' ? 'Middle Class' : 'Budget'})</span>}
                    </div>

                    {(selectedDistrict !== 'all' || selectedCategory !== 'all' || searchQuery !== '' || activeType !== 'all') && (
                        <button
                            onClick={() => {
                                setSelectedDistrict('all');
                                setSelectedCategory('all');
                                setActiveType('all');
                                setSearchQuery('');
                            }}
                            className="text-xs font-black text-rose-500 hover:text-rose-600 uppercase tracking-wider bg-rose-50 px-4 py-2 rounded-xl border border-rose-100 transition-all"
                        >
                            Reset All Filters 🔄
                        </button>
                    )}
                </div>

                {/* Accommodations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
                    {filteredAccommodations.map((hotel, index) => (
                        <div
                            key={hotel.id}
                            className="glass rounded-[3rem] overflow-hidden border border-white/60 shadow-premium hover:shadow-hover transition-all group animate-slide-in flex flex-col bg-white"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Image Banner */}
                            <div className="relative h-72 overflow-hidden bg-slate-100">
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200';
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                                {/* District Badge */}
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg border border-white/20">
                                        📍 {hotel.district} District
                                    </span>
                                    {hotel.tag && (
                                        <span className="bg-white/95 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-primary shadow-lg border border-white">
                                            {hotel.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Wishlist Star */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); alert(`Saved ${hotel.name} to wishlist!`); }}
                                    className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-amber-500 hover:scale-110 active:scale-95 transition-all shadow-xl"
                                >
                                    <Star size={20} className={hotel.rating >= 4.8 ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>

                                {/* Location & Hotel Title overlay */}
                                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                                    <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-300">
                                        <MapPin size={14} /> {hotel.city}, {hotel.district}
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight leading-snug drop-shadow-md">{hotel.name}</h3>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 sm:p-7 space-y-6 flex-1 flex flex-col justify-between">
                                <div className="space-y-4">
                                    {/* Amenities & Ratings */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                                                <div key={idx} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gray-500 group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-sm">
                                                    {getAmenityIcon(amenity)}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 font-black text-amber-500 justify-end">
                                                <Star size={16} fill="currentColor" />
                                                <span className="text-base">{hotel.rating}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">{hotel.reviews} Reviews</span>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-slate-100"></div>
                                </div>

                                {/* Price and Action Buttons */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="min-w-0 flex-1">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Price Per Night</span>
                                            <div className="flex items-baseline gap-1 flex-wrap">
                                                <PriceDisplay amount={hotel.price} from="USD" className="text-2xl sm:text-3xl font-black text-gray-900" />
                                                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider whitespace-nowrap">/ Night</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <button
                                            onClick={() => {
                                                const contact = getHotelContact(hotel);
                                                setContactModal({ ...hotel, ...contact });
                                                setContactUnlocked(false);
                                                setContactStarRating(5);
                                                setContactFeedback('');
                                            }}
                                            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-[11px] uppercase tracking-wider rounded-2xl flex items-center justify-center gap-1.5 shadow-lg transition-all"
                                        >
                                            <Phone size={14} /> Direct Contact
                                        </button>
                                        <button
                                            onClick={() => navigate(`/hotel/${getSlug(hotel.name)}`)}
                                            className="w-full py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider rounded-2xl hover:bg-primary transition-all shadow-lg text-center"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredAccommodations.length === 0 && (
                    <div className="text-center py-24 glass rounded-[3rem] border-2 border-dashed border-slate-200 bg-white">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300 mb-4">
                            <Building2 size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">No accommodations found</h3>
                        <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8 text-sm">
                            We couldn't find any properties matching your current filter criteria in {selectedDistrict !== 'all' ? selectedDistrict + ' District' : 'this category'}.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedDistrict('all');
                                setSelectedCategory('all');
                                setActiveType('all');
                                setSearchQuery('');
                            }}
                            className="bg-primary text-white font-black py-3.5 px-8 rounded-2xl shadow-xl shadow-primary/25 hover:scale-105 transition-all text-xs uppercase tracking-wider"
                        >
                            Reset Filters
                        </button>
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
                                    <Sparkles size={12} /> Direct Contact Unlock
                                </span>
                                <h3 className="text-2xl font-black tracking-tight">{contactModal.name}</h3>
                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1">
                                    <MapPin size={12} className="text-amber-400" /> {contactModal.city}, {contactModal.district} District
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
                                    placeholder="Optional note (e.g. Great hotel choices!)..."
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
                                                    item_id: contactModal.id || null,
                                                    item_name: contactModal.name,
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
                                    <span>Rating submitted ({contactStarRating}★)! Direct channels unlocked.</span>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href={`tel:${contactModal.phone}`}
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Call Direct Reception</span>
                                                <span className="text-sm font-bold text-white">{contactModal.phone}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Call Now →</span>
                                    </a>

                                    <a
                                        href={contactModal.whatsapp}
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
                                        href={`mailto:${contactModal.email}`}
                                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-between border border-white/10 transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block">Email Reservations</span>
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

export default Hotels;
