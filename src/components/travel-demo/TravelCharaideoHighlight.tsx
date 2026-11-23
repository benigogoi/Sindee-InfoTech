import React from 'react';
import { Sparkles, CheckCircle2, Compass, ArrowRight } from 'lucide-react';
import { useTravel } from './TravelContext';

export const TravelCharaideoHighlight: React.FC = () => {
  const { openBookingModal } = useTravel();

  const touristSpots = [
    {
      title: 'Charaideo Maidams (UNESCO Site)',
      subtitle: 'The Sacred Royal Mounds',
      desc: 'Over 90 royal burial vaults of Ahom kings and queens, representing ancient Tai architectural brilliance and spiritual beliefs.',
      tag: 'UNESCO Heritage',
      image: '/images/nh-travel/charaideo-maidam.jpg',
    },
    {
      title: 'Kareng Ghar (Gargaon Palace)',
      subtitle: 'Ancient 7-Story Royal Seat',
      desc: 'Historic palace of the Ahom dynasty, showcasing unique brick-and-indigenous-mortar masonry.',
      tag: '15 km from Sonari',
      image: '/images/nh-travel/kareng-ghar-real.jpg',
    },
    {
      title: 'Rang Ghar (Royal Pavilion)',
      subtitle: 'Asia’s Oldest Amphitheater',
      desc: 'Grand sports pavilion and amphitheater built by King Pramatta Singha in 1744 for buffalo fights and Bihu.',
      tag: 'Sivasagar Circuit',
      image: '/images/nh-travel/rang-ghar-real.jpg',
    },
    {
      title: 'Historic Sivadol & Joysagar Tank',
      subtitle: 'Tallest Shiva Temple in India',
      desc: 'Gigantic man-made lake built in memory of Joymoti and towering 104-ft temple on the bank.',
      tag: 'Heritage Landmark',
      image: '/images/nh-travel/sivadol-real.jpg',
    },
  ];

  return (
    <section id="heritage" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assam’s Official UNESCO World Heritage Site</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Visiting Charaideo Maidams? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              Travel with Local Heritage Specialists
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Inscribed as a UNESCO World Heritage Site in July 2024, Charaideo is the spiritual capital of the 600-year Ahom kingdom. 
            Headquartered right in Sonari (Charaideo district), NH Travel arranges dedicated AC cab tours with polite local drivers who know every monument, parking zone, and scenic tea estate shortcut.
          </p>
        </div>

        {/* Highlight Grid of Historic Spots with REAL Monument Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {touristSpots.map((spot, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-xs">
                    {spot.tag}
                  </span>
                </div>
                
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {spot.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-300/90 mb-2">
                    {spot.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Package Card */}
        <div className="bg-gradient-to-r from-slate-850 via-emerald-950 to-slate-850 border border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-400 uppercase tracking-widest">
                <Compass className="w-4 h-4" />
                <span>Featured Tour Package</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Full-Day Charaideo & Sivasagar Royal Heritage Circuit
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Includes doorstep pickup anywhere in Sonari or Charaideo, stops at the UNESCO Maidams, 
                Kareng Ghar, Rang Ghar, Talatal Ghar, Joysagar, and safe return. AC sedan or SUV at your service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep Pickup & Drop</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited Sightseeing Time</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Driver Allowance Included</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:items-end justify-center gap-3">
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 font-medium">Full Day Heritage Cab from</span>
                <div className="text-3xl font-black text-amber-400">₹2,600 <span className="text-xs text-slate-300 font-normal">all inclusive</span></div>
              </div>

              <button
                onClick={() => openBookingModal(undefined, 'charaideo-unesco-circuit')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-400/20 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>Book Heritage Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
