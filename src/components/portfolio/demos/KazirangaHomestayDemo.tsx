import { useState } from 'react'
import {
  Trees,
  MapPin,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

interface Cottage {
  id: string
  name: string
  category: 'Bamboo Cottage' | 'Family Suite' | 'Deluxe Room'
  pricePerNight: number
  capacity: string
  view: string
  image: string
  tag: string
  description: string
  amenities: string[]
}

const COTTAGES: Cottage[] = [
  {
    id: 'mising-bamboo',
    name: 'Traditional Mising Bamboo Cottage',
    category: 'Bamboo Cottage',
    pricePerNight: 2800,
    capacity: '2 Adults + 1 Child',
    view: 'Direct Tea Garden & Misty Hills View',
    image: '/images/portfolio/demos/cottage-interior.jpg',
    tag: 'Most Popular',
    description:
      'Elevated bamboo and cane cottage handcrafted by indigenous artisans. Features a private tea-veranda, king bed with cotton mosquito net, handcrafted cane chairs, and modern attached bathroom with hot geyser.',
    amenities: [
      'Private Tea-Garden Veranda',
      'King Bed with Mosquito Net',
      'Modern Attached Bath + Geyser',
      'Complimentary Assam Orthodox Breakfast',
    ],
  },
  {
    id: 'heritage-suite',
    name: 'Heritage Tea-Planter Family Suite',
    category: 'Family Suite',
    pricePerNight: 4200,
    capacity: '4 Guests (Family)',
    view: 'Surrounded by Betel Palm & Organic Orchard',
    image: '/images/portfolio/kaziranga-homestay.jpg',
    tag: 'Spacious Family Living',
    description:
      'Two interconnected rustic bedrooms with vaulted bamboo ceilings and a private viewing patio. Perfect for families and small groups touring Kaziranga together.',
    amenities: [
      'Two Interconnected Bedrooms',
      'Spacious Lounging Veranda',
      'In-Room Electric Kettle & Tea Basket',
      'Direct Safari Jeep Pickup from Porch',
    ],
  },
  {
    id: 'deluxe-plantation',
    name: 'Deluxe Plantation Eco-Room',
    category: 'Deluxe Room',
    pricePerNight: 2200,
    capacity: '2 Adults',
    view: 'Organic Vegetable Garden View',
    image: '/images/portfolio/demos/tea-estate.jpg',
    tag: 'Budget Nature Stay',
    description:
      'Cozy ground-floor cottage room surrounded by indigenous orchids and tea gardens. Highly peaceful, tranquil, and budget-friendly.',
    amenities: [
      'Double Bed & Sanitized Linens',
      'En-suite Bathroom with Hot Water',
      'Quiet Work Desk with WiFi',
      'Homecooked Breakfast Included',
    ],
  },
]

const SAFARI_ZONES = [
  {
    id: 'kohora',
    name: 'Central Range (Kohora)',
    bestFor: 'One-Horned Rhinoceros & Elephant Safari',
    distance: '3.5 km (10 mins from homestay)',
    timings: 'Morning: 5:30 AM – 7:30 AM | Afternoon: 1:30 PM – 3:30 PM',
    highlight: 'Classic open grassland viewing with maximum rhino sighting density.',
  },
  {
    id: 'bagori',
    name: 'Western Range (Bagori)',
    bestFor: 'Wild Water Buffaloes, Swamp Deer & Rhinos',
    distance: '14 km (25 mins from homestay)',
    timings: 'Morning: 6:00 AM – 8:00 AM | Afternoon: 2:00 PM – 4:00 PM',
    highlight: 'Scenic water bodies, massive water buffalo herds, and birding wetlands.',
  },
  {
    id: 'agoratoli',
    name: 'Eastern Range (Agoratoli)',
    bestFor: 'Birdwatching, Bengal Tigers & Forest Canopy',
    distance: '24 km (40 mins from homestay)',
    timings: 'Morning: 6:00 AM – 9:00 AM',
    highlight: 'Deep woodland forest trails, migratory pelicans, storks, and eagles.',
  },
]

export function KazirangaHomestayDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [selectedCottage, setSelectedCottage] = useState<Cottage>(COTTAGES[0])
  const [activeZone, setActiveZone] = useState<string>('kohora')

  return (
    <div className="bg-[#0c160e] text-[#e5ede7] font-sans antialiased selection:bg-emerald-400 selection:text-black">
      {/* 1. Nature Announcement Strip */}
      <div className={`bg-gradient-to-r from-emerald-900 via-[#152e1c] to-emerald-900 text-emerald-200 font-bold text-center tracking-wide flex items-center justify-center gap-2 border-b border-emerald-800/40 ${
        isMobile ? 'py-1.5 px-3 text-[10px]' : 'py-2 px-4 text-[11px]'
      }`}>
        <Trees className="w-3.5 h-3.5 text-lime-400 shrink-0" />
        <span className="truncate">
          {isMobile
            ? '10 Mins from Kaziranga Kohora Safari Gate • Direct Jeep Booking'
            : '10 Minutes from Kaziranga Kohora Safari Gate • Zero OTA Commissions • Certified Jeep Safari Assistance'}
        </span>
      </div>

      {/* 2. Header */}
      <header className="border-b border-emerald-900/40 bg-[#102014]/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-lime-500 text-black flex items-center justify-center font-serif font-black text-xs sm:text-sm shadow-md shrink-0">
            WG
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif font-bold text-xs sm:text-xl tracking-wide text-white truncate">
                WILDGRASS ECO-HOMESTAY
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
                KAZIRANGA
              </span>
            </div>
            {!isMobile && (
              <p className="text-[10px] text-emerald-300/70 font-mono flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 text-lime-400" />
                Kohora Range, Kaziranga National Park, Assam
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!isMobile && (
            <a
              href="tel:+919435000000"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-800/60 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/30 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-lime-400" />
              <span>+91 94350 98765</span>
            </a>
          )}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span>{isMobile ? 'Check Dates' : 'Check Room Dates'}</span>
          </button>
        </div>
      </header>

      {/* 3. Hero Section with Real Tea Garden Cottage Photo */}
      <section className={`relative border-b border-emerald-900/30 overflow-hidden bg-gradient-to-b from-[#142618] to-[#0c160e] ${
        isMobile ? 'px-3 py-6' : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
      }`}>
        <div className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }>
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/40 text-xs text-lime-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span className="truncate">Eco-Sustainable Bamboo Cottages in Assam</span>
            </div>

            <h1 className={
              isMobile
                ? 'text-xl sm:text-2xl font-serif font-black tracking-tight text-white leading-snug'
                : 'text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight'
            }>
              Wake Up to Mist Over <br />
              <span className="text-lime-400 italic">Kaziranga's Tea Gardens</span>
            </h1>

            <p className={isMobile ? 'text-xs text-emerald-100/80 leading-relaxed' : 'text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-xl'}>
              Immerse yourself in authentic Assamese hospitality. Situated amidst lush tea bushes just 10 minutes from Kohora Safari Gate, our handcrafted bamboo cottages offer warm home-cooked meals, peaceful tea walks, and verified rhino safari permits.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 text-xs text-emerald-200">
              <div className="p-2 sm:p-3 rounded-xl bg-[#132417] border border-emerald-800/40 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">10 Mins</span>
                <span className="text-[10px] sm:text-[11px] text-emerald-300/70">To Safari Gate</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-[#132417] border border-emerald-800/40 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">100%</span>
                <span className="text-[10px] sm:text-[11px] text-emerald-300/70">Organic Food</span>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-[#132417] border border-emerald-800/40 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">₹0 Fee</span>
                <span className="text-[10px] sm:text-[11px] text-emerald-300/70">Direct Booking</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Photo Card */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
            <div className="rounded-3xl border border-emerald-800/40 overflow-hidden shadow-2xl bg-[#132417]">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={selectedCottage.image}
                  alt={selectedCottage.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4 bg-[#102014] border-t border-emerald-900/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-lime-400 uppercase tracking-wider block">
                    {selectedCottage.tag}
                  </span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white">{selectedCottage.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base font-bold text-lime-400">₹{selectedCottage.pricePerNight}</span>
                  <span className="text-[10px] text-emerald-400/60 block font-mono">/ night (B&amp;B)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Cottage Explorer Tabs with Real Photos */}
      <section className={`border-b border-emerald-900/30 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-3 mb-6' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'}>
          <div>
            <h2 className={isMobile ? 'text-lg font-serif font-black text-white' : 'text-2xl font-serif font-black text-white'}>Our Bamboo Cottages &amp; Suites</h2>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-0.5">
              Handcrafted with locally sourced bamboo, treated timber, and thatched cane roofs.
            </p>
          </div>

          <div className={`p-1 rounded-xl bg-[#132417] border border-emerald-900/60 ${isMobile ? 'flex flex-wrap gap-1' : 'flex items-center gap-1.5'}`}>
            {COTTAGES.map((c) => (
              <button
                key={c.id}
                type="button"
                data-interactive="true"
                onClick={() => setSelectedCottage(c)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCottage.id === c.id
                    ? 'bg-lime-400 text-black font-bold'
                    : 'text-emerald-300/70 hover:text-white'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {COTTAGES.map((cottage) => {
            const isSelected = selectedCottage.id === cottage.id
            return (
              <div
                key={cottage.id}
                data-interactive="true"
                onClick={() => setSelectedCottage(cottage)}
                className={`rounded-3xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#142618] border-lime-400 ring-2 ring-lime-400/20'
                    : 'bg-[#102014]/90 border-emerald-900/60 hover:border-emerald-700/60'
                }`}
              >
                {/* Real Cottage Photo */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={cottage.image}
                    alt={cottage.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur text-lime-400 text-xs font-mono font-bold border border-emerald-500/30">
                    {cottage.tag}
                  </div>
                  <div className="absolute bottom-2.5 right-3 text-right">
                    <span className="text-lg font-bold text-white">₹{cottage.pricePerNight}</span>
                    <span className="text-[10px] text-emerald-300/70"> / night</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-serif font-bold text-white">{cottage.name}</h3>
                  <p className="text-xs text-lime-300 font-mono">{cottage.view}</p>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">{cottage.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-emerald-900/60">
                    {cottage.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-emerald-100/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-emerald-900/60 flex justify-end">
                    <button
                      type="button"
                      data-interactive="true"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCottage(cottage)
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-lime-400 text-black'
                          : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Cottage'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. Wildlife Safari Interactive Range Guide */}
      <section className={`border-b border-emerald-900/30 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={`text-center mx-auto mb-6 ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
          <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-bold block mb-1">
            Safari Assistance
          </span>
          <h2 className={isMobile ? 'text-lg font-serif font-black text-white' : 'text-2xl sm:text-3xl font-serif font-black text-white'}>
            Kaziranga National Park Safari Ranges
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/70 mt-1">
            We arrange authorized Maruti Gypsy 4x4 safaris with licensed local naturalist drivers.
          </p>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-3.5' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
          {SAFARI_ZONES.map((zone) => (
            <div
              key={zone.id}
              data-interactive="true"
              onClick={() => setActiveZone(zone.id)}
              className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                activeZone === zone.id
                  ? 'bg-[#142618] border-lime-400 ring-2 ring-lime-400/20'
                  : 'bg-[#102014]/80 border-emerald-900/60 hover:border-emerald-700/60'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-lime-400 font-mono text-[11px] sm:text-xs">{zone.distance}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 text-[10px]">
                  Gypsy 4x4
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white">{zone.name}</h3>
              <p className="text-xs text-lime-300 font-semibold mt-1">{zone.bestFor}</p>
              <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">{zone.highlight}</p>
              <span className="text-[10px] text-emerald-400/70 font-mono block mt-3 pt-2 border-t border-emerald-900/40">
                {zone.timings}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Farm-to-Table Assamese Dining & Experiences (with photos!) */}
      <section className={`border-b border-emerald-900/30 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'}>
          <div className={isMobile ? 'w-full rounded-2xl overflow-hidden border border-emerald-800/40 shadow-xl aspect-[16/10]' : 'rounded-3xl overflow-hidden border border-emerald-800/40 shadow-xl'}>
            <img
              src="/images/portfolio/demos/ethnic-food.jpg"
              alt="Authentic Assamese Thali on brass plate"
              className="w-full h-full object-cover"
            />
          </div>

          <div className={isMobile ? 'space-y-3' : 'space-y-4'}>
            <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-bold block">
              Culinary Heritage
            </span>
            <h2 className={isMobile ? 'text-lg font-serif font-bold text-white' : 'text-2xl sm:text-3xl font-serif font-bold text-white'}>
              Traditional Farm-to-Table Assamese Thali
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Meals at WildGrass are cooked in woodfire earthen pots using vegetables picked directly from our surrounding organic village gardens:
            </p>

            <div className="space-y-2 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><strong>Aromatic Joha Rice &amp; Local Dal</strong> — Fragrant organic grain unique to Assam.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><strong>River Fish Tenga</strong> — Light sour fish curry with elephant apple and tomatoes.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span><strong>Country Duck with White Gourd</strong> — Slow-cooked authentic winter delicacy.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Evening Bonfire & Tea Walk */}
      <section className={`bg-[#122216] border-t border-emerald-900/40 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center'}>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-lime-400 font-bold block">Night Under The Stars</span>
            <h3 className={isMobile ? 'text-lg font-serif font-bold text-white' : 'text-xl sm:text-2xl font-serif font-bold text-white'}>Evening Tea Garden Campfires</h3>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Every evening, we light a bonfire by the tea garden edge. Sip warm orthodox black tea, exchange wildlife stories with our resident naturalists, and listen to local folk music under starry Assam skies.
            </p>
          </div>
          <div className={isMobile ? 'w-full rounded-2xl overflow-hidden border border-emerald-800/40 shadow-xl aspect-[16/10]' : 'rounded-3xl overflow-hidden border border-emerald-800/40 shadow-xl'}>
            <img
              src="/images/portfolio/demos/bonfire-night.jpg"
              alt="Bonfire night by tea garden"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-emerald-900/40 px-4 py-6 text-center text-xs text-emerald-400/50">
        <p>© 2026 WildGrass Eco-Homestay • Kohora, Kaziranga National Park, Golaghat, Assam</p>
      </footer>
    </div>
  )
}
