export interface Project {
  id: string
  number: string
  title: string
  category: string
  industry: string
  description: string
  challenge: string
  approach: string
  features: string[]
  slug: string
  color: string
  gradient: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'az-self-drive',
    number: '01',
    title: 'A-Z Self Drive',
    category: 'Automotive / Car Rental',
    industry: 'Automotive',
    description:
      'A premium self-drive car rental platform designed to make vehicle booking effortless. The concept focuses on showcasing the fleet with cinematic photography, transparent pricing and a streamlined reservation flow.',
    challenge:
      'Car rental websites often feel cluttered and transactional. The challenge was to create an experience that feels premium and trustworthy, while keeping the booking process simple and intuitive for first-time visitors.',
    approach:
      'We designed a clean, automotive-inspired interface with bold typography and a dark colour palette. Large vehicle imagery takes centre stage, supported by a clear booking flow that guides visitors from browsing to reservation in just a few steps.',
    features: [
      'Vehicle catalogue with detailed specifications',
      'Online booking and reservation system',
      'Pricing calculator',
      'Customer review integration',
      'Location-based fleet availability',
      'Mobile-optimised booking experience',
    ],
    slug: 'az-self-drive',
    color: '#1a1a2e',
    gradient: 'from-[#1a1a2e] to-[#16213e]',
    image: '/images/portfolio/az-self-drive.jpg',
  },
  {
    id: 'the-table',
    number: '02',
    title: 'The Table',
    category: 'Restaurant / Hospitality',
    industry: 'Hospitality',
    description:
      'A modern restaurant website concept that captures the warmth and character of a contemporary dining experience. The design balances appetite appeal with practical functionality like menu browsing and table reservation enquiries.',
    challenge:
      'Restaurant websites need to make people hungry. The challenge was to create an online experience that communicates the ambiance, cuisine quality and dining philosophy — while making it easy to view the menu and make reservations.',
    approach:
      'Warm tones, editorial food photography layouts and a carefully curated menu presentation create an immersive dining preview. The reservation enquiry form is prominent but not intrusive, and the mobile experience is prioritised for on-the-go visitors.',
    features: [
      'Digital menu with categories and descriptions',
      'Table reservation enquiry form',
      'Photo gallery of dishes and ambiance',
      'Chef\'s story and restaurant philosophy',
      'Events and special menus section',
      'WhatsApp reservation link',
    ],
    slug: 'the-table',
    color: '#2d1810',
    gradient: 'from-[#2d1810] to-[#1a0f08]',
    image: '/images/portfolio/the-table.jpg',
  },
  {
    id: 'the-grand-retreat',
    number: '03',
    title: 'The Grand Retreat',
    category: 'Hospitality',
    industry: 'Hospitality',
    description:
      'A luxury hotel and resort website concept that evokes the serenity and exclusivity of a premium retreat. Every element is designed to create desire and communicate the elevated experience guests can expect.',
    challenge:
      'Luxury hospitality brands need websites that feel as refined as their properties. The challenge was to create a digital experience that conveys luxury without being ostentatious — sophisticated, inviting and seamless.',
    approach:
      'A serene, spacious design with muted earth tones and generous whitespace allows the property imagery to breathe. Subtle parallax effects and smooth transitions create a sense of calm exploration. Room categories, amenities and booking enquiries are presented with elegance.',
    features: [
      'Immersive property photo galleries',
      'Room and suite category showcase',
      'Amenity and experience highlights',
      'Booking enquiry with date selection',
      'Virtual tour integration',
      'Guest testimonial presentations',
    ],
    slug: 'the-grand-retreat',
    color: '#1a2f1a',
    gradient: 'from-[#1a2f1a] to-[#0f1f0f]',
    image: '/images/portfolio/the-grand-retreat.jpg',
  },
  {
    id: 'carepoint-clinic',
    number: '04',
    title: 'CarePoint Clinic',
    category: 'Healthcare',
    industry: 'Healthcare',
    description:
      'A professional clinic website concept that builds trust and makes healthcare accessible. Clean design and clear information architecture help patients find what they need — from services offered to appointment scheduling.',
    challenge:
      'Healthcare websites must balance professionalism with approachability. The challenge was to create a digital presence that reassures patients, clearly communicates services and makes booking appointments as easy as possible.',
    approach:
      'A clean, light design with a calming colour palette and clear typography creates an environment of trust. Services are organised intuitively, doctor profiles build credibility, and the appointment enquiry form reduces barriers to booking.',
    features: [
      'Service and specialisation directory',
      'Doctor profiles and credentials',
      'Appointment enquiry form',
      'Patient information resources',
      'Location and directions with map',
      'Emergency contact information',
    ],
    slug: 'carepoint-clinic',
    color: '#0f2942',
    gradient: 'from-[#0f2942] to-[#0a1e33]',
    image: '/images/portfolio/carepoint-clinic.jpg',
  },
]
