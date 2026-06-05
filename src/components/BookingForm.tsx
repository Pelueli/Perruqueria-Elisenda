/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Calendar, User, Clock, CheckCircle, Smartphone, AlertCircle, FileText, Trash2 } from 'lucide-react';
import { SERVICES, STYLISTS, TRANSLATIONS } from '../data';
import { BookingData, Language } from '../types';

interface BookingFormProps {
  currentLang: Language;
  preselectedServiceId: string | null;
  clearPreselectedService: () => void;
}

export default function BookingForm({ currentLang, preselectedServiceId, clearPreselectedService }: BookingFormProps) {
  const t = TRANSLATIONS[currentLang];
  const servicesList = SERVICES[currentLang];
  const stylistsList = STYLISTS[currentLang];

  // Booking details state
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStylist, setSelectedStylist] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // UI state
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successBooking, setSuccessBooking] = useState<BookingData | null>(null);
  const [pastBookings, setPastBookings] = useState<BookingData[]>([]);

  // Time Slots
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  // Load past bookings and preselected services on load
  useEffect(() => {
    loadBookingsFromLocalStorage();
  }, []);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedService(preselectedServiceId);
      // Automatically scroll smoothly to booking element on select
      const bookElem = document.getElementById('booking');
      if (bookElem) {
        bookElem.scrollIntoView({ behavior: 'smooth' });
      }
      clearPreselectedService();
    }
  }, [preselectedServiceId]);

  const loadBookingsFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('perruqueria_elisenda_bookings');
      if (stored) {
        setPastBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Cannot load past bookings', e);
    }
  };

  // Spanish Mobile Phone validation
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\s+/g, '');
    return /^[6789]\d{8}$/.test(cleaned);
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedService) {
      setErrorMsg(currentLang === 'ca' ? 'Si us plau, selecciona un servei.' : 'Por favor, selecciona un servicio.');
      return;
    }
    if (!selectedStylist) {
      setErrorMsg(currentLang === 'ca' ? "Si us plau, selecciona l'estilista." : 'Por favor, selecciona la estilista.');
      return;
    }
    if (!bookingDate) {
      setErrorMsg(currentLang === 'ca' ? 'Si us plau, tria un dia per a la cita.' : 'Por favor, elige un día para la cita.');
      return;
    }

    // Validate opening hours constraints (Sundays are closed)
    const dateObj = new Date(bookingDate);
    const dayOfWeek = dateObj.getDay(); // 0 is Sunday
    if (dayOfWeek === 0) {
      setErrorMsg(currentLang === 'ca' ? 'El diumenge el saló està tancat. Tria un altre dia.' : 'El domingo el salón está cerrado. Elige otro día.');
      return;
    }

    if (!bookingTime) {
      setErrorMsg(currentLang === 'ca' ? 'Si us plau, selecciona una hora.' : 'Por favor, selecciona una hora.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMsg(currentLang === 'ca' ? "S'ha d'especificar el nom de contacte." : 'Se debe especificar el nombre de contacto.');
      return;
    }
    if (!customerPhone.trim() || !validatePhone(customerPhone)) {
      setErrorMsg(currentLang === 'ca' ? 'Format de telèfon incorrecte. Introdueix 9 xifres de mòbil o fix.' : 'Formato de teléfono incorrecto. Introduce 9 dígitos de celular o fijo.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMsg(currentLang === 'ca' ? 'Format de correu electrònic invàlid.' : 'Formato de correo electrónico inválido.');
      return;
    }

    // Create Booking object
    const newBooking: BookingData = {
      id: 'PE-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      serviceId: selectedService,
      stylistId: selectedStylist,
      date: bookingDate,
      time: bookingTime,
      customerName,
      customerPhone,
      customerEmail,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Save into list
    const updated = [newBooking, ...pastBookings];
    setPastBookings(updated);
    try {
      localStorage.setItem('perruqueria_elisenda_bookings', JSON.stringify(updated));
    } catch (err) {
      console.error('Cannot save booking to localStorage', err);
    }

    // Success state
    setSuccessBooking(newBooking);
    
    // Clear fields
    setSelectedService('');
    setSelectedStylist('');
    setBookingDate('');
    setBookingTime('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
  };

  const handleDeleteBooking = (idToDelete: string | undefined) => {
    if (!idToDelete) return;
    const confirmDelete = window.confirm(currentLang === 'ca' ? 'Segur que vols cancel·lar aquesta reserva?' : '¿Seguro que deseas cancelar esta reserva?');
    if (!confirmDelete) return;

    const filtered = pastBookings.filter(b => b.id !== idToDelete);
    setPastBookings(filtered);
    localStorage.setItem('perruqueria_elisenda_bookings', JSON.stringify(filtered));
  };

  const getServiceInfo = (id: string) => {
    return servicesList.find(s => s.id === id);
  };

  const getStylistInfo = (id: string) => {
    return stylistsList.find(st => st.id === id);
  };

  // Get minimum date of today for HTML input calendar
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    const mmStr = mm < 10 ? '0' + mm : mm;
    const ddStr = dd < 10 ? '0' + dd : dd;
    return `${yyyy}-${mmStr}-${ddStr}`;
  };

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#0f1115] border-t border-white/5 scroll-mt-16 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white uppercase">
            {t.bookingTitle}
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto" />
          <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            {t.bookingSub}
          </p>
        </div>

        {/* Dynamic State: success details or form */}
        {successBooking ? (
          <div id="booking-success-card" className="bg-[#1a1d23] border border-gold-400/20 rounded-xl p-8 shadow-2xl text-left space-y-6 animate-fadeIn">
            
            <div className="flex items-center space-x-3 text-gold-400">
              <CheckCircle className="h-8 w-8 text-gold-450 flex-shrink-0" />
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">{t.bookingSuccess}</h3>
                <p className="font-sans text-xs text-slate-400">{t.bookingSuccessSub}</p>
              </div>
            </div>

            {/* Recibo details printable list */}
            <div className="bg-[#161920] rounded-xl p-6 border border-white/5 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="font-sans text-xs text-slate-400 uppercase tracking-widest">{t.receiptCode}</span>
                <span className="font-mono text-sm font-bold text-gold-300 bg-[#222731] py-1 px-3.5 rounded border border-white/10">
                  {successBooking.id}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{t.selectService}</span>
                  <span className="font-semibold text-white">{getServiceInfo(successBooking.serviceId)?.name}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{t.receiptStylist}</span>
                  <span className="font-semibold text-white">{successBooking.stylistId === 'any' ? t.anyStylistLabel : getStylistInfo(successBooking.stylistId)?.name}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{t.receiptDateTime}</span>
                  <span className="font-semibold text-white">{successBooking.date} a les {successBooking.time} h</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{t.receiptPrice}</span>
                  <span className="font-serif text-base font-bold text-gold-300">{getServiceInfo(successBooking.serviceId)?.price}€</span>
                </div>
              </div>

              {/* No pre-payment clarification banner */}
              <div className="bg-white/5 rounded-lg p-3.5 border border-white/5 text-[#94a3b8] text-[10px] uppercase leading-relaxed flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-gold-400" />
                <span>{currentLang === 'ca' ? 'No cal pagar ara. Pagaràs directament al saló en sortir de la cita.' : 'No es necesario pagar ahora. Pagarás en el salón tras tu servicio.'}</span>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                id="book-another-btn"
                onClick={() => setSuccessBooking(null)}
                className="px-6 py-3.5 rounded border border-white/10 text-slate-200 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
              >
                {currentLang === 'ca' ? 'Demanar una altra cita' : 'Pedir otra cita'}
              </button>
            </div>

          </div>
        ) : (
          
          /* Booking Form interface */
          <form id="booking-form" onSubmit={handleBookingSubmit} className="bg-[#1a1d23] border border-white/5 rounded-xl p-6 sm:p-10 shadow-2xl space-y-6 text-left">
            
            {/* Display error if there are missing parameters */}
            {errorMsg && (
              <div className="bg-rose-950/20 border border-rose-500/20 rounded-lg p-4 flex items-start space-x-3 text-rose-300 text-xs sm:text-sm">
                <AlertCircle className="h-5 w-5 text-rose-450 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Service Selection dropdown */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] flex items-center space-x-1">
                  <Smartphone className="h-3.5 w-3.5 text-gold-450" />
                  <span>{t.selectService}</span>
                </label>
                <select
                  id="booking-service-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
                >
                  <option value="" className="bg-[#1a1d23]">{currentLang === 'ca' ? '-- Seleccioneu Servei --' : '-- Seleccione Servicio --'}</option>
                  {servicesList.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#1a1d23]">{s.name} ({s.price}€)</option>
                  ))}
                </select>
              </div>

              {/* Stylist Selection dropdown */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] flex items-center space-x-1">
                  <User className="h-3.5 w-3.5 text-gold-450" />
                  <span>{t.selectStylist}</span>
                </label>
                <select
                  id="booking-stylist-select"
                  value={selectedStylist}
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
                >
                  <option value="" className="bg-[#1a1d23]">{currentLang === 'ca' ? '-- Seleccioneu Personal --' : '-- Seleccione Personal --'}</option>
                  <option value="any" className="bg-[#1a1d23]">{t.anyStylist}</option>
                  {stylistsList.map(st => (
                    <option key={st.id} value={st.id} className="bg-[#1a1d23]">{st.name} ({st.role.split(' ')[0]})</option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-gold-450" />
                  <span>{t.selectDateTime.split(' ')[0]}</span>
                </label>
                <input
                  id="booking-date-input"
                  type="date"
                  min={getTodayString()}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
                />
              </div>

              {/* Hour Input slots */}
              <div className="space-y-2 sm:col-span-2">
                <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-gold-450" />
                  <span>{t.selectDateTime.split(' ').slice(2).join(' ')}</span>
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                  {timeSlots.map(timeSlot => (
                    <button
                      id={`time-slot-${timeSlot}`}
                      type="button"
                      key={timeSlot}
                      onClick={() => setBookingTime(timeSlot)}
                      className={`py-2.5 rounded text-xs font-bold transition-all cursor-pointer pointer-events-auto border ${
                        bookingTime === timeSlot
                          ? 'bg-gold-500/15 text-gold-300 border-gold-400/40 shadow-md'
                          : 'bg-[#16181f] text-slate-300 border-white/5 hover:border-gold-500/25'
                      }`}
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Personal Data block */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="font-serif text-lg font-normal tracking-wide text-white">{t.personalData}</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  id="customer-name-input"
                  type="text"
                  placeholder={t.placeholderName}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
                />
                
                <input
                  id="customer-phone-input"
                  type="tel"
                  placeholder={t.placeholderPhone}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
                />
              </div>

              <input
                id="customer-email-input"
                type="email"
                placeholder="E-mail (exemple@gmail.com)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#16181f] border border-[#ffffff]/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner"
              />

              <textarea
                id="booking-notes-input"
                rows={3}
                placeholder={t.placeholderNotes}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#16181f] border border-white/10 py-3.5 px-4 rounded font-sans text-sm text-white focus:outline-none focus:border-gold-400 shadow-inner resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                id="booking-confirm-submit"
                type="submit"
                className="w-full bg-gold-400 hover:bg-gold-300 text-black py-4 rounded font-bold uppercase tracking-widest text-xs transition-all active:scale-95 duration-200 shadow-lg shadow-gold-900/15 cursor-pointer"
              >
                {t.buttonConfirmBooking}
              </button>
            </div>

          </form>
        )}

        {/* History of past appointments */}
        {pastBookings.length > 0 && (
          <div id="booking-history-block" className="mt-16 text-left space-y-4">
            <h4 className="font-serif text-lg font-normal tracking-wide text-slate-100 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gold-400" />
              <span>{t.bookingHistoryTitle}</span>
            </h4>
            
            <div className="space-y-3">
              {pastBookings.map(b => (
                <div
                  id={`history-${b.id}`}
                  key={b.id}
                  className="bg-[#161920] border border-white/5 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-gold-300 bg-[#222731] py-0.5 px-2 rounded border border-white/5">{b.id}</span>
                      <span className="font-semibold text-white">{getServiceInfo(b.serviceId)?.name}</span>
                    </div>
                    <p className="text-slate-400 font-sans">
                      {b.date} a les {b.time} h · {currentLang === 'ca' ? 'Personal' : 'Estilista'}: {b.stylistId === 'any' ? t.anyStylistLabel : getStylistInfo(b.stylistId)?.name}
                    </p>
                  </div>

                  <button
                    id={`cancel-booking-btn-${b.id}`}
                    onClick={() => handleDeleteBooking(b.id)}
                    className="p-2 border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-450/30 hover:bg-rose-500/5 rounded flex items-center justify-center cursor-pointer font-sans self-end sm:self-auto"
                    title={currentLang === 'ca' ? 'Cancel·lar cita' : 'Cancelar cita'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
