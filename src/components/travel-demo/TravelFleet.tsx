import React from 'react';
import { Users, Briefcase, Wind, Check, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { FLEET_DATA, BUSINESS_INFO } from './data';
import { useTravel } from './TravelContext';

export const TravelFleet: React.FC = () => {
  const { openBookingModal } = useTravel();

  return (
    <section id="fleet" className="py-16 sm:py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Our Main Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Choose a Clean, Dependable Car for Every Journey
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            All our cars are rigorously sanitized, regularly serviced, fully air-conditioned, 
            and driven by experienced commercial drivers with thorough knowledge of Upper Assam routes.
          </p>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET_DATA.map((car) => {
            return (
              <div
                key={car.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image & Badge Container */}
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {car.tag && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow-md">
                        {car.tag}
                      </span>
                    )}

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-right shadow-md">
                      <span className="text-[10px] text-gray-500 font-bold block leading-none">Starting from</span>
                      <span className="text-sm font-black text-emerald-800">{car.baseRate}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        {car.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {car.subtitle}
                      </p>
                    </div>

                    {/* Quick Specs Badges */}
                    <div className="flex items-center gap-3 py-2 border-y border-gray-100 text-xs text-gray-700 font-medium">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{car.luggage} Bags</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Chilled AC</span>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="bg-emerald-50/60 p-2.5 rounded-xl text-xs text-emerald-900 font-medium">
                      <span className="font-bold">Ideal for: </span>
                      {car.bestFor}
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {car.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 mt-3 space-y-2">
                  <button
                    onClick={() => openBookingModal(car.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire for {car.name.replace('Maruti ', '').replace('Toyota ', '').replace('Mahindra ', '')}</span>
                  </button>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.primaryPhoneClean}?text=${encodeURIComponent(`Hi NH Travel, I would like to book or ask fare details for the ${car.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-gray-600 hover:text-emerald-700 transition-colors py-1"
                  >
                    <span>Instant WhatsApp Chat</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Group Request Note */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-gray-900">
              Need multiple cars or a tempo traveler for a marriage / large tour group?
            </h4>
            <p className="text-xs text-gray-500">
              We arrange multi-vehicle fleets with coordinated drivers anywhere in Upper Assam and Nagaland/Arunachal borders.
            </p>
          </div>
          <a
            href={`tel:${BUSINESS_INFO.primaryPhoneClean}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Fleet Manager</span>
          </a>
        </div>

      </div>
    </section>
  );
};
