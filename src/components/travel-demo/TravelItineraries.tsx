import React from 'react';
import { Clock, Route, ArrowRight, CheckCircle2 } from 'lucide-react';
import { POPULAR_ROUTES } from './data';
import { useTravel } from './TravelContext';

export const TravelItineraries: React.FC = () => {
  const { openBookingModal } = useTravel();

  return (
    <section id="routes" className="py-16 sm:py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Assam Travel Circuits
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Popular Routes & Intercity Travel Packages
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Fixed rates, zero surprise tolls or hidden driver fees. Experience hassle-free outstation 
            journeys and airport transfers across Upper Assam and beyond.
          </p>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-gray-50/70 border border-gray-200/90 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-200">
                  <img
                    src={route.image}
                    alt={route.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Badge */}
                  {route.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md">
                      {route.badge}
                    </span>
                  )}

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-lg text-right">
                    <span className="text-[10px] text-gray-500 font-bold block uppercase leading-none">Starting from</span>
                    <span className="text-base font-black text-emerald-800">{route.startingPrice}</span>
                  </div>

                  {/* Route Heading on Image */}
                  <div className="absolute bottom-4 left-4 right-28 text-white">
                    <h3 className="text-lg font-black leading-tight drop-shadow-sm">
                      {route.title}
                    </h3>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4">
                  {/* Route Quick Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-2xl border border-gray-200 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Distance</span>
                      <span className="text-xs font-extrabold text-gray-800 flex items-center justify-center gap-1">
                        <Route className="w-3 h-3 text-emerald-700" /> {route.distance}
                      </span>
                    </div>
                    <div className="border-x border-gray-100">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Duration</span>
                      <span className="text-xs font-extrabold text-gray-800 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-700" /> {route.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Best Vehicle</span>
                      <span className="text-xs font-extrabold text-gray-800 truncate block px-1">
                        {route.recommendedCar}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {route.description}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Key Sightseeing & Stops
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {route.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openBookingModal(undefined, route.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 hover:bg-emerald-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>Book This Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
