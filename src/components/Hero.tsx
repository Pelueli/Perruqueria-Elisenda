/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface HeroProps {
  currentLang: Language;
  onNavigateToBooking: () => void;
  onNavigateToServices: () => void;
}

export default function Hero({ currentLang, onNavigateToBooking, onNavigateToServices }: HeroProps) {
  const t = TRANSLATIONS[currentLang];

  return (
    <div id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0f1115] via-[#121419] to-[#0f1115] text-slate-200">
      
      {/* Absolute Decorative Circles or Gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-8 text-left relative z-10">
            
            {/* Absolute Watermark */}
            <div className="absolute -top-16 -left-4 text-[95px] sm:text-[120px] font-serif opacity-[0.03] pointer-events-none select-none italic text-gold-200">
              Elisenda
            </div>

            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-1.5 px-4 relative z-10">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold-300">
                {t.heroTag}
              </span>
            </div>

            {/* Display Header */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-white relative z-10">
              {currentLang === 'ca' ? (
                <>
                  L'Art de <br />
                  <span className="italic text-gold-200">Redefinir</span><br />
                  la teva imatge
                </>
              ) : (
                <>
                  El Arte de <br />
                  <span className="italic text-gold-200">Redefinir</span><br />
                  tu imagen
                </>
              )}
            </h1>

            {/* Description Subtext with Accent Border */}
            <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed border-l-2 border-gold-500/50 pl-6 relative z-10">
              {t.heroSub}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
              <button
                id="hero-booking-cta"
                onClick={onNavigateToBooking}
                className="flex items-center justify-center space-x-2 bg-gold-400 hover:bg-gold-300 text-[#0f1115] font-bold uppercase text-xs tracking-widest py-4 px-8 rounded shadow-lg shadow-gold-500/10 transition-all active:scale-95 pointer-events-auto cursor-pointer"
              >
                <span>{t.heroCTA1}</span>
                <ArrowRight className="h-3.5 w-3.5 text-black" />
              </button>
              
              <button
                id="hero-services-cta"
                onClick={onNavigateToServices}
                className="flex items-center justify-center space-x-2 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold uppercase text-xs tracking-widest py-4 px-8 rounded transition-all active:scale-95 pointer-events-auto cursor-pointer"
              >
                <span>{t.heroCTA2}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-6 relative z-10">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-gold-400" />
                <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-semibold">
                  {currentLang === 'ca' ? 'Cosmètica Orgònica Vegana' : 'Cosmética Orgánica Vegana'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartPulse className="h-4 w-4 text-gold-400" />
                <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-semibold">
                  {currentLang === 'ca' ? 'Atenció 100% Personalitzada' : 'Atención 100% Personalizada'}
                </span>
              </div>
            </div>

          </div>

          {/* Graphical/Image Block (Pro Design) */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Frame containing high quality styled illustration grid */}
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#1a1d23] rounded-2xl p-4 shadow-2xl border border-white/5 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" />
              
              {/* Image Container with high class haircut depiction */}
              <div className="w-full h-full rounded-xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
                  alt="Perruqueria Elisenda Saló"
                  className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/30 to-transparent" />
                
                {/* Embedded Floating Cards portraying reviews */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1a1d23]/95 border border-white/5 rounded-xl p-3.5 backdrop-blur-sm flex items-center space-x-3 shadow-xl">
                  <div className="h-10 w-10 bg-gradient-to-tr from-gold-500 to-gold-300 rounded-full flex items-center justify-center font-serif font-bold text-black">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-100 truncate">Anna Farré (Clienta)</p>
                    <p className="text-[10px] text-gold-300 font-medium">★★★★★ {currentLang === 'ca' ? 'Metxes Balayage Increïbles' : 'Mechas Balayage Increíbles'}</p>
                  </div>
                </div>
              </div>

              {/* Decorative mini badges */}
              <div className="absolute -top-3 -left-3 bg-[#1a1d23] border border-white/5 py-2 px-3.5 rounded-lg shadow-lg flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute" />
                <span className="text-[10px] uppercase tracking-wider text-emerald-450 font-bold pl-2">
                  {currentLang === 'ca' ? 'Obert' : 'Abierto'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
