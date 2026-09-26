import React from 'react';
import { 
  User, 
  Crown, 
  Gamepad2, 
  ArrowRight, 
  Sparkles,
  Gift
} from 'lucide-react';
import { UserProfile, GiftCard, Game } from '../types';

interface RightSidebarProps {
  user: UserProfile;
  onOpenAuth: () => void;
  onRegisterPromo: () => void;
  giftCards: GiftCard[];
  onSelectGiftCard: (card: GiftCard) => void;
  onViewAllGiftCards: () => void;
  currentLang: 'KH' | 'EN';
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  user,
  onOpenAuth,
  onRegisterPromo,
  giftCards,
  onSelectGiftCard,
  onViewAllGiftCards,
  currentLang,
}) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
      {/* 1. User Greeting Card */}
      <div 
        id="right-user-card" 
        className="bg-[#0b1222]/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-400/20">
            <div className="w-full h-full rounded-full bg-[#0d1424] flex items-center justify-center text-amber-400">
              {user.isVip ? (
                <Crown className="w-6 h-6 fill-amber-400" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">
              {currentLang === 'KH' ? 'សួស្តី!' : 'Hello!'}
            </div>
            <div className="text-sm font-bold text-white">
              {user.isLoggedIn ? user.name : (currentLang === 'KH' ? 'ភ្ញៀវ' : 'Guest')}
            </div>
            {user.isLoggedIn && (
              <div className="text-[11px] text-amber-400 font-semibold">
                Wallet: ${user.walletBalance.toFixed(2)}
              </div>
            )}
          </div>
        </div>

        <button
          id="btn-sidebar-auth"
          onClick={onOpenAuth}
          className="w-full py-2 px-3 rounded-xl border border-slate-700 hover:border-amber-400/70 text-slate-200 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 text-xs font-semibold tracking-wide transition-all active:scale-95"
        >
          {user.isLoggedIn 
            ? (currentLang === 'KH' ? 'គណនីរបស់ខ្ញុំ' : 'My Account')
            : (currentLang === 'KH' ? 'ចូលគណនី / បង្កើតគណនី' : 'Login / Register')}
        </button>
      </div>

      {/* 2. Registration 5% Promo Card */}
      <div 
        id="right-promo-card" 
        className="relative bg-gradient-to-br from-[#131b33] via-[#0f172a] to-[#0a1020] border border-amber-500/25 rounded-2xl p-4 shadow-xl overflow-hidden"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/15 text-amber-400 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">
              {currentLang === 'KH' ? (
                <>
                  ចុះឈ្មោះ និងទទួលបាន <span className="text-amber-400 font-bold">បញ្ចុះតម្លៃ 5%</span> សម្រាប់ការទិញលើកដំបូង
                </>
              ) : (
                <>
                  Register now & get <span className="text-amber-400 font-bold">5% OFF</span> on your first game order!
                </>
              )}
            </p>
          </div>
        </div>

        <button
          id="btn-register-promo"
          onClick={onRegisterPromo}
          className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20 active:scale-95 transition-all"
        >
          <span>{currentLang === 'KH' ? 'ចុះឈ្មោះឥឡូវនេះ' : 'Register Now'}</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* 3. Special Promotions / Gift Cards Card */}
      <div 
        id="right-special-promos-card" 
        className="bg-[#0b1222]/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <Gift className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">
              {currentLang === 'KH' ? 'ប្រូម៉ូសិនពិសេស' : 'Special Promotions'}
            </h3>
          </div>

          {/* List of Gift Cards */}
          <div className="space-y-2.5">
            {giftCards.map((card) => (
              <div
                key={card.id}
                id={`gift-card-item-${card.id}`}
                onClick={() => onSelectGiftCard(card)}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-[#0e1628] hover:bg-[#141f38] border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  {/* Brand Icon Badge */}
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-xs font-bold text-white">
                    {card.icon === 'steam' && (
                      <span className="text-cyan-400 font-extrabold text-[10px]">STEAM</span>
                    )}
                    {card.icon === 'google-play' && (
                      <span className="text-emerald-400 font-extrabold text-[10px]">PLAY</span>
                    )}
                    {card.icon === 'roblox' && (
                      <span className="text-red-400 font-extrabold text-[10px]">ROBLOX</span>
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {card.title}
                    </div>
                    <div className="text-[11px] text-amber-400 font-semibold font-['Plus_Jakarta_Sans',sans-serif]">
                      ${card.value}
                    </div>
                  </div>
                </div>

                {/* Discount Badge */}
                <span className="bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                  -{card.discountPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <button
          id="btn-view-all-giftcards"
          onClick={onViewAllGiftCards}
          className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors pt-2 border-t border-slate-800/60"
        >
          <span>{currentLang === 'KH' ? 'មើលទាំងអស់' : 'View All'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
