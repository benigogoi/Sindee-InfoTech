import React, { useState } from 'react';
import { Camera, MapPin, ZoomIn, X } from 'lucide-react';
import { GALLERY_ITEMS } from './data';
import { useTravel } from './TravelContext';

export const TravelGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'heritage' | 'fleet' | 'routes'>('all');
  const { lightboxImage, setLightboxImage } = useTravel();

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            <Camera className="w-3.5 h-3.5" />
            <span>Trip Highlights & Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Glimpses of Charaideo & Our Road Journeys
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real snapshots of the royal Tai-Ahom monuments, scenic Assam tea highways, 
            and our fleet in action across Upper Assam.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'heritage', label: 'Charaideo Heritage' },
            { id: 'fleet', label: 'Our Cabs' },
            { id: 'routes', label: 'Highway Drives' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage({ url: item.image, title: item.title, caption: item.caption })}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>{item.location}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold leading-snug group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1 font-normal opacity-90">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900">
              <h3 className="text-lg font-bold text-white mb-1">
                {lightboxImage.title}
              </h3>
              <p className="text-sm text-slate-300">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
