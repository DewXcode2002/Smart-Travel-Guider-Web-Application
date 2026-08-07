import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, PlusCircle, Mic, Send, ArrowRight, Settings, Bell, Moon, ArrowLeft, Compass, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { 
            role: 'bot', 
            text: "Ayubowan! 🇱🇰 I am TravelGuider AI, your intelligent travel assistant for Sri Lanka. Ask me about popular destinations, 5-star or budget hotels, weather seasons, wildlife safaris, local cuisine, or custom itineraries!", 
            time: 'Just now' 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Comprehensive Knowledge Engine for Sri Lanka Travel
    const generateBotResponse = (userText) => {
        const query = userText.toLowerCase().trim();
        const tokens = query.replace(/[^a-z0-9\s]/g, '').split(/\s+/);

        const includes = (...words) => words.some(w => query.includes(w) || tokens.includes(w));

        // 1. Popular Destinations / Must-See Places
        if (includes('popular', 'place', 'places', 'placecs', 'attraction', 'attractions', 'visit', 'top', 'destination', 'destinations', 'must see', 'highlight', 'sri lanka', 'sri lanks')) {
            return "Here are the top iconic places to visit in Sri Lanka 🇱🇰:\n\n" +
                   "1. 🏰 **Sigiriya Rock Fortress**: Ancient 5th-century palace in the sky with lion paws and historic frescoes.\n" +
                   "2. 🛕 **Temple of the Sacred Tooth Relic (Kandy)**: Most sacred Buddhist temple housing Lord Buddha's tooth relic.\n" +
                   "3. 🚂 **Nine Arch Bridge (Ella)**: Iconic colonial railway viaduct amidst tea plantations and misty mountains.\n" +
                   "4. 🛈 **Galle Dutch Fort**: UNESCO World Heritage cobble-street fortress surrounded by the Indian Ocean.\n" +
                   "5. 🐘 **Udawalawe & Yala National Parks**: World-renowned wildlife safaris for Asian elephants and leopards.\n" +
                   "6. ⛵ **Mirissa & Bentota Beaches**: Scenic golden coastlines ideal for whale watching and water sports.\n" +
                   "7. ☕ **Nuwara Eliya & Gregory Lake**: Cold mountain town known as 'Little England' with lush tea gardens.\n\n" +
                   "Which of these areas would you like more details about?";
        }

        // 2. Kandy & Sacred Tooth Relic
        if (includes('kandy', 'tooth', 'dalada', 'maligawa', 'peradeniya', 'botanical')) {
            return "🌸 **Kandy Cultural Highlights**:\n\n" +
                   "• **Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)**: Open daily. Dress respectfully with covered shoulders & knees.\n" +
                   "• **Royal Botanical Gardens Peradeniya**: Famous for orchid houses and giant palm avenues.\n" +
                   "• **Kandy Lake & Viewpoint**: Peaceful strolls and sunset hill views.\n" +
                   "🏨 **Top Stays**: Earl's Regency Kandy (5-Star Luxury), Cinnamon Citadel Kandy (Riverfront), Radisson Kandy.";
        }

        // 3. Sigiriya & Dambulla
        if (includes('sigiriya', 'lion rock', 'dambulla', 'fresco', 'frescoes', 'matale')) {
            return "🦁 **Sigiriya & Dambulla Exploration**:\n\n" +
                   "• **Sigiriya Rock Fortress**: 1,200 steps to the summit palace. Best climbed at 7:00 AM to beat the heat ($30 foreign entry).\n" +
                   "• **Dambulla Cave Temple**: 5 cave shrines containing 150+ gilded Buddha statues and ancient roof murals.\n" +
                   "🏨 **Nearby Elite Hotels**: Heritance Kandalama (Geo-eco luxury), Hotel Sigiriya (Direct rock view), Water Garden Sigiriya.";
        }

        // 4. Ella & Nine Arch Bridge
        if (includes('ella', 'nine arch', 'nine arches', 'ella rock', 'little adam', 'demodara', 'train')) {
            return "🚂 **Ella Hill Country Adventures**:\n\n" +
                   "• **Nine Arch Bridge**: Watch the iconic blue train pass across the jungle valley (mornings around 9:00 AM & 11:30 AM).\n" +
                   "• **Ella Rock & Little Adam's Peak**: Panoramic mountain hikes with breathtaking sunrise views.\n" +
                   "• **Scenic Kandy-Ella Train**: Ranked among the world's most beautiful train rides.\n" +
                   "🏨 **Popular Hotels**: 98 Acres Resort & Spa (5-Star Eco), Mount Breeze Ella, Hangover Hostels (Budget).";
        }

        // 5. Galle Fort & South Coast
        if (includes('galle', 'fort', 'lighthouse', 'ramparts', 'dutch')) {
            return "🏰 **Galle Fort Heritage & Sunset**:\n\n" +
                   "• **Galle Lighthouse & Ramparts**: Walk the historic stone sea-fort walls during sunset around 5:30 PM.\n" +
                   "• **Pedlar Street & Dutch Architecture**: Explore artisanal gem boutiques, gelato parlors, and colonial cafes.\n" +
                   "🏨 **Nearby Stays**: Amangalla Galle Fort (Heritage 5-Star), Le Grand Galle (Ocean view), Fort Bazaar, Zostel Galle.";
        }

        // 6. Nuwara Eliya & Gregory Lake
        if (includes('nuwara', 'eliya', 'gregory', 'tea', 'little england', 'horton', 'worlds end')) {
            return "☕ **Nuwara Eliya & Tea Country**:\n\n" +
                   "• **Gregory Lake**: Speed boating, jet skis, and horse riding along the cool lakefront.\n" +
                   "• **Pedro Tea Estate**: Guided tea plucking and factory Ceylon tea tasting.\n" +
                   "• **Horton Plains & World's End**: 9km misty cloud forest trek ending at an 880m sheer cliff drop.\n" +
                   "🏨 **Top Stays**: Grand Hotel Nuwara Eliya (Colonial Heritage), Heritance Tea Factory, Araliya Green City.";
        }

        // 7. Wildlife Safaris (Yala, Udawalawe, Wilpattu)
        if (includes('safari', 'yala', 'udawalawe', 'elephant', 'elephants', 'leopard', 'leopards', 'wildlife', 'park')) {
            return "🐘 **Sri Lanka Safari Destinations**:\n\n" +
                   "1. **Udawalawe National Park**: 100% guaranteed wild elephant herd sightings year-round around the reservoir.\n" +
                   "2. **Yala National Park**: Highest density of leopards in the world along with sloth bears and crocodiles.\n" +
                   "3. **Minneriya National Park**: Famous for the 'Elephant Gathering' (300+ elephants) from July to September.\n" +
                   "🏨 **Safari Lodges**: Cinnamon Wild Yala, Grand Udawalawe Safari Resort, Wild Coast Tented Lodge.";
        }

        // 8. Beaches, Surfing & Whale Watching
        if (includes('beach', 'beaches', 'surf', 'surfing', 'mirissa', 'bentota', 'arugam', 'nilaveli', 'pasikuda', 'unawatuna', 'hikkaduwa', 'whale', 'turtle')) {
            return "🏖️ **Best Beach Regions in Sri Lanka**:\n\n" +
                   "• **Mirissa**: Blue whale watching tours (Nov-Apr), Coconut Tree Hill & surfing.\n" +
                   "• **Bentota**: Premier water sports hub (jet skis, banana boats) & turtle conservation hatcheries.\n" +
                   "• **Arugam Bay**: World-famous point breaks for surf enthusiasts (May-Sep).\n" +
                   "• **Nilaveli & Pigeon Island**: Crystal turquoise waters for snorkeling with reef sharks and sea turtles.\n" +
                   "🏨 **Beach Resorts**: Taj Bentota Resort, Mandara Mirissa, Uga Jungle Beach Trincomalee.";
        }

        // 9. Hotels & Accommodations across 25 Districts
        if (includes('hotel', 'hotels', 'heotel', 'stay', 'stays', 'resort', 'resorts', 'villa', 'hostel', 'room', 'luxury', '5 star', 'budget')) {
            return "🏨 **Sri Lanka Hotel Recommendations**:\n\n" +
                   "• **5-Star Luxury**: Shangri-La Colombo, Heritance Kandalama, 98 Acres Ella, Taj Bentota, Jetwing Jaffna.\n" +
                   "• **Middle-Class / Heritage**: Galle Face Hotel Colombo, Cinnamon Citadel Kandy, Hotel Sigiriya, Ekho Lake House Polonnaruwa.\n" +
                   "• **Budget & Hostels**: Clock Inn Colombo, Hangover Hostels Ella, Zostel Galle ($15 - $30/night).\n\n" +
                   "💡 *Tip*: You can search hotels by all 25 Districts in our **Hotels** tab!";
        }

        // 10. Weather & Seasons
        if (includes('weather', 'season', 'climate', 'rain', 'monsoon', 'when to visit', 'best time', 'temp', 'temperature')) {
            return "☀️ **Sri Lanka Weather & Travel Seasons**:\n\n" +
                   "• **South & West Coasts + Hill Country** (Colombo, Galle, Bentota, Kandy, Ella):\n" +
                   "  👉 **Best Season**: November to April (Dry, sunny, clear seas).\n\n" +
                   "• **East Coast & Cultural North** (Trincomalee, Arugam Bay, Pasikuda, Jaffna):\n" +
                   "  👉 **Best Season**: May to October (Calm seas, perfect for surfing & beach resorts).\n\n" +
                   "Year-round temperatures average 27°C - 30°C in coastal areas, and 15°C - 20°C in Nuwara Eliya.";
        }

        // 11. Food & Local Cuisine
        if (includes('food', 'eat', 'cuisine', 'curry', 'hopper', 'kottu', 'seafood', 'dish', 'tea', 'dining')) {
            return "🍛 **Must-Try Sri Lankan Culinary Delights**:\n\n" +
                   "1. **Kottu Roti**: Chopped flatbread wok-fried with vegetables, eggs, spices, and chicken/cheese.\n" +
                   "2. **Egg Hoppers (Appa)**: Crispy bowl-shaped rice flour crepes with a soft poached egg center.\n" +
                   "3. **Ceylon Black Pork Curry**: Slow-cooked aromatic roasted curry.\n" +
                   "4. **Lagoon Crab & Seafood**: Fresh daily catches in Galle, Mirissa, and Colombo.\n" +
                   "5. **Pure Ceylon Tea**: Freshly brewed highland tea from Nuwara Eliya estates.";
        }

        // 12. Transportation & Intercity Travel
        if (includes('transport', 'bus', 'train', 'taxi', 'driver', 'cab', 'car', 'tuktuk', 'tuk tuk', 'airport')) {
            return "🚖 **Getting Around Sri Lanka**:\n\n" +
                   "• **Scenic Train**: Kandy to Ella train is a must-experience. Reserve 1st/2nd class tickets 30 days ahead.\n" +
                   "• **Tuk-Tuks**: Perfect for short city rides. Always ask to use the meter or negotiate before entering.\n" +
                   "• **Private Car & Driver**: Most convenient way for multi-city 7-14 day itineraries.\n" +
                   "• **Highway Express Buses**: Fast routes connecting Colombo, Galle, Matara, and Katunayake Airport.";
        }

        // 13. Visas & Entry Requirements
        if (includes('visa', 'eta', 'passport', 'entry', 'requirement', 'requirements', 'customs')) {
            return "🛂 **Sri Lanka Visa & Entry Info**:\n\n" +
                   "• **ETA (Electronic Travel Authorization)**: Travelers can apply online via `eta.gov.lk` prior to arrival.\n" +
                   "• **Validity**: 30-day Tourist Visa with double entry options for most nationalities.\n" +
                   "• **Passport Requirement**: Passport must be valid for at least 6 months from the date of arrival.\n" +
                   "• **Visa on Arrival**: Available at Katunayake Airport (BIA) for select countries, though online ETA is recommended for faster immigration.";
        }

        // 14. Currency, Money & ATMs
        if (includes('currency', 'money', 'lkr', 'usd', 'dollar', 'rupee', 'rupees', 'atm', 'credit card', 'exchange', 'cost')) {
            return "💵 **Money & Currency in Sri Lanka**:\n\n" +
                   "• **Local Currency**: Sri Lankan Rupee (LKR 🇱🇰).\n" +
                   "• **ATMs**: Widely available in major cities (Commercial Bank, Sampath, HNB) accepting Visa/MasterCard.\n" +
                   "• **Cards**: Accepted in 4 & 5-star hotels and fine restaurants; cash (LKR) is needed for local tuk-tuks, markets, & entrance tickets.\n" +
                   "• **Tip**: Exchange currency at Katunayake BIA Airport arrival hall for reliable official rates.";
        }

        // 15. Anuradhapura, Polonnaruwa & Cultural Triangle
        if (includes('anuradhapura', 'polonnaruwa', 'ruwanweli', 'vatadage', 'ancient city', 'ruins', 'cultural triangle')) {
            return "🏛️ **Ancient Kingdoms of Sri Lanka**:\n\n" +
                   "• **Anuradhapura**: 1st ancient capital featuring Jaya Sri Maha Bodhi (2,300+ year old sacred tree) and massive white stupas (Ruwanwelisaya, Jetavanaramaya).\n" +
                   "• **Polonnaruwa**: 2nd medieval kingdom with Gal Vihara rock statues, Royal Palace ruins, and Quadrangle.\n" +
                   "💡 *Tip*: Renting a bicycle is the best way to explore both expansive archaeological parks!";
        }

        // 16. Jaffna, Trincomalee & Northern Coast
        if (includes('jaffna', 'trincomalee', 'nallur', 'koneswaram', 'pigeon island', 'nilaveli', 'north')) {
            return "🌴 **Northern & Eastern Gems**:\n\n" +
                   "• **Jaffna**: Vibrant Tamil culture, Nallur Kandaswamy Kovil, Jaffna Fort, and Nagadeepa Island.\n" +
                   "• **Trincomalee**: Koneswaram Hindu Temple cliff, Fort Frederick, and Nilaveli Beach with Pigeon Island snorkeling.\n" +
                   "🏨 **Popular Hotels**: Jetwing Jaffna, Fox Resort Jaffna, Uga Jungle Beach Trincomalee.";
        }

        // 17. Adam's Peak (Sri Pada) & Mountain Treks
        if (includes('adam', 'adams peak', 'sri pada', 'hiking', 'trek', 'trekking', 'mountain', 'knuckles')) {
            return "🏔️ **Highland Hikes & Pilgrimages**:\n\n" +
                   "• **Adam's Peak (Sri Pada)**: Sacred mountain peak. Pilgrimage season runs from December to May (night climbs for golden sunrise).\n" +
                   "• **Knuckles Mountain Range**: UNESCO protected wilderness ideal for multi-day jungle trekking and waterfall chasing.\n" +
                   "• **Little Adam's Peak & Ella Rock**: Easy to moderate half-day hikes near Ella town.";
        }

        // 18. System Navigation & Help
        if (includes('admin', 'login', 'account', 'booking', 'bookings', 'profile', 'app', 'register', 'help')) {
            return "⚙️ **TravelGuider Application Tips**:\n\n" +
                   "• **Explore Destinations**: Click 'Destinations' to view 16+ top places with nearby hotels.\n" +
                   "• **Filter Hotels**: Use the 25-District and Star Category filter in the 'Hotels' tab.\n" +
                   "• **Manage Bookings**: View and cancel your hotel stays in 'My Bookings'.\n" +
                   "• **Admin Portal**: Admin credentials: `admin@travelguider.com` / `admin123`.";
        }

        // Default Intelligent Fallback
        return "I would be happy to help you with that! 🇱🇰\n\n" +
               "You can ask me about:\n" +
               "• **Destinations**: Sigiriya, Ella, Kandy, Galle Fort, Nuwara Eliya, Yala, Jaffna, Trincomalee\n" +
               "• **Hotels**: 5-Star luxury, middle class, or budget stays across 25 districts\n" +
               "• **Activities**: Safaris, whale watching, train rides, surfing, tea tasting\n" +
               "• **Travel Tips**: Visas, ATMs/Currency, Weather seasons, local food, and transport\n\n" +
               "What would you like to explore next?";
    };

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userText = text;
        const newMessages = [...messages, { role: 'user', text: userText, time: 'Just now' }];
        setMessages(newMessages);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const botReply = generateBotResponse(userText);
            setMessages(prev => [...prev, { role: 'bot', text: botReply, time: 'Just now' }]);
            setIsTyping(false);
        }, 600);
    };

    const suggestionChips = [
        "Top Destinations",
        "5-Star Hotels",
        "Best Weather Seasons",
        "Wildlife Safaris",
        "Visa & Entry Info",
        "Highland Hikes"
    ];

    return (
        <div className="h-screen w-full relative flex flex-col bg-slate-950 font-sans">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-20 blur-sm"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950"></div>
            </div>

            {/* Header */}
            <header className="relative z-10 h-20 flex items-center justify-between px-6 md:px-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                        title="Back to Dashboard"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <Bot size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg md:text-xl font-black text-white tracking-tight">TravelGuider AI</span>
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                            </span>
                        </div>
                        <p className="text-xs text-white/50 font-medium">Smart Travel Assistant for Sri Lanka</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/plan-trip')}
                        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
                    >
                        <Sparkles size={14} /> Plan Trip Now
                    </button>
                </div>
            </header>

            {/* Chat Body */}
            <main className="relative z-10 flex-1 overflow-y-auto p-6 md:p-10 space-y-6 max-w-5xl mx-auto w-full">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        {msg.role === 'bot' && (
                            <div className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center text-primary flex-shrink-0 mt-1 shadow-lg shadow-primary/10">
                                <Bot size={20} />
                            </div>
                        )}

                        <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-5 sm:p-6 shadow-xl ${
                            msg.role === 'user'
                                ? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-tr-none'
                                : 'bg-white/10 backdrop-blur-xl border border-white/15 text-gray-100 rounded-tl-none'
                        }`}>
                            <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-medium">
                                {msg.text}
                            </div>
                            <span className={`text-[10px] font-bold mt-3 block ${msg.role === 'user' ? 'text-white/60 text-right' : 'text-gray-400'}`}>
                                {msg.time}
                            </span>
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-slate-950 font-black text-xs flex-shrink-0 mt-1 shadow-lg">
                                You
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4 justify-start animate-fade-in">
                        <div className="w-10 h-10 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                            <Bot size={20} />
                        </div>
                        <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl rounded-tl-none p-5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
            </main>

            {/* Quick Suggestions Chips */}
            <div className="relative z-10 px-6 md:px-10 max-w-5xl mx-auto w-full pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {suggestionChips.map((chip, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="whitespace-nowrap px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
                    >
                        <Sparkles size={12} className="text-amber-400" /> {chip}
                    </button>
                ))}
            </div>

            {/* Footer Input Bar */}
            <footer className="relative z-10 p-6 md:px-10 max-w-5xl mx-auto w-full">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl focus-within:border-primary/50 transition-all"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask TravelGuider AI anything about Sri Lanka travel..."
                        className="w-full bg-transparent text-white placeholder-gray-400 text-sm sm:text-base px-4 py-3 focus:outline-none font-medium"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-500 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-all shadow-lg flex-shrink-0"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Chatbot;
