import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currentLang: 'KH' | 'EN';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentLang,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [purchasedKeys, setPurchasedKeys] = useState<{ title: string; key: string }[]>([]);

  if (!isOpen) return null;

  const rawTotal = items.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  const discountAmount = discountApplied ? rawTotal * 0.05 : 0;
  const finalTotal = rawTotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toLowerCase() === 'sky5' || promoCode.trim().toLowerCase() === 'vip' || promoCode.trim().length > 0) {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    // Generate digital license keys for each item
    const keys = items.map((item) => ({
      title: item.game.title,
      key: `${item.game.id.toUpperCase().slice(0, 4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    }));
    setPurchasedKeys(keys);
    setCheckoutSuccess(true);
  };

  const handleResetCheckout = () => {
    setCheckoutSuccess(false);
    setPurchasedKeys([]);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090f1d] border-l border-slate-800 text-slate-100 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white">
                {currentLang === 'KH' ? 'កន្ត្រកទំនិញរបស់អ្នក' : 'Your Shopping Cart'}
              </h2>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {checkoutSuccess ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {currentLang === 'KH' ? 'ការទិញបានជោគជ័យ!' : 'Order Completed!'}
                </h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  {currentLang === 'KH'
                    ? 'កូដឌីជីថលរបស់អ្នកត្រូវបានបង្កើតរួចរាល់។ សូមចម្លងកូដខាងក្រោមដើម្បី activate ហ្គេម៖'
                    : 'Your digital keys have been generated. Copy the codes below to activate your games:'}
                </p>

                <div className="w-full space-y-2 text-left mt-2">
                  {purchasedKeys.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="text-xs font-bold text-amber-400 mb-1">{item.title}</div>
                      <div className="flex items-center justify-between bg-black/50 px-2.5 py-1.5 rounded border border-slate-700 font-mono text-xs text-emerald-400 select-all">
                        <span>{item.key}</span>
                        <span className="text-[10px] text-slate-400">CD-KEY</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{currentLang === 'KH' ? 'បានផ្ញើទៅអ៊ីមែលរបស់អ្នកផងដែរ' : 'Also sent to your email'}</span>
                </div>

                <button
                  onClick={handleResetCheckout}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all"
                >
                  {currentLang === 'KH' ? 'រួចរាល់' : 'Done'}
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                <ShoppingCart className="w-12 h-12 stroke-1 text-slate-600" />
                <p className="text-sm font-medium">
                  {currentLang === 'KH' ? 'កន្ត្រករបស់អ្នកទទេស្អាត' : 'Your cart is empty'}
                </p>
                <button
                  onClick={onClose}
                  className="text-xs text-amber-400 hover:underline"
                >
                  {currentLang === 'KH' ? 'បន្តរើសហ្គេម →' : 'Browse games →'}
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-[#0d1527] border border-slate-800 rounded-xl"
                >
                  <img
                    src={item.game.coverImage}
                    alt={item.game.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.game.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-400 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.selectedPlatform} Edition
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                        ${(item.game.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {!checkoutSuccess && items.length > 0 && (
            <div className="p-4 border-t border-slate-800 space-y-3 bg-[#070b14]">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={currentLang === 'KH' ? 'បញ្ចូលកូដបញ្ចុះតម្លៃ (ឧ. SKY5)' : 'Promo code (e.g. SKY5)'}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#0e1628] border border-slate-700 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg border border-slate-600"
                >
                  {currentLang === 'KH' ? 'ប្រើ' : 'Apply'}
                </button>
              </form>

              {discountApplied && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                  <span>{currentLang === 'KH' ? 'បញ្ចុះតម្លៃ 5% (SKY5)' : '5% Discount applied'}</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-slate-400 pt-1 border-t border-slate-800">
                <div className="flex justify-between">
                  <span>{currentLang === 'KH' ? 'សរុបតម្លៃដើម' : 'Subtotal'}</span>
                  <span>${rawTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1">
                  <span>{currentLang === 'KH' ? 'តម្លៃត្រូវបង់' : 'Total Amount'}</span>
                  <span className="text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Instant Checkout Button */}
              <button
                id="cart-checkout-button"
                onClick={handleCheckout}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
              >
                <span>{currentLang === 'KH' ? 'ទូទាត់ប្រាក់ឥឡូវនេះ' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
