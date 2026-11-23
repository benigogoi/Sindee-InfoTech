import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { BookingQuery } from './types';
import { BUSINESS_INFO, FLEET_DATA, POPULAR_ROUTES } from './data';

interface TravelContextType {
  bookingQuery: BookingQuery;
  updateBookingQuery: (updates: Partial<BookingQuery>) => void;
  isModalOpen: boolean;
  openBookingModal: (carId?: string, routeId?: string) => void;
  closeBookingModal: () => void;
  selectedCarId: string;
  setSelectedCarId: (id: string) => void;
  selectedRouteId: string | null;
  lightboxImage: { url: string; title: string; caption: string } | null;
  setLightboxImage: (item: { url: string; title: string; caption: string } | null) => void;
  generateWhatsAppUrl: (customQuery?: Partial<BookingQuery>) => string;
  callPhoneUrl: string;
  alternateCallPhoneUrl: string;
}

const defaultQuery: BookingQuery = {
  pickup: 'Charaideo / Sonari',
  destination: 'Guwahati',
  carId: 'swift-dzire',
  travelDate: '',
  tripType: 'one-way',
  passengers: 3,
  notes: '',
};

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookingQuery, setBookingQuery] = useState<BookingQuery>(defaultQuery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState('swift-dzire');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; caption: string } | null>(null);

  const updateBookingQuery = (updates: Partial<BookingQuery>) => {
    setBookingQuery((prev) => ({ ...prev, ...updates }));
  };

  const openBookingModal = (carId?: string, routeId?: string) => {
    if (carId) {
      setSelectedCarId(carId);
      updateBookingQuery({ carId });
    }
    if (routeId) {
      setSelectedRouteId(routeId);
      const route = POPULAR_ROUTES.find((r) => r.id === routeId);
      if (route) {
        updateBookingQuery({
          pickup: route.pickup,
          destination: route.drop,
        });
      }
    }
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedRouteId(null);
  };

  const generateWhatsAppUrl = (customQuery?: Partial<BookingQuery>) => {
    const q = { ...bookingQuery, ...customQuery };
    const carObj = FLEET_DATA.find((c) => c.id === (q.carId || selectedCarId)) || FLEET_DATA[0];

    const lines = [
      `*🚗 NH Travel - Trip Booking Inquiry*`,
      `---------------------------------`,
      `📍 *Pickup:* ${q.pickup || 'Sonari/Charaideo'}`,
      `🏁 *Destination:* ${q.destination || 'Guwahati'}`,
      `📅 *Date:* ${q.travelDate || 'Earliest Available / Planned Date'}`,
      `🚘 *Preferred Car:* ${carObj.name} (${carObj.category})`,
      `👥 *Passengers:* ${q.passengers || 2}`,
      `🛣️ *Trip Type:* ${
        q.tripType === 'one-way'
          ? 'One Way Highway Drop'
          : q.tripType === 'round-trip'
          ? 'Round Trip'
          : q.tripType === 'local-day'
          ? 'Local Full-Day Rental'
          : 'Tour / Heritage Package'
      }`,
    ];

    if (q.notes && q.notes.trim()) {
      lines.push(`📝 *Special Note:* ${q.notes}`);
    }

    lines.push(`---------------------------------`);
    lines.push(`Hello NH Travel! Please check car availability and share your best estimated fare for this journey.`);

    const message = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${BUSINESS_INFO.primaryPhoneClean}?text=${message}`;
  };

  const callPhoneUrl = `tel:${BUSINESS_INFO.primaryPhoneClean}`;
  const alternateCallPhoneUrl = `tel:${BUSINESS_INFO.secondaryPhoneClean}`;

  return (
    <TravelContext.Provider
      value={{
        bookingQuery,
        updateBookingQuery,
        isModalOpen,
        openBookingModal,
        closeBookingModal,
        selectedCarId,
        setSelectedCarId,
        selectedRouteId,
        lightboxImage,
        setLightboxImage,
        generateWhatsAppUrl,
        callPhoneUrl,
        alternateCallPhoneUrl,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
