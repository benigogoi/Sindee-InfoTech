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
      'A premium self-drive car rental website concept designed to demonstrate a streamlined booking workflow. The prototype focuses on presenting a vehicle fleet with automotive photography, prototype daily tariffs, and a clear reservation enquiry architecture.',
    challenge:
      'Car rental websites often feel cluttered and transactional. The design challenge was to explore an experience that feels premium and trustworthy, while keeping the booking enquiry process simple and intuitive for first-time visitors.',
    approach:
      'We designed a clean, automotive-inspired interface with bold typography and a dark colour palette. Large vehicle imagery takes centre stage, supported by a clear booking flow designed to guide visitors from browsing to reservation enquiry in just a few steps.',
    features: [
      'Demonstration vehicle catalogue with technical specifications',
      'Online reservation enquiry prototype flow',
      'Sample daily tariff calculator',
      'Simulated customer review display',
      'Prototype fleet location indicators',
      'Mobile-optimised booking interface',
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
      'A modern restaurant website concept designed to capture the warmth and character of contemporary dining. The prototype explores digital menu browsing, culinary storytelling, and table reservation enquiry intake.',
    challenge:
      'Restaurant websites need to convey appetite appeal and dining atmosphere. The design challenge was to create an online experience that communicates ambiance, cuisine quality, and culinary philosophy — while making it easy to view courses and submit table enquiries.',
    approach:
      'Warm tones, editorial food photography layouts, and a structured menu presentation create an immersive dining preview. The reservation enquiry form is positioned for easy access, and the layout is optimised for mobile devices.',
    features: [
      'Digital menu interface with categories and dish notes',
      'Table reservation enquiry form',
      'Photo gallery layout for dishes and ambiance',
      'Chef profile and culinary philosophy section',
      'Events and special menus showcase',
      'Direct reservation enquiry pathway',
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
      'A luxury resort website concept designed to explore the serenity and exclusivity of boutique hospitality. Every element is crafted to demonstrate tranquil art direction and intuitive guest enquiry flows.',
    challenge:
      'Luxury hospitality websites must reflect the refined quality of their destinations. The design challenge was to create a digital experience that conveys quiet luxury — sophisticated, inviting, and seamless to navigate.',
    approach:
      'A serene, spacious design with muted earth tones and generous whitespace allows property imagery to breathe. Subtle transitions support calm exploration, while room categories, amenities, and booking enquiry forms are presented with understated elegance.',
    features: [
      'Immersive property and landscape photo showcases',
      'Room and villa category presentation cards',
      'Curated amenity and experience highlights',
      'Demonstration booking enquiry with date selection',
      'Virtual property tour integration mockup',
      'Guest review layout components',
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
      'A professional clinic website concept designed to demonstrate medical credibility and accessible patient information. Clean design and clear information architecture help visitors explore practitioner credentials, clinical specializations, and appointment enquiry pathways.',
    challenge:
      'Healthcare websites must balance professionalism with approachability. The design challenge was to create a digital presence that reassures patients, clearly communicates services, and makes appointment enquiries straightforward.',
    approach:
      'A clean, light design with a calming colour palette and legible typography creates an environment of clarity. Services are organised intuitively, clinician credentials build trust, and the appointment enquiry form reduces friction for prospective patients.',
    features: [
      'Medical specialisation and service directory',
      'Clinician profile cards and credentials',
      'Appointment enquiry intake form',
      'Patient guidance and preparation resources',
      'Clinic location directions with map layout',
      'Emergency contact information panel',
    ],
    slug: 'carepoint-clinic',
    color: '#0f2942',
    gradient: 'from-[#0f2942] to-[#0a1e33]',
    image: '/images/portfolio/carepoint-clinic.jpg',
  },
]
