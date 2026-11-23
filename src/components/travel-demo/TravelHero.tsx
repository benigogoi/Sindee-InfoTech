import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from './data';
import { useTravel } from './TravelContext';

interface HeroSlide {
  id: string;
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  desc: string;
  cardLabel: string;
  cardSub: string;
  badge: string;
  image: string;
  whatsappMessage: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'charaideo',
    tag: 'UNESCO WORLD HERITAGE SITE 2024',
    titlePrefix: 'ANCIENT PYRAMIDS.',
    titleHighlight: 'ROYAL TRAILS.',
    desc: 'Experience the 600-year sacred burial vaults of Tai-Ahom royalty in Charaideo, Assam. Dedicated private AC sedans & SUVs with local drivers who know every secret trail.',
    cardLabel: 'Charaideo Maidams',
    cardSub: 'Ahom Royal Burial Mounds',
    badge: 'UNESCO',
    image: '/images/nh-travel/charaideo-maidam.jpg',
    whatsappMessage: 'Hi NH Travel, I would like to book a private cab for the Charaideo Maidams UNESCO World Heritage Tour.',
  },
  {
    id: 'airport',
    tag: 'SEAMLESS AIRPORT CONNECTION • 85 KM',
    titlePrefix: 'LAND AT DIBRUGARH.',
    titleHighlight: 'CRUISE THROUGH TEA TRAILS.',
    desc: 'Your chauffeur waits at Mohanbari Airport (DIB) arrival gate with your name placard. Zero surge pricing, zero delays, and luggage care straight to Charaideo or Sonari.',
    cardLabel: 'Dibrugarh Airport',
    cardSub: 'Flight Pickup & Tea Corridor',
    badge: '85 KM',
    image: '/images/nh-travel/tea-garden.jpg',
    whatsappMessage: 'Hi NH Travel, I need an airport pickup/drop cab between Dibrugarh Airport and Sonari/Charaideo.',
  },
  {
    id: 'guwahati',
    tag: 'DIRECT HIGHWAY EXPRESS • 385 KM',
    titlePrefix: 'SONARI TO GUWAHATI.',
    titleHighlight: 'HIGHWAY PRIVACY & COMFORT.',
    desc: 'Skip congested sleeper buses. Travel in a sanitized Toyota Innova Crysta or Swift Dzire directly to Guwahati hospitals, airport, or commercial hubs in total AC tranquility.',
    cardLabel: 'Guwahati Highway',
    cardSub: 'Direct Intercity Cab Express',
    badge: '385 KM',
    image: '/images/nh-travel/innova-crysta.jpg',
    whatsappMessage: 'Hi NH Travel, I would like to book a direct one-way/round-trip highway cab between Sonari/Charaideo and Guwahati.',
  },
  {
    id: 'kaziranga',
    tag: 'WILDLIFE EXPEDITIONS & BRAHMAPUTRA',
    titlePrefix: 'CHARAIDEO TO KAZIRANGA.',
    titleHighlight: 'IN SEARCH OF THE RHINO.',
    desc: 'Combine Ahom royal heritage with Assam’s world-famous one-horned rhinoceros. Multi-day customized tour packages with experienced safari highway drivers.',
    cardLabel: 'Kaziranga Safari',
    cardSub: 'One-Horned Rhinos & Majuli',
    badge: 'WILDLIFE',
    image: '/images/nh-travel/kaziranga-rhino.jpg',
    whatsappMessage: 'Hi NH Travel, I would like to inquire about a customized car rental package for Kaziranga Safari & Majuli.',
  },
];

export const TravelHero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openBookingModal } = useTravel();

  // Automatic slide rotation every 7 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = HERO_SLIDES[activeSlide];

  const handleWhatsAppBooking = () => {
    const url = `https://wa.me/${BUSINESS_INFO.primaryPhoneClean}?text=${encodeURIComponent(current.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-black text-white"
    >
      {/* Dynamic Background Image Layers with Smooth Crossfade */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${
              isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.titlePrefix}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>
        );
      })}

      {/* Top Bar / Minimal Navigation Strip */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-sm tracking-tighter shadow-xl">
            NH
          </span>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-amber-300 block">
              VISIT CHARAIDEO
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              Upper Assam • NH Travel Car Rental
            </span>
          </div>
        </div>

        {/* 24/7 Availability Pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-200 font-semibold px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Airport & UNESCO Cabs 24/7</span>
        </div>
      </div>

      {/* Center-Left Cinematic Editorial Block (Visit Abu Dhabi Scale) */}
      <div className="relative z-10 max-w-3xl my-auto py-8 sm:py-12">
        {/* Kicker Badge */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-extrabold text-amber-300 mb-4 bg-black/50 px-3.5 py-1.5 rounded-full border border-amber-400/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{current.tag}</span>
        </div>

        {/* Giant Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] drop-shadow-2xl">
          {current.titlePrefix} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-200 to-white">
            {current.titleHighlight}
          </span>
        </h1>

        {/* Sub-Editorial Paragraph */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-200 mt-5 max-w-xl leading-relaxed drop-shadow-md font-normal">
          {current.desc}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <button
            onClick={handleWhatsAppBooking}
            className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl shadow-amber-400/30 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Book Tour on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openBookingModal()}
            className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            Custom Quote
          </button>

          <a
            href={`tel:${BUSINESS_INFO.primaryPhoneClean}`}
            className="text-xs sm:text-sm font-bold text-amber-300 hover:text-white transition-colors underline-offset-4 hover:underline py-2"
          >
            Call {BUSINESS_INFO.primaryPhone}
          </a>
        </div>
      </div>

      {/* Bottom Interactive Experience Slider (The Visit Abu Dhabi Signature) */}
      <div className="relative z-10 pt-4">
        {/* Progress Bar & Slide Counter */}
        <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-widest text-slate-400 font-bold">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Select an Experience
          </span>
          <span className="font-mono text-amber-300">
            0{activeSlide + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>

        {/* 4 Interactive Experience Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {HERO_SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeSlide;
            return (
              <div
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`cursor-pointer p-3 sm:p-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-md ${
                  isCurrent
                    ? 'border-2 border-amber-400 bg-black/85 shadow-2xl -translate-y-1'
                    : 'border border-white/10 hover:border-emerald-400/60 bg-black/45'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isCurrent ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                      isCurrent
                        ? 'bg-amber-400/20 text-amber-300'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {slide.badge}
                  </span>
                </div>

                <h4
                  className={`text-xs sm:text-sm font-black transition-colors truncate ${
                    isCurrent ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {slide.cardLabel}
                </h4>

                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 truncate">
                  {slide.cardSub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
