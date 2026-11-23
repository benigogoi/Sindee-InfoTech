import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useTravel } from './TravelContext';
import { BUSINESS_INFO } from './data';

export const TravelFloatingBar: React.FC = () => {
  const { callPhoneUrl, generateWhatsAppUrl } = useTravel();

  return (
    <>
      {/* 1. Mobile Sticky Bottom Action Bar (Fixed at bottom on phones/tablets) */}
      <aside 
        aria-label="Quick Booking and Contact Actions"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
      >
        <div className="grid grid-cols-2 gap-2">
          {/* Direct Call Button */}
          <a
            href={callPhoneUrl}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-md active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Call {BUSINESS_INFO.primaryPhone}</span>
          </a>

          {/* WhatsApp Direct Inquiry Button */}
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Booking</span>
          </a>
        </div>
      </aside>

      {/* 2. Desktop Floating WhatsApp & Call Badges (Bottom Right) */}
      <aside 
        aria-label="Direct Contact Support"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3"
      >
        {/* Call Floating Badge */}
        <a
          href={callPhoneUrl}
          className="group flex items-center gap-2.5 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:bg-black transition-all transform hover:-translate-y-0.5 border border-slate-700"
        >
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Phone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">24/7 Cab Helpline</span>
            <span className="text-xs font-black text-white">{BUSINESS_INFO.primaryPhone}</span>
          </div>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={generateWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl shadow-emerald-600/40 transition-all transform hover:-translate-y-0.5"
        >
          <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold">
            <MessageCircle className="w-5 h-5 fill-emerald-600" />
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-emerald-100 block leading-tight">Instant Quote</span>
            <span className="text-xs font-black text-white">Chat on WhatsApp</span>
          </div>
        </a>
      </aside>
    </>
  );
};
