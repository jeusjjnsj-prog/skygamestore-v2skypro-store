import React, { useState } from 'react';
import { X, User, Lock, Mail, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  initialMode?: 'login' | 'register';
  currentLang: 'KH' | 'EN';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  initialMode = 'login',
  currentLang,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (email ? email.split('@')[0] : 'Gamer Pro');
    const finalEmail = email.trim() || 'gamer@skygame.kh';
    onLogin(finalName, finalEmail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0d1527] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {user.isLoggedIn ? (
          /* User Profile View */
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto text-2xl font-bold shadow-lg shadow-amber-400/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{user.name}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-left">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">ស្ថានភាព</span>
                <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> សមាជិកសកម្ម
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">សមតុល្យកាបូប</span>
                <p className="text-xs font-bold text-amber-400">
                  ${user.walletBalance.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-colors"
            >
              {currentLang === 'KH' ? 'ចាកចេញពីគណនី' : 'Sign Out'}
            </button>
          </div>
        ) : (
          /* Auth Form View */
          <div>
            {/* Tabs */}
            <div className="flex border-b border-slate-800 mb-5">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-all ${
                  mode === 'login'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {currentLang === 'KH' ? 'ចូលគណនី' : 'Sign In'}
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-all ${
                  mode === 'register'
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {currentLang === 'KH' ? 'បង្កើតគណនី' : 'Register'}
              </button>
            </div>

            {mode === 'register' && (
              <div className="mb-4 p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center gap-2 text-xs text-amber-300">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  {currentLang === 'KH'
                    ? 'ចុះឈ្មោះឥឡូវនេះ ទទួលបានកូដបញ្ចុះតម្លៃ 5% ដោយស្វ័យប្រវត្តិ!'
                    : 'Register now to receive an instant 5% welcome discount code!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {currentLang === 'KH' ? 'ឈ្មោះអ្នកប្រើប្រាស់' : 'Username / Name'}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="SkyGamer99"
                      className="w-full pl-9 pr-3 py-2 bg-[#090f1d] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLang === 'KH' ? 'អ៊ីមែល ឬលេខទូរស័ព្ទ' : 'Email or Phone'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gamer@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#090f1d] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {currentLang === 'KH' ? 'ពាក្យសម្ងាត់' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#090f1d] border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md shadow-amber-400/20 active:scale-95 transition-all"
              >
                {mode === 'login'
                  ? currentLang === 'KH' ? 'ចូលប្រើប្រាស់' : 'Sign In'
                  : currentLang === 'KH' ? 'បង្កើតគណនីថ្មី' : 'Create Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
