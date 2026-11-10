import { useState, useRef } from 'react'
import { 
  Sparkles, 
  Upload, 
  Calendar, 
  Clock, 
  Check, 
  MessageCircle, 
  ArrowLeft, 
  CheckCircle2, 
  X 
} from 'lucide-react'
import { useBakery } from './BakeryContext'

interface SampleTheme {
  id: string
  name: string
  image: string
  suggestedWeight: string
}

const SAMPLE_THEMES: SampleTheme[] = [
  {
    id: 'theme-unicorn',
    name: 'Pastel Unicorn & Rainbow',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80',
    suggestedWeight: '1.5 kg',
  },
  {
    id: 'theme-chocolate',
    name: 'Belgian Chocolate & Gold Leaf',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
    suggestedWeight: '1 kg',
  },
  {
    id: 'theme-berry',
    name: 'Rustic Floral & Wild Berries',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
    suggestedWeight: '2 kg (2 Tiers)',
  },
  {
    id: 'theme-anniversary',
    name: 'Classic White & Rose Petals',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&q=80',
    suggestedWeight: '2 kg (2 Tiers)',
  },
]

export function BakeryCustomCake() {
  const { 
    setCurrentPage, 
    townLocation, 
    customInquiry, 
    setCustomInquiry 
  } = useBakery()

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Local state for interactive customizer
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80'
  )
  const [flavor, setFlavor] = useState(customInquiry.flavor || 'Dutch Chocolate Truffle')
  const [isEggless, setIsEggless] = useState(customInquiry.isEggless)
  const [weight, setWeight] = useState(customInquiry.weight || '1.5 kg')
  const [tiers, setTiers] = useState(customInquiry.tiers || 'Single Tall Tier')
  const [occasion, setOccasion] = useState('Kids Birthday Party')
  const [messageOnCake, setMessageOnCake] = useState(customInquiry.messageOnCake || 'Aarohi Turns 5! 🦄')
  const [designNotes, setDesignNotes] = useState(customInquiry.designNotes || 'Pastel pink and lavender colors with edible gold leaf and unicorn horn.')
  const [contactPhone, setContactPhone] = useState(customInquiry.contactPhone || '98765 43210')
  const [timeSlot, setTimeSlot] = useState('5:00 PM - 7:00 PM (Evening Celebration)')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Minimum advance date (at least 2 days in future)
  const advanceDate = new Date()
  advanceDate.setDate(advanceDate.getDate() + 2)
  const minDateStr = advanceDate.toISOString().split('T')[0]
  const [eventDate, setEventDate] = useState(minDateStr)

  // Dynamic estimate calculation
  const getEstimatedPrice = () => {
    let base = 1200
    if (weight.includes('1.5')) base = 1550
    if (weight.includes('2 kg')) base = 2300
    if (weight.includes('3 kg')) base = 3400
    if (flavor.includes('Rasmalai')) base += 200
    return { min: base, max: base + 250 }
  }

  const estimate = getEstimatedPrice()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomInquiry({
      photoPreview: photoPreview || undefined,
      flavor,
      isEggless,
      weight,
      tiers,
      eventDate,
      messageOnCake,
      designNotes,
      contactPhone,
      estimatedPrice: `₹${estimate.min} - ₹${estimate.max}`,
    })
    setIsSubmitted(true)
  }

  // Pre-filled WhatsApp direct message
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Baker Ananya! I want to request a Custom Theme Cake in ${townLocation}:\n\n` +
    `🎨 Occasion: ${occasion}\n` +
    `🎂 Flavor: ${flavor} (${isEggless ? '100% Eggless' : 'Regular'})\n` +
    `⚖️ Size & Tiers: ${weight} • ${tiers}\n` +
    `✍️ Message on Cake: "${messageOnCake}"\n` +
    `📅 Event Date: ${eventDate} (${timeSlot})\n` +
    `📝 Notes: ${designNotes}\n` +
    `💰 Price Estimate: ₹${estimate.min} - ₹${estimate.max}\n\n` +
    `I am sharing my inspiration photo screenshot here on WhatsApp. Please let me know if this can be made!`
  )}`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* 1. Header & Breadcrumbs */}
      <div className="space-y-4 border-b border-[#eadecd] pb-6">
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-1.5 text-xs text-[#7c6a5d] hover:text-[#b84c26] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2ec] text-[#b84c26] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Custom Handcrafted Studio • {townLocation}</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#2c1f1b] leading-tight">
              Bring Your Dream Cake to Life 🎨
            </h1>
            <p className="text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
              Have a Pinterest photo, cartoon character idea, or Instagram screenshot? Share your vision and our home bakers will handcraft it with fresh ingredients, pure butter, and delicious fondant detailing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 text-xs">
            <span className="px-3.5 py-2 rounded-xl bg-white border border-[#eadecd] font-bold text-[#2c1f1b] shadow-2xs">
              ⏰ Requires 24-48h Advance Notice
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-emerald-800">
              🟢 100% Pure Veg Care
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive 2-Column Builder Form */}
      <form onSubmit={handleSubmitRequest} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (6 cols): Photo Upload & Personalization */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Uploader Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
                1. Upload Inspiration Photo
              </h2>
              <span className="text-[11px] text-[#7c6a5d]">Pinterest / Instagram</span>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload Zone / Preview */}
            {photoPreview ? (
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#f3ece1] border-2 border-[#b84c26]/40 shadow-sm group">
                <img
                  src={photoPreview}
                  alt="Custom Cake Inspiration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-white text-[#2c1f1b] text-xs font-bold shadow-md hover:bg-[#f8f4ee]"
                  >
                    Change Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoPreview(null)}
                    className="p-2 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#b84c26] shadow-xs flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Inspiration Photo Attached</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="aspect-4/3 rounded-2xl border-2 border-dashed border-[#d96b43]/50 bg-[#fdf2ec]/30 hover:bg-[#fdf2ec]/60 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#fdf2ec] text-[#b84c26] flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#2c1f1b]">
                  Click or drag photo here to upload
                </h4>
                <p className="text-[11px] text-[#7c6a5d] max-w-xs">
                  Upload screenshot from Pinterest, Instagram, WhatsApp, or a hand-drawn sketch.
                </p>
                <span className="text-[10px] font-semibold text-[#b84c26] underline">
                  Browse Device Photos
                </span>
              </div>
            )}

            {/* Quick Inspiration Themes Row */}
            <div className="space-y-2 pt-2 border-t border-[#f3ece1]">
              <span className="text-[11px] font-bold text-[#7c6a5d] block">
                Or pick a popular neighborhood theme:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {SAMPLE_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => {
                      setPhotoPreview(theme.image)
                      setWeight(theme.suggestedWeight)
                    }}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-[#eadecd] hover:border-[#b84c26] transition-all"
                  >
                    <img src={theme.image} alt={theme.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <span className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[8px] font-bold p-0.5 truncate text-center">
                      {theme.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Occasion & Personalization Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
              2. Occasion & Personal Inscription
            </h2>

            <div className="space-y-3.5 text-xs">
              
              {/* Occasion */}
              <div className="space-y-1">
                <label className="font-semibold text-[#5e4d42]">What are you celebrating? *</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                >
                  <option value="1st Birthday Milestone">1st Birthday Milestone 🍼</option>
                  <option value="Kids Birthday Party">Kids Birthday Party 🦄</option>
                  <option value="Anniversary Celebration">Anniversary Celebration 💍</option>
                  <option value="Engagement / Roka">Engagement / Roka Ceremony 🌸</option>
                  <option value="Baby Shower / Welcome Baby">Baby Shower / Welcome Baby 👶</option>
                  <option value="Farewell / Graduation">Farewell / Graduation 🎓</option>
                </select>
              </div>

              {/* Message on Cake */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <label className="font-semibold text-[#5e4d42]">Name & Message on Cake *</label>
                  <span className="text-[10px] text-[#7c6a5d]">{messageOnCake.length}/35</span>
                </div>
                <input
                  type="text"
                  maxLength={35}
                  value={messageOnCake}
                  onChange={(e) => setMessageOnCake(e.target.value)}
                  placeholder="e.g. Aarohi Turns 5! 🦄"
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>

              {/* Design Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-[#5e4d42]">Design Notes & Color Palette:</label>
                <textarea
                  rows={3}
                  value={designNotes}
                  onChange={(e) => setDesignNotes(e.target.value)}
                  placeholder="e.g. Pastel pink and lavender colors with edible gold leaf and unicorn horn. Keep sweetness mild."
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl p-3 text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Right Column (6 cols): Specifications & Estimate */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-5">
            <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
              3. Cake Specifications
            </h2>

            {/* Flavor Pills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#2c1f1b]">Choose Signature Flavor:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Dutch Chocolate Truffle',
                  'Rasmalai Fusion (+₹200)',
                  'Fresh Pineapple & Cream',
                  'Red Velvet Berry',
                  'Butterscotch Crunch',
                ].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFlavor(f)}
                    className={`py-2 px-3 rounded-xl border font-semibold text-left transition-all ${
                      flavor === f
                        ? 'border-[#b84c26] bg-[#fdf2ec] text-[#b84c26] shadow-xs'
                        : 'border-[#eadecd] bg-white text-[#4a3b32] hover:bg-[#f8f4ee]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-2 pt-2 border-t border-[#f3ece1]">
              <span className="text-xs font-bold text-[#2c1f1b]">Dietary Preference:</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    isEggless
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'border-[#eadecd] bg-white text-[#4a3b32]'
                  }`}
                >
                  <span>🟢</span>
                  <span>100% Eggless (Pure Veg)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    !isEggless
                      ? 'border-[#b84c26] bg-[#fdf2ec] text-[#b84c26] shadow-xs'
                      : 'border-[#eadecd] bg-white text-[#4a3b32]'
                  }`}
                >
                  <span>🥚</span>
                  <span>Classic (With Egg)</span>
                </button>
              </div>
            </div>

            {/* Weight & Tiers */}
            <div className="space-y-2 pt-2 border-t border-[#f3ece1]">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#2c1f1b]">Weight & Serving Size:</span>
                <span className="text-[#b84c26] font-semibold">{tiers}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { w: '1 kg', t: 'Single Tier (Serves 8-10)' },
                  { w: '1.5 kg', t: 'Tall Single Tier (Serves 12-15)' },
                  { w: '2 kg', t: '2 Tiers Grand (Serves 18-22)' },
                  { w: '3 kg+', t: '3 Tiers Extravaganza (Serves 28-35)' },
                ].map((item) => (
                  <button
                    key={item.w}
                    type="button"
                    onClick={() => {
                      setWeight(item.w)
                      setTiers(item.t)
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      weight === item.w
                        ? 'border-[#b84c26] bg-[#fdf2ec] text-[#b84c26] font-bold shadow-xs'
                        : 'border-[#eadecd] bg-white text-[#4a3b32] hover:bg-[#f8f4ee]'
                    }`}
                  >
                    <span className="block font-bold">{item.w}</span>
                    <span className="block text-[10px] text-[#7c6a5d] mt-0.5">{item.t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Date & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#f3ece1]">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#b84c26]" />
                  <span>Celebration Date:</span>
                </label>
                <input
                  type="date"
                  min={minDateStr}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3 py-2 text-xs font-semibold text-[#2c1f1b]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#b84c26]" />
                  <span>Delivery Slot:</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3 py-2 text-xs font-semibold text-[#2c1f1b]"
                >
                  <option value="11:00 AM - 1:00 PM (Morning Party)">11:00 AM - 1:00 PM (Morning)</option>
                  <option value="5:00 PM - 7:00 PM (Evening Celebration)">5:00 PM - 7:00 PM (Evening)</option>
                  <option value="7:00 PM - 9:00 PM (Dinner & Night)">7:00 PM - 9:00 PM (Dinner)</option>
                </select>
              </div>
            </div>

            {/* Contact Phone */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-[#5e4d42]">Your WhatsApp Number for Order Proof: *</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
              />
            </div>

          </div>

          {/* 4. Live Estimate Card & CTAs */}
          <div className="bg-gradient-to-br from-[#ffffff] to-[#f8f4ee] rounded-3xl p-6 border-2 border-[#b84c26]/20 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#7c6a5d] font-medium block">
                  Estimated Price Range ({townLocation})
                </span>
                <span className="font-serif font-black text-2xl sm:text-3xl text-[#b84c26]">
                  ₹{estimate.min} – ₹{estimate.max}
                </span>
              </div>
              <span className="text-[10px] bg-[#fdf2ec] text-[#b84c26] font-bold px-2.5 py-1 rounded-full border border-[#eadecd]">
                No Advance Surprises
              </span>
            </div>

            <p className="text-[11px] text-[#7c6a5d] leading-relaxed">
              * Estimate includes {weight} cake with basic custom styling. Final price depends on fondant figurine complexity. Baker Ananya will confirm instantly on WhatsApp.
            </p>

            {/* Dual CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-sm shadow-lg shadow-[#b84c26]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Custom Cake Request</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat & Share Photo on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </form>

      {/* 3. Interactive Success Modal when Request is Submitted */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#eadecd] text-center space-y-4 animate-scale">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b84c26]">
                Reference ID: #CC-{Math.floor(1000 + Math.random() * 9000)}
              </span>
              <h3 className="font-serif font-black text-2xl text-[#2c1f1b]">
                Custom Request Received! 🎨
              </h3>
              <p className="text-xs text-[#5e4d42] leading-relaxed">
                Thank you! Your custom cake design has been forwarded to Baker Ananya in {townLocation}. You will receive a WhatsApp message within 30 minutes with the exact quote and slot confirmation.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] text-left text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#2c1f1b]">
                <span>{flavor}</span>
                <span>{weight}</span>
              </div>
              <p className="text-[11px] text-[#7c6a5d]">
                📅 {eventDate} • {isEggless ? '🟢 100% Eggless' : 'Regular'}
              </p>
              <p className="text-[11px] text-[#b84c26] font-semibold italic">
                "{messageOnCake}"
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba59]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Now for Faster Reply</span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setCurrentPage('shop')
                }}
                className="w-full py-2.5 rounded-xl bg-[#f8f4ee] text-[#2c1f1b] text-xs font-bold border border-[#eadecd] hover:bg-[#eadecd]"
              >
                Explore More Treats
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
