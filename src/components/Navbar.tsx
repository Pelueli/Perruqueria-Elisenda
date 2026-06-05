/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Scissors, Globe, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface NavbarProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onNavigateToBooking: () => void;
}

export default function Navbar({ currentLang, setLang, onNavigateToBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const toggleLanguage = () => {
    setLang(currentLang === 'ca' ? 'es' : 'ca');
  };

  const navItems = [
    { label: t.navHome, href: '#home' },
    { label: t.navServices, href: '#services' },
    { label: t.navGallery, href: '#gallery' },
    { label: t.navAbout, href: '#about' },
    { label: t.navContact, href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f1115]/90 text-slate-100 backdrop-blur-md z-50 border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <a id="nav-logo" href="#home" className="flex items-center space-x-3 group animate-fadeIn">
            <div className="w-11 h-11 bg-gradient-to-tr from-gold-600 to-gold-200 rounded-full flex items-center justify-center shadow-lg shadow-gold-900/20 group-hover:scale-105 transition-all duration-300">
              <Scissors className="h-5 w-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-gold-50 group-hover:text-gold-200 transition-colors uppercase">
                Elisenda
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate-400">
                L'Espluga de Francolí
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <a
                  id={`nav-item-${index}`}
                  key={item.href}
                  href={item.href}
                  className="font-sans text-xs uppercase tracking-widest text-[#94a3b8] hover:text-gold-400 transition-colors py-2 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Actions: Lang Switcher & Immediate Booking */}
            <div className="flex items-center space-x-4 pl-4 border-l border-white/15">
              <button
                id="lang-toggle-btn"
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-white/10 hover:border-gold-500/50 text-[10px] font-semibold uppercase tracking-widest text-slate-300 hover:text-gold-200 transition-all duration-200 pointer-events-auto cursor-pointer"
                title={`${currentLang === 'ca' ? 'Cambiar a Español' : 'Canviar a Català'}`}
              >
                <Globe className="h-3 w-3 text-gold-400" />
                <span>{currentLang === 'ca' ? 'ES' : 'CA'}</span>
              </button>

              <button
                id="quick-book-btn"
                onClick={onNavigateToBooking}
                className="flex items-center space-x-2 border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold active:scale-95 transition-all pointer-events-auto cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>{t.navBooking}</span>
              </button>
            </div>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              id="lang-toggle-mobile"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded bg-[#1a1d23] border border-white/5 text-xs text-stone-300 flex items-center space-x-1"
            >
              <Globe className="h-3 w-3 text-gold-400" />
              <span>{currentLang === 'ca' ? 'ES' : 'CA'}</span>
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-gold-400 hover:bg-[#1a1d23] rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden bg-[#0f1115] border-t border-white/5 px-4 pt-4 pb-6 space-y-3 transition-all duration-300 animate-fadeIn">
          <div className="space-y-1">
            {navItems.map((item, index) => (
              <a
                id={`nav-item-mobile-${index}`}
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-350 hover:text-gold-300 hover:bg-[#1a1d23] text-sm uppercase tracking-wide font-medium transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 px-4">
            <button
              id="mobile-quick-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBooking();
              }}
              className="flex items-center justify-center space-x-2 w-full border border-gold-500/50 text-gold-400 py-3 rounded-full font-semibold text-xs uppercase tracking-wider"
            >
              <Calendar className="h-4 w-4" />
              <span>{t.navBooking}</span>
            </button>
            <div className="mt-4 text-center text-[10px] text-stone-500 tracking-wider uppercase flex items-center justify-center space-x-1">
              <Sparkles className="h-3 w-3 text-gold-500" />
              <span>{t.metaSub}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
