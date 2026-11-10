import { useState } from 'react'
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Calendar,
  Sparkles, 
  Check, 
  MessageCircle, 
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  Zap
} from 'lucide-react'
import { useBakery } from './BakeryContext'
import { BAKERY_PRODUCTS } from './data'

interface CelebrationAddon {
  id: string
  name: string
  tag: string
  price: number
  image: string
}

const CELEBRATION_ADDONS: CelebrationAddon[] = [
  {
    id: 'sparkling-candle',
    name: 'Sparkling Birthday Candle',
    tag: 'Set of 2',
    price: 40,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'acrylic-topper',
    name: 'Golden "Happy Birthday" Topper',
    tag: 'Reusable',
    price: 60,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'greeting-card',
    name: 'Handmade Watercolor Card',
    tag: 'With Envelope',
    price: 30,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=240&q=80',
  },
  {
    id: 'party-caps-popper',
    name: 'Party Caps & Popper Combo',
    tag: 'Party Fun',
    price: 50,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=240&q=80',
  },
]

export function BakeryProductDetail() {
  const { 
    selectedProduct, 
    setCurrentPage, 
    addToCart, 
    toggleCart,
    townLocation,
    setDeliveryDetails 
  } = useBakery()

  const product = selectedProduct

  // PDP local states
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedWeightObj, setSelectedWeightObj] = useState(product.weights[0] || { label: '500g', multiplier: 1, servings: 'Serves 4-6' })
  const [isEggless, setIsEggless] = useState(product.isEggless)
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!')
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['sparkling-candle'])

  // Date and Time Slot separate states
  const todayStr = new Date().toISOString().split('T')[0]
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]
  const isAdvanceOrder = product.leadTime.toLowerCase().includes('24') || product.leadTime.toLowerCase().includes('48')

  const [selectedDate, setSelectedDate] = useState(isAdvanceOrder ? tomorrowStr : todayStr)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('5:00 PM - 7:00 PM (Evening)')
  const [activeTab, setActiveTab] = useState<'ingredients' | 'storage' | 'reviews'>('ingredients')

  // Calculated dynamic price
  const basePrice = Math.round(product.basePrice * selectedWeightObj.multiplier)
  const addonsPrice = selectedAddonIds.reduce((sum, id) => {
    const item = CELEBRATION_ADDONS.find(a => a.id === id)
    return sum + (item ? item.price : 0)
  }, 0)
  const totalPrice = basePrice + addonsPrice

  // Image gallery with fallback views
  const gallery = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [
        product.image,
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      ]

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: totalPrice,
      quantity: 1,
      weight: selectedWeightObj.label,
      isEggless,
      cakeMessage: cakeMessage.trim() ? cakeMessage.trim() : undefined,
      image: gallery[0],
      leadTime: product.leadTime,
      addedSparklingCandle: selectedAddonIds.includes('sparkling-candle'),
      addedGreetingCard: selectedAddonIds.includes('greeting-card'),
    })
    setDeliveryDetails(prev => ({
      ...prev,
      deliveryDate: selectedDate,
      deliverySlot: selectedTimeSlot
    }))
  }

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: totalPrice,
      quantity: 1,
      weight: selectedWeightObj.label,
      isEggless,
      cakeMessage: cakeMessage.trim() ? cakeMessage.trim() : undefined,
      image: gallery[0],
      leadTime: product.leadTime,
      addedSparklingCandle: selectedAddonIds.includes('sparkling-candle'),
      addedGreetingCard: selectedAddonIds.includes('greeting-card'),
    })
    setDeliveryDetails(prev => ({
      ...prev,
      deliveryDate: selectedDate,
      deliverySlot: selectedTimeSlot
    }))
    toggleCart(false)
    setCurrentPage('checkout')
  }

  const addonSummary = selectedAddonIds
    .map(id => CELEBRATION_ADDONS.find(a => a.id === id)?.name)
    .filter(Boolean)
    .join(', ')

  // Pre-filled WhatsApp message
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello! I want to order from The Home Oven (${townLocation}):\n\n` +
    `🎂 Item: ${product.name}\n` +
    `⚖️ Size: ${selectedWeightObj.label} (${selectedWeightObj.servings})\n` +
    `🟢 Variant: ${isEggless ? '100% Eggless' : 'Regular'}\n` +
    `✍️ Message on Cake: "${cakeMessage}"\n` +
    (addonSummary ? `🎉 Add-ons: ${addonSummary}\n` : '') +
    `📅 Date: ${selectedDate}\n` +
    `🕒 Time Slot: ${selectedTimeSlot}\n` +
    `💰 Total Price: ₹${totalPrice}\n\n` +
    `Please confirm availability.`
  )}`

  // Related products from same category
  const relatedProducts = BAKERY_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7c6a5d] overflow-x-auto whitespace-nowrap">
        <button 
          onClick={() => setCurrentPage('home')}
          className="hover:text-[#b84c26] transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button 
          onClick={() => setCurrentPage('shop')}
          className="hover:text-[#b84c26] transition-colors"
        >
          Shop Treats
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#b84c26] font-semibold">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2c1f1b] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. Main PDP Grid: Gallery (Left) & Customizer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
          
          {/* Main Display Image */}
          <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-[#f3ece1] border border-[#eadecd] shadow-lg group">
            <img
              src={gallery[activeImageIndex]}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#2c1f1b] shadow-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b84c26]" />
                <span>{product.leadTime}</span>
              </span>

              {product.tag && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#b84c26] text-white shadow-xs">
                  {product.tag}
                </span>
              )}
            </div>

            {/* 100% Eggless Pill */}
            {isEggless && (
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-xs">
                <span>🟢</span> 100% Pure Veg (Eggless)
              </div>
            )}
          </div>

          {/* Thumbnail Selector */}
          <div className="grid grid-cols-3 gap-3">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-4/3 rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-[#b84c26] shadow-md scale-[1.02]'
                    : 'border-[#eadecd] opacity-70 hover:opacity-100'
                }`}
              >
                <img 
                  src={img} 
                  alt="Thumbnail" 
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80'
                  }}
                  className="w-full h-full object-cover" 
                />
                <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded">
                  {idx === 0 ? 'Whole' : idx === 1 ? 'Slice' : 'Box'}
                </span>
              </button>
            ))}
          </div>

          {/* Baker Trust Highlight */}
          <div className="bg-[#f8f4ee] rounded-2xl p-4 border border-[#eadecd] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b84c26]/10 text-[#b84c26] flex items-center justify-center font-bold text-lg">
                👩‍🍳
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2c1f1b]">{product.bakerName}</h4>
                <p className="text-[11px] text-[#7c6a5d]">{product.bakerLocation} • FSSAI Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[#9c897b]">({product.reviewCount})</span>
            </div>
          </div>

        </div>

        {/* Right Column: Details & Customization Options */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Title */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#b84c26] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Baked Fresh on Order in {townLocation}</span>
            </div>

            <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#2c1f1b] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Dynamic Price Display */}
          <div className="bg-white rounded-2xl p-4 border border-[#eadecd] flex items-baseline justify-between shadow-2xs">
            <div>
              <span className="text-3xl font-black text-[#2c1f1b]">₹{totalPrice}</span>
              <span className="text-xs text-[#7c6a5d] ml-2">
                for {selectedWeightObj.label} ({selectedWeightObj.servings})
              </span>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              Pure Butter • No Premix
            </span>
          </div>

          {/* 1. Weight / Portion Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2c1f1b]">Select Size / Portion:</span>
              <span className="text-[#b84c26] font-semibold">{selectedWeightObj.servings}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {product.weights.map((w) => {
                const isSelected = selectedWeightObj.label === w.label
                return (
                  <button
                    key={w.label}
                    onClick={() => setSelectedWeightObj(w)}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-[#b84c26] bg-[#fdf2ec] text-[#b84c26] font-bold shadow-xs scale-[1.02]'
                        : 'border-[#eadecd] bg-white text-[#4a3b32] hover:bg-[#f8f4ee] font-medium'
                    }`}
                  >
                    <span className="block text-xs font-bold">{w.label}</span>
                    <span className="block text-[10px] text-[#7c6a5d] mt-0.5">{w.servings}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Dietary Choice (Eggless vs Classic) */}
          <div className="space-y-2">
            <span className="block text-xs font-bold text-[#2c1f1b]">Dietary Preference:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEggless(true)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isEggless
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800 shadow-xs'
                    : 'border-[#eadecd] bg-white text-[#4a3b32] hover:bg-[#f8f4ee]'
                }`}
              >
                <span>🟢</span>
                <span>100% Eggless (Pure Veg)</span>
                {isEggless && <Check className="w-3.5 h-3.5 text-emerald-700 ml-1" />}
              </button>

              <button
                onClick={() => setIsEggless(false)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  !isEggless
                    ? 'border-[#b84c26] bg-[#fdf2ec] text-[#b84c26] shadow-xs'
                    : 'border-[#eadecd] bg-white text-[#4a3b32] hover:bg-[#f8f4ee]'
                }`}
              >
                <span>🥚</span>
                <span>Contains Egg (Classic)</span>
                {!isEggless && <Check className="w-3.5 h-3.5 text-[#b84c26] ml-1" />}
              </button>
            </div>
          </div>

          {/* 3. Personalized Inscription on Cake */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2c1f1b]">Message on Cake / Ribbon:</span>
              <span className="text-[10px] text-[#7c6a5d]">{cakeMessage.length}/35 characters</span>
            </div>
            <input
              type="text"
              maxLength={35}
              placeholder="e.g. Happy Birthday Aarav! 🎂"
              value={cakeMessage}
              onChange={(e) => setCakeMessage(e.target.value)}
              className="w-full bg-white border border-[#eadecd] rounded-xl px-3.5 py-2.5 text-xs text-[#2c1f1b] placeholder:text-[#9c897b] focus:outline-none focus:border-[#b84c26] shadow-2xs"
            />
            <p className="text-[10px] text-[#7c6a5d] italic">
              * Written by hand using melted Belgian white chocolate. Free with every cake.
            </p>
          </div>

          {/* 4. Delivery Date & Time Slot (2 Separate Input Fields) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2c1f1b]">Select Delivery / Pickup Timing:</span>
              <span className="text-[10px] text-[#b84c26] font-semibold">{product.leadTime} needed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Field 1: Date Picker */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5e4d42] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#b84c26]" />
                  <span>Choose Date:</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    setDeliveryDetails(prev => ({ ...prev, deliveryDate: e.target.value }))
                  }}
                  className="w-full bg-white border border-[#eadecd] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26] shadow-2xs cursor-pointer"
                />
              </div>

              {/* Field 2: Time Slot Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5e4d42] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#b84c26]" />
                  <span>Preferred Time Slot:</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => {
                      setSelectedTimeSlot(e.target.value)
                      setDeliveryDetails(prev => ({ ...prev, deliverySlot: e.target.value }))
                    }}
                    className="w-full appearance-none bg-white border border-[#eadecd] rounded-xl pl-3.5 pr-8 py-2.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26] shadow-2xs cursor-pointer"
                  >
                    <option value="10:00 AM - 1:00 PM (Morning)">10:00 AM - 1:00 PM (Morning)</option>
                    <option value="1:00 PM - 4:00 PM (Afternoon)">1:00 PM - 4:00 PM (Afternoon)</option>
                    <option value="5:00 PM - 7:00 PM (Evening Celebration)">5:00 PM - 7:00 PM (Evening Celebration)</option>
                    <option value="7:00 PM - 9:00 PM (Dinner & Party)">7:00 PM - 9:00 PM (Dinner & Party)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#7c6a5d] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Celebration Add-ons (Visual E-commerce Cards Row) */}
          <div className="space-y-2.5 pt-2 border-t border-[#eadecd]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2c1f1b]">Make It a Celebration (Add-ons):</span>
              <span className="text-[11px] text-[#7c6a5d]">
                {selectedAddonIds.length > 0 ? (
                  <span className="text-[#b84c26] font-semibold">{selectedAddonIds.length} added</span>
                ) : (
                  'Optional'
                )}
              </span>
            </div>

            {/* Visual Mini Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CELEBRATION_ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id)
                return (
                  <div
                    key={addon.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedAddonIds(prev => prev.filter(id => id !== addon.id))
                      } else {
                        setSelectedAddonIds(prev => [...prev, addon.id])
                      }
                    }}
                    className={`cursor-pointer group relative bg-white rounded-2xl p-2.5 border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#b84c26] bg-[#fdf2ec]/50 shadow-xs ring-1 ring-[#b84c26]'
                        : 'border-[#eadecd] hover:border-[#b84c26]/60 hover:shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Thumbnail Image */}
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f3ece1] mb-2">
                        <img
                          src={addon.image}
                          alt={addon.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 bg-[#b84c26] text-white p-0.5 rounded-full shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                          {addon.tag}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-[11px] font-bold text-[#2c1f1b] leading-tight line-clamp-2">
                        {addon.name}
                      </h4>
                    </div>

                    {/* Price & Action Button */}
                    <div className="pt-2 mt-1.5 border-t border-[#f3ece1] flex items-center justify-between">
                      <span className="text-xs font-black text-[#b84c26]">
                        +₹{addon.price}
                      </span>
                      <button
                        type="button"
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-[#b84c26] text-white'
                            : 'bg-[#f8f4ee] text-[#5e4d42] group-hover:bg-[#b84c26] group-hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Added' : '+ Add'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 6. CTAs: Add to Bag & Buy Now side-by-side on one line, with WhatsApp */}
          <div className="space-y-3 pt-3">
            {/* Top row: Add to Bag and Buy Now on one line */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 px-3 sm:px-4 rounded-2xl bg-[#f8f4ee] hover:bg-[#f3ece1] border-2 border-[#b84c26] text-[#b84c26] font-bold text-xs sm:text-sm lg:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:scale-[1.01] active:scale-95 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="truncate">Add to Bag</span>
                <span className="hidden sm:inline font-black">• ₹{totalPrice}</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3.5 px-3 sm:px-4 rounded-2xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-xs sm:text-sm lg:text-base shadow-md shadow-[#b84c26]/20 flex items-center justify-center gap-1.5 sm:gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300 text-amber-300 shrink-0" />
                <span className="truncate">Buy Now</span>
                <span className="hidden md:inline font-black">• ₹{totalPrice}</span>
              </button>
            </div>

            {/* Bottom row: WhatsApp direct order */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span>Order Directly on WhatsApp</span>
            </a>

            <p className="text-[11px] text-[#7c6a5d] text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Satisfaction Guarantee • Baked Fresh Same Day</span>
            </p>
          </div>

        </div>

      </div>

      {/* 3. Deep Product Information Tabs */}
      <div className="bg-white rounded-3xl border border-[#eadecd] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex border-b border-[#eadecd] gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'ingredients'
                ? 'text-[#b84c26]'
                : 'text-[#7c6a5d] hover:text-[#2c1f1b]'
            }`}
          >
            Honest Ingredients
            {activeTab === 'ingredients' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b84c26]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'storage'
                ? 'text-[#b84c26]'
                : 'text-[#7c6a5d] hover:text-[#2c1f1b]'
            }`}
          >
            Care & Storage
            {activeTab === 'storage' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b84c26]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-[#b84c26]'
                : 'text-[#7c6a5d] hover:text-[#2c1f1b]'
            }`}
          >
            Neighbor Reviews ({product.reviewCount})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b84c26]" />
            )}
          </button>
        </div>

        {/* Tab 1: Ingredients */}
        {activeTab === 'ingredients' && (
          <div className="space-y-4 text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
            <p>
              We believe in 100% label transparency. When you order from home bakers, you know exactly what is going into your body:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {product.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1.5 rounded-xl bg-[#f8f4ee] border border-[#eadecd] text-[#2c1f1b] font-semibold text-xs"
                >
                  ✓ {ing}
                </span>
              ))}
            </div>
            <div className="bg-[#fdf2ec] p-3.5 rounded-2xl text-xs text-[#8c4224] space-y-1">
              <p className="font-bold">What We Never Use:</p>
              <p>Zero premix powders, zero artificial cake gels, zero palm oil, zero chemical food preservatives.</p>
            </div>
          </div>
        )}

        {/* Tab 2: Storage */}
        {activeTab === 'storage' && (
          <div className="space-y-3 text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
            <p><strong>Serving:</strong> Our cakes are made with pure dairy butter. Serve at room temperature for the most luscious, melt-in-the-mouth texture.</p>
            <p><strong>Storage:</strong> If not consuming immediately, keep in the original packaging box inside the refrigerator. Remains fresh for 3–4 days.</p>
            <p><strong>Breads & Brownies:</strong> Warm brownies for 15 seconds in the microwave before eating for an ultra-fudgy molten center.</p>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-[#2c1f1b]">{product.rating}</span>
              <div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#7c6a5d]">{product.reviewCount} happy celebrations in {townLocation}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#f8f4ee] border border-[#eadecd] space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-[#2c1f1b]">
                  <span>Pooja Bordoloi</span>
                  <span className="text-[#7c6a5d]">Gar-Ali, Jorhat</span>
                </div>
                <p className="text-[#5e4d42] italic">
                  "Ordered 1kg eggless for my daughter's birthday. The handwritten message in white chocolate looked stunning and the taste was 100 times better than commercial bakery shops!"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Related Treats Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#2c1f1b]">
            More Treats From the Same Oven
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => setCurrentPage('product', rel)}
                className="group cursor-pointer bg-white rounded-3xl p-3.5 border border-[#eadecd] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="aspect-4/3 rounded-2xl object-cover w-full group-hover:scale-105 transition-transform"
                  />
                  <h4 className="font-serif font-bold text-sm text-[#2c1f1b] mt-3 group-hover:text-[#b84c26] transition-colors line-clamp-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#7c6a5d]">{rel.defaultWeight}</p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#f3ece1] flex items-center justify-between">
                  <span className="font-black text-sm text-[#2c1f1b]">₹{rel.basePrice}</span>
                  <span className="text-xs font-bold text-[#b84c26]">Customize →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
