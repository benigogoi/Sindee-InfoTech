import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Download, 
  ArrowRight, 
  Sparkles, 
  Home, 
  ShieldCheck,
  Check
} from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryOrderSuccess() {
  const { 
    lastOrderNumber, 
    cart, 
    cartSubtotal, 
    deliveryDetails, 
    setCurrentPage, 
    townLocation 
  } = useBakery()

  const orderNo = lastOrderNumber || 'HBO-829104'
  const isPickup = deliveryDetails.mode === 'pickup'
  const deliveryFee = isPickup ? 0 : cartSubtotal >= 800 ? 0 : 40
  const finalTotal = (cartSubtotal > 0 ? cartSubtotal : 870) + deliveryFee

  // Fallback items in case cart was cleared or directly accessed
  const displayItems = cart.length > 0 ? cart : [
    {
      id: 'mock-1',
      productId: 'dutch-chocolate-truffle',
      name: 'Classic Dutch Chocolate Truffle Cake',
      price: 550,
      quantity: 1,
      weight: '500g',
      isEggless: true,
      cakeMessage: 'Happy Birthday Aarav! 🎂',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
      leadTime: 'Bakes in 4h',
      addedSparklingCandle: true,
    },
    {
      id: 'mock-2',
      productId: 'fudge-brownie-box',
      name: 'Fudgy Walnut Brownies (Pack of 6)',
      price: 320,
      quantity: 1,
      weight: 'Box of 6',
      isEggless: true,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
      leadTime: 'Ready Today',
    },
  ]

  const whatsappChatUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Baker Ananya! I just placed Order #${orderNo} for delivery in ${townLocation}.\n` +
    `Name: ${deliveryDetails.fullName}\n` +
    `Please share the photo preview once the cake is decorated!`
  )}`

  const handlePrintReceipt = () => {
    window.print()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* 1. Top Order ID Badge */}
      <div className="flex items-center justify-between text-xs text-[#7c6a5d] border-b border-[#eadecd] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[#2c1f1b]">Order Confirmed</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#f8f4ee] font-mono font-bold text-[#b84c26] border border-[#eadecd]">
          #{orderNo}
        </span>
      </div>

      {/* 2. Main Celebratory Card */}
      <div className="bg-gradient-to-br from-[#ffffff] to-[#fbf5ed] rounded-3xl p-6 sm:p-10 border border-[#eadecd] shadow-xl text-center space-y-5 relative overflow-hidden">
        
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-md animate-scale">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h1 className="font-serif font-black text-2xl sm:text-4xl text-[#2c1f1b] leading-tight">
            Order Confirmed! Fresh Bakes Coming Your Way 🎂
          </h1>
          <p className="text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
            Thank you, <strong className="text-[#2c1f1b]">{deliveryDetails.fullName || 'Aarav'}</strong>! Your order has been forwarded to Baker Ananya’s home kitchen in <strong className="text-[#b84c26]">{townLocation}</strong>. We bake fresh on order with pure love, Amul butter, and zero chemical preservatives.
          </p>
        </div>

        <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Payment Verified via {deliveryDetails.paymentMethod.toUpperCase()}</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#2c1f1b] font-bold border border-[#eadecd] flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#b84c26]" />
            <span>Slot: {deliveryDetails.deliveryDate} • {deliveryDetails.deliverySlot}</span>
          </span>
        </div>
      </div>

      {/* 3. 4-Step Baking & Delivery Timeline Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadecd] shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
            Fresh Baking & Delivery Tracker
          </h3>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Live Kitchen Status</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-emerald-700">1</span>
              <span className="text-xs font-bold text-emerald-700">✓ Done</span>
            </div>
            <h4 className="text-xs font-bold text-[#2c1f1b]">Order Placed</h4>
            <p className="text-[10px] text-[#5e4d42]">Verified by Baker Ananya in {townLocation}</p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-[#fdf2ec] border border-[#eadecd] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-[#b84c26]">2</span>
              <span className="text-[10px] bg-[#b84c26] text-white font-bold px-2 py-0.5 rounded-full">
                Scheduled
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#2c1f1b]">Fresh Baking</h4>
            <p className="text-[10px] text-[#5e4d42]">Oven baking 2h before dispatch</p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] space-y-1.5 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-[#7c6a5d]">3</span>
              <span className="text-[10px] text-[#7c6a5d] font-bold">Upcoming</span>
            </div>
            <h4 className="text-xs font-bold text-[#2c1f1b]">Frosting & Inscription</h4>
            <p className="text-[10px] text-[#5e4d42]">Handwritten in melted white chocolate</p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] space-y-1.5 opacity-80">
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-[#7c6a5d]">4</span>
              <span className="text-[10px] text-[#7c6a5d] font-bold">Dispatch</span>
            </div>
            <h4 className="text-xs font-bold text-[#2c1f1b]">{isPickup ? 'Self-Pickup' : 'Out for Delivery'}</h4>
            <p className="text-[10px] text-[#5e4d42]">{deliveryDetails.deliverySlot}</p>
          </div>

        </div>
      </div>

      {/* 4. WhatsApp Photo Preview Guarantee Banner (High Trust) */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Home Baker Service</span>
          </div>
          <h3 className="font-serif font-black text-lg sm:text-xl">
            Want a Photo Proof Before Dispatch? 📸
          </h3>
          <p className="text-xs text-emerald-50 max-w-lg">
            Baker Ananya will personally send you a high-res photo of your cake and handwritten message on WhatsApp right after decorating!
          </p>
        </div>

        <a
          href={whatsappChatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3 rounded-2xl bg-white text-emerald-800 font-bold text-xs sm:text-sm shadow-md hover:bg-emerald-50 flex items-center gap-2 transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-700 text-emerald-700" />
          <span>Chat on WhatsApp (+91 98765 43210)</span>
        </a>
      </div>

      {/* 5. Detailed Order Receipt */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadecd] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#eadecd] pb-4">
          <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
            Order Receipt & Delivery Summary
          </h3>
          <button
            onClick={handlePrintReceipt}
            className="flex items-center gap-1.5 text-xs font-bold text-[#b84c26] hover:text-[#a33e1c] p-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoice</span>
          </button>
        </div>

        {/* Address & Slot Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] space-y-1">
            <span className="font-bold text-[#7c6a5d] uppercase text-[10px] block">
              {isPickup ? 'Pickup Studio Kitchen' : 'Delivery Destination'}
            </span>
            <p className="font-bold text-[#2c1f1b] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#b84c26]" />
              <span>
                {isPickup
                  ? `Gar-Ali Main Road, ${townLocation} (Near JB College)`
                  : `${deliveryDetails.houseNo || 'House No. 12'}, ${deliveryDetails.street || 'Gar-Ali'}, ${townLocation}`}
              </span>
            </p>
            {!isPickup && deliveryDetails.landmark && (
              <p className="text-[11px] text-[#7c6a5d]">Landmark: {deliveryDetails.landmark}</p>
            )}
            <p className="text-[11px] text-[#7c6a5d]">Phone: +91 {deliveryDetails.phone || '98765 43210'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8f4ee] border border-[#eadecd] space-y-1">
            <span className="font-bold text-[#7c6a5d] uppercase text-[10px] block">
              Scheduled Baking Window
            </span>
            <p className="font-bold text-[#2c1f1b] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#b84c26]" />
              <span>{deliveryDetails.deliveryDate || 'Tomorrow'}</span>
            </p>
            <p className="text-[11px] text-[#7c6a5d] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#b84c26]" />
              <span>{deliveryDetails.deliverySlot || '5:00 PM - 7:00 PM'}</span>
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold">Payment: {deliveryDetails.paymentMethod.toUpperCase()} (Confirmed)</p>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3 pt-2">
          <span className="font-bold text-xs text-[#2c1f1b] block">Items Ordered:</span>
          {displayItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#f3ece1] text-xs">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-[#f8f4ee]" />
                <div>
                  <h4 className="font-bold text-[#2c1f1b]">{item.name}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-[#7c6a5d]">
                    <span>Qty: {item.quantity}</span>
                    <span>•</span>
                    <span>{item.weight}</span>
                    {item.isEggless && <span>• 🟢 Eggless</span>}
                  </div>
                  {item.cakeMessage && (
                    <p className="text-[10px] text-[#b84c26] italic mt-0.5">
                      "{item.cakeMessage}"
                    </p>
                  )}
                </div>
              </div>
              <span className="font-black text-sm text-[#2c1f1b]">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Total Calculation */}
        <div className="pt-3 border-t border-[#eadecd] flex justify-between items-baseline">
          <div className="text-xs text-[#7c6a5d]">
            <span>Includes packaging, safety seal & taxes</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#7c6a5d] block">Total Amount Paid</span>
            <span className="font-serif font-black text-2xl text-[#b84c26]">
              ₹{finalTotal}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Navigation Actions at Bottom */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => setCurrentPage('shop')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
        >
          <span>Explore More Fresh Treats</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCurrentPage('home')}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border border-[#eadecd] text-[#2c1f1b] hover:bg-[#f8f4ee] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Safety Guarantee */}
      <p className="text-center text-[11px] text-[#9c897b] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
        <span>FSSAI Certified Home Studio Kitchen • Direct WhatsApp Customer Support</span>
      </p>

    </div>
  )
}
