import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Info } from 'lucide-react';

const Heritage = () => {
    const navigate = useNavigate();

    const heritageSites = [
        {
            title: 'Ancient City of Sigiriya',
            description: 'A UNESCO World Heritage Site, Sigiriya is an ancient rock fortress and palace ruin surrounded by the remains of gardens, reservoirs, and other structures.',
            img: '/images/destinations/sigiriya.jpg',
            location: 'Matale District',
            era: '5th Century AD',
            type: 'Archaeological Site',
            slug: 'sigiriya'
        },
        {
            title: 'Temple of the Sacred Tooth Relic',
            description: 'Located in Kandy, this temple houses the relic of the tooth of Buddha. It is one of the most sacred places of worship in the Buddhist world.',
            img: '/images/destinations/temple-of-tooth.jpg',
            location: 'Kandy',
            era: '1595 AD',
            type: 'Religious Site',
            slug: 'temple-of-the-tooth'
        },
        {
            title: 'Galle Fort',
            description: 'Built by the Portuguese in 1588 and extensively fortified by the Dutch, Galle Fort is a UNESCO World Heritage Site showcasing colonial architecture.',
            img: 'https://www.goedkoperondreis.com/wp-content/uploads/2021/07/bile-2362232_1280.jpg',
            location: 'Galle',
            era: '16th Century',
            type: 'Colonial Fort',
            slug: 'galle-fort'
        },
        {
            title: 'Dambulla Cave Temple',
            description: 'The largest and best-preserved cave temple complex in Sri Lanka, featuring Buddhist mural paintings and over 150 statues of Buddha.',
            img: 'https://explorelanka.com/wp-content/uploads/2015/03/dambulla_cave_temples__sri_lanka.jpg',
            location: 'Dambulla',
            era: '1st Century BC',
            type: 'Cave Temple',
            slug: 'dambulla-cave'
        },
        {
            title: 'Ancient City of Polonnaruwa',
            description: 'The second capital of Sri Lanka after Anuradhapura, Polonnaruwa is a UNESCO World Heritage Site with well-preserved ruins of ancient Buddhist temples and palaces.',
            img: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-546421195_full.jpg?sharp=10&vib=20&w=1200',
            location: 'Polonnaruwa District',
            era: '11th-13th Century AD',
            type: 'Archaeological Site',
            slug: 'polonnaruwa'
        },
        {
            title: 'Ancient City of Anuradhapura',
            description: 'The first capital of Sri Lanka and a sacred city for Buddhists. Home to ancient monasteries, palaces, and the sacred Bodhi tree.',
            img: 'https://www.bluelankatours.com/wp-content/uploads/2017/05/Ancient_City_Of_Anuradhapura.jpg',
            location: 'Anuradhapura District',
            era: '4th Century BC',
            type: 'Archaeological Site',
            slug: 'anuradhapura'
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="relative overflow-hidden rounded-[2.5rem] h-96 shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200"
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Heritage Header"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-12 flex flex-col justify-end">
                        <span className="bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full w-fit mb-4">
                            Cultural Heritage
                        </span>
                        <h1 className="text-6xl font-black text-white mb-4 tracking-tight">Explore Sri Lanka's Rich History</h1>
                        <p className="text-white/90 max-w-2xl text-xl font-medium leading-relaxed">
                            Dive into the rich history of Sri Lanka. Visit ancient temples, ruins, and learn about the diverse culture that spans over 2,500 years.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {heritageSites.map((site, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="relative h-80 md:h-auto overflow-hidden">
                                    <img
                                        src={site.img}
                                        alt={site.title}
                                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center space-y-4">
                                    <h2 className="text-3xl font-black text-gray-900">{site.title}</h2>
                                    <p className="text-gray-600 font-medium leading-relaxed">{site.description}</p>

                                    <div className="space-y-2 pt-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <MapPin size={18} className="text-primary" />
                                            <span className="font-bold text-gray-700">Location:</span>
                                            <span className="text-gray-600">{site.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock size={18} className="text-primary" />
                                            <span className="font-bold text-gray-700">Era:</span>
                                            <span className="text-gray-600">{site.era}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Info size={18} className="text-primary" />
                                            <span className="font-bold text-gray-700">Type:</span>
                                            <span className="text-gray-600">{site.type}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/heritage/${site.slug}`)}
                                        className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-hover transition-all w-fit mt-4"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default Heritage;
