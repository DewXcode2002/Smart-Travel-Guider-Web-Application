import React, { useState } from 'react';
import { Bot, PlusCircle, Mic, Send, ArrowRight, Settings, Bell, Moon } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your personal travel assistant for Sri Lanka. How can I help you plan your perfect getaway today?", time: 'Just now' }
    ]);
    const [input, setInput] = useState('');

    const mockReplies = {
        "kandy": "A 3-day trip to Kandy sounds wonderful! I recommend visiting the Temple of the Tooth, morning walks by the Kandy Lake, and a day trip to the Royal Botanical Gardens.",
        "beaches": "Sri Lanka has stunning beaches! Mirissa is great for surfing/whales, Unawatuna for relaxing, and Nilaveli for pristine white sands.",
        "colombo": "Colombo is vibrant! Don't miss the Lotus Tower, Gangaramaya Temple, and sunset at Galle Face Green."
    };

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user', text, time: 'Just now' }];
        setMessages(newMessages);
        setInput('');

        // Mock bot reply
        setTimeout(() => {
            let botReply = "I'm still learning about that! Try asking about Kandy, Beaches, or Colombo.";
            const lowerText = text.toLowerCase();
            if (lowerText.includes('kandy')) botReply = mockReplies.kandy;
            else if (lowerText.includes('beach')) botReply = mockReplies.beaches;
            else if (lowerText.includes('colombo')) botReply = mockReplies.colombo;

            setMessages(prev => [...prev, { role: 'bot', text: botReply, time: 'Just now' }]);
        }, 800);
    };

    return (
        <div className="h-screen w-full relative flex flex-col bg-slate-900">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-30 blur-sm"
                    alt="BG"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900"></div>
            </div>

            <header className="relative z-10 h-20 flex items-center justify-between px-10 bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <Bot size={24} />
                    </div>
                    <span className="text-xl font-black text-white tracking-tight">AI Travel Assistant</span>
                </div>
                <div className="flex items-center gap-6 text-white/60">
                    <Bell size={20} className="hover:text-white cursor-pointer" />
                    <Settings size={20} className="hover:text-white cursor-pointer" />
                    <Moon size={20} className="hover:text-white cursor-pointer" />
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto px-6 py-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] ${msg.role === 'user' ? 'space-y-4' : 'flex gap-4'}`}>
                                {msg.role === 'bot' && (
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-lg">
                                        <Bot size={20} />
                                    </div>
                                )}
                                <div>
                                    {msg.role === 'bot' && (
                                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5 ml-1">
                                            TravelGuider AI • {msg.time}
                                        </div>
                                    )}
                                    <div className={`p-5 rounded-2xl shadow-xl leading-relaxed font-medium ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white text-slate-800 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Quick Prompts */}
                    <div className="flex flex-col items-end gap-3 mt-12">
                        {[
                            "Plan a 3 day trip to Kandy",
                            "Best beaches in Sri Lanka",
                            "What's the weather like in Galle?"
                        ].map((text, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(text)}
                                className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-white font-bold py-3 px-6 rounded-2xl flex items-center justify-between gap-6 hover:bg-primary/30 transition-all hover:-translate-x-2 group w-fit"
                            >
                                {text}
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="relative z-10 p-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-2 flex items-center gap-4 shadow-inner focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                        <button className="p-3 text-slate-400 hover:text-primary transition-colors">
                            <PlusCircle size={24} />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message here..."
                            className="flex-1 bg-transparent border-none outline-none text-slate-900 font-medium py-2"
                        />
                        <div className="flex items-center gap-3 pr-2">
                            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                <Mic size={22} />
                            </button>
                            <button
                                onClick={() => handleSend()}
                                className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all transform active:scale-90"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                        TravelGuider AI can make mistakes. Consider checking important travel information.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Chatbot;
