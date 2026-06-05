/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Scissors, Sparkles, Clock, CircleAlert } from 'lucide-react';
import { Language, ServiceCategory } from '../types';
import { SERVICES, TRANSLATIONS } from '../data';

interface ServicesProps {
  currentLang: Language;
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function Services({ currentLang, onSelectServiceForBooking }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'tots'>('tots');
  const t = TRANSLATIONS[currentLang];
  const allServices = SERVICES[currentLang];

  const filteredServices = activeTab === 'tots' 
    ? allServices 
    : allServices.filter(s => s.category === activeTab);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#0f1115] border-t border-white/5 scroll-mt-16 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white uppercase">
            {t.servicesTitle}
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            {t.servicesSub}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            id="tab-all-btn"
            onClick={() => setActiveTab('tots')}
            className={`px-5 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-200 pointer-events-auto cursor-pointer border ${
              activeTab === 'tots'
                ? 'bg-gold-500/10 text-gold-300 border-gold-400/30 shadow-lg shadow-gold-500/5'
                : 'bg-transparent border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
            }`}
          >
            {currentLang === 'ca' ? 'Tots els serveis' : 'Todos los servicios'}
          </button>
          
          <button
            id="tab-hair-btn"
            onClick={() => setActiveTab('perruqueria')}
            className={`px-5 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center space-x-2 pointer-events-auto cursor-pointer border ${
              activeTab === 'perruqueria'
                ? 'bg-gold-500/10 text-gold-300 border-gold-400/30 shadow-lg shadow-gold-500/5'
                : 'bg-transparent border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scissors className="h-3 w-3" />
            <span>{t.catHair.split(' ')[0]}</span>
          </button>

          <button
            id="tab-beauty-btn"
            onClick={() => setActiveTab('estetica')}
            className={`px-5 py-3 rounded text-[10px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center space-x-2 pointer-events-auto cursor-pointer border ${
              activeTab === 'estetica'
                ? 'bg-gold-500/10 text-gold-300 border-gold-400/30 shadow-lg shadow-gold-500/5'
                : 'bg-transparent border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            <span>{t.catBeauty.split(' ')[0]}</span>
          </button>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredServices.map((service, index) => (
            <div
              id={`service-card-${service.id}`}
              key={service.id}
              className="bg-[#1a1d23] rounded-xl p-6 lg:p-8 border border-white/5 hover:border-gold-500/20 shadow-xl transition-all duration-300 relative flex flex-col justify-between group"
            >
              
              {/* Popular Badge placement */}
              {service.isPopular && (
                <div className="absolute -top-3 right-6 bg-gold-400 text-[#0f1115] font-sans text-[9px] font-bold uppercase tracking-wider py-1 px-3 rounded shadow-md flex items-center space-x-1">
                  <Sparkles className="h-2.5 w-2.5 text-black" />
                  <span>{t.popularBadge}</span>
                </div>
              )}

              {/* Title & Price info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white pr-4 group-hover:text-gold-200 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-200">
                      {service.price}€
                    </span>
                  </div>
                </div>

                {/* Duration layout */}
                <div className="flex items-center space-x-2 text-stone-450 text-xs">
                  <Clock className="h-3.5 w-3.5 text-gold-400" />
                  <span className="font-sans font-medium text-slate-400">
                    {service.duration} {t.mins}
                  </span>
                </div>

                {/* Description subtext */}
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>

              {/* Quick booking trigger */}
              <div className="pt-6 border-t border-white/5 mt-6 flex justify-end">
                <button
                  id={`book-service-btn-${service.id}`}
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="px-5 py-2.5 rounded bg-gold-400 text-black hover:bg-gold-300 text-[10px] font-bold uppercase tracking-widest transition-colors pointer-events-auto cursor-pointer"
                >
                  {t.bookNow}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Note about tailored customization */}
        <div className="mt-16 bg-[#161920]/80 border border-white/5 rounded-xl p-6 max-w-2xl mx-auto flex items-start space-x-4">
          <CircleAlert className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
            {currentLang === 'ca' 
              ? 'Tots els nostres serveis de coloració i matisos requereixen un diagnòstic previ de dany capil·lar gratuït. El personal tècnic s\'assegura de personalitzar els preus segons el volum o profunditat.' 
              : 'Todos nuestros servicios de coloración y matices requieren un diagnóstico de daño capilar gratuito. El personal técnico se asegura de personalizar el precio final según el volumen o longitud.'}
          </p>
        </div>

      </div>
    </section>
  );
}
