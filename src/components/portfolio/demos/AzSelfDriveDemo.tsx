import { useState } from 'react'
import {
  Car,
  Fuel,
  Users,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

interface Vehicle {
  id: string
  name: string
  category: '4x4 SUV' | '7-Seater' | 'Economy'
  transmission: string
  fuel: 'Diesel' | 'Petrol'
  seats: number
  ratePerDay: number
  image: string
  tag: string
  bestFor: string
  groundClearance: string
  features: string[]
}

const FLEET: Vehicle[] = [
  {
    id: 'thar-4x4',
    name: 'Mahindra Thar 4x4 Hardtop',
    category: '4x4 SUV',
    transmission: 'Manual & AT Available',
    fuel: 'Diesel',
    seats: 4,
    ratePerDay: 3800,
    image: '/images/portfolio/az-self-drive.jpg',
    tag: '#1 for Meghalaya & Tawang',
    bestFor: 'Cherrapunji, Dawki, Tawang mountain passes & offroad trails',
    groundClearance: '226 mm',
    features: ['Shift-on-fly 4WD Low', 'All-terrain tyres', 'Apple CarPlay & Android Auto', 'Touchscreen Infotainment'],
  },
  {
    id: 'scorpio-n',
    name: 'Mahindra Scorpio-N Z8',
    category: '7-Seater',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    ratePerDay: 3600,
    image: '/images/portfolio/demos/scorpio-suv.jpg',
    tag: 'Spacious Family Cruiser',
    bestFor: 'Kaziranga safari groups & Shillong family road trips',
    groundClearance: '187 mm',
    features: ['3-row comfortable seating', 'Dual-zone climate AC', 'mHawk 2.2L engine', 'Large luggage boot'],
  },
  {
    id: 'jimny-4x4',
    name: 'Maruti Suzuki Jimny Alpha 4x4',
    category: '4x4 SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 4,
    ratePerDay: 3000,
    image: '/images/portfolio/demos/jimny-offroad.jpg',
    tag: 'Mountain Agility',
    bestFor: 'Couples & nimble mountain hairpin navigation',
    groundClearance: '210 mm',
    features: ['AllGrip Pro 4WD', 'Compact narrow-trail turning', 'Cruise control', 'Hill descent control'],
  },
  {
    id: 'swift-vxi',
    name: 'Maruti Suzuki Swift VXi',
    category: 'Economy',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    ratePerDay: 1800,
    image: '/images/portfolio/demos/meghalaya-road.jpg',
    tag: 'Budget Friendly',
    bestFor: 'Guwahati local city commute & highway trips',
    groundClearance: '163 mm',
    features: ['22+ km/l mileage', 'Chilled AC', 'Bluetooth audio', 'Easy city parking'],
  },
]

const CIRCUITS = [
  {
    id: 'meghalaya',
    title: 'Meghalaya Waterfalls & Living Root Bridges',
    route: 'Guwahati → Shillong → Cherrapunji → Dawki → Mawlynnong',
    recommendedCar: 'Mahindra Thar 4x4',
    days: '3-4 Days',
    distance: '420 km',
    image: '/images/portfolio/demos/dawki-river.jpg',
    highlight: 'Crystal-clear Umngot river boating and mist-covered mountain roads.',
  },
  {
    id: 'kaziranga',
    title: 'Kaziranga Rhino Wildlife & Majuli Heritage',
    route: 'Guwahati → Kohora (Kaziranga) → Jorhat → Majuli Island',
    recommendedCar: 'Mahindra Scorpio-N',
    days: '4 Days',
    distance: '550 km',
    image: '/images/portfolio/demos/tea-estate.jpg',
    highlight: 'Early morning Jeep safaris and world’s largest river island.',
  },
  {
    id: 'tawang',
    title: 'Arunachal Mountain Passes & Tawang Monastery',
    route: 'Guwahati → Tezpur → Dirang → Sela Pass (13,700 ft) → Tawang',
    recommendedCar: 'Mahindra Thar 4x4 (Snow chains available)',
    days: '6-7 Days',
    distance: '950 km',
    image: '/images/portfolio/demos/meghalaya-road.jpg',
    highlight: 'High-altitude snow passes, frozen lakes, and 400-year-old monastery.',
  },
]

export function AzSelfDriveDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [pickupPoint, setPickupPoint] = useState<string>('Guwahati Airport (GAU)')
  const [tripDays, setTripDays] = useState<number>(3)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(FLEET[0])
  const [activeCircuit, setActiveCircuit] = useState<string>('meghalaya')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFleet = selectedCategory === 'All'
    ? FLEET
    : FLEET.filter((v) => v.category === selectedCategory)

  const totalEstimate = selectedVehicle.ratePerDay * tripDays
  const deposit = 5000

  return (
    <div className="bg-[#0a0e17] text-slate-100 font-sans antialiased selection:bg-lime-400 selection:text-black">
      {/* 1. Live Fleet Status Ticker */}
      <div className={`bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white font-bold text-center tracking-wide flex items-center justify-center gap-2 shadow-inner ${
        isMobile ? 'py-1.5 px-3 text-[10px]' : 'py-2 px-4 text-[11px]'
      }`}>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
        <span className="truncate">
          {isMobile
            ? 'LIVE: 4x4 Thar & Scorpio-N at GAU Airport • Yellow Plate Certified'
            : 'LIVE INVENTORY: 4x4 Thars & Scorpio-Ns Available at Guwahati Airport (GAU) • 100% Commercial Yellow Plate Certified'}
        </span>
      </div>

      {/* 2. Brand Header */}
      <header className="border-b border-white/10 bg-[#0d1322]/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-lime-400 text-black flex items-center justify-center font-black text-xs sm:text-base shadow-lg ring-2 ring-lime-400/30 shrink-0">
            AZ
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-xs sm:text-lg tracking-tight text-white truncate">
                A-Z SELF DRIVE
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-lime-400/20 text-lime-300 font-bold border border-lime-400/30 shrink-0">
                GUWAHATI
              </span>
            </div>
            {!isMobile && (
              <p className="text-[10px] text-slate-400 font-mono truncate">Assam, Meghalaya &amp; Arunachal Car Rentals</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 mr-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>₹5,000 Refundable Deposit</span>
            </div>
          )}
          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span>{isMobile ? 'WhatsApp' : 'Book on WhatsApp'}</span>
          </button>
        </div>
      </header>

      {/* 3. Hero Section with Real Car Visual */}
      <section className={`relative border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0a0e17] to-[#0a0e17] ${
        isMobile ? 'px-3 py-6' : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
      }`}>
        <div className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }>
          {/* Left Text */}
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30 text-xs text-lime-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span className="truncate">{isMobile ? 'Self-Drive Shillong, Kaziranga & Tawang' : 'Drive to Shillong, Kaziranga & Tawang Without Drivers'}</span>
            </div>

            <h1 className={
              isMobile
                ? 'text-xl sm:text-2xl font-black text-white leading-snug tracking-tight'
                : 'text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight'
            }>
              Self-Drive 4x4 Thar &amp; SUVs Delivered to <span className="text-lime-400 underline decoration-lime-400/40">Guwahati Airport</span>
            </h1>

            <p className={isMobile ? 'text-xs text-slate-300 leading-relaxed' : 'text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl'}>
              Experience the untamed beauty of Northeast India. Well-maintained Mahindra Thar 4x4s, Scorpio-Ns, and Jimnys with all-terrain tyres, commercial permits, 24/7 roadside assistance, and instant deposit refund.
            </p>

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 text-xs text-slate-300">
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">24/7</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Airport Pickup</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">₹0</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Hidden Fees</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-center sm:text-left">
                <span className="text-lime-400 font-bold block text-xs sm:text-sm">2 Hours</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">Deposit Refund</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Car Spotlight Card with Photo */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
            <div className="rounded-2xl border border-white/15 bg-slate-900/90 overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-lime-400 text-xs font-mono font-bold border border-white/10">
                  {selectedVehicle.tag}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/90 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  Ground Clearance: {selectedVehicle.groundClearance}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{selectedVehicle.name}</h3>
                    <p className="text-xs text-slate-400">{selectedVehicle.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-lime-400">₹{selectedVehicle.ratePerDay}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">/ 24 hrs</span>
                  </div>
                </div>

                {/* Instant Calculator Fields */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Pickup Spot
                    </label>
                    <select
                      value={pickupPoint}
                      onChange={(e) => setPickupPoint(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-lime-400"
                    >
                      <option>Guwahati Airport (GAU)</option>
                      <option>Paltan Bazar Station</option>
                      <option>Khanapara / G.S. Road</option>
                      <option>Hotel Doorstep Delivery</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Days Duration
                    </label>
                    <div className="flex items-center gap-1">
                      {[2, 3, 5, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          data-interactive="true"
                          onClick={() => setTripDays(d)}
                          className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg border transition-colors cursor-pointer ${
                            tripDays === d
                              ? 'bg-lime-400 text-black border-lime-400'
                              : 'bg-slate-800 text-slate-300 border-white/10'
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">
                      Total ({tripDays} Days)
                    </span>
                    <span className="text-lg font-black text-white">₹{totalEstimate.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 ml-1">+ ₹{deposit} refundable</span>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Instant Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Northeast Circuit Planner */}
      <section className={`border-b border-white/10 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={`text-center mx-auto mb-6 ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
          <span className="text-xs font-mono uppercase tracking-widest text-lime-400 font-bold block mb-1">
            Trip Inspiration
          </span>
          <h2 className={isMobile ? 'text-lg font-black text-white' : 'text-2xl sm:text-3xl font-black text-white'}>
            Where Are You Driving From Guwahati?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose a popular Northeast circuit to view recommended vehicle, distance, and road conditions.
          </p>
        </div>

        {/* Circuit Tabs */}
        <div className={isMobile ? 'grid grid-cols-1 gap-3.5' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
          {CIRCUITS.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveCircuit(c.id)
                if (c.id === 'meghalaya' || c.id === 'tawang') {
                  setSelectedVehicle(FLEET[0]) // Thar 4x4
                } else {
                  setSelectedVehicle(FLEET[1]) // Scorpio-N
                }
              }}
              className={`rounded-2xl border overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                activeCircuit === c.id
                  ? 'bg-slate-900 border-lime-400 ring-2 ring-lime-400/20'
                  : 'bg-slate-900/50 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] font-mono text-lime-300">
                  {c.days} • {c.distance}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white">{c.title}</h3>
                <p className="text-xs text-slate-400 font-mono leading-tight">{c.route}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{c.highlight}</p>
                
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-lime-400 font-mono text-[11px] font-semibold">
                    Best: {c.recommendedCar}
                  </span>
                  <span className="text-slate-400 text-[11px]">Select Circuit →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Complete Fleet Grid with Real Photos & Specs */}
      <section className={isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'}>
        <div className={isMobile ? 'flex flex-col gap-3 mb-6' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'}>
          <div>
            <h2 className={isMobile ? 'text-lg font-black text-white' : 'text-2xl font-black text-white'}>Our Guwahati Rental Fleet</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Every car has valid commercial yellow plates, comprehensive insurance, and all-weather tyres.
            </p>
          </div>

          <div className={`p-1 rounded-xl bg-slate-900 border border-white/10 ${isMobile ? 'flex flex-wrap gap-1' : 'flex items-center gap-1.5'}`}>
            {['All', '4x4 SUV', '7-Seater', 'Economy'].map((cat) => (
              <button
                key={cat}
                type="button"
                data-interactive="true"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-lime-400 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {filteredFleet.map((vehicle) => {
            const isSelected = selectedVehicle.id === vehicle.id
            return (
              <div
                key={vehicle.id}
                data-interactive="true"
                onClick={() => setSelectedVehicle(vehicle)}
                className={`rounded-2xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-lime-400 ring-2 ring-lime-400/20'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/30'
                }`}
              >
                {/* Real Vehicle Photo */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur text-lime-400 text-xs font-mono font-bold border border-white/10">
                    {vehicle.tag}
                  </div>
                  <div className="absolute bottom-2.5 right-3 text-right">
                    <span className="text-xl font-black text-white">₹{vehicle.ratePerDay}</span>
                    <span className="text-xs text-slate-400"> / 24 hrs</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{vehicle.bestFor}</p>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-lime-400" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-lime-400" />
                      <span>{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-lime-400" />
                      <span>{vehicle.seats} Seats</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1">
                    {vehicle.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Clearance: {vehicle.groundClearance}
                    </span>
                    <button
                      type="button"
                      data-interactive="true"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedVehicle(vehicle)
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-lime-400 text-black hover:bg-lime-300'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <span>{isSelected ? 'Selected' : 'Choose Vehicle'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. Document Checklist & Fast Verification */}
      <section className={`bg-slate-900/90 border-t border-white/10 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto'
      }`}>
        <h2 className={isMobile ? 'text-base font-bold text-white mb-4 text-center' : 'text-lg sm:text-xl font-bold text-white mb-6 text-center'}>
          What You Need for Self-Drive Handover in Guwahati
        </h2>

        <div className={isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 sm:grid-cols-3 gap-4'}>
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-white/10">
            <span className="text-lime-400 font-mono font-bold text-sm block mb-1">01. Driving License</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Valid original Indian 4-wheeler Driving License (minimum 1 year old).
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-white/10">
            <span className="text-lime-400 font-mono font-bold text-sm block mb-1">02. Government ID</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Aadhaar Card or Passport for identity verification. WhatsApp photo verification takes 10 mins.
            </p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-800/60 border border-white/10">
            <span className="text-lime-400 font-mono font-bold text-sm block mb-1">03. Security Deposit</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              ₹5,000 refundable security deposit via UPI. 100% refunded within 2 hours of vehicle drop-off.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQs Accordion */}
      <section className={`border-t border-white/10 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-10 max-w-4xl mx-auto'
      }`}>
        <h2 className="text-lg font-bold text-white text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {[
            {
              q: 'How does airport pickup work at Guwahati Airport (GAU)?',
              a: 'Our representative meets you at the airport arrivals terminal parking with the vehicle, keys, and completed rental agreement. Handover takes under 5 minutes.',
            },
            {
              q: 'Can I drive into Meghalaya and Arunachal Pradesh?',
              a: 'Yes, all our fleet vehicles carry all-Northeast commercial permits. For Arunachal Pradesh, you will also need an Inner Line Permit (ILP), which we assist in obtaining online.',
            },
            {
              q: 'What happens in case of a mechanical breakdown on the highway?',
              a: 'We provide 24/7 highway assistance with tied-up garages across Guwahati, Shillong, Tezpur, and Bhalukpong. If unrepairable, we dispatch a replacement car.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-lime-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === i && (
                <p className="text-xs text-slate-400 mt-2 leading-relaxed pt-2 border-t border-white/5">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Demo Footer */}
      <footer className="border-t border-white/10 px-4 py-6 text-center text-xs text-slate-500">
        <p>© 2026 A-Z Self Drive Guwahati • Borjhar Airport Road, Guwahati, Assam</p>
      </footer>
    </div>
  )
}
