import React from 'react';
import { 
  Gamepad2, 
  Tv2, 
  Boxes, 
  Smartphone, 
  Gift, 
  MoreHorizontal,
  Disc
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  currentLang: 'KH' | 'EN';
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  currentLang,
}) => {
  const categories = [
    {
      id: 'pc',
      labelKh: 'ហ្គេម PC',
      labelEn: 'PC Game',
      icon: <Gamepad2 className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'playstation',
      labelKh: 'PlayStation',
      labelEn: 'PlayStation',
      icon: <Disc className="w-5 h-5 text-blue-400" />,
    },
    {
      id: 'xbox',
      labelKh: 'Xbox',
      labelEn: 'Xbox',
      icon: <Boxes className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'nintendo',
      labelKh: 'Nintendo',
      labelEn: 'Nintendo',
      icon: <Tv2 className="w-5 h-5 text-red-400" />,
    },
    {
      id: 'mobile',
      labelKh: 'Mobile Game',
      labelEn: 'Mobile Game',
      icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 'giftcard',
      labelKh: 'Gift Card',
      labelEn: 'Gift Card',
      icon: <Gift className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'others',
      labelKh: 'ផ្សេងៗ',
      labelEn: 'Others',
      icon: <MoreHorizontal className="w-5 h-5 text-slate-400" />,
    },
  ];

  return (
    <div id="category-bar-section" className="w-full py-1">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`category-item-${cat.id}`}
              onClick={() => onSelectCategory(isSelected ? 'all' : cat.id)}
              className={`flex-1 min-w-[100px] flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-[#152038] border-amber-400/80 shadow-md shadow-amber-400/10 scale-[1.02]'
                  : 'bg-[#0d1424]/80 hover:bg-[#121c32] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                {cat.icon}
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                {currentLang === 'KH' ? cat.labelKh : cat.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
