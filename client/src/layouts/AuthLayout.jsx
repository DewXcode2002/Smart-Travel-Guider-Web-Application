import React from 'react';

const AuthLayout = ({ children, title, subtitle, showImage = true }) => {
    return (
        <div className="flex h-screen w-full bg-[#f8fafc]">
            {showImage && (
                <div className="hidden lg:flex lg:flex-[1.4] relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] ease-linear group-hover:scale-125"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/40 to-transparent" />

                    <div className="absolute top-16 left-16 z-20">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                                <div className="w-6 h-6 bg-primary rounded-lg"></div>
                            </div>
                            <span className="text-white font-black uppercase tracking-[0.4em] text-xs">TravelGuider</span>
                        </div>
                    </div>

                    <div className="absolute bottom-20 left-20 z-20 max-w-2xl animate-fade-in">
                        <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] bg-primary/10 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 mb-6 inline-block">Elite Travel Experience</span>
                        <h1 className="text-7xl font-black text-white leading-tight tracking-tighter mb-6">
                            Discover the <br />
                            <span className="text-gradient">Unknown</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-md">
                            Join our exclusive community of world explorers and experience Sri Lanka like never before.
                        </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/20 rounded-full blur-[120px]" />
                </div>
            )}

            <div className={`flex-1 flex flex-col items-center py-12 px-6 sm:px-12 lg:px-16 bg-white overflow-y-auto relative`}>
                <div className="w-full max-w-md my-auto animate-slide-in">
                    <div className="mb-10 pt-2">
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <div className="w-5 h-5 bg-primary rounded-md"></div>
                            </div>
                            <span className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px]">TravelGuider</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter mb-3 leading-[1.15] pt-1">
                            {title}
                        </h2>
                        <p className="text-slate-500 font-medium text-base sm:text-lg">{subtitle}</p>
                    </div>
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>

                {/* Background Subtle Detail */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mb-32 -z-0" />
            </div>
        </div>
    );
};

export default AuthLayout;
