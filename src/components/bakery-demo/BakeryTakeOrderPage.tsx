import React, { useState, useEffect, useRef } from 'react'
import { 
  ArrowLeft, 
  Phone, 
  MessageSquare, 
  Store, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Wallet, 
  Send, 
  Check,
  Search,
  X,
  Plus,
  Sparkles
} from 'lucide-react'
import { BAKERY_PRODUCTS } from './data'

export interface BakeryAddonItem {
  id: string
  name: string
  category: string
  price: number
  emoji: string
}

export const BAKERY_ADDONS: BakeryAddonItem[] = [
  { id: 'add-1', name: 'Sparkling Birthday Candle', category: 'Candles', price: 40, emoji: '✨' },
  { id: 'add-2', name: 'Magic Fountain Sparkler Candle', category: 'Candles', price: 80, emoji: '🎆' },
  { id: 'add-3', name: 'Acrylic "Happy Birthday" Topper', category: 'Toppers', price: 60, emoji: '🎂' },
  { id: 'add-4', name: 'Acrylic "Happy Anniversary" Topper', category: 'Toppers', price: 60, emoji: '💍' },
  { id: 'add-5', name: 'Custom Name Wooden Cake Topper', category: 'Toppers', price: 120, emoji: '🪵' },
  { id: 'add-6', name: 'Handwritten Kraft Greeting Card', category: 'Cards', price: 30, emoji: '💌' },
  { id: 'add-7', name: 'Premium Cake Knife & Plates Set (6 pcs)', category: 'Cutlery', price: 25, emoji: '🍴' },
  { id: 'add-8', name: 'Golden Number Candle (0-9)', category: 'Candles', price: 50, emoji: '🕯️' },
  { id: 'add-9', name: 'Golden Butterfly Cake Pins (Set of 4)', category: 'Decor', price: 50, emoji: '🦋' },
  { id: 'add-10', name: 'Crown / Tiara Cake Topper', category: 'Toppers', price: 110, emoji: '👑' },
  { id: 'add-11', name: 'Fresh Edible Rose Petals Garnish', category: 'Decor', price: 40, emoji: '🌹' },
  { id: 'add-12', name: 'Number Foil Balloon (16 inch)', category: 'Party', price: 50, emoji: '🎈' },
  { id: 'add-13', name: 'Party Popper Confetti Blast', category: 'Party', price: 60, emoji: '🎉' },
  { id: 'add-14', name: 'Mini Fresh Rose Bouquet', category: 'Flowers', price: 150, emoji: '💐' },
  { id: 'add-15', name: 'Pastel Gift Box + Satin Ribbon', category: 'Packaging', price: 75, emoji: '🎁' },
]

export interface PosOrderData {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  orderSource: 'phone' | 'whatsapp' | 'walkin' | 'instagram'
  items: string
  weight: string
  isEggless: boolean
  cakeMessage?: string
  kitchenNotes?: string
  deliveryType: 'delivery' | 'pickup'
  deliveryDate: string
  timing: string
  address: string
  status: 'received' | 'out_for_delivery' | 'delivered'
  basePrice: number
  addonsTotal: number
  addonsDescription?: string
  deliveryFee: number
  discountAmount: number
  discountReason: string
  finalAmount: number
  advanceAmount: number
  pendingAmount: number
  advancePaymentMode: string
  pendingCollectionMode: string
  paymentMethod: string
}

interface BakeryTakeOrderPageProps {
  onSaveOrder: (order: PosOrderData) => void
  onCancel: () => void
  townLocation: string
}

