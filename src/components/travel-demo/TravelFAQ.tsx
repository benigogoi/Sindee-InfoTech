import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from './data';
import { useTravel } from './TravelContext';

export const TravelFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { callPhoneUrl } = useTravel();

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white text-slate-900 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Everything you need to know about booking cabs, Charaideo heritage tours, and outstation trips.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Have a customized multi-day itinerary in mind?
            </h4>
            <p className="text-xs text-emerald-800/80">
              Speak directly with our local tour planner in Sonari for personalized packages.
            </p>
          </div>
          <a
            href={callPhoneUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 shadow-md transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call: {BUSINESS_INFO.primaryPhone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
