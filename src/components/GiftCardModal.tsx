import React, { useState } from 'react';
import { X, Gift, Check, ShoppingCart, ShieldCheck } from 'lucide-react';
import { GiftCard } from '../types';

interface GiftCardModalProps {
  giftCard: GiftCard | null;
  onClose: () => void;
  onAddToCart: (card: GiftCard) => void;
  currentLang: 'KH' | 'EN';
}

export const GiftCardModal: React.FC<GiftCardModalProps> = ({
  giftCard,
  onClose,
  onAddToCart,
  currentLang,
}) => {
  if (!giftCard) return null;

  const [selectedAmount, setSelectedAmount] = useState(giftCard.value);
  const denominations = [5, 10, 20, 25, 50, 100];

  const calculatedPrice = (selectedAmount * (1 - giftCard.discountPercent / 100)).toFixed(2);

  const handleAdd = () => {
    onAddToCart({
      ...giftCard,
      value: selectedAmount,
      price: parseFloat(calculatedPrice),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#0d1527] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg font-black text-amber-400">
            <Gift className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{giftCard.title}</h3>
            <span className="text-xs text-red-400 font-semibold">
              បញ្ចុះតម្លៃ -{giftCard.discountPercent}% ពិសេស
            </span>
          </div>
        </div>

        {/* Denominations */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {currentLang === 'KH' ? 'ជ្រើសរើសទំហំទឹកប្រាក់ ($USD)' : 'Select Amount ($USD)'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {denominations.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  selectedAmount === amount
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-400/20'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">តម្លៃត្រូវបង់</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-amber-400 font-['Plus_Jakarta_Sans',sans-serif]">
                ${calculatedPrice}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${selectedAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>កូដសុទ្ធ 100%</span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95 transition-all"
        >
          <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
          <span>{currentLang === 'KH' ? 'បញ្ចូលកន្ត្រកទំនិញ' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
};
