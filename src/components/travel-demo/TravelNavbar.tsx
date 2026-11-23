import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from './data';
import { useTravel } from './TravelContext';

export const TravelNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal, callPhoneUrl } = useTravel();

  const navLinks = [
    { label: 'Available Cars', href: '#fleet' },
    { label: 'Popular Routes', href: '#routes' },
    { label: 'Charaideo Heritage', href: '#heritage' },
    { label: 'Photo Gallery', href: '#gallery' },
    { label: 'Why NH Travel', href: '#why-us' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      {/* Top Announcement & Emergency Bar */}
      <div className="bg-emerald-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              Charaideo UNESCO Heritage Gateway • Sonari, Assam
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Verified Driver Support
            </span>
            <a
              href={callPhoneUrl}
              className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {BUSINESS_INFO.primaryPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              NH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-gray-900">
                  NH TRAVEL
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider">
                  Car Rental
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-700" /> Sonari, Charaideo District
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={callPhoneUrl}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>Call 24/7</span>
            </a>

            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-700/20 hover:shadow-lg rounded-xl transition-all transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Get WhatsApp Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={callPhoneUrl}
              className="p-2 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100"
              title="Call NH Travel"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-fade-down">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
            <a
              href={callPhoneUrl}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-100 text-gray-900 font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
