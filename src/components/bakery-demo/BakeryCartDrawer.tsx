import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryCartDrawer() {
  const { 
    isCartOpen, 
    toggleCart, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    setCurrentPage,
    deliveryDetails,
    setDeliveryDetails
  } = useBakery()

  if (!isCartOpen) return null

  const isPickup = deliveryDetails.mode === 'pickup'
  const deliveryFee = isPickup ? 0 : cartSubtotal >= 800 ? 0 : 40
  const finalTotal = cartSubtotal + deliveryFee

  const handleCheckoutClick = () => {
    toggleCart(false)
    setCurrentPage('checkout')
  }

  const handleBrowseShop = () => {
    toggleCart(false)
    setCurrentPage('shop')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => toggleCart(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fdfbf7] shadow-2xl flex flex-col border-l border-[#eadecd]">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#eadecd] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#b84c26]" />
              <h3 className="font-serif font-bold text-lg text-[#2c1f1b]">
                Your Fresh Treats Bag
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#f3ece1] text-[#b84c26] font-bold">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-2 rounded-xl text-[#7c6a5d] hover:text-[#2c1f1b] hover:bg-[#f8f4ee] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Mode Toggle */}
          <div className="px-6 py-3 bg-[#f8f4ee] border-b border-[#eadecd]">
            <div className="flex bg-[#eadecd]/60 p-1 rounded-xl">
              <button
                onClick={() => setDeliveryDetails(prev => ({ ...prev, mode: 'delivery' }))}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  !isPickup
                    ? 'bg-[#b84c26] text-white shadow-xs'
                    : 'text-[#4a3b32] hover:text-[#2c1f1b]'
                }`}
              >
                <span>🛵 Home Delivery</span>
                <span className="text-[10px] opacity-80">(₹40)</span>
              </button>
              <button
                onClick={() => setDeliveryDetails(prev => ({ ...prev, mode: 'pickup' }))}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isPickup
                    ? 'bg-[#b84c26] text-white shadow-xs'
                    : 'text-[#4a3b32] hover:text-[#2c1f1b]'
                }`}
              >
                <span>🏠 Self-Pickup</span>
                <span className="text-[10px] text-emerald-300 font-bold">(Free)</span>
              </button>
            </div>
            {cartSubtotal >= 800 && !isPickup && (
              <p className="text-[11px] text-emerald-700 font-medium text-center mt-1.5">
                🎉 Congratulations! Free Delivery unlocked (Orders over ₹800)
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#f3ece1] flex items-center justify-center text-3xl">
                  🎂
                </div>
                <h4 className="font-serif font-bold text-lg text-[#2c1f1b]">
                  Your bag is empty!
                </h4>
                <p className="text-xs text-[#7c6a5d] max-w-xs mx-auto">
                  Treat yourself or your loved ones with fresh cakes, fudgy brownies, and warm breads.
                </p>
                <button
                  onClick={handleBrowseShop}
                  className="px-6 py-2.5 rounded-xl bg-[#b84c26] text-white text-xs font-bold shadow-md hover:bg-[#a33e1c] transition-colors"
                >
                  Browse Fresh Treats
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#eadecd] shadow-xs flex gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#f8f4ee]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#2c1f1b] leading-tight line-clamp-2">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9c897b] hover:text-red-500 p-1 transition-colors shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f8f4ee] text-[#7c6a5d]">
                        {item.weight}
                      </span>
                      {item.isEggless && (
                        <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                          <span>🟢</span> Eggless
                        </span>
                      )}
                    </div>

                    {item.cakeMessage && (
                      <p className="text-[10px] text-[#b84c26] font-medium italic mt-1 truncate bg-[#fdf2ec] px-2 py-0.5 rounded">
                        "{item.cakeMessage}"
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-2.5 pt-1 border-t border-[#f8f4ee]">
                      <span className="font-bold text-sm text-[#2c1f1b]">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-[#f8f4ee] rounded-lg border border-[#eadecd] px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#7c6a5d] hover:text-[#2c1f1b]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2c1f1b] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#7c6a5d] hover:text-[#2c1f1b]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#eadecd] space-y-3">
              <div className="space-y-1.5 text-xs text-[#7c6a5d]">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-[#2c1f1b]">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isPickup ? 'Self-Pickup' : 'Delivery Fee'}</span>
                  <span className="font-semibold text-[#2c1f1b]">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Safety Box</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-[#eadecd] flex justify-between text-sm font-bold text-[#2c1f1b]">
                  <span>Total Amount</span>
                  <span className="text-[#b84c26] text-base">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-sm shadow-md shadow-[#b84c26]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <span>•</span>
                <span>₹{finalTotal}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[11px] text-[#9c897b] text-center">
                🔒 Safe UPI, Cash on Delivery & Free Home Delivery over ₹800
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
