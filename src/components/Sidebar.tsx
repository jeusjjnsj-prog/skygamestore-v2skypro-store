import React from 'react';
import { 
  Home, 
  Gamepad2, 
  Tag, 
  Gift, 
  Star, 
  Headphones, 
  Crown 
} from 'lucide-react';

export type NavSection = 'home' | 'all-games' | 'promotions' | 'codes' | 'popular' | 'support';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenVipModal: () => void;
  currentLang: 'KH' | 'EN';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  onOpenVipModal,
  currentLang,
}) => {
  const navItems: { id: NavSection; labelKh: string; labelEn: string; icon: React.ReactNode }[] = [
    { id: 'home', labelKh: 'ទំព័រដើម', labelEn: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'all-games', labelKh: 'ហ្គេមទាំងអស់', labelEn: 'All Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'promotions', labelKh: 'ប្រូម៉ូសិន', labelEn: 'Promotions', icon: <Tag className="w-4 h-4" /> },
    { id: 'codes', labelKh: 'កូដ & បញ្ចុះតម្លៃ', labelEn: 'Codes & Discounts', icon: <Gift className="w-4 h-4" /> },
    { id: 'popular', labelKh: 'ពេញនិយម', labelEn: 'Popular', icon: <Star className="w-4 h-4" /> },
    { id: 'support', labelKh: 'ជំនួយ', labelEn: 'Support', icon: <Headphones className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-4">
      {/* Navigation Menu Card */}
      <div 
        id="sidebar-nav-card" 
        className="bg-[#0b1222]/90 border border-slate-800/80 rounded-2xl p-2.5 shadow-xl backdrop-blur-sm"
      >
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectSection(item.id)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{currentLang === 'KH' ? item.labelKh : item.labelEn}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* VIP Customer Card */}
      <div 
        id="vip-customer-card" 
        className="bg-gradient-to-b from-[#141b2e] to-[#0d1424] border border-amber-500/30 rounded-2xl p-4 shadow-xl relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-amber-400 mb-1.5">
          <Crown className="w-5 h-5 fill-amber-400/20 stroke-amber-400" />
          <h3 className="font-bold text-sm tracking-wide">
            {currentLang === 'KH' ? 'អតិថិជន VIP' : 'VIP Member'}
          </h3>
        </div>

        <p className="text-xs text-slate-400 mb-3.5 leading-relaxed">
          {currentLang === 'KH' 
            ? 'ទទួលបានអត្ថប្រយោជន៍ច្រើនជាង' 
            : 'Get exclusive discounts and early access'}
        </p>

        <button
          id="vip-join-button"
          onClick={onOpenVipModal}
          className="w-full py-2 px-3 rounded-xl border border-amber-400/60 text-amber-400 hover:bg-amber-400 hover:text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
        >
          {currentLang === 'KH' ? 'ចូលរួមឥឡូវនេះ' : 'Join Now'}
        </button>
      </div>
    </aside>
  );
};
