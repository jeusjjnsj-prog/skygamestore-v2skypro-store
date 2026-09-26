import React, { useState } from 'react';
import { X, ShoppingCart, Star, ShieldCheck, Zap, Monitor, Check } from 'lucide-react';
import { Game } from '../types';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  onAddToCart: (game: Game, platform: string) => void;
  currentLang: 'KH' | 'EN';
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onAddToCart,
  currentLang,
}) => {
  if (!game) return null;

  const [selectedPlatform, setSelectedPlatform] = useState<string>(game.platforms[0] || 'PC');
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(game, selectedPlatform);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0d1527] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header / Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Banner / Cover image */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-950 shrink-0">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-[#0d1527]/40 to-transparent" />
          
          <div className="absolute top-4 left-4 bg-red-500 text-white font-black text-xs px-2.5 py-1 rounded-md shadow-lg">
            -{game.discountPercent}% OFF
          </div>

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              {game.title}
            </h2>
            {game.originalTitle && (
              <p className="text-xs text-slate-300 font-medium">{game.originalTitle}</p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Price & Platform Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block mb-0.5">
                {currentLang === 'KH' ? 'តម្លៃពិសេស' : 'Special Price'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                  ${game.price.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400 line-through font-['Plus_Jakarta_Sans',sans-serif]">
                  ${game.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Platform Selector */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block">
                {currentLang === 'KH' ? 'ជ្រើសរើស Platform' : 'Select Platform'}
              </span>
              <div className="flex gap-2">
                {game.platforms.map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setSelectedPlatform(plat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      selectedPlatform === plat
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              {currentLang === 'KH' ? 'ព័ត៌មានលម្អិត' : 'Description'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {game.description || 'ហ្គេមឌីជីថលសុទ្ធ 100% ទទួលបាន CD-Key ភ្លាមៗបន្ទាប់ពីការទូទាត់ប្រាក់។'}
            </p>
          </div>

          {/* Key Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center">
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-[11px] font-semibold text-slate-200">សុវត្ថិភាព 100%</span>
              <span className="text-[9px] text-slate-400">Official Key</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center">
              <Zap className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-[11px] font-semibold text-slate-200">បញ្ជូនរហ័ស</span>
              <span className="text-[9px] text-slate-400">Instant Email/SMS</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center text-center">
              <Star className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-[11px] font-semibold text-slate-200">{game.rating || 4.9}/5.0</span>
              <span className="text-[9px] text-slate-400">Verified Rating</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#090f1d] flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 hidden sm:block">
            {currentLang === 'KH' ? 'គាំទ្រការទូទាត់តាម ABA / Bakong / Wing' : 'Supports ABA, Bakong, Wing QR'}
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>{currentLang === 'KH' ? 'បានបញ្ចូល!' : 'Added!'}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                <span>{currentLang === 'KH' ? 'បញ្ចូលកន្ត្រក' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
