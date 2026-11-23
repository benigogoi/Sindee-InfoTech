import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BUSINESS_INFO } from './data';
import { useTravel } from './TravelContext';

export const TravelFooter: React.FC = () => {
  const { callPhoneUrl, alternateCallPhoneUrl, openBookingModal } = useTravel();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 sm:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                NH
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block">
                  NH TRAVEL
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Charaideo Car Rental & Tour Service
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your dependable local travel partner based in Sonari, Charaideo, Assam. 
              Specializing in Charaideo Maidams UNESCO World Heritage tours, Dibrugarh Mohanbari Airport pickups, 
              and outstation cabs across Assam and the Northeast.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 Booking & Rapid Driver Dispatch</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">Home & Booking</a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-emerald-400 transition-colors">Charaideo UNESCO Tour</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-emerald-400 transition-colors">Our Cars & Rates</a>
              </li>
              <li>
                <a href="#routes" className="hover:text-emerald-400 transition-colors">Assam Itineraries</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-emerald-400 transition-colors">Photo Gallery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Routes & Fleet (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Popular Routes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => openBookingModal(undefined, 'charaideo-unesco-circuit')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  • Charaideo Maidams Heritage Circuit
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal(undefined, 'dibrugarh-airport-transfer')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  • Dibrugarh Airport (DIB) ↔ Sonari
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal(undefined, 'charaideo-to-guwahati')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  • Sonari / Charaideo ↔ Guwahati Cab
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBookingModal(undefined, 'charaideo-to-kaziranga')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  • Kaziranga Safari & Majuli Tour
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Phone Numbers (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300">
              Direct Contact
            </h4>
            <div className="space-y-3 pt-1">
              <a
                href={callPhoneUrl}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Primary Helpline</span>
                  <span className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">
                    {BUSINESS_INFO.primaryPhone}
                  </span>
                </div>
              </a>

              <a
                href={alternateCallPhoneUrl}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-600 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">Alternate Contact</span>
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {BUSINESS_INFO.secondaryPhone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{BUSINESS_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keyword Tag Cloud */}
        <div className="py-6 border-b border-slate-900 text-[11px] text-slate-500 space-y-2">
          <span className="font-bold uppercase tracking-wider text-slate-400 block">
            Popular Searches:
          </span>
          <p className="leading-relaxed">
            Car rental in Sonari Assam • Taxi to Charaideo Maidams UNESCO World Heritage • Dibrugarh Airport to Sonari cab fare • Swift Dzire rental in Charaideo • Innova cab booking Sivasagar • Cab from Charaideo to Guwahati • Tourist vehicle hire Upper Assam • NH Travel Sonari contact number.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} NH Travel. All rights reserved. Car Rent Service — Sonari, Charaideo, Assam.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Modernised with high performance by</span>
            <span className="font-bold text-emerald-400">Sindee Infotech</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