export function BakeryTakeOrderPage({
  onSaveOrder,
  onCancel,
  townLocation,
}: BakeryTakeOrderPageProps) {
  // 1. Order Channel
  const [orderSource, setOrderSource] = useState<'phone' | 'whatsapp' | 'walkin' | 'instagram'>('phone')

  // 2. Customer Details
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerNotes, setCustomerNotes] = useState('')

  // 3. Searchable Cake Selector & Custom Details
  const [cakeSearchQuery, setCakeSearchQuery] = useState('')
  const [isCakeSearchOpen, setIsCakeSearchOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string>('dutch-chocolate-truffle')
  const [itemName, setItemName] = useState('Classic Dutch Chocolate Truffle Cake')
  
  // 2 Fields for Portion: Size Number (e.g. 2, 1.5, 500) + Unit Dropdown (Pound, Kg, Grams, Pieces)
  const [sizeNumber, setSizeNumber] = useState<string>('1')
  const [sizeUnit, setSizeUnit] = useState<string>('Pound')
  
  const [isEggless, setIsEggless] = useState(true)
  const [cakeMessage, setCakeMessage] = useState('Happy Birthday!')
  const [kitchenNotes, setKitchenNotes] = useState('')
  const searchDropdownRef = useRef<HTMLDivElement>(null)

  // 4. Custom Add-ons / Extras (Searchable Combobox like Cake Selector)
  const [addonsDescription, setAddonsDescription] = useState('Sparkling Birthday Candle')
  const [addonSearchQuery, setAddonSearchQuery] = useState('Sparkling Birthday Candle')
  const [isAddonSearchOpen, setIsAddonSearchOpen] = useState(false)
  const [addonsTotal, setAddonsTotal] = useState<number>(40)
  const addonDropdownRef = useRef<HTMLDivElement>(null)

  // 5. Delivery & Schedule (Flexible inputs)
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup')
  const [deliveryDate, setDeliveryDate] = useState('Today (10 Nov)')
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Today 5:30 PM')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryLandmark, setDeliveryLandmark] = useState('')
  const [deliveryFee, setDeliveryFee] = useState<number>(0)

  // 6. Financials: Base, Discount, Advance, Pending (All direct input fields)
  const [basePrice, setBasePrice] = useState<number>(550)
  const [discountAmount, setDiscountAmount] = useState<number>(0)
  const [discountReason, setDiscountReason] = useState<string>('')
  const [advanceAmount, setAdvanceAmount] = useState<number>(200)
  const [advanceMode, setAdvanceMode] = useState<string>('GPay / PhonePe (UPI)')
  const [pendingCollectionMode, setPendingCollectionMode] = useState<string>('Cash on Delivery (COD)')

  const [formError, setFormError] = useState<string | null>(null)
  const [savedSuccessToast, setSavedSuccessToast] = useState(false)

  // Filter cakes for search combobox
  const filteredCakes = BAKERY_PRODUCTS.filter((product) => {
    const q = cakeSearchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    )
  })

  // Filter add-ons for search combobox
  const filteredAddons = BAKERY_ADDONS.filter((item) => {
    const q = addonSearchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  // Close search dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target as Node)) {
        setIsCakeSearchOpen(false)
      }
      if (addonDropdownRef.current && !addonDropdownRef.current.contains(event.target as Node)) {
        setIsAddonSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Subtotal before discount
  const subtotalBeforeDiscount = Number(basePrice || 0) + Number(addonsTotal || 0) + Number(deliveryFee || 0)
  
  // Final Gross Payable after discount (e.g. ₹170 discount)
  const finalAmount = Math.max(0, subtotalBeforeDiscount - Number(discountAmount || 0))

  // Calculated Pending Amount
  const pendingAmount = Math.max(0, finalAmount - Number(advanceAmount || 0))

  // Auto-adjust delivery fee when switching pickup vs delivery
  useEffect(() => {
    if (deliveryType === 'pickup') {
      setDeliveryFee(0)
    } else {
      setDeliveryFee(basePrice >= 800 ? 0 : 40)
    }
  }, [deliveryType, basePrice])

  // Select Cake from Search
  const handleSelectCake = (cake: typeof BAKERY_PRODUCTS[0]) => {
    setSelectedProductId(cake.id)
    setItemName(cake.name)
    setBasePrice(cake.basePrice)
    setIsEggless(cake.isEggless)
    setCakeSearchQuery(cake.name)
    setIsCakeSearchOpen(false)

    // Set default size
    if (cake.defaultWeight?.toLowerCase().includes('box')) {
      setSizeNumber('6')
      setSizeUnit('Pieces')
    } else if (cake.defaultWeight?.toLowerCase().includes('500g')) {
      setSizeNumber('500')
      setSizeUnit('Grams')
    } else if (cake.defaultWeight?.toLowerCase().includes('kg')) {
      setSizeNumber('1')
      setSizeUnit('Kg')
    } else {
      setSizeNumber('1')
      setSizeUnit('Pound')
    }
  }

  // Size changes & price recalculation
  const portionWeight = `${sizeNumber} ${sizeUnit}`.trim()

  const handleSizeNumberChange = (val: string) => {
    setSizeNumber(val)
    recalcPriceForSize(val, sizeUnit)
  }

  const handleSizeUnitChange = (unit: string) => {
    setSizeUnit(unit)
    recalcPriceForSize(sizeNumber, unit)
  }

  const recalcPriceForSize = (val: string, unit: string) => {
    const num = parseFloat(val)
    if (isNaN(num) || num <= 0) return
    const found = BAKERY_PRODUCTS.find((p) => p.id === selectedProductId)
    if (!found) return

    const base = found.basePrice
    if (unit === 'Pound') {
      if (num === 1) setBasePrice(base)
      else if (num === 1.5) setBasePrice(Math.round(base * 1.5))
      else if (num === 2) setBasePrice(Math.round(base * 1.8))
      else setBasePrice(Math.round(base * (num <= 1 ? num : 1 + (num - 1) * 0.8)))
    } else if (unit === 'Kg') {
      if (num === 0.5) setBasePrice(base)
      else if (num === 1) setBasePrice(Math.round(base * 1.8))
      else if (num === 1.5) setBasePrice(Math.round(base * 2.6))
      else if (num === 2) setBasePrice(Math.round(base * 3.4))
      else setBasePrice(Math.round(base * num * 1.8))
    } else if (unit === 'Grams') {
      if (num <= 500) setBasePrice(base)
      else if (num === 750) setBasePrice(Math.round(base * 1.5))
      else if (num === 1000) setBasePrice(Math.round(base * 1.8))
      else setBasePrice(Math.round(base * (num / 500) * 0.9))
    }
  }

  // Use Custom Cake from search text
  const handleUseCustomCake = () => {
    if (!cakeSearchQuery.trim()) return
    setSelectedProductId('custom')
    setItemName(cakeSearchQuery.trim())
    setIsCakeSearchOpen(false)
  }

  // Select Add-on from Search Combobox
  const handleSelectAddon = (item: BakeryAddonItem) => {
    setAddonSearchQuery(item.name)
    setAddonsDescription(item.name)
    setAddonsTotal(item.price)
    setIsAddonSearchOpen(false)
  }

  // Use Custom Add-on from search text
  const handleUseCustomAddon = () => {
    if (!addonSearchQuery.trim()) return
    setAddonsDescription(addonSearchQuery.trim())
    setIsAddonSearchOpen(false)
  }

  // Quick Preset Form Fill (for quick demonstration)
  const handleQuickDemoPreset = (type: 'birthday' | 'anniversary' | 'brownie') => {
    if (type === 'birthday') {
      setOrderSource('phone')
      setCustomerName('Dr. Priya')
      setCustomerPhone('94350 44210')
      setCustomerNotes('Gar-Ali Hospital Staff Quarters regular')
      setItemName('Classic Dutch Chocolate Truffle Cake')
      setSizeNumber('1.5')
      setSizeUnit('Pound')
      setBasePrice(850)
      setIsEggless(true)
      setCakeMessage('Happy 10th Birthday Aarav! 🎂')
      setAddonsDescription('Sparkling Birthday Candle + Knife Set')
      setAddonSearchQuery('Sparkling Birthday Candle + Knife Set')
      setAddonsTotal(60)
      setDeliveryType('delivery')
      setDeliveryDate('Today (10 Nov)')
      setDeliveryTimeSlot('Today 6:00 PM')
      setDeliveryAddress('Civil Hospital Road, Staff Qtr B-4')
      setDeliveryLandmark('Near Medical College Gate')
      setDiscountAmount(170)
      setDiscountReason('Bargained ₹170 off for neighbor regular')
      setAdvanceAmount(250)
      setAdvanceMode('GPay to 9876543210')
      setPendingCollectionMode('Cash on Delivery (COD)')
    } else if (type === 'anniversary') {
      setOrderSource('whatsapp')
      setCustomerName('Bikash Bordoloi')
      setCustomerPhone('98765 11223')
      setItemName('Royal Rasmalai Tres Leches Cake')
      setSizeNumber('2')
      setSizeUnit('Pound')
      setBasePrice(1150)
      setIsEggless(true)
      setCakeMessage('Happy 25th Anniversary Maa & Papa! 💕')
      setAddonsDescription('Handwritten Kraft Greeting Card + Rose petals')
      setAddonSearchQuery('Handwritten Kraft Greeting Card + Rose petals')
      setAddonsTotal(50)
      setDeliveryType('pickup')
      setDeliveryDate('Tomorrow (11 Nov)')
      setDeliveryTimeSlot('Tomorrow 11:30 AM')
      setDiscountAmount(150)
      setDiscountReason('Friend & family special discount')
      setAdvanceAmount(500)
      setAdvanceMode('Cash Received at Counter')
      setPendingCollectionMode('Pay at Studio on Pickup')
    } else {
      setOrderSource('walkin')
      setCustomerName('Rupam Saikia')
      setCustomerPhone('91234 56789')
      setItemName('Fudgy Walnut Brownies (Pack of 6)')
      setSizeNumber('6')
      setSizeUnit('Pieces')
      setBasePrice(320)
      setCakeMessage('')
      setAddonsDescription('')
      setAddonSearchQuery('')
      setAddonsTotal(0)
      setDeliveryType('pickup')
      setDeliveryDate('Today (10 Nov)')
      setDeliveryTimeSlot('Today 4:00 PM')
      setDiscountAmount(20)
      setDiscountReason('Round-off to nearest 300')
      setAdvanceAmount(300)
      setAdvanceMode('Cash Handover')
      setPendingCollectionMode('Already Fully Paid')
    }
  }

  // Submit Handler
  const handleSubmit = (e: React.FormEvent, openWhatsAppAfter: boolean = false) => {
    e.preventDefault()
    setFormError(null)

    if (!customerName.trim()) {
      setFormError('Please enter the customer name')
      return
    }
    if (!itemName.trim()) {
      setFormError('Please enter or select the cake / treat ordered')
      return
    }
    if (!sizeNumber.trim() || Number(sizeNumber) <= 0) {
      setFormError('Please enter a valid size number (e.g. 1, 1.5, 2, 500)')
      return
    }
    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter delivery address or switch to Self-Pickup')
      return
    }

    const orderNum = `PH-${Math.floor(400 + Math.random() * 500)}`
    
    // Construct Payment Method Summary string
    let paySummary = ''
    if (pendingAmount === 0) {
      paySummary = `Fully Paid (₹${finalAmount} via ${advanceMode})`
    } else if (advanceAmount > 0) {
      paySummary = `Adv ₹${advanceAmount} (${advanceMode}) • Bal ₹${pendingAmount} (${pendingCollectionMode})`
    } else {
      paySummary = `Due ₹${finalAmount} (${pendingCollectionMode})`
    }

    const newOrder: PosOrderData = {
      id: `pos-${Date.now()}`,
      orderNumber: orderNum,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim() || '9876543210',
      orderSource,
      items: itemName.trim(),
      weight: portionWeight.trim(),
      isEggless,
      cakeMessage: cakeMessage.trim() ? cakeMessage : undefined,
      kitchenNotes: kitchenNotes.trim() ? kitchenNotes : undefined,
      deliveryType,
      deliveryDate,
      timing: deliveryTimeSlot,
      address: deliveryType === 'pickup' ? 'Self-Pickup (Gar-Ali Studio)' : `${deliveryAddress}${deliveryLandmark ? ` (Near ${deliveryLandmark})` : ''}`,
      status: 'received',
      basePrice,
      addonsTotal,
      addonsDescription: addonsDescription.trim() || undefined,
      deliveryFee,
      discountAmount,
      discountReason: discountReason.trim() || 'Direct Concession',
      finalAmount,
      advanceAmount,
      pendingAmount,
      advancePaymentMode: advanceMode,
      pendingCollectionMode,
      paymentMethod: paySummary,
    }

    // Optional: Open WhatsApp with order confirmation docket
    if (openWhatsAppAfter) {
      const waText = encodeURIComponent(
        `🧁 *Order Confirmation — The Home Oven (${townLocation})*\n` +
        `Order Number: *#${orderNum}*\n` +
        `Customer: ${customerName}\n` +
        `Item: ${itemName} (${portionWeight}${isEggless ? ', 🟢 100% Eggless' : ''})\n` +
        (cakeMessage ? `Inscription: "${cakeMessage}"\n` : '') +
        `Delivery Slot: ${deliveryDate} at ${deliveryTimeSlot}\n` +
        `Mode: ${deliveryType === 'pickup' ? 'Self-Pickup (Gar-Ali)' : 'Home Delivery'}\n` +
        `--------------------\n` +
        `Bill Amount: ₹${subtotalBeforeDiscount}\n` +
        (discountAmount > 0 ? `Discount: -₹${discountAmount} (${discountReason || 'Discount applied'})\n` : '') +
        `*Net Total: ₹${finalAmount}*\n` +
        `*Advance Received: ₹${advanceAmount} (${advanceMode})*\n` +
        `*Balance Due at Delivery/Pickup: ₹${pendingAmount}*\n` +
        `--------------------\n` +
        `Thank you for supporting your neighborhood home baker Ananya! 🙏`
      )
      window.open(`https://wa.me/91${customerPhone.replace(/\D/g, '') || '9876543210'}?text=${waText}`, '_blank')
    }

    setSavedSuccessToast(true)
    setTimeout(() => {
      onSaveOrder(newOrder)
    }, 400)
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      
      {/* 1. Page Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dfd5] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7c6a5d]">
            <button
              type="button"
              onClick={onCancel}
              className="hover:text-[#c85a32] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span className="text-[#c85a32]">Take Phone / Store Order (POS)</span>
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#2c1f1b]">
            Take Phone / Walk-in Order
          </h2>
          <p className="text-xs text-[#7c6a5d]">
            Flexible order intake: search hundreds of cakes, enter custom weights (grams/pounds), arbitrary discounts & advance tracking.
          </p>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-[#7c6a5d] hidden md:inline">⚡ Quick Presets:</span>
          <button
            type="button"
            onClick={() => handleQuickDemoPreset('birthday')}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#e8dfd5] text-xs font-bold text-[#2c1f1b] hover:border-[#c85a32] hover:text-[#c85a32] shadow-2xs transition-colors"
          >
            🎂 1.5 lb Truffle (₹170 Disc)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoPreset('anniversary')}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#e8dfd5] text-xs font-bold text-[#2c1f1b] hover:border-[#c85a32] hover:text-[#c85a32] shadow-2xs transition-colors"
          >
            💐 2 lb Rasmalai (₹500 Adv)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoPreset('brownie')}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#e8dfd5] text-xs font-bold text-[#2c1f1b] hover:border-[#c85a32] hover:text-[#c85a32] shadow-2xs transition-colors"
          >
            🍫 6 Pcs Brownies
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {formError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* Success Toast Banner */}
      {savedSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-scale">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Order saved successfully! Pushing to live order pipeline...</span>
        </div>
      )}

      {/* 2. Main 2-Column POS Intake Form */}
      <form onSubmit={(e) => handleSubmit(e, false)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =========================================================================
            LEFT COLUMN (7 COLS): Customer, Searchable Cake, Portion Input, Addons
        ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* A. Customer & Source Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f3ece1] pb-3">
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                1. Order Channel & Customer Information
              </h3>
              <span className="text-[11px] font-semibold text-[#7c6a5d]">{townLocation} Studio</span>
            </div>

            {/* Order Source Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#2c1f1b]">Order Received Via *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setOrderSource('phone')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderSource === 'phone'
                      ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                      : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42] hover:bg-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderSource('whatsapp')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderSource === 'whatsapp'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42] hover:bg-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderSource('walkin')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderSource === 'walkin'
                      ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                      : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42] hover:bg-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Walk-in</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderSource('instagram')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    orderSource === 'instagram'
                      ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                      : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42] hover:bg-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </button>
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b]">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Priya / Bikash Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b]">WhatsApp Mobile Number *</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-[#7c6a5d]">🇮🇳 +91</span>
                  <input
                    type="tel"
                    required
                    placeholder="94350 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl pl-16 pr-3.5 py-2.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32] focus:bg-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-[#7c6a5d]">Customer Note / Relationship (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Regular neighbor from Gar-Ali Ward 4"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
              </div>
            </div>
          </div>

          {/* B. Cake / Treat Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-xs space-y-4">
            <div className="border-b border-[#f3ece1] pb-3">
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                2. Cake / Treat Details & Customization
              </h3>
            </div>

            {/* 1. SEARCHABLE CAKE SELECTOR COMBOBOX */}
            <div className="space-y-1.5 text-xs relative" ref={searchDropdownRef}>
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#2c1f1b] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>Search Catalog or Type Custom Cake *</span>
                </label>
                <span className="text-[10px] text-[#7c6a5d]">Type to search {BAKERY_PRODUCTS.length}+ catalog bakes</span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-[#9c897b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type cake name, flavor (e.g. Truffle, Rasmalai, Brownie, Red Velvet)..."
                  value={cakeSearchQuery}
                  onFocus={() => setIsCakeSearchOpen(true)}
                  onChange={(e) => {
                    setCakeSearchQuery(e.target.value)
                    setItemName(e.target.value)
                    setIsCakeSearchOpen(true)
                  }}
                  className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl pl-9 pr-8 py-2.5 text-xs font-bold text-[#2c1f1b] focus:bg-white focus:outline-none shadow-2xs"
                />
                {cakeSearchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setCakeSearchQuery('')
                      setItemName('')
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9c897b] hover:text-[#2c1f1b] p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Floating Autocomplete Search Results */}
              {isCakeSearchOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#e8dfd5] rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto divide-y divide-[#f5efe8] animate-fade-in">
                  
                  {filteredCakes.length > 0 ? (
                    filteredCakes.map((cake) => (
                      <div
                        key={cake.id}
                        onClick={() => handleSelectCake(cake)}
                        className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors hover:bg-[#fdf2ec]/50 ${
                          selectedProductId === cake.id ? 'bg-[#fdf2ec]' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={cake.image}
                            alt={cake.name}
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-[#e8dfd5]"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-[#2c1f1b] truncate">{cake.name}</p>
                            <p className="text-[10px] text-[#7c6a5d] truncate">
                              {cake.category} • {cake.defaultWeight} • {cake.isEggless ? '🟢 Eggless' : 'Egg'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 pl-2">
                          <span className="font-serif font-black text-xs text-[#c85a32]">₹{cake.basePrice}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-[#7c6a5d] space-y-1">
                      <p>No catalog cake matches "{cakeSearchQuery}"</p>
                    </div>
                  )}

                  {/* Option to use custom typed text */}
                  {cakeSearchQuery.trim() && (
                    <div
                      onClick={handleUseCustomCake}
                      className="p-2.5 bg-[#fdfbf7] hover:bg-[#fdf2ec] text-[#c85a32] text-xs font-bold flex items-center gap-2 cursor-pointer border-t border-[#e8dfd5]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Use custom off-menu cake: "<strong>{cakeSearchQuery}</strong>"</span>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Direct Editable Item Name on Docket */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-[#2c1f1b]">Item Name on Docket / Receipt *</label>
              <input
                type="text"
                required
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Classic Dutch Chocolate Truffle Cake"
                className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs font-bold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
              />
            </div>

            {/* 2. SIMPLE 2 FIELDS: Size Number Input + Unit Dropdown */}
            <div className="space-y-1.5 text-xs pt-1">
              <label className="font-bold text-[#2c1f1b]">
                Size & Unit *
              </label>

              <div className="grid grid-cols-12 gap-2">
                {/* Field 1: Enter size number (e.g. 2, 1.5, 500) */}
                <div className="col-span-7 sm:col-span-8">
                  <input
                    type="number"
                    step="any"
                    min="0.1"
                    required
                    placeholder="Enter size (e.g. 2, 1.5, 500)"
                    value={sizeNumber}
                    onChange={(e) => handleSizeNumberChange(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#2c1f1b] focus:outline-none focus:bg-white shadow-2xs"
                  />
                </div>

                {/* Field 2: Dropdown for Unit (pound, kg, grams, pieces) */}
                <div className="col-span-5 sm:col-span-4">
                  <select
                    value={sizeUnit}
                    onChange={(e) => handleSizeUnitChange(e.target.value)}
                    className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3 py-2.5 text-xs font-bold text-[#2c1f1b] focus:outline-none focus:bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="Pound">Pound</option>
                    <option value="Kg">Kg</option>
                    <option value="Grams">Grams</option>
                    <option value="Pieces">Pieces</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dietary Preference & Cake Inscription */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs pt-1">
              
              {/* Eggless Pure Veg Toggle */}
              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b]">Dietary Preference</label>
                <button
                  type="button"
                  onClick={() => setIsEggless(!isEggless)}
                  className={`w-full py-2.5 px-3.5 rounded-xl border font-bold text-xs flex items-center justify-between transition-colors ${
                    isEggless
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-[#f8f4ee] border-[#eadecd] text-[#7c6a5d]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{isEggless ? '🟢 100% Eggless (Pure Veg)' : '🥚 Classic (With Egg)'}</span>
                  </div>
                  <span className="text-[10px] underline font-bold">Toggle</span>
                </button>
              </div>

              {/* Cake Inscription Message Input */}
              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b]">Cake Inscription / Message</label>
                <input
                  type="text"
                  placeholder="e.g. Happy 10th Birthday Aarav! 🎂"
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs font-medium text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
              </div>

            </div>

            {/* Special Kitchen Notes */}
            <div className="space-y-1 text-xs">
              <label className="font-bold text-[#7c6a5d]">Kitchen / Baking Notes (Internal)</label>
              <input
                type="text"
                placeholder="e.g. Light sweetness, extra moist, blue chocolate curls, delicate 2-tier"
                value={kitchenNotes}
                onChange={(e) => setKitchenNotes(e.target.value)}
                className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
              />
            </div>

            {/* 3. CELEBRATION ADD-ONS & EXTRAS - SEARCHABLE AUTOCOMPLETE (LIKE CAKE SELECTOR) */}
            <div className="pt-2 border-t border-[#f3ece1] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#2c1f1b] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>Celebration Add-ons & Custom Extras</span>
                </label>
                <span className="text-[10px] text-[#7c6a5d]">Type to search add-ons or enter custom</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                {/* Searchable Add-on Input Combobox */}
                <div className="sm:col-span-8 relative" ref={addonDropdownRef}>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#9c897b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Type add-on (e.g. spark, candle, topper, card, balloon, gift box)..."
                      value={addonSearchQuery}
                      onFocus={() => setIsAddonSearchOpen(true)}
                      onChange={(e) => {
                        setAddonSearchQuery(e.target.value)
                        setAddonsDescription(e.target.value)
                        setIsAddonSearchOpen(true)
                      }}
                      className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl pl-9 pr-8 py-2.5 text-xs font-bold text-[#2c1f1b] focus:bg-white focus:outline-none shadow-2xs"
                    />
                    {addonSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setAddonSearchQuery('')
                          setAddonsDescription('')
                          setAddonsTotal(0)
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9c897b] hover:text-[#2c1f1b] p-1"
                        title="Clear add-on"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Floating Autocomplete Dropdown */}
                  {isAddonSearchOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#e8dfd5] rounded-2xl shadow-xl z-40 max-h-60 overflow-y-auto divide-y divide-[#f5efe8] animate-fade-in">
                      {filteredAddons.length > 0 ? (
                        filteredAddons.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleSelectAddon(item)}
                            className="p-2.5 flex items-center justify-between cursor-pointer transition-colors hover:bg-[#fdf2ec]/60"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base shrink-0 p-1 bg-[#fbf6ee] rounded-lg border border-[#f0e6d8]">
                                {item.emoji}
                              </span>
                              <div className="min-w-0">
                                <p className="font-bold text-xs text-[#2c1f1b] truncate">{item.name}</p>
                                <p className="text-[10px] text-[#7c6a5d]">{item.category}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-2">
                              <span className="font-serif font-black text-xs text-[#c85a32]">
                                + ₹{item.price}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-xs text-[#7c6a5d]">
                          No catalog add-on matches "{addonSearchQuery}"
                        </div>
                      )}

                      {/* Custom Add-on Option */}
                      {addonSearchQuery.trim() && (
                        <div
                          onClick={handleUseCustomAddon}
                          className="p-2.5 bg-[#fdfbf7] hover:bg-[#fdf2ec] text-[#c85a32] text-xs font-bold flex items-center gap-2 cursor-pointer border-t border-[#e8dfd5]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Use custom extra: "<strong>{addonSearchQuery}</strong>"</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Add-on Amount Field */}
                <div className="sm:col-span-4 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#7c6a5d] text-xs pointer-events-none">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Amount ₹"
                    value={addonsTotal === 0 ? '' : addonsTotal}
                    onChange={(e) => setAddonsTotal(Number(e.target.value) || 0)}
                    className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl pl-8 pr-3 py-2.5 text-xs font-bold text-[#2c1f1b] focus:outline-none focus:bg-white shadow-2xs"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* C. Delivery Mode & Flexible Schedule Inputs */}
          <div className="bg-white rounded-3xl p-6 border border-[#e8dfd5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#f3ece1] pb-3">
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                3. Kitchen Timing & Delivery Mode
              </h3>
              <span className="text-[11px] text-[#7c6a5d]">Freeform date & time slot</span>
            </div>

            {/* Mode: Self-Pickup vs Home Delivery */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2.5 px-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                    : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42]'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Self-Pickup (Gar-Ali)</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2.5 px-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-[#c85a32] text-white border-[#c85a32] shadow-xs'
                    : 'bg-[#fdfbf7] border-[#e8dfd5] text-[#5e4d42]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Local Home Delivery</span>
              </button>
            </div>

            {/* Date & Time Slot Row (Direct freeform input fields) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>Delivery / Pickup Date *</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  placeholder="e.g. Today (10 Nov), Tomorrow, 15 Nov Sunday"
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2c1f1b] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>Target Time Slot *</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  placeholder="e.g. Today 5:30 PM, Evening 6-7 PM, 11:30 AM"
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
              </div>
            </div>

            {/* Delivery Address (only if Home Delivery) */}
            {deliveryType === 'delivery' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-[#2c1f1b]">Street Address & House No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Civil Hospital Road, Staff Quarters B-4"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#7c6a5d]">Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near SBI ATM / JB College"
                    value={deliveryLandmark}
                    onChange={(e) => setDeliveryLandmark(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#7c6a5d]">Delivery Fee (₹)</label>
                  <input
                    type="number"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(Number(e.target.value) || 0)}
                    className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-3.5 py-2 text-xs font-bold text-[#2c1f1b] focus:outline-none"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN (5 COLS): Sticky Order Billing, Arbitrary Discount & Advance
        ========================================================================= */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          
          <div className="bg-white rounded-3xl p-6 border-2 border-[#e8dfd5] shadow-md space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#f3ece1] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧾</span>
                <h3 className="font-serif font-black text-lg text-[#2c1f1b]">
                  Order Billing & Terms
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fdf2ec] text-[#c85a32]">
                Small-Town POS
              </span>
            </div>

            {/* Pricing Breakdown Lines (Editable Base Price) */}
            <div className="space-y-2.5 text-xs">
              
              <div className="flex items-center justify-between">
                <span className="text-[#5e4d42] font-semibold">
                  Item Base Price ({portionWeight || 'Custom'}):
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[#7c6a5d] font-bold">₹</span>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value) || 0)}
                    className="w-24 bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl px-2.5 py-1 text-right text-xs font-black text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                  />
                </div>
              </div>

              {addonsTotal > 0 && (
                <div className="flex items-center justify-between text-[#5e4d42]">
                  <span className="truncate max-w-[200px]">Add-ons ({addonsDescription}):</span>
                  <span className="font-bold text-[#2c1f1b]">+₹{addonsTotal}</span>
                </div>
              )}

              {deliveryType === 'delivery' && (
                <div className="flex items-center justify-between text-[#5e4d42]">
                  <span>Local Delivery Fee:</span>
                  <span className="font-bold text-[#2c1f1b]">
                    {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `+₹${deliveryFee}`}
                  </span>
                </div>
              )}

              {/* Gross Subtotal line */}
              <div className="flex items-center justify-between pt-1 text-xs text-[#7c6a5d] border-t border-dashed border-[#e8dfd5]">
                <span>Gross Subtotal:</span>
                <span className="font-bold">₹{subtotalBeforeDiscount}</span>
              </div>

            </div>

            {/* =========================================================================
                KEY USER REQUIREMENT: Small-Town Discount (Direct Input Field, e.g. ₹170)
            ========================================================================= */}
            <div className="p-4 rounded-2xl bg-[#fff8f5] border-2 border-[#f5ded5] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-[#c85a32] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Small-Town Discount / Concession (₹)</span>
                </label>
                {discountAmount > 0 && (
                  <span className="text-xs font-black text-[#c85a32] bg-white px-2 py-0.5 rounded-full border border-[#f5ded5]">
                    -₹{discountAmount} Concession
                  </span>
                )}
              </div>

              {/* Direct Full-Width Discount Amount Input (Enter any arbitrary amount, e.g. 170) */}
              <div className="space-y-1">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-black text-[#c85a32]">₹</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter discount amount (e.g. 170, 50, 120, 0)"
                    value={discountAmount === 0 ? '' : discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value) || 0)}
                    className="w-full bg-white border-2 border-[#f5ded5] focus:border-[#c85a32] rounded-xl pl-8 pr-3 py-2 text-sm font-black text-[#c85a32] focus:outline-none shadow-2xs"
                  />
                </div>
              </div>

              {/* Freeform Discount Reason / Note Input (Not a rigid select box) */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Discount Note / Reason (e.g. Regular neighbor, bargained ₹170 off, round-off)"
                  value={discountReason}
                  onChange={(e) => setDiscountReason(e.target.value)}
                  className="w-full bg-white border border-[#f5ded5] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#5e4d42] focus:outline-none focus:border-[#c85a32]"
                />
              </div>

              {/* Optional Quick Concession Helper Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] font-bold text-[#7c6a5d]">Quick Helpers:</span>
                {[50, 100, 170, 200].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setDiscountAmount(amt)
                      setDiscountReason(`Bargained ₹${amt} concession`)
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      discountAmount === amt
                        ? 'bg-[#c85a32] text-white border-[#c85a32]'
                        : 'bg-white border-[#f5ded5] text-[#c85a32] hover:bg-[#fdf2ec]'
                    }`}
                  >
                    ₹{amt} off
                  </button>
                ))}
                {discountAmount > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setDiscountAmount(0)
                      setDiscountReason('')
                    }}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold text-[#7c6a5d] hover:underline"
                  >
                    Clear (₹0)
                  </button>
                )}
              </div>
            </div>

            {/* Final Net Amount Display */}
            <div className="p-4 rounded-2xl bg-[#241a17] text-white flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#baa99b] uppercase font-bold tracking-wider">
                  Final Bill Amount
                </p>
                <p className="text-[11px] text-[#f0ba8b]">
                  {discountAmount > 0 
                    ? `₹${subtotalBeforeDiscount} - ₹${discountAmount} discount applied` 
                    : 'Standard billing rate'}
                </p>
              </div>
              <div className="text-right">
                <div className="font-serif font-black text-2xl text-white">
                  ₹{finalAmount}
                </div>
              </div>
            </div>

            {/* =========================================================================
                KEY USER REQUIREMENT: Advance Amount & Pending Balance (Direct Inputs)
            ========================================================================= */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#fdfbf7] border border-[#e8dfd5]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#2c1f1b] flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Advance Received & Pending Balance</span>
                </label>
              </div>

              {/* Advance Amount Direct Input */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#5e4d42]">Advance Amount Received:</span>
                  <div className="relative w-32">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-700">₹</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={advanceAmount === 0 ? '' : advanceAmount}
                      onChange={(e) => setAdvanceAmount(Number(e.target.value) || 0)}
                      className="w-full bg-white border-2 border-emerald-300 rounded-xl pl-6 pr-2.5 py-1.5 text-right text-xs font-black text-[#2c1f1b] focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Quick Advance Fill Pills */}
                <div className="flex gap-1.5 justify-end">
                  <button
                    type="button"
                    onClick={() => setAdvanceAmount(0)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-[#e8dfd5] text-[10px] font-bold text-[#7c6a5d] hover:bg-[#f8f4ee]"
                  >
                    ₹0 (Full COD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvanceAmount(Math.round(finalAmount / 2))}
                    className="px-2 py-0.5 rounded-lg bg-white border border-[#e8dfd5] text-[10px] font-bold text-[#7c6a5d] hover:bg-[#f8f4ee]"
                  >
                    50% (₹{Math.round(finalAmount / 2)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvanceAmount(finalAmount)}
                    className="px-2 py-0.5 rounded-lg bg-white border border-[#e8dfd5] text-[10px] font-bold text-emerald-700 hover:bg-[#f8f4ee]"
                  >
                    Full (₹{finalAmount})
                  </button>
                </div>
              </div>

              {/* Freeform Advance Payment Mode / Reference Input */}
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-[#5e4d42]">Advance Payment Mode & Ref:</span>
                <input
                  type="text"
                  placeholder="e.g. GPay to 9876543210, Cash received, PhonePe, Paytm"
                  value={advanceMode}
                  onChange={(e) => setAdvanceMode(e.target.value)}
                  className="w-full bg-white border border-[#e8dfd5] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
              </div>

              {/* PENDING BALANCE BANNER (Automatically computed) */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                pendingAmount > 0
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <div>
                  <p className="font-black text-xs flex items-center gap-1">
                    {pendingAmount > 0 ? (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-700" />
                        <span>Pending Balance to Collect:</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Fully Paid (Zero Balance Due)</span>
                      </>
                    )}
                  </p>
                  <p className="text-[10px] text-[#5e4d42] mt-0.5">
                    {pendingAmount > 0 
                      ? `To be collected via ${pendingCollectionMode}` 
                      : `Advance covers 100% of the ₹${finalAmount} bill`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif font-black text-xl">
                    ₹{pendingAmount}
                  </span>
                </div>
              </div>

              {/* Pending Collection Mode (Freeform input if balance due) */}
              {pendingAmount > 0 && (
                <div className="space-y-1 text-xs pt-1">
                  <span className="font-semibold text-[#5e4d42]">Balance Due Collection Mode:</span>
                  <input
                    type="text"
                    placeholder="e.g. Cash on Delivery (COD), UPI Scan at Pickup, Counter Cash"
                    value={pendingCollectionMode}
                    onChange={(e) => setPendingCollectionMode(e.target.value)}
                    className="w-full bg-white border border-[#e8dfd5] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                  />
                </div>
              )}

            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-2 pt-2">
              
              {/* Primary: Save & Add to Live Pipeline */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#c85a32] hover:bg-[#b54f2a] text-white font-bold text-xs shadow-md shadow-[#c85a32]/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Check className="w-4 h-4" />
                <span>Save Order & Add to Pipeline</span>
              </button>

              {/* Secondary: Save & Open WhatsApp Confirmation */}
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save & Send WhatsApp Receipt Docket</span>
              </button>

              {/* Cancel / Discard */}
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-2.5 px-4 rounded-2xl bg-transparent hover:bg-[#f8f4ee] text-[#7c6a5d] hover:text-[#2c1f1b] font-bold text-xs transition-colors"
              >
                Cancel & Return to Dashboard
              </button>

            </div>

          </div>

        </div>

      </form>

    </div>
  )
}
