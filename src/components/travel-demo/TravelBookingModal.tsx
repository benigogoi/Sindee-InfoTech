import React from 'react';
import { X, MessageCircle, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useTravel } from './TravelContext';
import { FLEET_DATA, BUSINESS_INFO } from './data';

export const TravelBookingModal: React.FC = () => {
  const {
    isModalOpen,
    closeBookingModal,
    bookingQuery,
    updateBookingQuery,
    selectedCarId,
    setSelectedCarId,
    generateWhatsAppUrl,
    callPhoneUrl,
  } = useTravel();

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
    closeBookingModal();
  };

  return (
    <div 
      onClick={closeBookingModal}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={closeBookingModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Booking & Quote</span>
          </div>
          <h3 className="text-xl font-black text-white">
            Plan Your Journey with NH Travel
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Fill the details below to generate an instant quote on WhatsApp or call our local driver team.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Pickup & Drop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={bookingQuery.pickup}
                  onChange={(e) => updateBookingQuery({ pickup: e.target.value })}
                  placeholder="e.g. Sonari Town"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:border-emerald-600 outline-hidden bg-gray-50/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Destination
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={bookingQuery.destination}
                  onChange={(e) => updateBookingQuery({ destination: e.target.value })}
                  placeholder="e.g. Charaideo Maidams / Guwahati"
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:border-emerald-600 outline-hidden bg-gray-50/50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Select Preferred Vehicle
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FLEET_DATA.map((car) => {
                const isSelected = car.id === (bookingQuery.carId || selectedCarId);
                return (
                  <button
                    type="button"
                    key={car.id}
                    onClick={() => {
                      setSelectedCarId(car.id);
                      updateBookingQuery({ carId: car.id });
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-700/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {car.name}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {car.seats} Seats • {car.category}
                      </div>
                    </div>
                    <span className="text-[11px] font-black text-emerald-800">
                      {car.baseRate}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={bookingQuery.travelDate}
                  onChange={(e) => updateBookingQuery({ travelDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:border-emerald-600 outline-hidden bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                Trip Nature
              </label>
              <select
                value={bookingQuery.tripType}
                onChange={(e) => updateBookingQuery({ tripType: e.target.value as any })}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:border-emerald-600 outline-hidden bg-gray-50/50"
              >
                <option value="one-way">One-Way Highway Drop</option>
                <option value="round-trip">Round Trip</option>
                <option value="local-day">Local Sightseeing (Full Day)</option>
                <option value="tour-package">Multi-Day Tour Package</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Luggage or Flight/Train Details (Optional)
            </label>
            <textarea
              rows={2}
              value={bookingQuery.notes || ''}
              onChange={(e) => updateBookingQuery({ notes: e.target.value })}
              placeholder="e.g. Flight 6E-241 landing at Dibrugarh 2:30 PM, 3 heavy suitcases..."
              className="w-full p-2.5 text-xs font-medium rounded-xl border border-gray-200 focus:border-emerald-600 outline-hidden bg-gray-50/50"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm shadow-lg shadow-emerald-700/25 transition-all transform active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm & Send to WhatsApp</span>
            </button>

            <a
              href={callPhoneUrl}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Prefer to Call? {BUSINESS_INFO.primaryPhone}</span>
            </a>
          </div>

        </form>
      </div>
    </div>
  );
};
