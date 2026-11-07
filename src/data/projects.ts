export type ProjectStatus = 'Live' | 'Archived' | 'Concept'

export interface Project {
  id: string
  number: string
  title: string
  category: string
  industry: string
  location?: string
  description: string
  challenge: string
  approach: string
  features: string[]
  slug: string
  color: string
  gradient: string
  image: string
  url?: string
  status: ProjectStatus
  techStack?: string[]
  clientType?: string
  highlights?: string[]
}

export const projects: Project[] = [
  {
    id: 'mystic-digits',
    number: '01',
    title: 'MysticDigits',
    category: 'Web Application / Digital Product',
    industry: 'Astrology & Numerology Technology',
    location: 'Digital Product',
    description:
      'A comprehensive Vedic numerology web application that computes and delivers in-depth, personalized 27-page numerology reports based on name and date of birth. Built with dynamic calculation engines for Mulank, Bhagyank, Lo Shu grid mapping, and customized planetary remedies.',
    challenge:
      'Personalized numerology consultation traditionally requires laborious manual calculations, creating delays and inconsistent formatting. The challenge was to engineer an automated, responsive digital product that captures user birth details, performs multi-layered Vedic algorithms in real time, and produces a publication-quality 27-page report delivered directly to user inboxes.',
    approach:
      'We designed and built a mobile-first web application featuring a celestial dark-mode aesthetic with starfields and gold accents. The system incorporates an intuitive multi-step intake flow, an algorithmic calculation engine for Mulank, Bhagyank, and Lo Shu grid analysis, and an automated report generation and email fulfillment pipeline.',
    features: [
      'Vedic Mulank (Driver) and Bhagyank (Conductor) calculation engine',
      '3x3 Lo Shu Grid evaluation mapping elemental planes and missing numbers',
      'Automated generation of detailed 27-page personalized digital reports',
      'Personal Year and period forecast calculations based on Vedic principles',
      'Personalized gemstone, favorable color, and Vedic mantra recommendations',
      'Automated digital order processing and email fulfillment workflow',
      'Responsive, high-converting web interface with celestial visual direction',
    ],
    slug: 'mystic-digits',
    color: '#0d1326',
    gradient: 'from-[#0d1326] via-[#151c38] to-[#1e1735]',
    image: '/images/portfolio/mystic-digits.png',
    url: 'https://mysticdigits.in/',
    status: 'Live',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vedic Calculation Engine',
      'Automated Report Pipeline',
    ],
    clientType: 'Digital Product Venture',
    highlights: [
      '27-Page Personalised Vedic Report',
      'Mulank & Bhagyank Calculation',
      'Lo Shu Grid Analysis',
      'Automated Email Delivery',
    ],
  },
  {
    id: 'az-self-drive',
    number: '02',
    title: 'A-Z Self Drive Guwahati',
    category: 'Car Rental / Automotive',
    industry: 'Car Rentals & Tourism',
    location: 'Guwahati, Assam',
    description:
      'A practical self-drive car rental and 4x4 booking platform tailored for Northeast road trips, Kaziranga wildlife safaris, and Shillong–Tawang expeditions. Built with real-time fleet availability, transparent daily tariff calculation, and direct WhatsApp reservation enquiry.',
    challenge:
      'Local car rental businesses in Guwahati often manage bookings via messy phone calls, leaving customers unsure of fleet condition, security deposits, and tariff transparency. The challenge was to create a dependable, clean mobile-friendly platform where tourists and locals can browse vehicles, check upfront rates, and book directly via WhatsApp.',
    approach:
      'We designed a rugged, trustworthy booking website highlighting actual fleet models like the Mahindra Thar 4x4, Scorpio, and Innova. Clear pricing cards explain daily rates, refundable security deposit terms, and permit guidance, while a prominent 1-click WhatsApp booking button turns browsing visitors into confirmed enquiries.',
    features: [
      'Fleet catalogue featuring Mahindra Thar 4x4, Scorpio, and family SUVs',
      'Transparent daily tariff calculator with distance & fuel policy breakdown',
      'Direct WhatsApp reservation booking with prefilled vehicle & date details',
      'Required travel documents checklist & Northeast circuit permit guidance',
      'Customer reviews and roadside assistance contact guarantee',
      'Fast, mobile-first interface optimized for travelers on 4G networks',
    ],
    slug: 'az-self-drive',
    color: '#111827',
    gradient: 'from-[#111827] to-[#1f2937]',
    image: '/images/portfolio/az-self-drive.jpg',
    status: 'Concept',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Tariff Calculator', 'WhatsApp Direct Intake'],
    clientType: 'Local SME Showcase',
    highlights: ['Mahindra Thar 4x4 & SUV Fleet', 'Transparent Daily Tariffs', 'Direct WhatsApp Booking'],
  },
  {
    id: 'crumb-and-co',
    number: '03',
    title: 'Crumb & Co. Artisan Bakes',
    category: 'Home Bakery / Confectionery',
    industry: 'Artisan Bakery & Custom Cakes',
    location: 'Guwahati, Assam',
    description:
      'A boutique home bakery and celebration cake studio website for an independent Guwahati baker. Features an interactive visual cake catalogue, weekend dessert box pre-orders, custom flavor selector, and instant WhatsApp order intake.',
    challenge:
      'Talented home bakers lose hours answering repetitive Instagram DM queries regarding cake sizes, available flavors, pricing, and delivery dates. The goal was to build a warm, mouth-watering website where customers can browse celebration designs, choose customized options, and submit organized orders.',
    approach:
      'We developed a warm, appetizing website showcasing rich chocolate drip cakes, sourdough loaves, and seasonal tea-infused treats. The custom ordering flow collects event date, flavor choice, and design brief before routing the organized order directly to the baker on WhatsApp for seamless fulfillment.',
    features: [
      'Visual cake design catalogue with high-resolution celebration cake galleries',
      'Custom cake order builder (flavor, sponge, size in kg, and message customizer)',
      'Weekly dessert box and sourdough pre-order menu scheduling',
      'Direct WhatsApp order intake routing prefilled customer briefs',
      'Allergen information, storage guidelines, and delivery radius notice',
      'Instagram showcase integration for fresh weekly bakes',
    ],
    slug: 'crumb-and-co',
    color: '#261815',
    gradient: 'from-[#261815] to-[#1a100e]',
    image: '/images/portfolio/crumb-and-co.jpg',
    status: 'Concept',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Visual Menu Catalogue', 'WhatsApp Order Builder'],
    clientType: 'Home Baker Showcase',
    highlights: ['Celebration Cake Catalogue', 'Custom Flavour Selector', 'WhatsApp Pre-Order Intake'],
  },
  {
    id: 'kaziranga-homestay',
    number: '04',
    title: 'WildGrass Eco-Homestay',
    category: 'Homestay & Eco-Resort',
    industry: 'Hospitality & Nature Tourism',
    location: 'Kaziranga, Assam',
    description:
      'A serene nature homestay and eco-cottage website situated amidst lush tea gardens near Kaziranga National Park, Assam. Designed to showcase authentic bamboo cottages, Kaziranga jeep safaris, home-cooked Assamese thalis, and direct booking enquiries.',
    challenge:
      'Independent homestays and eco-resorts in Assam pay steep commissions to booking aggregators and struggle to convey their peaceful, authentic village hospitality online. The objective was to build an independent direct-booking website reflecting the natural tranquility of the tea garden setting.',
    approach:
      'We designed an organic, welcoming website featuring earth tones, authentic cottage architecture photography, and clear room details. The site highlights guided wildlife safaris, traditional culinary experiences, and an effortless direct reservation enquiry form that eliminates third-party commission overhead.',
    features: [
      'Bamboo & wooden cottage photo galleries with amenity breakdowns',
      'Kaziranga jeep and elephant safari booking guidance and local tips',
      'Traditional organic Assamese thali and dining experience showcase',
      'Real-time date enquiry and direct WhatsApp room reservation pathway',
      'Local travel route directions from Guwahati and Jorhat airports',
      'Guest feedback ratings and eco-friendly sustainability commitment',
    ],
    slug: 'kaziranga-homestay',
    color: '#1b2a1e',
    gradient: 'from-[#1b2a1e] to-[#0f1b12]',
    image: '/images/portfolio/kaziranga-homestay.jpg',
    status: 'Concept',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Cottage Showcase', 'Direct Booking Flow'],
    clientType: 'Local Homestay Showcase',
    highlights: ['Tea Garden Cottage Tours', 'Kaziranga Safari Assistance', 'Direct Booking Enquiries'],
  },
  {
    id: 'carepoint-clinic',
    number: '05',
    title: 'CarePoint Diagnostic & Dental Clinic',
    category: 'Healthcare & Clinic',
    industry: 'Local Clinic & Diagnostics',
    location: 'Guwahati, Assam',
    description:
      'A clean, patient-friendly website for a multi-specialty dental and family diagnostic clinic in Assam. Features transparent consultation fees, doctor schedules, diagnostic test directories, and an easy appointment booking form with instant confirmation.',
    challenge:
      'Patients visiting neighborhood clinics frequently face uncertainty over doctor consulting hours, lab test preparation, and treatment expenses. The clinic needed a clear, reassuring digital presence to build trust and simplify patient appointment scheduling.',
    approach:
      'We created a calm, high-contrast, accessible website that clearly lists specialist doctor visiting schedules, dental care packages, and home blood collection services. Patients can quickly schedule appointments online or contact the clinic front desk via phone or WhatsApp.',
    features: [
      'Specialist doctor profiles with clinical qualifications and visiting days',
      'Complete dental care & blood diagnostics test pricing index',
      'Online appointment booking form with preferred time-slot selection',
      'Home sample collection request option for senior citizens',
      'Clinic location map, parking info, and emergency numbers',
      'High-contrast, large-type accessibility for patients of all ages',
    ],
    slug: 'carepoint-clinic',
    color: '#0f2438',
    gradient: 'from-[#0f2438] to-[#091522]',
    image: '/images/portfolio/carepoint-clinic.jpg',
    status: 'Concept',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Appointment Intake', 'Doctor Schedule Matrix'],
    clientType: 'Local Clinic Showcase',
    highlights: ['Doctor Schedules', 'Diagnostic Test Index', 'Direct Appointment Intake'],
  },
]
