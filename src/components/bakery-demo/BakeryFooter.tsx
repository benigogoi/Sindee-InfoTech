import { Heart, ShieldCheck, Clock, MapPin, MessageCircle } from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryFooter() {
  const { setCurrentPage } = useBakery()

  return (
    <footer className="bg-[#241a17] text-[#f7efe6] border-t border-[#3b2d28] pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#3b2d28]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b84c26]/20 text-[#e87a54] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Baked on Order</h4>
              <p className="text-xs text-[#a89587]">Never cold shelf storage</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b84c26]/20 text-[#e87a54] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">FSSAI Certified</h4>
              <p className="text-xs text-[#a89587]">Sanitized Home Kitchen</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b84c26]/20 text-[#e87a54] flex items-center justify-center shrink-0">
              <span className="text-lg">🟢</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Pure Veg</h4>
              <p className="text-xs text-[#a89587]">Eggless options for all</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b84c26]/20 text-[#e87a54] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Pure Amul Butter</h4>
              <p className="text-xs text-[#a89587]">Zero palm oil or premixes</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧁</span>
              <span className="font-serif font-bold text-2xl text-white">The Home Oven</span>
            </div>
            <p className="text-sm text-[#baa99b] max-w-md leading-relaxed">
              Bringing small-town celebrations to life with warmth and honest recipes. Fresh celebration cakes, melt-in-mouth tea loaves, and daily breads crafted by local home bakers.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#baa99b]">
              <MapPin className="w-4 h-4 text-[#e87a54] shrink-0" />
              <span>Studio: Sector 4, Model Town (Near Central Park)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#baa99b]">
              <Clock className="w-4 h-4 text-[#e87a54] shrink-0" />
              <span>Baking Hours: 7:00 AM – 9:00 PM (Mon - Sun)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e87a54]">
              Explore Treats
            </h4>
            <ul className="space-y-2 text-sm text-[#baa99b]">
              <li>
                <button 
                  onClick={() => setCurrentPage('shop')} 
                  className="hover:text-white transition-colors"
                >
                  Birthday & Celebration Cakes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop')} 
                  className="hover:text-white transition-colors"
                >
                  Fudgy Brownies & Tea Loaves
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop')} 
                  className="hover:text-white transition-colors"
                >
                  Daily Soft Milk Breads
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('shop')} 
                  className="hover:text-white transition-colors"
                >
                  Evening Puffs & Savories
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('custom-cake')} 
                  className="hover:text-white transition-colors text-[#e87a54] font-medium"
                >
                  Request Custom Photo Cake →
                </button>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Connect */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e87a54]">
              Baker WhatsApp Direct
            </h4>
            <p className="text-xs text-[#baa99b]">
              Need a quick delivery today or want to confirm a custom cake design?
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20The%20Home%20Oven!%20I%20would%20like%20to%20inquire%20about%20a%20fresh%20cake."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat with Baker (+91 98765 43210)</span>
            </a>
            <p className="text-[11px] text-[#8e7e72]">
              FSSAI Food Safety Registration No. 20261109001
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3b2d28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e7e72]">
          <p>© 2026 The Home Oven. Handcrafted with love in your neighborhood.</p>
          <div className="flex gap-4">
            <span>🟢 100% Vegetarian Certified</span>
            <span>•</span>
            <span>Same-Day Fresh Baking</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
