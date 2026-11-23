import React, { useEffect } from 'react';
import { TravelProvider } from './TravelContext';
import { TravelNavbar } from './TravelNavbar';
import { TravelHero } from './TravelHero';
import { TravelCharaideoHighlight } from './TravelCharaideoHighlight';
import { TravelFleet } from './TravelFleet';
import { TravelItineraries } from './TravelItineraries';
import { TravelGallery } from './TravelGallery';
import { TravelWhyUs } from './TravelWhyUs';
import { TravelFAQ } from './TravelFAQ';
import { TravelFooter } from './TravelFooter';
import { TravelBookingModal } from './TravelBookingModal';
import { TravelFloatingBar } from './TravelFloatingBar';

export const TravelApp: React.FC = () => {
  useEffect(() => {
    // Dynamic page title for the demo
    const previousTitle = document.title;
    document.title = 'NH Travel — Car Rental & Charaideo UNESCO Heritage Tours | Sonari, Assam';

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <TravelProvider>
      <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white pb-14 sm:pb-0">
        
        {/* Navigation Bar */}
        <TravelNavbar />

        {/* Main Sections */}
        <main>
          {/* 1. Hero with Instant WhatsApp Quote Estimator */}
          <TravelHero />

          {/* 2. Spotlight on Charaideo Maidams UNESCO World Heritage */}
          <TravelCharaideoHighlight />

          {/* 3. Real Fleet (Dzire, Innova, Scorpio, Bolero) */}
          <TravelFleet />

          {/* 4. Curated Routes & Itineraries (Dibrugarh Airport, Guwahati, Kaziranga, Sivasagar) */}
          <TravelItineraries />

          {/* 5. Filterable Photo Gallery (Heritage, Fleet, Scenic Assam) */}
          <TravelGallery />

          {/* 6. Why NH Travel & Real Client Testimonials */}
          <TravelWhyUs />

          {/* 7. FAQ for Travelers & Tourists */}
          <TravelFAQ />
        </main>

        {/* Footer */}
        <TravelFooter />

        {/* Modal for customized route quotes */}
        <TravelBookingModal />

        {/* Sticky Mobile Floating Call + WhatsApp Bar */}
        <TravelFloatingBar />

      </div>
    </TravelProvider>
  );
};

export default TravelApp;
