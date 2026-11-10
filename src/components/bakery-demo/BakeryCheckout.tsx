import { useState } from 'react'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  Lock, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryCheckout() {
  const { 
    cart, 
    cartSubtotal, 
    removeFromCart, 
    updateQuantity, 
    setCurrentPage, 
    deliveryDetails, 
    setDeliveryDetails, 
    placeOrder,
    townLocation,
    availableCities,
    isCustomerAuthenticated,
    customerUser,
    setShowCustomerLogin,
    logoutCustomer
  } = useBakery()

  const [validationError, setValidationError] = useState('')

  const isPickup = deliveryDetails.mode === 'pickup'
  const deliveryFee = isPickup ? 0 : cartSubtotal >= 800 ? 0 : 40
  const finalTotal = cartSubtotal + deliveryFee

  const todayStr = new Date().toISOString().split('T')[0]

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!deliveryDetails.fullName.trim()) {
      setValidationError('Please enter your full name')
      return
    }
    if (!deliveryDetails.phone.trim() || deliveryDetails.phone.trim().length < 10) {
      setValidationError('Please enter a valid 10-digit WhatsApp phone number')
      return
    }
    if (!isPickup) {
      if (!deliveryDetails.houseNo.trim()) {
        setValidationError('Please enter house/flat/building number')
        return
      }
      if (!deliveryDetails.street.trim()) {
        setValidationError('Please enter street or locality name')
        return
      }
      if (!deliveryDetails.landmark.trim()) {
        setValidationError('Please provide a nearby landmark for smooth delivery')
        return
      }
    }

    placeOrder()
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#f3ece1] flex items-center justify-center text-3xl">
          🛒
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#2c1f1b]">
          Your Bag is Empty
        </h2>
        <p className="text-xs sm:text-sm text-[#7c6a5d] max-w-sm mx-auto">
          Add some celebration cakes or fresh bakes to your bag before checking out.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-xl bg-[#b84c26] text-white text-xs font-bold shadow-md hover:bg-[#a33e1c] transition-colors"
        >
          Browse Fresh Treats
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* 1. Header & Step Breadcrumbs */}
      <div className="space-y-4 border-b border-[#eadecd] pb-6">
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-1.5 text-xs text-[#7c6a5d] hover:text-[#b84c26] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shop Treats</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#2c1f1b]">
              Checkout & Delivery Details
            </h1>
            <p className="text-xs text-[#7c6a5d] mt-1">
              Freshly baked in your neighborhood • Delivered with care
            </p>
          </div>

          {/* 3-Step Indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span>1. Bag</span>
              <ChevronRight className="w-3 h-3 text-[#7c6a5d]" />
            </span>
            <span className="px-3 py-1 rounded-full bg-[#b84c26] text-white shadow-xs">
              2. Delivery & Slot
            </span>
            <ChevronRight className="w-3 h-3 text-[#7c6a5d]" />
            <span className="text-[#7c6a5d]">3. Payment</span>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Form Layout */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Delivery Details & Payment */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customer Authentication Bar */}
          <div className="p-3.5 rounded-2xl bg-[#fdf2ec] border border-[#f5ded5] flex items-center justify-between text-xs">
            {isCustomerAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="font-semibold text-[#2c1f1b]">
                    Logged in as <strong>{customerUser?.name}</strong> ({customerUser?.phone})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={logoutCustomer}
                  className="text-xs text-[#b84c26] hover:underline font-bold"
                >
                  Change Account
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span className="text-[#5e4d42]">
                    Have an account? <strong>Sign in</strong> for saved addresses & fast checkout.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomerLogin(true)}
                  className="px-3 py-1 rounded-xl bg-white border border-[#eadecd] text-[#b84c26] font-bold text-xs shadow-2xs hover:bg-[#f8f4ee]"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-shake">
              <span>⚠️</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* SECTION A: Delivery Mode Toggle */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
                1. Delivery Preference
              </h2>
              <span className="text-[11px] text-[#7c6a5d]">In {townLocation}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryDetails(prev => ({ ...prev, mode: 'delivery' }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  !isPickup
                    ? 'border-[#b84c26] bg-[#fdf2ec] shadow-xs ring-1 ring-[#b84c26]'
                    : 'border-[#eadecd] bg-white hover:bg-[#f8f4ee]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">🛵</span>
                  <span className={`text-xs font-black ${cartSubtotal >= 800 ? 'text-emerald-700' : 'text-[#b84c26]'}`}>
                    {cartSubtotal >= 800 ? 'FREE' : '₹40'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-[#2c1f1b]">Home Delivery</h4>
                <p className="text-[10px] text-[#7c6a5d] mt-0.5">
                  Delivered right to your doorstep
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryDetails(prev => ({ ...prev, mode: 'pickup' }))}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isPickup
                    ? 'border-[#b84c26] bg-[#fdf2ec] shadow-xs ring-1 ring-[#b84c26]'
                    : 'border-[#eadecd] bg-white hover:bg-[#f8f4ee]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">🏠</span>
                  <span className="text-xs font-black text-emerald-700">FREE</span>
                </div>
                <h4 className="text-xs font-bold text-[#2c1f1b]">Self-Pickup</h4>
                <p className="text-[10px] text-[#7c6a5d] mt-0.5">
                  From Baker’s Studio Kitchen
                </p>
              </button>
            </div>

            {isPickup && (
              <div className="p-3 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] text-xs text-[#5e4d42] space-y-1">
                <p className="font-bold flex items-center gap-1.5 text-[#2c1f1b]">
                  <MapPin className="w-3.5 h-3.5 text-[#b84c26]" />
                  <span>Pickup Kitchen Address:</span>
                </p>
                <p>Ananya’s Home Baking Studio, Gar-Ali Main Road, {townLocation} (Assam)</p>
                <p className="text-[10px] text-[#7c6a5d]">Self-pickup is safe and avoids bike transit bumpiness for delicate cakes!</p>
              </div>
            )}
          </div>

          {/* SECTION B: Customer & Delivery Address */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
              2. Contact & {isPickup ? 'Billing Details' : 'Delivery Address'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42]">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Sharma"
                  value={deliveryDetails.fullName}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42]">WhatsApp Phone *</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>

              {/* City Selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42]">City *</label>
                <select
                  value={townLocation}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                >
                  {availableCities.map(c => (
                    <option key={c} value={c}>{c} (Assam)</option>
                  ))}
                </select>
              </div>

              {/* Pincode */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42]">Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 785001"
                  value={deliveryDetails.pincode}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>

              {!isPickup && (
                <>
                  {/* House / Flat / Ward */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#5e4d42]">House / Flat / Ward No. *</label>
                    <input
                      type="text"
                      placeholder="e.g. House No. 12, Ward 4, Krishna Enclave"
                      value={deliveryDetails.houseNo}
                      onChange={(e) => setDeliveryDetails(prev => ({ ...prev, houseNo: e.target.value }))}
                      className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                    />
                  </div>

                  {/* Street / Road Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5e4d42]">Street / Locality Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Gar-Ali Road / Club Road"
                      value={deliveryDetails.street}
                      onChange={(e) => setDeliveryDetails(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                    />
                  </div>

                  {/* Landmark (India Critical) */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#5e4d42]">Nearby Landmark *</label>
                    <input
                      type="text"
                      placeholder="e.g. Opp. Central Mall / Near Shiva Temple"
                      value={deliveryDetails.landmark}
                      onChange={(e) => setDeliveryDetails(prev => ({ ...prev, landmark: e.target.value }))}
                      className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                    />
                  </div>
                </>
              )}

            </div>
          </div>

          {/* SECTION C: Delivery Slot & Baking Instructions */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
                3. Baking & Timing Schedule
              </h2>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Baked 2h before dispatch</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Date Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#b84c26]" />
                  <span>Delivery Date:</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={deliveryDetails.deliveryDate.includes('-') ? deliveryDetails.deliveryDate : todayStr}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, deliveryDate: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26] cursor-pointer"
                />
              </div>

              {/* Time Slot */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5e4d42] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#b84c26]" />
                  <span>Time Window:</span>
                </label>
                <select
                  value={deliveryDetails.deliverySlot}
                  onChange={(e) => setDeliveryDetails(prev => ({ ...prev, deliverySlot: e.target.value }))}
                  className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26] cursor-pointer"
                >
                  <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM (Morning Slot)</option>
                  <option value="1:00 PM - 4:00 PM">1:00 PM - 4:00 PM (Afternoon Slot)</option>
                  <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM (Evening Celebration)</option>
                  <option value="7:00 PM - 9:00 PM">7:00 PM - 9:00 PM (Dinner & Party)</option>
                </select>
              </div>

            </div>

            {/* Special Instructions for Baker */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-[#5e4d42]">Special Baking Notes / Instructions:</label>
              <textarea
                rows={2}
                placeholder="e.g. Please write 'Happy Birthday Aarav!' neatly in white chocolate cursive. Keep sweetness balanced."
                value={deliveryDetails.bakingInstructions}
                onChange={(e) => setDeliveryDetails(prev => ({ ...prev, bakingInstructions: e.target.value }))}
                className="w-full bg-[#fdfbf7] border border-[#eadecd] rounded-xl p-3 text-xs text-[#2c1f1b] placeholder:text-[#9c897b] focus:outline-none focus:border-[#b84c26]"
              />
            </div>
          </div>

          {/* SECTION D: Indian Payment Modes (UPI, COD, Card) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#eadecd] shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-base text-[#2c1f1b]">
              4. Payment Method
            </h2>

            <div className="space-y-2.5">
              
              {/* Option 1: UPI */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                deliveryDetails.paymentMethod === 'upi'
                  ? 'border-[#b84c26] bg-[#fdf2ec] shadow-xs ring-1 ring-[#b84c26]'
                  : 'border-[#eadecd] bg-white hover:bg-[#f8f4ee]'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={deliveryDetails.paymentMethod === 'upi'}
                  onChange={() => setDeliveryDetails(prev => ({ ...prev, paymentMethod: 'upi' }))}
                  className="accent-[#b84c26] mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2c1f1b]">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Zero Charges
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7c6a5d] mt-0.5">
                    Instant verification with dynamic QR code & auto-confirmation
                  </p>

                  {deliveryDetails.paymentMethod === 'upi' && (
                    <div className="pt-3 flex flex-wrap gap-2">
                      {(['gpay', 'phonepe', 'paytm', 'other'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setDeliveryDetails(prev => ({ ...prev, upiApp: app }))}
                          className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-colors ${
                            deliveryDetails.upiApp === app
                              ? 'bg-[#b84c26] text-white shadow-2xs'
                              : 'bg-white border border-[#eadecd] text-[#4a3b32]'
                          }`}
                        >
                          {app === 'gpay' && 'Google Pay'}
                          {app === 'phonepe' && 'PhonePe'}
                          {app === 'paytm' && 'Paytm'}
                          {app === 'other' && 'Any UPI QR'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </label>

              {/* Option 2: Cash on Delivery / Pay on Pickup */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                deliveryDetails.paymentMethod === 'cod'
                  ? 'border-[#b84c26] bg-[#fdf2ec] shadow-xs ring-1 ring-[#b84c26]'
                  : 'border-[#eadecd] bg-white hover:bg-[#f8f4ee]'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={deliveryDetails.paymentMethod === 'cod'}
                  onChange={() => setDeliveryDetails(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  className="accent-[#b84c26] mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2c1f1b]">
                      {isPickup ? 'Pay on Pickup at Kitchen' : 'Cash on Delivery (COD)'}
                    </span>
                    <Banknote className="w-4 h-4 text-[#7c6a5d]" />
                  </div>
                  <p className="text-[11px] text-[#7c6a5d] mt-0.5">
                    Pay with Cash or UPI directly when your fresh cake arrives
                  </p>
                </div>
              </label>

              {/* Option 3: Card / NetBanking */}
              <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                deliveryDetails.paymentMethod === 'card'
                  ? 'border-[#b84c26] bg-[#fdf2ec] shadow-xs ring-1 ring-[#b84c26]'
                  : 'border-[#eadecd] bg-white hover:bg-[#f8f4ee]'
              }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={deliveryDetails.paymentMethod === 'card'}
                  onChange={() => setDeliveryDetails(prev => ({ ...prev, paymentMethod: 'card' }))}
                  className="accent-[#b84c26] mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2c1f1b]">Debit / Credit Card & NetBanking</span>
                    <CreditCard className="w-4 h-4 text-[#7c6a5d]" />
                  </div>
                  <p className="text-[11px] text-[#7c6a5d] mt-0.5">
                    All Indian banks, Visa, Mastercard, RuPay cards accepted
                  </p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Order Summary & Submit Button */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-[#eadecd] pb-4">
              <h3 className="font-serif font-bold text-lg text-[#2c1f1b]">
                Order Summary
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f8f4ee] text-[#b84c26] font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-3 pb-3 border-b border-[#f3ece1] last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#f8f4ee]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#2c1f1b] leading-tight truncate">
                        {item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9c897b] hover:text-red-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#7c6a5d] font-semibold">{item.weight}</span>
                      {item.isEggless && (
                        <span className="text-[10px] text-emerald-700 font-semibold">🟢 Eggless</span>
                      )}
                    </div>

                    {item.cakeMessage && (
                      <p className="text-[10px] text-[#b84c26] font-medium italic truncate mt-0.5 bg-[#fdf2ec] px-1.5 py-0.5 rounded">
                        "{item.cakeMessage}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-xs text-[#2c1f1b]">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#f8f4ee] rounded-lg border border-[#eadecd] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#7c6a5d] hover:text-[#2c1f1b]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2c1f1b] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#7c6a5d] hover:text-[#2c1f1b]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#eadecd] text-xs text-[#5e4d42]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#2c1f1b]">₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee ({isPickup ? 'Self-Pickup' : townLocation})</span>
                <span className="font-bold text-[#2c1f1b]">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-black">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bakery Packaging & Box</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Sanitized Safety Seal</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>

              <div className="pt-3 border-t border-[#eadecd] flex justify-between items-baseline text-sm font-bold text-[#2c1f1b]">
                <span>Total Amount to Pay</span>
                <span className="text-xl font-black text-[#b84c26]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#b84c26]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <Lock className="w-4 h-4" />
              <span>
                {deliveryDetails.paymentMethod === 'cod'
                  ? `Place Order (COD) • ₹${finalTotal}`
                  : `Pay ₹${finalTotal} via UPI / Card`}
              </span>
            </button>

            <div className="p-3 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] text-[11px] text-[#7c6a5d] space-y-1 text-center">
              <p className="font-semibold text-[#2c1f1b]">🍰 Freshness Guarantee</p>
              <p>Your baker will send you a photo preview of your cake on WhatsApp right after decorating!</p>
            </div>

          </div>

        </div>

      </form>

    </div>
  )
}
