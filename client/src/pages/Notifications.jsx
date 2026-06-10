import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from 'lucide-react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            icon: CheckCircle,
            title: 'Booking Confirmed',
            message: 'Your booking at Galle Face Hotel has been confirmed for Feb 15, 2026.',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'info',
            icon: Info,
            title: 'New Destination Added',
            message: 'Check out our newly added destination: Horton Plains National Park!',
            time: '5 hours ago',
            read: false
        },
        {
            id: 3,
            type: 'warning',
            icon: AlertCircle,
            title: 'Weather Alert',
            message: 'Heavy rain expected in Ella region this weekend. Plan accordingly.',
            time: '1 day ago',
            read: true
        },
        {
            id: 4,
            type: 'info',
            icon: Calendar,
            title: 'Trip Reminder',
            message: 'Your trip to Sigiriya starts in 3 days. Don\'t forget to pack!',
            time: '2 days ago',
            read: true
        }
    ]);

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getTypeStyles = (type) => {
        switch (type) {
            case 'success': return 'bg-emerald-50 border-emerald-100 text-emerald-600';
            case 'warning': return 'bg-amber-50 border-amber-100 text-amber-600';
            case 'info': return 'bg-blue-50 border-blue-100 text-blue-600';
            default: return 'bg-gray-50 border-gray-100 text-gray-600';
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-2">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em] bg-secondary/5 px-4 py-1.5 rounded-full border border-secondary/10">Communications Center</span>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight">
                            Personal <span className="text-gradient">Notifications</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg">Stay updated with your travel plans and platform alerts.</p>
                    </div>
                    {notifications.some(n => !n.read) && (
                        <button onClick={markAllAsRead} className="text-primary font-black text-xs uppercase tracking-widest bg-primary/5 px-8 py-4 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5">
                            Clear Unread
                        </button>
                    )}
                </header>

                <div className="space-y-6">
                    {notifications.length === 0 ? (
                        <div className="py-20 text-center glass rounded-[3rem] border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold">Your inbox is empty.</p>
                        </div>
                    ) : (
                        notifications.map((notif, i) => {
                            const Icon = notif.icon;
                            return (
                                <div
                                    key={notif.id}
                                    onClick={() => markAsRead(notif.id)}
                                    className={`p-10 rounded-[3rem] transition-all hover:shadow-hover cursor-pointer border flex flex-col md:flex-row gap-8 items-center group animate-slide-in ${notif.read ? 'bg-white/50 border-gray-100 opacity-60' : 'bg-white border-white shadow-xl shadow-slate-200/50'
                                        }`}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${getTypeStyles(notif.type)}`}>
                                        <Icon size={32} />
                                    </div>
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                            <h3 className="text-2xl font-black text-gray-900">{notif.title}</h3>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{notif.time}</span>
                                        </div>
                                        <p className="text-gray-500 font-medium text-lg leading-relaxed">{notif.message}</p>
                                    </div>
                                    {!notif.read && (
                                        <div className="w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/20 animate-pulse hidden md:block" />
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default Notifications;
