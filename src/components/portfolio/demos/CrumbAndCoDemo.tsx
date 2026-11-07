import { useState } from 'react'
import {
  Heart,
  Sparkles,
  Clock,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Award,
  CheckCircle2,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

interface CakeItem {
  id: string
  name: string
  category: 'Celebration Cakes' | 'Cheesecakes' | 'Dessert Boxes'
  basePricePerKg: number
  image: string
  description: string
  leadTime: string
  tag: string
  flavorNotes: string[]
}

const MENU_ITEMS: CakeItem[] = [
  {
    id: 'belgian-truffle',
    name: 'Signature Belgian Dark Chocolate Truffle',
    category: 'Celebration Cakes',
    basePricePerKg: 1250,
    image: '/images/portfolio/crumb-and-co.jpg',
    description:
      '55% Callebaut dark chocolate ganache, moist Dutch cocoa sponge, cocoa nibs crunch and hand-rolled dark chocolate truffles.',
    leadTime: '48h Pre-order',
    tag: 'Guwahati #1 Bestseller',
    flavorNotes: ['55% Belgian Callebaut', 'Pure Amul Butter', 'Zero Artificial Essence'],
  },
  {
    id: 'lotus-biscoff',
    name: 'Blueberry Cream & Butter Cheesecake Tart',
    category: 'Cheesecakes',
    basePricePerKg: 1450,
    image: '/images/portfolio/demos/biscoff-cheesecake.jpg',
    description:
      'Slow-baked Philadelphia-style cream cheese tart on a buttery almond crust, topped with hand-cooked mountain wild blueberries.',
    leadTime: '48h Pre-order',
    tag: 'Berry Special',
    flavorNotes: ['Wild Blueberries', 'Whipped Cream Cheese', 'Rich Butter Crust'],
  },
  {
    id: 'wild-berry-gateau',
    name: 'Fresh Wild Berry & Vanilla Chiffon Gateau',
    category: 'Celebration Cakes',
    basePricePerKg: 1300,
    image: '/images/portfolio/demos/berry-cake.jpg',
    description:
      'Airy Madagascan vanilla chiffon sponge layered with regional wild berry compote, whipped mascarpone cream, and edible organic blossoms.',
    leadTime: '48h Pre-order',
    tag: 'Light & Fruity',
    flavorNotes: ['Madagascan Vanilla', 'Tart Berry Compote', 'Organic Edible Flowers'],
  },
  {
    id: 'fudge-brownie-box',
    name: 'Decadent Callebaut Brownie Box (6 Pcs)',
    category: 'Dessert Boxes',
    basePricePerKg: 550,
    image: '/images/portfolio/demos/fudge-brownies.jpg',
    description:
      'Ultra-dense fudge brownies with cracked shiny tops, layered with house-made salted caramel and flaky Maldon sea salt.',
    leadTime: '24h Pre-order',
    tag: 'Gifting Special',
    flavorNotes: ['Maldon Sea Salt', 'Fudgy Molten Center', 'Great with Espresso'],
  },
  {
    id: 'cupcakes-box',
    name: 'Artisan Pastry & Macaron Box (8 Pcs)',
    category: 'Dessert Boxes',
    basePricePerKg: 750,
    image: '/images/portfolio/demos/cupcakes-box.jpg',
    description:
      'Assortment of French almond macarons, miniature chocolate tarts, and Madagascar vanilla cupcakes.',
    leadTime: '24h Pre-order',
    tag: 'Weekend Treat',
    flavorNotes: ['French Almond Flour', 'Chocolate Ganache', 'Assorted Flavors'],
  },
]

export function CrumbAndCoDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedWeight, setSelectedWeight] = useState<number>(1)
  const [selectedCake, setSelectedCake] = useState<CakeItem>(MENU_ITEMS[0])
  const [spongeChoice, setSpongeChoice] = useState<string>('Belgian Dark Chocolate')
  const [fillingChoice, setFillingChoice] = useState<string>('Callebaut Truffle Ganache')
  const [eggless, setEggless] = useState<boolean>(true)
  const [cakeMessage, setCakeMessage] = useState<string>('Happy Birthday!')

  const filteredItems = selectedCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((i) => i.category === selectedCategory)

  return (
    <div className="bg-[#18100e] text-[#fbf5ed] font-sans antialiased selection:bg-amber-400 selection:text-black">
      {/* 1. Gourmet Announcement Bar */}
      <div className={`bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white font-bold text-center tracking-wide flex items-center justify-center gap-2 ${
        isMobile ? 'py-1.5 px-3 text-[10px]' : 'py-2 px-4 text-[11px]'
      }`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
        <span className="truncate">
          {isMobile
            ? 'Guwahati Home Studio • 100% Belgian Chocolate & Pure Amul Butter'
            : 'Boutique Home Studio in Guwahati • 100% Belgian Callebaut Chocolate & Pure Amul Butter • 48h Advance Notice'}
        </span>
      </div>

      {/* 2. Patisserie Header */}
      <header className="border-b border-amber-900/40 bg-[#221614]/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-black flex items-center justify-center font-serif font-black text-xs sm:text-sm shadow-lg shrink-0">
            C&amp;C
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif font-bold text-xs sm:text-xl tracking-wide text-amber-100 truncate">
                CRUMB &amp; CO.
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 shrink-0">
                ARTISAN STUDIO
              </span>
            </div>
            {!isMobile && (
              <p className="text-[10px] text-amber-200/60 font-mono flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 text-amber-400" />
                Christian Basti, G.S. Road, Guwahati
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
          <span>{isMobile ? 'Pre-Order' : 'Pre-Order on WhatsApp'}</span>
        </button>
      </header>

      {/* 3. Hero Section with Real Cake Photography */}
      <section className={`relative border-b border-amber-900/30 overflow-hidden bg-gradient-to-b from-[#261815] to-[#18100e] ${
        isMobile ? 'px-3 py-6' : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
      }`}>
        <div className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }>
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-medium">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
              <span className="truncate">Small-Batch Artisan Cake Studio in Assam</span>
            </div>

            <h1 className={
              isMobile
                ? 'text-xl sm:text-2xl font-serif font-black tracking-tight text-amber-50 leading-snug'
                : 'text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-amber-50 leading-tight'
            }>
              Celebration Cakes Handcrafted with <span className="text-amber-400 italic">Belgian Chocolate</span>
            </h1>

            <p className={isMobile ? 'text-xs text-amber-100/80 leading-relaxed' : 'text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-xl'}>
              Every celebration in Guwahati deserves an honest, melt-in-the-mouth masterpiece. We bake small-batch celebration cakes using 100% pure Amul dairy butter, Callebaut French cocoa, and real seasonal wild berry compotes. Zero commercial premixes. Zero vegetable fat.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-amber-200/90 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs">48h Advance Notice</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs">100% Eggless</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs">Guwahati Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Cake Visual */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
            <div className="relative rounded-3xl overflow-hidden border border-amber-800/40 shadow-2xl bg-[#261815]">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={selectedCake.image}
                  alt={selectedCake.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4 bg-gradient-to-t from-[#1b1210] to-[#261815] border-t border-amber-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    Featured Bake
                  </span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-amber-100">{selectedCake.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base font-bold text-amber-300">₹{selectedCake.basePricePerKg}</span>
                  <span className="text-[10px] text-amber-400/60 block font-mono">/ 1 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive "Custom Cake Studio" Visual Builder */}
      <section className={`border-b border-amber-900/30 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={`text-center mx-auto mb-6 ${isMobile ? 'max-w-full' : 'max-w-2xl'}`}>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
            Build Your Own
          </span>
          <h2 className={isMobile ? 'text-lg font-serif font-black text-amber-100' : 'text-2xl sm:text-3xl font-serif font-black text-amber-100'}>
            Interactive Cake Flavor Builder
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 mt-1">
            Customize your sponge, filling, size, and piped message. Get an instant quote before ordering on WhatsApp.
          </p>
        </div>

        <div className={`rounded-3xl bg-[#231715] border border-amber-800/50 shadow-2xl ${
          isMobile
            ? 'p-4 flex flex-col gap-6'
            : 'p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }`}>
          {/* Builder Controls */}
          <div className={isMobile ? 'space-y-4' : 'lg:col-span-7 space-y-4'}>
            {/* Step 1: Sponge */}
            <div>
              <label className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1.5">
                Step 1: Choose Sponge Base
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Belgian Dark Chocolate', 'Bourbon Vanilla', 'Spiced Carrot', 'Red Velvet'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpongeChoice(s)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      spongeChoice === s
                        ? 'bg-amber-400 text-black border-amber-400 shadow-md font-bold'
                        : 'bg-[#1a110f] text-amber-200/80 border-amber-900/60 hover:border-amber-700/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Filling */}
            <div>
              <label className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1.5">
                Step 2: Choose Filling &amp; Ganache
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Callebaut Truffle Ganache', 'Lotus Biscoff Cream', 'Wild Berry Compote', 'Salted Caramel'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFillingChoice(f)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      fillingChoice === f
                        ? 'bg-amber-400 text-black border-amber-400 shadow-md font-bold'
                        : 'bg-[#1a110f] text-amber-200/80 border-amber-900/60 hover:border-amber-700/50'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Size & Dietary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1.5">
                  Weight (in kg)
                </label>
                <div className="flex items-center gap-2">
                  {[0.5, 1, 1.5, 2].map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors ${
                        selectedWeight === w
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-[#1a110f] text-amber-200 border-amber-900/60'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1.5">
                  Dietary Choice
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-interactive="true"
                    onClick={() => setEggless(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                      eggless
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-[#1a110f] text-amber-200/60 border-amber-900/60'
                    }`}
                  >
                    100% Eggless
                  </button>
                  <button
                    type="button"
                    data-interactive="true"
                    onClick={() => setEggless(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                      !eggless
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-[#1a110f] text-amber-200/60 border-amber-900/60'
                    }`}
                  >
                    With Egg
                  </button>
                </div>
              </div>
            </div>

            {/* Message on Cake */}
            <div>
              <label className="text-xs font-mono uppercase text-amber-300 font-bold block mb-1">
                Piped Custom Message
              </label>
              <input
                type="text"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder="e.g. Happy 25th Birthday Rhea!"
                className="w-full bg-[#1a110f] border border-amber-900/60 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Live Order Brief Card */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#1b110f] border border-amber-800/40 space-y-4">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider block border-b border-amber-900/40 pb-2">
              Your Customized Cake Brief
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-amber-200">
                <span>Sponge Base:</span>
                <span className="font-bold text-amber-50">{spongeChoice}</span>
              </div>
              <div className="flex justify-between text-amber-200">
                <span>Filling:</span>
                <span className="font-bold text-amber-50">{fillingChoice}</span>
              </div>
              <div className="flex justify-between text-amber-200">
                <span>Portion Size:</span>
                <span className="font-bold text-amber-50">{selectedWeight} kg (approx. {selectedWeight * 8} servings)</span>
              </div>
              <div className="flex justify-between text-amber-200">
                <span>Dietary:</span>
                <span className="font-bold text-emerald-400">{eggless ? '100% Eggless' : 'Regular (With Egg)'}</span>
              </div>
              <div className="flex justify-between text-amber-200">
                <span>Message:</span>
                <span className="font-bold text-amber-300 italic truncate max-w-[180px]">"{cakeMessage}"</span>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-900/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-400/80 font-mono block">Estimated Total</span>
                <span className="text-2xl font-black text-amber-300">₹{(selectedWeight * 1250 + (eggless ? 50 : 0)).toLocaleString()}</span>
              </div>

              <button
                type="button"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send Brief to Baker</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Complete Photo Menu Gallery */}
      <section className={isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'}>
        <div className={isMobile ? 'flex flex-col gap-3 mb-6' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'}>
          <div>
            <h2 className={isMobile ? 'text-lg font-serif font-black text-amber-50' : 'text-2xl font-serif font-black text-amber-50'}>Signature Cake Collection</h2>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-0.5">
              Every design is crafted by hand in small batches in Christian Basti, Guwahati.
            </p>
          </div>

          <div className={`p-1 rounded-xl bg-[#231715] border border-amber-900/40 ${isMobile ? 'flex flex-wrap gap-1' : 'flex items-center gap-1.5'}`}>
            {['All', 'Celebration Cakes', 'Cheesecakes', 'Dessert Boxes'].map((cat) => (
              <button
                key={cat}
                type="button"
                data-interactive="true"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-amber-200/60 hover:text-amber-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-6'}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCake(item)}
              className="rounded-3xl border border-amber-900/40 bg-[#221614]/90 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                  {item.tag}
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-400">
                  <span className="font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.leadTime}
                  </span>
                  <span className="font-bold text-amber-200">
                    ₹{item.basePricePerKg} {item.category === 'Dessert Boxes' ? '/ box' : '/ kg'}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-serif font-bold text-amber-50">{item.name}</h3>
                <p className="text-xs text-amber-200/70 leading-relaxed">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.flavorNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-[#19100e] text-[10px] text-amber-300 border border-amber-900/60"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-amber-900/40 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCake(item)
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-400 hover:text-black font-bold text-xs transition-colors border border-amber-500/30 cursor-pointer"
                  >
                    Pre-order on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Studio Ethics & Real Baker Story */}
      <section className={`bg-[#1f1412] border-t border-amber-900/40 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-12 gap-8 items-center'}>
          <div className={isMobile ? 'w-full rounded-2xl overflow-hidden border border-amber-800/40 shadow-xl aspect-[16/10]' : 'md:col-span-5 rounded-3xl overflow-hidden border border-amber-800/40 shadow-xl'}>
            <img
              src="/images/portfolio/demos/baker-crafting.jpg"
              alt="Baker dusting chocolate cake in studio"
              className="w-full h-full object-cover"
            />
          </div>

          <div className={isMobile ? 'space-y-3' : 'md:col-span-7 space-y-4'}>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Our Baking Philosophy
            </span>
            <h2 className={isMobile ? 'text-lg font-serif font-bold text-amber-100' : 'text-2xl sm:text-3xl font-serif font-bold text-amber-100'}>
              Why Our Cakes Taste Unmistakably Real
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
              Most commercial bakeries cut corners with compound palm oil and synthetic sponge premixes. At Crumb &amp; Co., we believe a birthday or anniversary deserves honesty:
            </p>

            <div className="space-y-2 text-xs text-amber-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>100% Amul Dairy Butter</strong> — Never hydrogenated fats or vegetable shortening.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Real Belgian Callebaut Chocolate</strong> — 54.5% cocoa solids for silky ganache.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Baked on the Day of Your Event</strong> — Delivered fresh from oven to table.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-amber-900/40 px-4 py-6 text-center text-xs text-amber-400/50">
        <p>© 2026 Crumb &amp; Co. Artisan Bakes • Christian Basti, Guwahati, Assam • FSSAI License: 20324XXXXXX</p>
      </footer>
    </div>
  )
}
