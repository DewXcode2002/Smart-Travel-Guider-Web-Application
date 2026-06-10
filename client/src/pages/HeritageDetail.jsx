import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Clock, MapPin, Info, ArrowLeft, Calendar, DollarSign, Users, Camera } from 'lucide-react';
import PriceDisplay from '../components/PriceDisplay';

const HeritageDetail = () => {
    const { heritageName } = useParams();
    const navigate = useNavigate();

    const heritageData = {
        'temple-of-the-tooth': {
            title: 'Temple of the Sacred Tooth Relic',
            tagline: 'Sacred Buddhist Shrine',
            img: 'https://www.theradh.com/images/subpages/the-temple-of-tooth.jpg',
            gallery: [
                'https://thumbs.dreamstime.com/b/altar-buddha-statue-inside-sri-dalada-maligawa-temple-sacred-tooth-relic-buddhist-temple-city-169754653.jpg',
                'https://srilankamirror.com/wp-content/uploads/2022/11/TempleofToothRelic_DaladaMaligawa_Kandy_1200px_22_11_27-1000x600.jpg',
                'https://www.guide-srilanka.fr/wp-content/uploads/2018/12/temple-de-la-dent-kandy.jpg'
            ],
            location: 'Kandy',
            era: '1595 AD',
            type: 'Religious Site',
            entryFee: 15,
            visitDuration: '2-3 hours',
            bestTime: 'Evening Puja (6:30 PM)',
            description: 'The Temple of the Sacred Tooth Relic is a world-renowned place of worship, where the left Canine tooth of Gautama Buddha is enshrined. The temple which is venerated by thousands of local & foreign devotees and tourists daily was named as a world heritage by UNESCO in 1988.',
            history: 'The temple was built within the royal palace complex which houses the one of the two surviving relic of the tooth of Buddha, an object of veneration for Buddhists. The relic has played an important role in local politics since ancient times, it being believed that whoever holds the relic holds the governance of the country.',
            highlights: [
                'The Golden Canopy',
                'The Sacred Tooth Relic Chamber',
                'Royal Palace Complex',
                'The Octagon (Pattirippuwa)',
                'World Buddhist Museum',
                'Kandy Lake (Kiri Muhuda)'
            ],
            tips: [
                'Dress modestly (shoulders and knees covered)',
                'Remove footwear at the entrance',
                'Photography is restricted in the inner shrine',
                'Visit during Puja times for the full experience',
                'Respect the worshippers'
            ],
            districtId: 4
        },
        'sigiriya': {
            title: 'Ancient Fortress of Sigiriya',
            tagline: 'The Lion Rock',
            img: 'https://www.sawanonlinebookstore.com/zubyheet/2022/01/100-Sigiriya.jpg',
            gallery: [
                'https://atharesort.com/img/blog-img/Sigiriya.jpg',
                'https://quartzmountain.org/images/resources/explore-the-sigiriya-museum_20230606100129.webp',
                'https://www.talesofceylon.com/wp-content/uploads/2019/10/Take-a-Stroll-in-the-Mesmerizing-Gardens_1200x600.jpg'
            ],
            location: 'Matale District',
            era: '5th Century AD',
            type: 'Rock Fortress',
            entryFee: 30,
            visitDuration: '3-4 hours',
            bestTime: 'Early morning',
            description: 'Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance that is dominated by a massive column of rock almost 200 metres high.',
            history: 'Sigiriya was selected by King Kasyapa (477–495 AD) for his new capital. He built his palace on the top of this rock and decorated its sides with colourful frescoes. On a small plateau about halfway up the side of this rock he built a gateway in the form of an enormous lion. The name of this place is derived from this structure — Sinhagiri, the Lion Rock.',
            highlights: [
                'The Mirror Wall with ancient graffiti',
                'World-famous Sigiriya frescoes',
                'The Lion Paw entrance',
                'Water Gardens and Boulder Gardens',
                'The Summit Palace ruins'
            ],
            tips: [
                'Start your climb before 8 AM to avoid the heat',
                'Wear comfortable walking shoes with good grip',
                'Carry at least 1L of water per person',
                'Allow 3-4 hours for the full experience',
                'Beware of wasps near the summit'
            ],
            districtId: 5
        },
        'galle-fort': {
            title: 'Galle Dutch Fort',
            tagline: 'Living Heritage',
            img: 'https://www.thedivinevilla.com/upload/attraction/gallery/-172791908728_18411232178_1674550008_n.jpg',
            gallery: [
                'https://sunsetmirissa.com/images/Galle-fort/galle-fort-2.jpeg',
                'https://as1.ftcdn.net/v2/jpg/04/42/31/68/1000_F_442316893_U5Iu78Z0j51ZCAh9ZqKaTwfORS8r26Pr.jpg',
                'https://2.bp.blogspot.com/-IFJHF-8ZXRs/T2P7VH0jBUI/AAAAAAAAEFI/-inDVNFYbc0/s1600/galle+fort.JPG'
            ],
            location: 'Galle District',
            era: '16th Century AD',
            type: 'Fortified City',
            entryFee: 0,
            visitDuration: '3-5 hours',
            bestTime: 'Late afternoon',
            description: 'The Galle Fort is a UNESCO World Heritage Site originally built by the Portuguese in 1588 and then extensively fortified by the Dutch during the 17th century. It is a historical, archaeological and architectural heritage monument, which even after more than 423 years maintains a polished appearance.',
            history: 'Galle reached the height of its development in the 18th century, before the arrival of the British, who developed Colombo as the capital. The fort has undergone reconstruction and renovation over the centuries, surviving the 2004 Tsunami with minimal damage due to its massive bastions.',
            highlights: [
                'Galle Lighthouse',
                'Dutch Reformed Church',
                'The Ramparts and Bastions',
                'The Old Gate with the VOC emblem',
                'Charming cobblestone streets with boutiques'
            ],
            tips: [
                'Walk the ramparts at sunset for spectacular views',
                'Visit the Maritime Museum',
                'Explore the numerous art galleries and jewelry shops',
                'Entrance to the fort itself is free',
                'Photography is best in the late afternoon glow'
            ],
            districtId: 7
        },
        'dambulla-cave': {
            title: 'Dambulla Cave Temple',
            tagline: 'Golden Temple',
            img: 'https://www.travelmapsrilanka.com/destinations/destinationimages/dambulla-cave-temple.webp',
            gallery: [
                'https://www.ancient-origins.net/sites/default/files/styles/article_image/public/field/image/Dambulla-Cave-Temple.jpg?itok=lDoqIakP',
                'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/b5/60/e9/inside-the-second-cave.jpg?w=1200&h=1200&s=1',
                'https://www.lankatourexperts.com/wp-content/uploads/2018/10/dambulla-cave-temple-3.jpg'
            ],
            location: 'Dambulla',
            era: '1st Century BC',
            type: 'Cave Temple Complex',
            entryFee: 10,
            visitDuration: '2-3 hours',
            bestTime: 'Early Morning or Late Afternoon',
            description: 'The Golden Temple of Dambulla is a World Heritage Site in Sri Lanka, situated in the central part of the country. It is the largest and best-preserved cave temple complex in Sri Lanka. The rock towers 160 m over the surrounding plains.',
            history: 'This temple complex dates back to the 1st century BC. It has five caves under a vast overhanging rock, carved with a drip line to keep the interiors dry. Inside the caves, the ceilings are painted with intricate patterns of religious images following the contours of the rock.',
            highlights: [
                'The Golden Statue of Buddha',
                'The Cave of the Divine King',
                'The Cave of the Great Kings',
                'Over 150 Buddha Statues',
                'Ancient Mural Paintings',
                'Panoramic Views of Sigiriya'
            ],
            tips: [
                'Shoulders and knees must be covered',
                'Be prepared for a climb (stairs)',
                'Monkeys are present, guard your belongings',
                'Remove hats and shoes before entering',
                'No photography of people with Buddha statues'
            ],
            districtId: 5
        },
        'polonnaruwa': {
            title: 'Ancient City of Polonnaruwa',
            tagline: 'Medieval Capital',
            img: 'https://www.chamilatours.com/wp-content/uploads/2022/11/ancient-city-of-polonnaruwa.jpg',
            gallery: [
                'https://www.lankatourexperts.com/wp-content/uploads/2018/12/Polonnaruwa-Ancient-City-Sri-Lanka-Economy-Tours.png',
                'https://www.baywalktours.com/wp-content/uploads/2019/10/Ancient-City-of-Polonnaruwa.jpg',
                'https://www.rjtravelagency.com/wp-content/uploads/2023/03/Polonnaruwa-Ancient-City-9.jpg'
            ],
            location: 'Polonnaruwa District',
            era: '11th-13th Century AD',
            type: 'Archaeological Site',
            entryFee: 25,
            visitDuration: '4-5 hours',
            bestTime: 'Early morning',
            description: 'The second capital of Sri Lanka after Anuradhapura, Polonnaruwa is a UNESCO World Heritage Site with well-preserved ruins of ancient Buddhist temples, palaces, and sophisticated irrigation systems.',
            history: 'Polonnaruwa became the capital in the 11th century AD after Anuradhapura was abandoned. It flourished under King Parakramabahu I (1153-1186 AD), who built extensive irrigation systems and magnificent buildings. The city was abandoned in the 13th century after invasions.',
            highlights: [
                'Gal Vihara - four magnificent Buddha statues carved from rock',
                'Royal Palace of King Parakramabahu',
                'Parakrama Samudra - ancient reservoir',
                'Vatadage - circular relic house',
                'Lankatilaka Temple with towering walls',
                'Rankot Vihara - massive stupa'
            ],
            tips: [
                'Rent a bicycle to explore the vast site',
                'Start early morning to avoid heat',
                'Bring water and sun protection',
                'Allow full day for comprehensive visit',
                'Hire a guide for historical context',
                'Visit Gal Vihara during golden hour for best photos'
            ],
            districtId: 21
        },
        'anuradhapura': {
            title: 'Ancient City of Anuradhapura',
            tagline: 'First Capital of Sri Lanka',
            img: 'https://www.rjtravelagency.com/wp-content/uploads/2023/03/Anuradhapura-Ancient-City-2.jpg',
            gallery: [
                'https://seedevirestaurant.com/wp-content/uploads/2023/09/Ruwanweli-Maha-Seya.webp',
                'https://lkgetaways.com/static/uploads/Avukana-Buddha-Statue-Anuradhapua-Ancinet-City.webp',
                'https://admin.freetour.com/images/tours/3170/the-ancient-city-of-anuradhapura-cycling-tour-03.jpg'
            ],
            location: 'Anuradhapura District',
            era: '4th Century BC',
            type: 'Archaeological Site',
            entryFee: 25,
            visitDuration: 'Full day',
            bestTime: 'Early morning',
            description: 'The first capital of Sri Lanka and a sacred city for Buddhists. Home to ancient monasteries, palaces, and the sacred Bodhi tree - believed to be the oldest historically authenticated tree in the world.',
            history: 'Anuradhapura was the capital of Sri Lanka from the 4th century BC to the 11th century AD. It was one of the most stable and durable centers of political power and urban life in South Asia. The city is sacred to Buddhists as it contains the Sri Maha Bodhi tree, grown from a cutting of the original Bodhi tree under which Buddha attained enlightenment.',
            highlights: [
                'Sri Maha Bodhi - sacred Bodhi tree (over 2,300 years old)',
                'Ruwanwelisaya - massive white stupa',
                'Jetavanaramaya - one of the tallest ancient structures',
                'Abhayagiri Monastery complex',
                'Twin Ponds (Kuttam Pokuna) - ancient bathing pools',
                'Isurumuniya Rock Temple with ancient carvings'
            ],
            tips: [
                'Rent a bicycle or tuk-tuk to cover the vast area',
                'Start at dawn to avoid heat',
                'Dress modestly for temple visits',
                'Bring plenty of water and snacks',
                'Allow full day for comprehensive visit',
                'Visit Sri Maha Bodhi during puja times'
            ],
            districtId: 20
        }
    };

    const site = heritageData[heritageName] || heritageData['sigiriya'];
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
        if (!site.districtId) return;
        setLoadingHotels(true);
        setShowHotels(true);
        try {
            const response = await fetch(`/api/hotels/district/${site.districtId}`);
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

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/heritage')}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold transition-all group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Heritage Sites
                </button>

                {/* Hero Section */}
                <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img
                        src={site.img}
                        alt={site.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-12 space-y-4">
                        <span className="bg-amber-400 text-amber-950 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">
                            {site.tagline}
                        </span>
                        <h1 className="text-6xl font-black text-white tracking-tight">{site.title}</h1>
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span className="font-medium">{site.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} />
                                <span className="font-medium">{site.era}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Info size={18} />
                                <span className="font-medium">{site.type}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-3 gap-4">
                    {site.gallery.map((img, i) => (
                        <div key={i} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    ))}
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <DollarSign size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Entry Fee</p>
                        <div className="text-xl font-black text-gray-900">
                            {site.entryFee === 0 ? (
                                <span className="text-emerald-500 uppercase tracking-widest text-sm">Complimentary</span>
                            ) : (
                                <PriceDisplay amount={site.entryFee} from="USD" />
                            )}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <Clock size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Visit Duration</p>
                        <p className="text-xl font-black text-gray-900">{site.visitDuration}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <Calendar size={24} className="text-primary mb-2" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Best Time</p>
                        <p className="text-xl font-black text-gray-900">{site.bestTime}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg mb-6">{site.description}</p>
                            <h3 className="text-2xl font-black text-gray-900 mb-3">History</h3>
                            <p className="text-gray-600 font-medium leading-relaxed">{site.history}</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Highlights</h2>
                            <ul className="space-y-3">
                                {site.highlights.map((highlight, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                        </div>
                                        <span className="text-gray-700 font-medium">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h2 className="text-3xl font-black text-gray-900 mb-6">Visitor Tips</h2>
                            <ul className="space-y-3">
                                {site.tips.map((tip, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-primary font-black text-lg">•</span>
                                        <span className="text-gray-700 font-medium">{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg sticky top-8">
                            <h3 className="text-2xl font-black text-gray-900 mb-6">Plan Your Visit</h3>
                            <button
                                onClick={() => navigate('/plan-trip')}
                                className="w-full bg-primary text-white font-black py-4 px-6 rounded-2xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 mb-3"
                            >
                                Add to Trip Plan
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
                    <div ref={hotelsSectionRef} id="nearby-hotels" className="animate-slide-up space-y-8 pt-12 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-2">Nearby Elite Accommodations</h2>
                                <p className="text-gray-500 font-medium">Curated luxury stays in the {site.location} area</p>
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

                                        <div className="space-y-4">
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

export default HeritageDetail;
