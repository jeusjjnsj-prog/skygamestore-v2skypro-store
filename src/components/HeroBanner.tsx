import React from 'react';
import { ShieldCheck, Zap, Headphones, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  onExploreAll: () => void;
  currentLang: 'KH' | 'EN';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreAll, currentLang }) => {
  return (
    <div 
      id="hero-banner-section" 
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a1228] via-[#0e1938] to-[#12224d] border border-blue-900/40 p-6 md:p-8 shadow-2xl"
    >
      {/* Background Graphic Elements & Ambient Glow */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none opacity-40 md:opacity-75 overflow-hidden">
        {/* Neon blue and purple radial glow */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -top-10 right-32 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl" />
        
        {/* Background Gaming Montage Overlay */}
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop" 
          alt="Gaming Art Montage" 
          className="w-full h-full object-cover object-center mix-blend-overlay filter brightness-90 contrast-125"
        />
      </div>

      {/* Hero Content Left */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-md">
          {currentLang === 'KH' ? (
            <>
              ទិញហ្គេមយកប្រៀបជាបស្ស៊ីរ៉េត <br />
              <span className="text-amber-400">តម្លៃល្អ បញ្ជូនរហ័ស</span>
            </>
          ) : (
            <>
              Genuine Digital Games <br />
              <span className="text-amber-400">Best Price, Instant Delivery</span>
            </>
          )}
        </h1>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium mb-6">
          <div className="flex items-center gap-1.5 text-amber-400">
            <ShieldCheck className="w-4 h-4 fill-amber-400/20 stroke-amber-400" />
            <span className="text-slate-200">
              {currentLang === 'KH' ? 'សុវត្ថិភាព 100%' : '100% Secure'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Zap className="w-4 h-4 fill-amber-400/20 stroke-amber-400" />
            <span className="text-slate-200">
              {currentLang === 'KH' ? 'បញ្ជូនរហ័ស' : 'Instant Delivery'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Headphones className="w-4 h-4 fill-amber-400/20 stroke-amber-400" />
            <span className="text-slate-200">
              {currentLang === 'KH' ? 'ជំនួយ 24/7' : '24/7 Support'}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          id="hero-explore-games-button"
          onClick={onExploreAll}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-400/25 active:scale-95 transition-all"
        >
          <span>{currentLang === 'KH' ? 'មើលហ្គេមទាំងអស់' : 'Explore All Games'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Decorative "PLAY MORE PAY LESS" typography on right */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center select-none pointer-events-none">
        <div className="relative transform -rotate-6 font-['Plus_Jakarta_Sans',sans-serif]">
          <span className="text-3xl lg:text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] block text-right">
            PLAY
          </span>
          <span className="text-3xl lg:text-4xl font-black italic tracking-tighter text-amber-400 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)] block text-right -mt-2">
            MORE
          </span>
          <span className="text-2xl lg:text-3xl font-black italic tracking-wider text-slate-100 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] block text-right -mt-1">
            PAY LESS
          </span>
        </div>
      </div>
    </div>
  );
};
