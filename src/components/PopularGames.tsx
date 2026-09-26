import React from 'react';
import { Star, ArrowRight, ShoppingCart, Monitor } from 'lucide-react';
import { Game } from '../types';

interface PopularGamesProps {
  games: Game[];
  onAddToCart: (game: Game) => void;
  onSelectGame: (game: Game) => void;
  onViewAll: () => void;
  currentLang: 'KH' | 'EN';
}

export const PopularGames: React.FC<PopularGamesProps> = ({
  games,
  onAddToCart,
  onSelectGame,
  onViewAll,
  currentLang,
}) => {
  return (
    <section id="popular-games-section" className="w-full space-y-4 pt-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center">
            <Star className="w-4 h-4 fill-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {currentLang === 'KH' ? 'ហ្គេមពេញនិយម' : 'Popular Games'}
          </h2>
        </div>

        <button
          id="popular-games-view-all"
          onClick={onViewAll}
          className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <span>{currentLang === 'KH' ? 'មើលទាំងអស់' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of Popular Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            id={`popular-card-${game.id}`}
            className="group relative bg-[#0c1424] hover:bg-[#111a2f] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1"
          >
            {/* Cover */}
            <div 
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer mb-3 bg-slate-900"
              onClick={() => onSelectGame(game)}
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {game.discountPercent > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white font-black text-xs px-2 py-0.5 rounded-md shadow-md">
                  -{game.discountPercent}%
                </div>
              )}

              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-amber-400 px-2 py-0.5 rounded text-[11px] font-bold">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{game.rating}</span>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <h3 
                  onClick={() => onSelectGame(game)}
                  className="font-bold text-sm text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                  title={game.title}
                >
                  {game.title}
                </h3>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mt-1">
                  <Monitor className="w-3 h-3 text-slate-400" />
                  <span>{game.platforms.join(' | ')}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="pt-2">
                <div className="flex items-baseline gap-2 mb-2.5">
                  <span className="text-base font-extrabold text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                    ${game.price.toFixed(2)}
                  </span>
                  {game.originalPrice > game.price && (
                    <span className="text-xs text-slate-400 line-through font-['Plus_Jakarta_Sans',sans-serif]">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  id={`btn-add-popular-${game.id}`}
                  onClick={() => onAddToCart(game)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{currentLang === 'KH' ? 'បញ្ចូលកន្ត្រក' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
