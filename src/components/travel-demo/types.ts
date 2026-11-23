export type VehicleType = 'sedan' | 'muv' | 'suv';

export interface CarItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  type: VehicleType;
  image: string;
  seats: number;
  luggage: number;
  hasAC: boolean;
  baseRate: string;
  perKm: string;
  tag?: string;
  features: string[];
  bestFor: string;
}

export interface RouteItem {
  id: string;
  title: string;
  subtitle: string;
  pickup: string;
  drop: string;
  distance: string;
  duration: string;
  roadCondition: string;
  badge?: string;
  image: string;
  recommendedCar: string;
  startingPrice: string;
  highlights: string[];
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'heritage' | 'fleet' | 'routes';
  image: string;
  caption: string;
  location: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  route: string;
  date: string;
  rating: number;
  review: string;
  verified: boolean;
  carTaken: string;
}

export interface BookingQuery {
  pickup: string;
  destination: string;
  carId: string;
  travelDate: string;
  tripType: 'one-way' | 'round-trip' | 'local-day' | 'tour-package';
  passengers: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
}
