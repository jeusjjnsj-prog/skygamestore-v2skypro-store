import React from 'react';
import { X, Crown, Check, Sparkles, Shield, Gift } from 'lucide-react';
import { UserProfile } from '../types';

interface VipModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpgradeToVip: () => void;
  currentLang: 'KH' | 'EN';
}

export const VipModal: React.FC<VipModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpgradeToVip,
  currentLang,
}) => {
  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Silver VIP',
      price: '$9.99/ខែ',
      discount: 'បញ្ចុះតម្លៃ 3% គ្រប់ហ្គេម',
      perks: ['Cashback 3%', 'ជំនួយរហ័សអាទិភាព', 'ចូលរួម Discord VIP'],
      isPopular: false,
    },
    {
      name: 'Gold VIP',
      price: '$19.99/ខែ',
      discount: 'បញ្ចុះតម្លៃ 7% គ្រប់ហ្គេម',
      perks: ['Cashback 7%', 'ហ្គេម Free ប្រចាំខែ 1', 'ការកក់ហ្គេមមុនគេ (Pre-order)', 'សេវាអតិថិជនពិសេស 24/7'],
      isPopular: true,
    },
    {
      name: 'Diamond VIP',
      price: '$39.99/ខែ',
      discount: 'បញ្ចុះតម្លៃ 12% គ្រប់ហ្គេម',
      perks: ['Cashback 12%', 'ហ្គេម Free ប្រចាំខែ 2', 'កាដូខួបកំណើត $20', 'សេវាកម្មទិញតាមតម្រូវការផ្ទាល់ខ្លួន'],
      isPopular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#0b1224] border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-slate-100 z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-400/20">
            <Crown className="w-6 h-6 fill-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {currentLang === 'KH' ? 'ក្លាយជាសមាជិក VIP របស់ SkyGame' : 'Become a SkyGame VIP Member'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {currentLang === 'KH'
              ? 'ទទួលបានការបញ្ចុះតម្លៃបន្ថែម ហ្គេមឥតគិតថ្លៃប្រចាំខែ និងសិទ្ធិពិសេសជាច្រើនទៀត!'
              : 'Unlock massive game discounts, free monthly titles, and priority perks!'}
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-4 border flex flex-col justify-between ${
                tier.isPopular
                  ? 'bg-gradient-to-b from-[#19243d] to-[#0f172a] border-amber-400/80 shadow-lg shadow-amber-400/10'
                  : 'bg-[#0e1628] border-slate-800'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                  ពេញនិយមបំផុត
                </div>
              )}

              <div>
                <h4 className="font-bold text-sm text-white mb-1">{tier.name}</h4>
                <div className="text-lg font-black text-amber-400 font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                  {tier.price}
                </div>
                <div className="text-xs font-semibold text-emerald-400 mb-3">
                  {tier.discount}
                </div>

                <ul className="space-y-1.5 text-[11px] text-slate-300 mb-4">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  onUpgradeToVip();
                  onClose();
                }}
                className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                  tier.isPopular
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {currentLang === 'KH' ? 'ជ្រើសរើស' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
