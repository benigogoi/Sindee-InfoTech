import { useBakery, BakeryProvider } from './BakeryContext'
import { BakeryNavbar } from './BakeryNavbar'
import { BakeryHome } from './BakeryHome'
import { BakeryShop } from './BakeryShop'
import { BakeryProductDetail } from './BakeryProductDetail'
import { BakeryCheckout } from './BakeryCheckout'
import { BakeryCustomCake } from './BakeryCustomCake'
import { BakeryOrderSuccess } from './BakeryOrderSuccess'
import { BakeryAdmin } from './BakeryAdmin'
import { BakeryAdminLogin } from './BakeryAdminLogin'
import { BakeryCustomerAuthModal } from './BakeryCustomerAuthModal'
import { BakeryCartDrawer } from './BakeryCartDrawer'
import { BakeryFooter } from './BakeryFooter'
import { 
  Home, 
  ShoppingBag, 
  Sparkles, 
  MessageCircle 
} from 'lucide-react'

function BakeryInnerApp() {
  const { 
    currentPage, 
    setCurrentPage, 
    cartItemCount, 
    toggleCart,
    isBakerAuthenticated
  } = useBakery()

  // Full-Screen Dedicated Admin Dashboard Studio Layout (Secured behind Authentication Gate)
  if (currentPage === 'admin') {
    if (!isBakerAuthenticated) {
      return <BakeryAdminLogin />
    }
    return <BakeryAdmin />
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c1f1b] font-sans flex flex-col selection:bg-[#e87a54]/30 selection:text-[#b84c26]">
      
      {/* 1. Navbar */}
      <BakeryNavbar />

      {/* 2. Main Content Area */}
      <main className="flex-1 pb-20 md:pb-0">
        {currentPage === 'home' && <BakeryHome />}
        {currentPage === 'shop' && <BakeryShop />}
        {currentPage === 'product' && <BakeryProductDetail />}
        {currentPage === 'custom-cake' && <BakeryCustomCake />}
        {currentPage === 'checkout' && <BakeryCheckout />}
        {currentPage === 'order-success' && <BakeryOrderSuccess />}
      </main>

      {/* 3. Slide-over Bag Drawer */}
      <BakeryCartDrawer />

      {/* 4. Customer Login & Auth Modal */}
      <BakeryCustomerAuthModal />

      {/* 5. Footer */}
      <BakeryFooter />

      {/* 5. Mobile Sticky Bottom Navigation (Mobile-First UX) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#eadecd] px-3 py-2 z-30 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold transition-colors ${
            currentPage === 'home' ? 'text-[#b84c26]' : 'text-[#7c6a5d]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentPage('shop')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold transition-colors ${
            currentPage === 'shop' ? 'text-[#b84c26]' : 'text-[#7c6a5d]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Shop</span>
        </button>

        <button
          onClick={() => setCurrentPage('custom-cake')}
          className={`flex flex-col items-center gap-0.5 text-[11px] font-semibold transition-colors ${
            currentPage === 'custom-cake' ? 'text-[#b84c26]' : 'text-[#7c6a5d]'
          }`}
        >
          <span className="text-base leading-none">🎨</span>
          <span>Custom</span>
        </button>

        <button
          onClick={() => toggleCart(true)}
          className="relative flex flex-col items-center gap-0.5 text-[11px] font-semibold text-[#7c6a5d]"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#b84c26]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#b84c26] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <span>Bag</span>
        </button>

        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[11px] font-semibold text-[#25D366]"
        >
          <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
          <span>WhatsApp</span>
        </a>
      </div>

    </div>
  )
}

export function BakeryApp() {
  return (
    <BakeryProvider>
      <BakeryInnerApp />
    </BakeryProvider>
  )
}
