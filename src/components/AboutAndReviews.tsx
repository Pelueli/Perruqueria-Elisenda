/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, MessageSquareQuote, Shield } from 'lucide-react';
import { Language } from '../types';
import { STYLISTS, REVIEWS, TRANSLATIONS } from '../data';

interface AboutAndReviewsProps {
  currentLang: Language;
}

export default function AboutAndReviews({ currentLang }: AboutAndReviewsProps) {
  const t = TRANSLATIONS[currentLang];
  const staff = STYLISTS[currentLang];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#0f1115] border-t border-white/5 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Detailed Narrative */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-1 px-3.5 text-[10px] uppercase tracking-widest font-bold text-gold-400">
              <Shield className="h-3 w-3" />
              <span>{currentLang === 'ca' ? 'Experiència de Confiança' : 'Experiencia de Confianza'}</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight uppercase">
              {t.aboutTitle}
            </h2>
            
            <p className="font-sans text-xs sm:text-sm uppercase tracking-wider text-gold-300 font-bold">
              {t.aboutSub}
            </p>
            
            <div className="w-16 h-0.5 bg-gold-400" />
            
            <div className="space-y-4 font-sans text-sm text-slate-400 leading-relaxed font-light">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
            </div>
          </div>

          {/* Core Staff Display (Elisenda & Marta) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {staff.map((person) => (
              <div
                id={`staff-card-${person.id}`}
                key={person.id}
                className="bg-[#1a1d23] rounded-xl p-5 border border-white/5 shadow-2xl flex flex-col items-center text-center space-y-4 group hover:border-gold-500/25 transition-all duration-300 pointer-events-auto"
              >
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gold-300 shadow-lg">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-semibold text-white">{person.name}</h3>
                  <p className="font-sans text-[10px] uppercase font-bold tracking-wider text-gold-400">{person.role}</p>
                </div>
                <p className="font-sans text-[11px] leading-relaxed text-slate-450 font-light">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Reviews segment */}
        <div id="reviews" className="pt-16 border-t border-white/5">
          
          {/* Reviews header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">{currentLang === 'ca' ? 'VALORACIONS REALS' : 'VALORACIONES REALES'}</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white uppercase">
              {t.reviewsTitle}
            </h3>
            <p className="font-sans text-xs text-slate-400">{t.reviewsSub}</p>
          </div>

          {/* Grid layout of comments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
            {REVIEWS.map((review) => (
              <div
                id={`review-item-${review.id}`}
                key={review.id}
                className="bg-[#1a1d23] border border-white/5 rounded-xl p-6 shadow-2xl flex flex-col justify-between relative group"
              >
                <div className="absolute top-6 right-6 text-stone-100 dark:text-stone-100">
                  <MessageSquareQuote className="h-8 w-8 text-white/5 group-hover:text-gold-400/5 transition-colors duration-300" />
                </div>
                
                <div className="space-y-4 relative">
                  {/* Rating block */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-xs sm:text-sm text-slate-300 italic leading-relaxed font-light">
                    "{review.comment}"
                  </p>
                </div>

                {/* Author and Date */}
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[11px] font-sans text-slate-450">
                  <span className="font-bold text-white group-hover:text-gold-300 transition-colors duration-300">{review.author}</span>
                  <span>{review.date}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
