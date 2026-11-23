import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Clock, Star, Quote } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from './data';

export const TravelWhyUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Commercial Drivers',
      desc: 'All our drivers hold valid commercial licenses, are background-verified, non-smokers on duty, and prioritize passenger safety above all else.',
    },
    {
      icon: Sparkles,
      title: 'Immaculately Clean Vehicles',
      desc: 'Every sedan and SUV is vacuumed and washed before dispatch. Enjoy crisp air conditioning, fresh upholstery, and quiet rides.',
    },
    {
      icon: HeartHandshake,
      title: '100% Transparent Rates',
      desc: 'No sudden surprise surcharges, no haggling over fuel or driver food. We provide clear, itemized quotes upfront before the car moves.',
    },
    {
      icon: Clock,
      title: '24/7 Rapid Dispatch',
      desc: 'Need a midnight airport drop or an early morning medical rush to Guwahati? Our phone lines never sleep and cars are stationed locally in Sonari.',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Core Value Pillars */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-200">
            The NH Travel Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Why Tourists & Locals Choose NH Travel
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Travel without anxiety. We combine warm Assamese hospitality with the reliability 
            of a modern, on-demand cab network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Section 2: Real Traveler Testimonials */}
        <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Guest Experiences
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Trusted by Over 2,500+ Travelers
                </h3>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/80 px-4 py-2 rounded-xl border border-emerald-700/50">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-200">
                  {BUSINESS_INFO.rating} / 5.0 Rating
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <Quote className="w-6 h-6 text-emerald-500 opacity-60" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                      "{t.review}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {t.name}
                        </h4>
                        <span className="text-[11px] text-amber-300 font-medium block">
                          {t.route}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-700/40">
                        {t.carTaken}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
