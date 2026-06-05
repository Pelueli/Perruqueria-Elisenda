/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, ExternalLink, Calendar, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface ContactFooterProps {
  currentLang: Language;
}

export default function ContactFooter({ currentLang }: ContactFooterProps) {
  const t = TRANSLATIONS[currentLang];
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Weekly Schedule reference (0: Sunday, 1: Monday, ...)
  const schedule = [
    { day: 0, label: t.sun, hours: t.closed, ranges: [] },
    { day: 1, label: t.mon, hours: t.closed, ranges: [] },
    { day: 2, label: t.tue, hours: '09:00 - 13:30 | 15:30 - 19:30', ranges: [{ start: '09:00', end: '13:30' }, { start: '15:30', end: '19:30' }] },
    { day: 3, label: t.wed, hours: '09:00 - 13:30 | 15:30 - 19:30', ranges: [{ start: '09:00', end: '13:30' }, { start: '15:30', end: '19:30' }] },
    { day: 4, label: t.thu, hours: '09:00 - 13:30 | 15:30 - 19:30', ranges: [{ start: '09:00', end: '13:30' }, { start: '15:30', end: '19:30' }] },
    { day: 5, label: t.fri, hours: '09:00 - 19:30', ranges: [{ start: '09:00', end: '19:30' }] }, // Continuous
    { day: 6, label: t.sat, hours: '08:30 - 14:00', ranges: [{ start: '08:30', end: '14:00' }] }, // Intensiu
  ];

  useEffect(() => {
    checkOpenNow();
    const interval = setInterval(checkOpenNow, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [currentLang]);

  const checkOpenNow = () => {
    const now = new Date();
    const day = now.getDay();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const totalMinutesNow = currentHour * 60 + currentMin;

    const todaySched = schedule.find(s => s.day === day);
    if (!todaySched || todaySched.ranges.length === 0) {
      setIsOpenNow(false);
      setStatusMessage(currentLang === 'ca' ? 'Obrim el dimarts a les 09:00' : 'Abrimos el martes a las 09:00');
      return;
    }

    let open = false;
    for (const range of todaySched.ranges) {
      const [sh, sm] = range.start.split(':').map(Number);
      const [eh, em] = range.end.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;

      if (totalMinutesNow >= startMin && totalMinutesNow < endMin) {
        open = true;
        break;
      }
    }

    setIsOpenNow(open);
    if (open) {
      setStatusMessage(currentLang === 'ca' ? 'Obert ara! Vine a trobar-nos' : '¡Abierto ahora! Ven a vernos');
    } else {
      if (day === 6 && currentHour >= 14) {
        setStatusMessage(currentLang === 'ca' ? 'Tancat. Obrim dimarts a les 09:00' : 'Cerrado. Abrimos martes a las 09:00');
      } else if (currentHour < 9) {
        setStatusMessage(currentLang === 'ca' ? "S'obre avui a les 09:00" : 'Se abre hoy a las 09:00');
      } else {
        setStatusMessage(currentLang === 'ca' ? "Tancat per descans. Obrim de dimarts a dissabte" : 'Cerrado por descanso. Abrimos de martes a sábado');
      }
    }
  };

  return (
    <footer id="contact" className="bg-[#0b0c10] text-[#e2e8f0] py-16 lg:py-24 scroll-mt-16 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-white/5">
          
          {/* Quick Info & Active Status */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-serif text-xl font-semibold text-gold-400 uppercase tracking-widest border-b border-white/5 pb-2 block">{t.metaTitle}</h3>
            <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
              {currentLang === 'ca'
                ? "Bellesa conscient, salut orgànica i estilisme unisex personalitzat. Un reflex de la teva autenticitat en ple cor de l'Espluga de Francolí, Tarragona."
                : 'Belleza consciente, salud orgánica y estilismo unisex personalizado. Un reflejo de tu autenticidad en pleno corazón de L\'Espluga de Francolí, Tarragona.'}
            </p>

            {/* Pulsing Active Status Badge */}
            <div id="live-hours-status" className="bg-[#16181f]/90 border border-white/5 rounded-xl p-4 flex items-center space-x-3.5 shadow-xl">
              <div className="relative flex h-3.5 w-3.5">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOpenNow ? 'animate-ping bg-emerald-400' : 'bg-gray-500/50'
                }`} />
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                  isOpenNow ? 'bg-emerald-500' : 'bg-slate-600'
                }`} />
              </div>
              <div className="text-left">
                <span className="font-sans text-[9px] uppercase font-bold tracking-widest text-slate-500">
                  {isOpenNow ? t.openBadge : t.closedBadge}
                </span>
                <p className="font-sans text-xs font-semibold text-slate-200 mt-0.5">{statusMessage}</p>
              </div>
            </div>

            {/* Socials & Location Details list */}
            <div className="space-y-4 pt-4 text-xs font-sans text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold uppercase text-slate-500 text-[10px] tracking-widest">{t.addressLabel}</span>
                  <p className="mt-1 text-slate-300 font-light leading-relaxed">Carrer de Lluís Carulla, 43, 43440 L'Espluga de Francolí, Tarragona</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold uppercase text-slate-500 text-[10px] tracking-widest">{t.phoneLabel}</span>
                  <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-1 bg-[#16181f] p-2.5 rounded border border-white/5">
                    <span className="font-semibold text-white">977 87 14 59</span>
                    <span className="text-slate-600 hidden sm:inline">|</span>
                    <span className="text-gold-300 text-[11px] font-bold">WhatsApp: +34 626 50 12 34</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold uppercase text-slate-500 text-[10px] tracking-widest">{t.emailLabel}</span>
                  <a href="mailto:perruqueriaelisenda@gmail.com" className="mt-1 block hover:text-gold-300 underline underline-offset-4 text-slate-200">
                    perruqueriaelisenda@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                id="footer-ig-link"
                href="https://www.instagram.com/perruqueria_elisenda/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#16181f] border border-white/5 rounded-lg hover:border-gold-500/20 text-slate-405 hover:text-gold-300 transition-colors flex items-center space-x-2 text-xs"
              >
                <Instagram className="h-4 w-4 text-gold-400" />
                <span className="font-semibold text-slate-200">@perruqueria_elisenda</span>
                <ExternalLink className="h-3 w-3 text-slate-600" />
              </a>
            </div>

          </div>

          {/* Operational Hours catalog */}
          <div className="lg:col-span-3 text-left space-y-6">
            <h4 className="font-serif text-lg font-medium text-white border-b border-white/5 pb-2 flex items-center space-x-2 uppercase tracking-wider">
              <Clock className="h-4 w-4 text-gold-400" />
              <span>{t.hoursTitle.split(' ')[1]}</span>
            </h4>
            
            <div className="space-y-3 font-sans text-xs">
              {schedule.map(s => {
                const isToday = new Date().getDay() === s.day;

                return (
                  <div
                    id={`schedule-row-${s.day}`}
                    key={s.day}
                    className={`flex items-center justify-between py-2 px-3 rounded ${
                      isToday ? 'bg-gold-500/10 border border-gold-455/20 text-gold-300 font-bold shadow-md' : 'text-slate-400'
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className={s.hours === t.closed ? 'text-slate-600 italic font-light' : 'text-slate-200 font-mono text-[11px]'}>
                      {s.hours}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location Interactive Maps Embed */}
          <div className="lg:col-span-5 text-left space-y-4 w-full">
            <h4 className="font-serif text-lg font-medium text-white border-b border-white/5 pb-2 flex items-center space-x-2 uppercase tracking-wider">
              <MapPin className="h-4 w-4 text-gold-400" />
              <span>{currentLang === 'ca' ? 'Mapa i Accés de Carrer' : 'Mapa y Acceso Callejero'}</span>
            </h4>
            
            {/* Embedded responsive Google Map */}
            <div className="w-full aspect-[16/10] bg-[#13151b] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
              <iframe
                title={t.mapIframeTitle}
                src="https://maps.google.com/maps?q=Perruqueria%20Elisenda,%20Lluis%20Carulla%2043,%20L'Espluga%20de%20Francoli&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale brightness-75 contrast-110 opacity-90 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans px-1">
              <span>{currentLang === 'ca' ? 'Situada a prop de la Plaça de l\'Església Vella' : 'Ubicada cerca de la Plaza de la Iglesia Vieja'}</span>
              <a
                id="gmaps-outer-link"
                href="https://www.google.com/maps/dir/?api=1&destination=Perruqueria+Elisenda+L'Espluga+de+Francoli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:text-gold-400 transition-colors text-slate-400"
              >
                <span>{currentLang === 'ca' ? 'Com arribar' : 'Cómo llegar'}</span>
                <ExternalLink className="h-3 w-3 text-gold-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Outer bottom copyright rail */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 font-sans space-y-3 md:space-y-0">
          <div>
            <p>© {new Date().getFullYear()} {t.metaTitle}. {t.footerRights}</p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="hover:text-slate-405 transition-colors">{t.footerGithubNote}</p>
            <p className="text-slate-600">{currentLang === 'ca' ? 'Verificat: L\'Espluga de Francolí, Tarragona · 2026' : 'Verificado: L\'Espluga de Francolí, Tarragona · 2026'}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
