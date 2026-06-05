/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Heart, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import AboutAndReviews from './components/AboutAndReviews';
import ContactFooter from './components/ContactFooter';
import { Language } from './types';
import { TRANSLATIONS } from './data';

export default function App() {
  const [currentLang, setLang] = useState<Language>('ca');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const t = TRANSLATIONS[currentLang];

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0f1115] text-[#e2e8f0] font-sans selection:bg-gold-400 selection:text-stone-950 overflow-x-hidden antialiased">
      
      {/* Premium Executive Top-Bar announcements */}
      <div className="bg-[#1a1d23] border-b border-white/5 text-center py-2 px-4 relative z-50">
        <div className="text-[11px] uppercase tracking-[0.15em] font-bold flex items-center justify-center space-x-2 text-gold-300">
          <Sparkles className="h-3 w-3 animate-spin duration-3000 text-gold-400" />
          <span>
            {currentLang === 'ca'
              ? 'Tractaments orgànics d\'alta fidelitat. Demana la teva cita online ara sense prepagaments!'
              : 'Tratamientos orgánicos de alta fidelidad. ¡Pide tu cita online ahora sin prepagos!'}
          </span>
          <span className="hidden sm:inline border-l border-white/10 pl-2 font-light text-stone-400">
            Espluga de Francolí
          </span>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <Navbar
        currentLang={currentLang}
        setLang={setLang}
        onNavigateToBooking={() => handleNavigateToSection('booking')}
      />

      {/* Main content body */}
      <main className="flex-1">
        
        {/* Banner Hero Entrance */}
        <Hero
          currentLang={currentLang}
          onNavigateToBooking={() => handleNavigateToSection('booking')}
          onNavigateToServices={() => handleNavigateToSection('services')}
        />

        {/* Highlight Values Bento Row ribbon */}
        <section className="bg-[#161a21]/90 border-y border-white/5 text-stone-300 py-8 relative overflow-hidden backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 px-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gold-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
                    {currentLang === 'ca' ? 'Cosmètica Certificada' : 'Cosmética Certificada'}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    {currentLang === 'ca' ? "Productes lliures d'amoníac i parabens." : 'Productos libres de amoníaco y parabenos.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 px-4 border-y sm:border-y-0 sm:border-x border-white/5 py-6 sm:py-0">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gold-400">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
                    {currentLang === 'ca' ? 'Metxes Balayage Signatura' : 'Mechas Balayage Firma'}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    {currentLang === 'ca' ? 'Tècniques de degradats d\'alta precisió.' : 'Técnicas de degradados de alta precisión.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 px-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gold-400">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
                    {currentLang === 'ca' ? 'Garantia de Cita' : 'Garantía de Cita'}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    {currentLang === 'ca' ? "Atenció immediata en l'hora acordada." : 'Atención inmediata a la hora acordada.'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Segment: Interactive Services Lists */}
        <Services
          currentLang={currentLang}
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Segment: Bento Gallery Portfolio (Art) */}
        <Gallery currentLang={currentLang} />

        {/* Segment: Form Booking Appointment Engine */}
        <BookingForm
          currentLang={currentLang}
          preselectedServiceId={preselectedServiceId}
          clearPreselectedService={() => setPreselectedServiceId(null)}
        />

        {/* Segment: Editorial Biography & Heartfelt Reviews */}
        <AboutAndReviews currentLang={currentLang} />

      </main>

      {/* Segment: Live Timings checking, address contacts and dynamic Maps Footer */}
      <ContactFooter currentLang={currentLang} />

      {/* Floating immediate action button (Mobile and general helper) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-book-now"
          onClick={() => handleNavigateToSection('booking')}
          className="p-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-stone-950 rounded-full shadow-2xl active:scale-95 transition-all flex items-center justify-center cursor-pointer pointer-events-auto border border-gold-300"
          title={t.navBooking}
        >
          <Calendar className="h-6 w-6" />
        </button>
      </div>

    </div>
  );
}
