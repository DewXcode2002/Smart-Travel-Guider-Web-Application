import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Star, MapPin, Calendar, Users, Clock, DollarSign, Thermometer, Camera, Mountain, Waves, Building, ArrowLeft, Heart, Share2 } from 'lucide-react';

const DestinationDetail = () => {
    const { destinationName } = useParams();
    const navigate = useNavigate();

    // Comprehensive destination data with curated location-matched nearby hotels
    const destinationsData = {
        'sigiriya-rock-fortress': {
            name: 'Sigiriya Rock Fortress',
            tagline: 'Ancient Palace in the Sky',
            rating: 4.9,
            reviews: '4.8k',
            img: '/sigiriya_rock_fortress.jpg',
            location: 'Central Province (Matale District)',
            bestTime: 'Jan - Apr',
            visitors: '1.2M+/year',
            description: 'Sigiriya, also known as the Lion Rock, is an ancient rock fortress and UNESCO World Heritage site located near Dambulla. Rising nearly 200 meters above the jungle, it features historic frescoes, water gardens, and the famous Mirror Wall.',
            highlights: ['Lions Paws Entrance', 'Ancient Frescoes', 'Mirror Wall', 'Water Gardens', 'Summit Palace Ruins'],
            activities: ['Rock Climbing', 'Historical Exploration', 'Photography', 'Garden Walks'],
            entryFee: '$30 Foreigners / Rs. 100 Locals',
            duration: '3-4 hours',
            difficulty: 'Moderate (1200 steps)',
            tips: ['Start early around 7 AM to avoid heat', 'Wear comfortable walking shoes', 'Stay hydrated'],
            districtId: 3,
            nearbyHotels: [
                { hotel_name: 'Heritance Kandalama', city: 'Dambulla / Sigiriya', rating: 4.9, category: '5-Star Eco Resort', price: 145, price_range: '$$$$' },
                { hotel_name: 'Hotel Sigiriya', city: 'Sigiriya', rating: 4.7, category: 'Heritage Rock View', price: 90, price_range: '$$$' },
                { hotel_name: 'Aliya Resort & Spa', city: 'Sigiriya', rating: 4.8, category: 'Luxury Safari Resort', price: 110, price_range: '$$$$' },
                { hotel_name: 'Water Garden Sigiriya', city: 'Sigiriya', rating: 4.9, category: 'Luxury Private Villa', price: 270, price_range: '$$$$$' }
            ]
        },
        'nine-arch-bridge': {
            name: 'Nine Arch Bridge',
            tagline: 'Bridge in the Sky',
            rating: 4.9,
            reviews: '3.9k',
            img: 'https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg',
            location: 'Uva Province (Badulla District - Ella)',
            bestTime: 'Dec - Mar',
            visitors: '850k/year',
            description: 'The Nine Arch Bridge in Ella is an architectural marvel of colonial-era railway construction in Sri Lanka, surrounded by dense jungle and tea fields.',
            highlights: ['Blue Train Crossing', 'Colonial Viaduct Architecture', 'Panoramic Tea Valley Views'],
            activities: ['Train Watching', 'Photography', 'Tea Plantation Walks', 'Café Chilling'],
            entryFee: 'Free',
            duration: '2 hours',
            difficulty: 'Easy to Moderate Walk',
            tips: ['Check blue train passing schedule in advance', 'Walk along the track side paths safely'],
            districtId: 22,
            nearbyHotels: [
                { hotel_name: '98 Acres Resort & Spa', city: 'Ella', rating: 4.9, category: '5-Star Luxury Eco Resort', price: 220, price_range: '$$$$' },
                { hotel_name: 'Mount Breeze Ella', city: 'Ella', rating: 4.6, category: 'Boutique Mountain Stay', price: 60, price_range: '$$' },
                { hotel_name: 'Zion View Ella Green Retreat', city: 'Ella', rating: 4.7, category: 'Panorama View Hotel', price: 70, price_range: '$$$' },
                { hotel_name: 'Hangover Hostels Ella', city: 'Ella', rating: 4.5, category: 'Budget Backpacker Hostel', price: 16, price_range: '$' }
            ]
        },
        'galle-fort-&-lighthouse': {
            name: 'Galle Fort & Lighthouse',
            tagline: 'Dutch Heritage Fortress',
            rating: 4.8,
            reviews: '3.6k',
            img: '/galle_fort_lighthouse.jpg',
            location: 'Southern Province (Galle District)',
            bestTime: 'Nov - Apr',
            visitors: '900k/year',
            description: 'Galle Fort is a UNESCO World Heritage site built by the Portuguese and fortified by the Dutch. It combines cobblestone streets, Dutch colonial buildings, boutique stores, cafes, and iconic ramparts facing the Indian Ocean.',
            highlights: ['White Galle Lighthouse', 'Ramparts Sunset Walk', 'Dutch Reformed Church', 'Pedlar Street Shops'],
            activities: ['Heritage Walk', 'Shopping', 'Sunset Watching', 'Dining'],
            entryFee: 'Free',
            duration: 'Half Day',
            difficulty: 'Easy',
            tips: ['Walk on the ramparts around 5 PM for sunset', 'Explore boutique jewelry & craft shops'],
            districtId: 7,
            nearbyHotels: [
                { hotel_name: 'Amangalla Galle Fort', city: 'Galle Fort', rating: 4.9, category: '5-Star Heritage Luxury', price: 480, price_range: '$$$$$' },
                { hotel_name: 'Le Grand Galle', city: 'Galle', rating: 4.8, category: '5-Star Oceanfront Resort', price: 175, price_range: '$$$$' },
                { hotel_name: 'Fort Bazaar Galle', city: 'Galle Fort', rating: 4.8, category: 'Merchant House Boutique', price: 135, price_range: '$$$$' },
                { hotel_name: 'Zostel Galle', city: 'Galle Fort', rating: 4.5, category: 'Boutique Hostel', price: 20, price_range: '$' }
            ]
        },
        'temple-of-the-sacred-tooth-relic': {
            name: 'Temple of the Sacred Tooth Relic',
            tagline: 'Sacred Buddhist Shrine',
            rating: 4.9,
            reviews: '5.2k',
            img: '/temple_of_tooth.jpg',
            location: 'Central Province (Kandy District)',
            bestTime: 'Year-round (Aug Festival)',
            visitors: '2M+/year',
            description: 'The Temple of the Sacred Tooth Relic (Sri Dalada Maligawa) houses the sacred tooth relic of Lord Buddha in the Royal Palace complex of the ancient Kingdom of Kandy.',
            highlights: ['Gold Canopy Shrine', 'Royal Palace Complex', 'Kandy Esala Perahera Procession', 'Kandy Lake View'],
            activities: ['Pooja Rituals Observation', 'Museum Exploration', 'Lake Walk'],
            entryFee: 'Rs. 2000 Foreigners / Free Locals',
            duration: '2 hours',
            difficulty: 'Easy',
            tips: ['Dress respectfully with shoulders and knees covered', 'Remove shoes at entrance'],
            districtId: 4,
            nearbyHotels: [
                { hotel_name: "Earl's Regency Kandy", city: 'Kandy', rating: 4.8, category: '5-Star Luxury Resort', price: 120, price_range: '$$$$' },
                { hotel_name: 'Cinnamon Citadel Kandy', city: 'Kandy', rating: 4.7, category: 'Mahaweli River Resort', price: 90, price_range: '$$$' },
                { hotel_name: 'The Grand Kandyan', city: 'Kandy', rating: 4.8, category: 'Luxury Hilltop Hotel', price: 110, price_range: '$$$$' },
                { hotel_name: 'Radisson Hotel Kandy', city: 'Kandy', rating: 4.6, category: 'City View Hotel', price: 75, price_range: '$$$' }
            ]
        },
        'nuwara-eliya-&-gregory-lake': {
            name: 'Nuwara Eliya & Gregory Lake',
            tagline: 'Little England of Sri Lanka',
            rating: 4.7,
            reviews: '2.9k',
            img: '/nuwara_eliya_gregory_lake.jpg',
            location: 'Central Province (Nuwara Eliya District)',
            bestTime: 'Mar - May, Aug - Sep',
            visitors: '600k/year',
            description: 'Nuwara Eliya is a misty mountain city nestled in tea-covered hills, known for its cool climate, colonial architecture, botanical gardens, and scenic Gregory Lake.',
            highlights: ['Gregory Lake Jet Ski & Boating', 'Pedro Tea Estate', 'Victoria Park', 'Post Office Colonial Building'],
            activities: ['Speed Boating', 'Horse Riding', 'Tea Factory Tour', 'Strawberry Tasting'],
            entryFee: 'Nominal park fees',
            duration: '1-2 Days',
            difficulty: 'Easy',
            tips: ['Carry warm jackets as temperatures drop at night', 'Visit tea estates for fresh Ceylon tea'],
            districtId: 6,
            nearbyHotels: [
                { hotel_name: 'Grand Hotel Nuwara Eliya', city: 'Nuwara Eliya', rating: 4.9, category: 'Heritage 5-Star Hotel', price: 165, price_range: '$$$$' },
                { hotel_name: 'Heritance Tea Factory', city: 'Kandapola / Nuwara Eliya', rating: 4.8, category: 'Unique Tea Factory Resort', price: 145, price_range: '$$$$' },
                { hotel_name: 'Araliya Green City', city: 'Nuwara Eliya', rating: 4.7, category: '5-Star Modern Hotel', price: 100, price_range: '$$$' },
                { hotel_name: "Jetwing St. Andrew's", city: 'Nuwara Eliya', rating: 4.6, category: 'Colonial Country House', price: 90, price_range: '$$$' }
            ]
        },
        'pigeon-island-&-nilaveli-beach': {
            name: 'Pigeon Island & Nilaveli Beach',
            tagline: 'Snorkeling Coral Sanctuary',
            rating: 4.8,
            reviews: '2.2k',
            img: '/nilaveli_beach.jpg',
            location: 'Eastern Province (Trincomalee District)',
            bestTime: 'May - Oct',
            visitors: '350k/year',
            description: 'Pigeon Island Marine National Park features living coral reefs, blacktip reef sharks, sea turtles, and hundreds of tropical reef fish species off Nilaveli beach.',
            highlights: ['Snorkeling with Reef Sharks', 'Coral Gardens', 'Powdery White Beaches'],
            activities: ['Snorkeling', 'Scuba Diving', 'Speedboat Ride', 'Sunbathing'],
            entryFee: '$20-30 Park Ticket',
            duration: 'Half Day',
            difficulty: 'Easy to Moderate Swimming',
            tips: ['Rent snorkeling gear on Nilaveli beach', 'Avoid stepping on fragile coral reefs'],
            districtId: 17,
            nearbyHotels: [
                { hotel_name: 'Jungle Beach by Uga Escapes', city: 'Kuchchaveli / Trincomalee', rating: 4.9, category: '5-Star Luxury Beach Resort', price: 200, price_range: '$$$$$' },
                { hotel_name: 'Trinco Blu by Cinnamon', city: 'Trincomalee', rating: 4.7, category: 'Beachfront Resort', price: 90, price_range: '$$$' },
                { hotel_name: 'Nilaveli Beach Hotel', city: 'Nilaveli', rating: 4.5, category: 'Classic Beach Hotel', price: 65, price_range: '$$' }
            ]
        },
        'horton-plains-&-worlds-end': {
            name: "Horton Plains & World's End",
            tagline: 'Precipice Viewpoint & Cloud Forest',
            rating: 4.8,
            reviews: '2.7k',
            img: '/horton_plains.jpg',
            location: 'Central Highlands (Nuwara Eliya District)',
            bestTime: 'Jan - Mar',
            visitors: '350k/year',
            description: 'A plateau in the central highlands featuring montane grassland, cloud forest, Baker\'s Falls, and World\'s End — a sheer cliff drop of nearly 880 meters.',
            highlights: ["World's End Cliff Drop", "Baker's Falls Waterfall", 'Sambar Deer Sightings'],
            activities: ['Trekking', 'Nature Photography', 'Bird Watching'],
            entryFee: '$25 Foreigners',
            duration: '4 hours (9km loop)',
            difficulty: 'Moderate Hike',
            tips: ['Reach World\'s End before 9 AM before mist obscures the view', 'No single-use plastics allowed'],
            districtId: 6,
            nearbyHotels: [
                { hotel_name: "Jetwing St. Andrew's", city: 'Nuwara Eliya', rating: 4.7, category: 'Colonial Eco Lodge', price: 95, price_range: '$$$' },
                { hotel_name: 'Grand Hotel Nuwara Eliya', city: 'Nuwara Eliya', rating: 4.9, category: 'Heritage 5-Star', price: 165, price_range: '$$$$' },
                { hotel_name: 'The Hill Club', city: 'Nuwara Eliya', rating: 4.6, category: 'British Heritage Club Stay', price: 85, price_range: '$$$' }
            ]
        },
        'udawalawe-national-park': {
            name: 'Udawalawe National Park',
            tagline: 'Home of Wild Elephants',
            rating: 4.8,
            reviews: '2.4k',
            img: '/udawalawe.jpg',
            location: 'Sabaragamuwa / Monaragala (Udawalawe)',
            bestTime: 'Year-round',
            visitors: '380k/year',
            description: 'Udawalawe National Park is famous for guaranteed wild Asian elephant sightings in open grassland habitats surrounding the Udawalawe reservoir.',
            highlights: ['Elephant Herds & Calves', 'Udawalawe Elephant Transit Home', 'Water Birds & Eagles'],
            activities: ['Jeep Safari', 'Elephant Feeding Observation', 'Bird Watching'],
            entryFee: '$25-35 Safari',
            duration: '3-4 hours',
            difficulty: 'Easy Vehicle Tour',
            tips: ['Morning safaris offer cooler weather and active wildlife'],
            districtId: 15,
            nearbyHotels: [
                { hotel_name: 'Grand Udawalawe Safari Resort', city: 'Udawalawe', rating: 4.7, category: 'Luxury Safari Resort', price: 80, price_range: '$$$' },
                { hotel_name: "Kalu's Hideaway Udawalawe", city: 'Udawalawe', rating: 4.6, category: 'Boutique Eco Lodge', price: 60, price_range: '$$' },
                { hotel_name: 'Elephant Trail Hotel Udawalawe', city: 'Udawalawe', rating: 4.5, category: 'Middle Class Hotel', price: 45, price_range: '$$' },
                { hotel_name: 'Athgira River Camp Udawalawe', city: 'Udawalawe', rating: 4.4, category: 'Tented Safari Camp', price: 40, price_range: '$$' }
            ]
        },
        'polonnaruwa-vatadage-&-ruins': {
            name: 'Polonnaruwa Vatadage & Ruins',
            tagline: 'Medieval Capital Kingdom',
            rating: 4.9,
            reviews: '2.1k',
            img: '/polonnaruwa.jpg',
            location: 'North Central Province (Polonnaruwa District)',
            bestTime: 'Jul - Sep',
            visitors: '500k/year',
            description: 'Polonnaruwa was the second ancient royal capital of Sri Lanka, renowned for well-preserved stone ruins, giant stupas, and the Gal Vihara rock-cut Buddha statues.',
            highlights: ['Gal Vihara Rock Buddha Statues', 'Polonnaruwa Vatadage', 'Parakrama Samudra Reservoir'],
            activities: ['Bicycle Tour among Ruins', 'History Exploration', 'Archaeology Study'],
            entryFee: '$30 Foreigners',
            duration: 'Half Day',
            difficulty: 'Easy (Cycling/Walking)',
            tips: ['Rent a bicycle at entrance to easily explore the sprawling ruins'],
            districtId: 21,
            nearbyHotels: [
                { hotel_name: 'Ekho Lake House Polonnaruwa', city: 'Polonnaruwa', rating: 4.8, category: 'Heritage Lakeside Hotel', price: 110, price_range: '$$$$' },
                { hotel_name: 'Hotel Sudu Araliya', city: 'Polonnaruwa', rating: 4.5, category: 'Lakefront Resort', price: 60, price_range: '$$' },
                { hotel_name: 'Deer Park Hotel', city: 'Giritale / Polonnaruwa', rating: 4.6, category: 'Nature Resort', price: 75, price_range: '$$$' }
            ]
        },
        'bentota-golden-beach': {
            name: 'Bentota Golden Beach',
            tagline: 'Water Sports & Luxury Resorts',
            rating: 4.7,
            reviews: '2.8k',
            img: '/bentota_beach.jpg',
            location: 'Southern Province (Galle / Kalutara)',
            bestTime: 'Oct - Apr',
            visitors: '400k/year',
            description: 'Bentota is Sri Lanka\'s premier water sports capital, offering river cruises along Madu Ganga, jet skiing, windsurfing, and serene luxury beachfront resorts.',
            highlights: ['Madu River Mangrove Safari', 'Bentota Water Sports', 'Turtle Hatchery Conservation'],
            activities: ['Jet Skiing', 'Banana Boat', 'Mangrove Safari', 'Turtle Hatchery Visit'],
            entryFee: 'Free beach / Activity dependent',
            duration: '1 Day',
            difficulty: 'Easy',
            tips: ['Great spot for couples and families seeking water adventures'],
            districtId: 7,
            nearbyHotels: [
                { hotel_name: 'Taj Bentota Resort & Spa', city: 'Bentota', rating: 4.9, category: '5-Star Luxury Resort', price: 185, price_range: '$$$$$' },
                { hotel_name: 'Cinnamon Bey Beruwala', city: 'Beruwala / Bentota', rating: 4.8, category: '5-Star Beach Resort', price: 135, price_range: '$$$$' },
                { hotel_name: 'Centara Ceysands Resort & Spa', city: 'Bentota', rating: 4.7, category: 'Lagoon & Ocean Resort', price: 115, price_range: '$$$$' }
            ]
        },
        'arugam-bay': {
            name: 'Arugam Bay',
            tagline: 'Surfer\'s Paradise',
            rating: 4.8,
            reviews: '2.5k',
            img: 'https://www.royalbeacharugambay.com/wp-content/uploads/2018/06/31486864_2092393800812074_7238967897651937280_o.jpg',
            location: 'Eastern Province (Ampara District)',
            bestTime: 'May - Sep',
            visitors: '200k/year',
            description: 'Arugam Bay is a moon-shaped curl of soft sand, considered the best surf spot in the country and one of the best in Asia.',
            highlights: ['World-class surf breaks', 'Whiskey Point', 'Lagoon Safari', 'Kumana National Park nearby'],
            activities: ['Surfing', 'Lagoon Boat Ride', 'Yoga', 'Bird Watching'],
            entryFee: 'Free',
            duration: '2-3 days recommended',
            difficulty: 'Easy to Challenging (Surfing)',
            tips: ['Bring your own surfboard if you\'re a pro', 'Try local seafood'],
            districtId: 16,
            nearbyHotels: [
                { hotel_name: 'Hideaway Arugam Bay', city: 'Arugam Bay', rating: 4.8, category: 'Boutique Surf Resort', price: 90, price_range: '$$$' },
                { hotel_name: 'Bay Vista Hotel', city: 'Arugam Bay', rating: 4.6, category: 'Beachfront Hotel', price: 70, price_range: '$$' },
                { hotel_name: 'Royal Beach Arugam Bay', city: 'Arugam Bay', rating: 4.5, category: 'Beach Stay', price: 50, price_range: '$$' }
            ]
        },
        'ella-rock': {
            name: 'Ella Rock',
            tagline: 'Scenic Mountain Trek',
            rating: 4.7,
            reviews: '1.5k',
            img: 'https://theportuguesetraveler.com/wp-content/uploads/2024/11/nine-arches-bridge-train-sri-lanka-53.jpg',
            location: 'Uva Province (Badulla District)',
            bestTime: 'Jan - Mar',
            visitors: '300k/year',
            description: 'Ella Rock is a popular hiking destination offering breathtaking views of the surrounding tea plantations, valleys, and mountains.',
            highlights: ['Panoramic views of Ella Gap', 'Tea plantation trails', 'Railway track walking'],
            activities: ['Hiking', 'Photography', 'Tea Tasting'],
            entryFee: 'Free',
            duration: '4-5 hours round trip',
            difficulty: 'Moderate to Challenging',
            tips: ['Hire a local guide for the best route', 'Start at dawn for sunrise views'],
            districtId: 22,
            nearbyHotels: [
                { hotel_name: '98 Acres Resort & Spa', city: 'Ella', rating: 4.9, category: '5-Star Luxury Eco Resort', price: 220, price_range: '$$$$' },
                { hotel_name: 'Mount Breeze Ella', city: 'Ella', rating: 4.6, category: 'Boutique Mountain Stay', price: 60, price_range: '$$' },
                { hotel_name: 'Zion View Ella Green Retreat', city: 'Ella', rating: 4.7, category: 'Panorama View Hotel', price: 70, price_range: '$$$' }
            ]
        },
        'mirissa-beach': {
            name: 'Mirissa Beach',
            tagline: 'Tropical Paradise',
            rating: 4.8,
            reviews: '3k',
            img: 'https://assets.telegraphindia.com/telegraph/2023/Aug/1691497505_cms001.jpg',
            location: 'Southern Province (Matara District)',
            bestTime: 'Nov - Apr',
            visitors: '450k/year',
            description: 'Mirissa is a stunning beach town on the southern coast of Sri Lanka, famous for its golden sandy beaches and blue whale watching.',
            highlights: ['Blue whale watching', 'Coconut Tree Hill viewpoint', 'Secret Beach cove'],
            activities: ['Whale Watching', 'Surfing', 'Beach Relaxation'],
            entryFee: 'Free',
            duration: 'Full day recommended',
            difficulty: 'Easy',
            tips: ['Book whale watching tours in advance', 'Visit Coconut Tree Hill for sunset'],
            districtId: 8,
            nearbyHotels: [
                { hotel_name: 'Mandara Resort Mirissa', city: 'Mirissa', rating: 4.7, category: 'Beachfront Resort', price: 100, price_range: '$$$$' },
                { hotel_name: 'Paradise Beach Club Mirissa', city: 'Mirissa', rating: 4.5, category: 'Beach Resort', price: 70, price_range: '$$$' },
                { hotel_name: 'Triple O Six Mirissa', city: 'Mirissa', rating: 4.6, category: 'Boutique Hotel', price: 82, price_range: '$$$' }
            ]
        },
        'adams-peak': {
            name: "Adam's Peak",
            tagline: "Sacred Mountain Pilgrimage",
            rating: 4.8,
            reviews: "3.2k",
            img: "https://www.urlauberinfos.com/urlaub-sri-lanka/sehenswuerdigkeiten/adamspeak.jpg",
            location: "Central Highlands (Ratnapura / Nuwara Eliya)",
            bestTime: "Dec - May",
            visitors: "2M+/year",
            description: "Adam's Peak (Sri Pada) is a 2,243m tall conical mountain located in central Sri Lanka. Famous for the sacred footprint and sunrise view.",
            highlights: ["Sacred Footprint (Sri Pada)", "Spectacular Sunrise", "Pilgrimage Trail"],
            activities: ["Pilgrimage Trek", "Night Hiking", "Sunrise Viewing"],
            entryFee: "Free",
            duration: "5-7 hours round trip",
            difficulty: "Challenging (5500+ steps)",
            tips: ["Start climb around 2 AM for sunrise", "Wear warm clothing"],
            districtId: 6,
            nearbyHotels: [
                { hotel_name: 'Slightly Chilled Yellow House', city: 'Nallathanniya (Adam\'s Peak Base)', rating: 4.6, category: 'Pilgrimage Mountain Lodge', price: 50, price_range: '$$' },
                { hotel_name: "Grand Adams Peak Hotel", city: 'Nallathanniya', rating: 4.5, category: 'Base Camp Hotel', price: 45, price_range: '$$' },
                { hotel_name: 'Tea Hills Bungalow', city: 'Hatton / Maskeliya', rating: 4.7, category: 'Tea Estate Villa', price: 85, price_range: '$$$' }
            ]
        },
        'yala-national-park': {
            name: 'Yala National Park',
            tagline: 'Wildlife Safari Adventure',
            rating: 4.8,
            reviews: '1.8k',
            img: 'https://www.goyalasafari.com/image/slider/yala-slide/yala_nationalpark_slide1.jpg',
            location: 'Southern Province (Hambantota District - Yala)',
            bestTime: 'Feb - Jul',
            visitors: '400k/year',
            description: 'Yala National Park is famous for having one of the highest leopard densities in the world alongside Asian elephant herds.',
            highlights: ['Highest leopard density', 'Elephant herds', 'Sloth bears'],
            activities: ['Safari Tours', 'Wildlife Photography'],
            entryFee: '$25-40',
            duration: 'Half/full day safari',
            difficulty: 'Easy',
            tips: ['Book early morning safari', 'Bring camera with zoom lens'],
            districtId: 9,
            nearbyHotels: [
                { hotel_name: 'Cinnamon Wild Yala', city: 'Yala / Kirinda', rating: 4.9, category: 'Luxury Safari Resort', price: 135, price_range: '$$$$' },
                { hotel_name: 'Jetwing Yala', city: 'Yala / Tissamaharama', rating: 4.8, category: '5-Star Beach & Safari', price: 120, price_range: '$$$$' },
                { hotel_name: 'Wild Coast Tented Lodge', city: 'Yala National Park', rating: 4.9, category: 'Luxury All-Inclusive Lodge', price: 580, price_range: '$$$$$' },
                { hotel_name: 'Elephant Reach Yala', city: 'Tissamaharama', rating: 4.5, category: 'Eco Safari Lodge', price: 50, price_range: '$$' }
            ]
        },
        'nallur-kandaswamy-devasthanam': {
            name: 'Nallur Kandaswamy Devasthanam',
            tagline: 'Sacred Divine Temple',
            rating: 4.9,
            reviews: '3.5k',
            img: 'https://d3e1m60ptf1oym.cloudfront.net/c822b4ed-7e27-4ea1-be2a-aa8f796c4ca1/JW_011019_1087_uxga.jpg',
            location: 'Northern Province (Jaffna District)',
            bestTime: 'Aug (Festival)',
            visitors: '1M+/year',
            description: 'Historic Hindu temple complex in Jaffna dedicated to Lord Murugan, famous for Dravidian architecture and golden gopuram.',
            highlights: ['Golden Tower (Gopuram)', 'Dravidian architecture', 'Annual Festival'],
            activities: ['Temple Worship', 'Cultural Observation'],
            entryFee: 'Free',
            duration: '1-2 hours',
            difficulty: 'Easy',
            tips: ['Men enter bare-bodied', 'Remove footwear before entering'],
            districtId: 10,
            nearbyHotels: [
                { hotel_name: 'Jetwing Jaffna', city: 'Jaffna City', rating: 4.8, category: '5-Star City Hotel', price: 95, price_range: '$$$' },
                { hotel_name: 'Jaffna Heritage Hotel', city: 'Nallur / Jaffna', rating: 4.7, category: 'Heritage Hotel near Nallur', price: 70, price_range: '$$$' },
                { hotel_name: 'The Thinnai Jaffna', city: 'Jaffna', rating: 4.7, category: 'All-Suite Resort', price: 82, price_range: '$$$' }
            ]
        }
    };

    // Normalized destination lookup
    const targetKey = destinationName ? destinationName.toLowerCase().trim() : '';
    const destination = destinationsData[targetKey] || Object.values(destinationsData).find(d => 
        d.name.toLowerCase().includes(targetKey) || targetKey.includes(d.name.toLowerCase().split(' ')[0])
    ) || destinationsData['sigiriya-rock-fortress'];

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
        setLoadingHotels(true);
        setShowHotels(true);

        const curatedHotels = destination.nearbyHotels || [];
        try {
            const response = await fetch(`/api/hotels/district/${destination.districtId}`);
            if (response.ok) {
                const data = await response.json();
                if (data && data.length > 0) {
                    setNearbyHotels(data);
                } else {
                    setNearbyHotels(curatedHotels);
                }
            } else {
                setNearbyHotels(curatedHotels);
            }
        } catch (error) {
            console.error('Error fetching nearby hotels:', error);
            setNearbyHotels(curatedHotels);
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
                                onClick={() => navigate('/plan-trip', {
                                    state: {
                                        districtId: destination.districtId,
                                        destinationName: destination.name,
                                        location: destination.location
                                    }
                                })}
                                className="w-full bg-primary text-white font-black py-4 px-6 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 mb-3 flex items-center justify-center gap-2"
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
