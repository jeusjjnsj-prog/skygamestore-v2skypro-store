import React, { useState } from 'react';
import { 
  Gamepad2, 
  Search, 
  Globe, 
  Bell, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Check,
  X
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  user: UserProfile;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  currentLang: 'KH' | 'EN';
  onToggleLang: (lang: 'KH' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenAuth,
  user,
  notifications,
  onMarkNotificationsRead,
  currentLang,
  onToggleLang,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-40 bg-[#070b13]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          id="brand-logo"
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-400/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Sky<span className="text-amber-400">Game</span>
              </span>
            </div>
            <span className="text-[9px] tracking-[0.2em] font-semibold text-slate-400 -mt-1 uppercase">
              Store
            </span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-md mx-2 md:mx-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="game-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={currentLang === 'KH' ? 'ស្វែងរកហ្គេម ឬកាតហ្គេម...' : 'Search games or gift cards...'}
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#0c1322] border border-slate-700/70 text-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Lang, Notifications, Cart, Auth */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              id="language-selector-button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 text-xs md:text-sm font-medium transition-colors"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-[#0d1527] border border-slate-700/80 rounded-xl shadow-xl py-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    onToggleLang('KH');
                    setShowLangMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 text-slate-200"
                >
                  <span className="flex items-center gap-2">🇰🇭 ខ្មែរ (KH)</span>
                  {currentLang === 'KH' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
                <button
                  onClick={() => {
                    onToggleLang('EN');
                    setShowLangMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-800 text-slate-200"
                >
                  <span className="flex items-center gap-2">🇺🇸 English</span>
                  {currentLang === 'EN' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              id="notifications-button"
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                if (unreadCount > 0) {
                  onMarkNotificationsRead();
                }
              }}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-[#070b13]">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-[#0d1527] border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="font-semibold text-slate-200">
                    {currentLang === 'KH' ? 'សារជូនដំណឹង' : 'Notifications'}
                  </span>
                  <span className="text-[10px] text-amber-400 font-medium">ថ្មីៗ</span>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-200 mb-1">
                        <span>{notif.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            id="shopping-cart-button"
            onClick={onOpenCart}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-[#070b13] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth / Profile Pill Button */}
          <button
            id="user-auth-button"
            onClick={onOpenAuth}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs md:text-sm shadow-md shadow-amber-400/20 active:scale-95 transition-all"
          >
            <div className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>
              {user.isLoggedIn 
                ? user.name 
                : currentLang === 'KH' ? 'ចូលគណនី' : 'Sign In'}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};
