export interface Game {
  id: string;
  title: string;
  originalTitle?: string;
  platforms: string[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  coverImage: string;
  category: 'pc' | 'playstation' | 'xbox' | 'nintendo' | 'mobile' | 'giftcard' | 'others';
  rating?: number;
  tags?: string[];
  description?: string;
  publisher?: string;
  releaseDate?: string;
  isHot?: boolean;
  isPopular?: boolean;
}

export interface GiftCard {
  id: string;
  title: string;
  value: number;
  price: number;
  discountPercent: number;
  icon: string;
  brand: string;
}

export interface CartItem {
  id: string;
  game: Game;
  quantity: number;
  selectedPlatform: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'sale' | 'order' | 'vip' | 'system';
}

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  email: string;
  isVip: boolean;
  vipTier?: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  walletBalance: number;
}
