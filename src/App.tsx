import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavSection } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { HotDeals } from './components/HotDeals';
import { PopularGames } from './components/PopularGames';
import { RightSidebar } from './components/RightSidebar';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { GameDetailModal } from './components/GameDetailModal';
import { VipModal } from './components/VipModal';
import { GiftCardModal } from './components/GiftCardModal';
import { 
  HOT_DEALS, 
  POPULAR_GAMES, 
  SPECIAL_GIFT_CARDS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { Game, GiftCard, CartItem, UserProfile, NotificationItem } from './types';

export default function App() {
  // Navigation & Language
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [currentLang, setCurrentLang] = useState<'KH' | 'EN'>('KH');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [selectedGameForDetail, setSelectedGameForDetail] = useState<Game | null>(null);
  const [isVipOpen, setIsVipOpen] = useState(false);
  const [selectedGiftCardForDetail, setSelectedGiftCardForDetail] = useState<GiftCard | null>(null);

  // User State
  const [user, setUser] = useState<UserProfile>({
    isLoggedIn: false,
    name: 'ភ្ញៀវ',
    email: '',
    isVip: false,
    walletBalance: 0,
  });

  // Notifications State (starts with 3 notifications, matching screenshot red badge "3")
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Cart State (pre-populated with 2 items to match red badge "2" in screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      game: HOT_DEALS[0], // EA SPORTS FC 25
      quantity: 1,
      selectedPlatform: 'PC',
    },
    {
      id: 'cart-2',
      game: HOT_DEALS[1], // GTA V
      quantity: 1,
      selectedPlatform: 'PC',
    }
  ]);

  // Cart Handlers
  const handleAddToCart = (game: Game, platform: string = 'PC') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.game.id === game.id && item.selectedPlatform === platform);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          game,
          quantity: 1,
          selectedPlatform: platform,
        }
      ];
    });
  };

  const handleAddGiftCardToCart = (giftCard: GiftCard) => {
    // Adapt GiftCard to Game interface for cart
    const pseudoGame: Game = {
      id: `gift-${giftCard.id}`,
      title: `${giftCard.title} ($${giftCard.value})`,
      platforms: ['Digital Code'],
      price: giftCard.price,
      originalPrice: giftCard.value,
      discountPercent: giftCard.discountPercent,
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
      category: 'giftcard',
    };
    handleAddToCart(pseudoGame, 'Digital Code');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Auth Handlers
  const handleLogin = (name: string, email: string) => {
    setUser({
      isLoggedIn: true,
      name,
      email,
      isVip: false,
      walletBalance: 25.00,
    });
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: 'ភ្ញៀវ',
      email: '',
      isVip: false,
      walletBalance: 0,
    });
  };

  const handleUpgradeToVip = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: true,
      name: prev.name === 'ភ្ញៀវ' ? 'VIP Gamer' : prev.name,
      isVip: true,
      vipTier: 'Gold',
      walletBalance: prev.walletBalance + 10.00,
    }));
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Filtered games based on search and category
  const filteredHotDeals = useMemo(() => {
    return HOT_DEALS.filter((game) => {
      const matchSearch = searchQuery.trim() === '' || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (game.originalTitle && game.originalTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === 'all' || game.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  const filteredPopularGames = useMemo(() => {
    return POPULAR_GAMES.filter((game) => {
      const matchSearch = searchQuery.trim() === '' || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || game.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-['Kantumruy_Pro',sans-serif]">
      {/* Top Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => {
          setAuthInitialMode('login');
          setIsAuthOpen(true);
        }}
        user={user}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        currentLang={currentLang}
        onToggleLang={setCurrentLang}
      />

      {/* Main 3-Column Page Body */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row items-start gap-4">
          
          {/* Left Column: Navigation Sidebar & VIP Card */}
          <Sidebar
            activeSection={activeSection}
            onSelectSection={(sec) => {
              setActiveSection(sec);
              if (sec === 'popular') {
                document.getElementById('popular-games-section')?.scrollIntoView({ behavior: 'smooth' });
              } else if (sec === 'promotions' || sec === 'all-games') {
                document.getElementById('hot-deals-section')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onOpenVipModal={() => setIsVipOpen(true)}
            currentLang={currentLang}
          />

          {/* Center Column: Hero Banner, Categories, Hot Deals, Popular Games */}
          <div className="flex-1 min-w-0 space-y-4 w-full">
            {/* Top Hero Banner with Futuristic Cyberpunk Artwork */}
            <HeroBanner
              onExploreAll={() => {
                document.getElementById('hot-deals-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              currentLang={currentLang}
            />

            {/* Category Pills Bar (PC, PlayStation, Xbox, Nintendo, Mobile, Gift Card, Others) */}
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              currentLang={currentLang}
            />

            {/* Hot Deals (4-card grid: FC 25, GTA V, COD MW3, Minecraft) */}
            <HotDeals
              games={filteredHotDeals}
              onAddToCart={(game) => {
                handleAddToCart(game);
                setIsCartOpen(true);
              }}
              onSelectGame={setSelectedGameForDetail}
              onViewAll={() => setSelectedCategory('all')}
              currentLang={currentLang}
            />

            {/* Popular Games Section */}
            <PopularGames
              games={filteredPopularGames}
              onAddToCart={(game) => {
                handleAddToCart(game);
                setIsCartOpen(true);
              }}
              onSelectGame={setSelectedGameForDetail}
              onViewAll={() => setSelectedCategory('all')}
              currentLang={currentLang}
            />
          </div>

          {/* Right Column: User Card, 5% Promo Card, Special Gift Cards */}
          <RightSidebar
            user={user}
            onOpenAuth={() => {
              setAuthInitialMode('login');
              setIsAuthOpen(true);
            }}
            onRegisterPromo={() => {
              setAuthInitialMode('register');
              setIsAuthOpen(true);
            }}
            giftCards={SPECIAL_GIFT_CARDS}
            onSelectGiftCard={setSelectedGiftCardForDetail}
            onViewAllGiftCards={() => {
              setSelectedCategory('giftcard');
              document.getElementById('category-bar-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            currentLang={currentLang}
          />

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] py-6 px-4 text-center text-xs text-slate-500 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-['Plus_Jakarta_Sans',sans-serif]">SkyGame Store</span>
            <span>•</span>
            <span>{currentLang === 'KH' ? 'វេទិកាលក់ហ្គេមឌីជីថលសុវត្ថិភាពខ្ពស់' : 'Secure Digital Gaming Store'}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>© 2025 SkyGame. All rights reserved.</span>
            <span>KHQR / ABA / Wing / Bakong</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentLang={currentLang}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialMode={authInitialMode}
        currentLang={currentLang}
      />

      <GameDetailModal
        game={selectedGameForDetail}
        onClose={() => setSelectedGameForDetail(null)}
        onAddToCart={(game, platform) => {
          handleAddToCart(game, platform);
          setIsCartOpen(true);
          setSelectedGameForDetail(null);
        }}
        currentLang={currentLang}
      />

      <VipModal
        isOpen={isVipOpen}
        onClose={() => setIsVipOpen(false)}
        user={user}
        onUpgradeToVip={handleUpgradeToVip}
        currentLang={currentLang}
      />

      <GiftCardModal
        giftCard={selectedGiftCardForDetail}
        onClose={() => setSelectedGiftCardForDetail(null)}
        onAddToCart={handleAddGiftCardToCart}
        currentLang={currentLang}
      />
    </div>
  );
}
