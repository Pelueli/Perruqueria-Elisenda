/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';
import { Language } from '../types';
import { GALLERY_IMGS, TRANSLATIONS } from '../data';

interface GalleryProps {
  currentLang: Language;
}

interface ImageItem {
  id: string;
  title: string;
  tech: string;
  url: string;
}

export default function Gallery({ currentLang }: GalleryProps) {
  const [selectedImg, setSelectedImg] = useState<ImageItem | null>(null);
  const t = TRANSLATIONS[currentLang];

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#0f1115] text-[#e2e8f0] scroll-mt-16 relative border-t border-white/5">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#12151d] via-[#0f1115] to-[#0f1115] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 text-gold-400 py-1 px-3.5 rounded-full text-[10px] uppercase tracking-widest font-bold border border-white/10">
            <Camera className="h-3 w-3" />
            <span>INSTAGRAM FEED & PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white uppercase m-2">
            {t.galleryTitle}
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            {t.gallerySub}
          </p>
        </div>

        {/* Gallery bento-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {GALLERY_IMGS.map((img) => (
            <div
              id={`gallery-item-${img.id}`}
              key={img.id}
              onClick={() => setSelectedImg(img)}
              className="group bg-[#161920] rounded-xl overflow-hidden border border-white/5 shadow-2xl relative aspect-[4/3] cursor-pointer hover:border-gold-500/25 transition-all duration-300 pointer-events-auto"
            >
              
              {/* Image element */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Black elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/35 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover text cards */}
              <div className="absolute bottom-0 left-0 w-full p-6 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-gold-400">
                  {img.tech}
                </span>
                <h3 className="font-serif text-base sm:text-lg text-[#e2e8f0] font-normal">
                  {img.title}
                </h3>
                <div className="pt-2 flex items-center space-x-1 text-xs text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-3.5 w-3.5 text-gold-400" />
                  <span>{currentLang === 'ca' ? 'Ampliar Imatge' : 'Ampliar Imagen'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Lightbox / Zoom-In Modal details */}
        {selectedImg && (
          <div
            id="lightbox-overlay"
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 backdrop-blur-md transition-all duration-300 pointer-events-auto"
          >
            <div
              id="lightbox-content-card"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1d23] border border-white/5 max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
            >
              
              {/* Exit button */}
              <button
                id="close-lightbox-btn"
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 text-stone-100 rounded-full hover:bg-gold-500 hover:text-stone-950 transition-colors z-10 cursor-pointer pointer-events-auto"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Expanded visual container */}
              <div className="md:w-3/5 bg-[#0f1115] flex items-center justify-center">
                <img
                  src={selectedImg.url}
                  alt={selectedImg.title}
                  className="max-h-[60vh] md:max-h-[80vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Side story/Comment details inside lightbox */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-gold-400 border-b border-white/5 pb-2 block">
                    {selectedImg.tech}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-medium text-white leading-snug">
                    {selectedImg.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {currentLang === 'ca'
                      ? "Aquest tractament combina l'expertesa de l'Elisenda Morató amb productes lliures de parabens i d'origen botànic orgànic per oferir una cura impecable de la teva salut capil·lar o de de mans i rostre."
                      : 'Este tratamiento combina el criterio experto de nuestra estilista con ingredientes selectos libres de amoníaco y parabenos, garantizando así un óptimo cuidado biológico de tu cabello y piel.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 text-stone-500 text-[10px] uppercase tracking-wider flex items-center space-x-1">
                  <Eye className="h-3.5 w-3.5 text-gold-400" />
                  <span>Publicat a Instagram @perruqueria_elisenda</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
