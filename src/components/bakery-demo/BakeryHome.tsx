import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Heart, 
  Plus, 
  MessageCircle,
  Flame,
  Award
} from 'lucide-react'
import { useBakery } from './BakeryContext'
import { BAKERY_PRODUCTS, BAKERY_REVIEWS } from './data'
import type { BakeryCategory, BakeryProduct } from './types'

export function BakeryHome() {
  const { 
    setCurrentPage, 
    setSelectedCategory, 
    addToCart, 
    townLocation 
  } = useBakery()

  const categories: { label: BakeryCategory; icon: string; image: string; count: string }[] = [
    {
      label: 'Birthday & Party Cakes',
      icon: '🎂',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80',
      count: '12 Flavors',
    },
    {
      label: 'Brownies & Tea Cakes',
      icon: '🍫',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80',
      count: '8 Varieties',
    },
    {
      label: 'Fresh Breads & Buns',
      icon: '🍞',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
      count: 'Daily Fresh',
    },
    {
      label: 'Homemade Cookies',
      icon: '🍪',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=300&q=80',
      count: 'Butter & Ghee',
    },
    {
      label: 'Custom Theme Cakes',
      icon: '✨',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=300&q=80',
      count: 'Photo & Fondant',
    },
    {
      label: 'Evening Snacks & Puffs',
      icon: '🥐',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=300&q=80',
      count: 'Hot from Oven',
    },
  ]

  const bestsellers = BAKERY_PRODUCTS.slice(0, 6)

  const handleCategoryClick = (cat: BakeryCategory) => {
    if (cat === 'Custom Theme Cakes') {
      setCurrentPage('custom-cake')
    } else {
      setSelectedCategory(cat)
      setCurrentPage('shop')
    }
  }

  const handleQuickAdd = (product: BakeryProduct, e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.basePrice,
      quantity: 1,
      weight: product.defaultWeight,
      isEggless: product.isEggless,
      image: product.image,
      leadTime: product.leadTime,
    })
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION (Option 2 Modern Clean Layout) */}
      <section className="relative pt-6 sm:pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3ece1] border border-[#e2d5c3] text-xs font-semibold text-[#8c4224]">
              <Sparkles className="w-3.5 h-3.5 text-[#b84c26]" />
              <span>Handcrafted in Your Neighborhood • Baked Fresh on Order</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-[#2c1f1b] leading-[1.15] tracking-tight">
              Freshly Baked at Home,{' '}
              <span className="text-[#b84c26] underline decoration-[#e87a54]/40 decoration-wavy">
                Delivered Warm
              </span>{' '}
              to Your Door.
            </h1>

            <p className="text-base sm:text-lg text-[#5e4d42] max-w-xl leading-relaxed">
              Skip stale market pastries. Enjoy birthday celebration cakes, fudgy brownies, and daily soft breads made with 100% pure Amul butter, real chocolate, and zero chemical premixes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#d96b43] to-[#b84c26] hover:from-[#c85a32] hover:to-[#a33e1c] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#b84c26]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Order Fresh Treats</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('custom-cake')}
                className="px-7 py-4 rounded-2xl bg-[#ffffff] hover:bg-[#f8f4ee] border-2 border-[#b84c26] text-[#b84c26] font-bold text-sm sm:text-base shadow-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Design Custom Cake 🎨</span>
              </button>
            </div>

            {/* Trust Badges Bar under CTAs */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#eadecd]/70 text-xs">
              <div className="flex items-center gap-2 text-[#4a3b32]">
                <span className="text-base">🟢</span>
                <span className="font-semibold">100% Pure Veg Available</span>
              </div>
              <div className="flex items-center gap-2 text-[#4a3b32]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.9 ★ Rating in Town</span>
              </div>
              <div className="flex items-center gap-2 text-[#4a3b32]">
                <ShieldCheck className="w-4 h-4 text-[#b84c26]" />
                <span className="font-semibold">Hygiene Certified</span>
              </div>
            </div>

          </div>

          {/* Right Composite Photography Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Cake Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square group bg-[#f3ece1]">
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                  alt="Dutch Chocolate Truffle Cake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Badge on Image */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#b84c26] shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-[#b84c26]" />
                  <span>Today's #1 Bestseller</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-[#eadecd] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2c1f1b]">
                      Classic Dutch Chocolate Truffle
                    </h4>
                    <p className="text-[11px] text-[#7c6a5d] flex items-center gap-1">
                      <span>🟢 100% Eggless</span> • <span>Bakes in 4h</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-[#b84c26]">₹550</span>
                    <span className="text-[10px] text-[#7c6a5d] block">/ 500g</span>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Mini Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-[#eadecd] items-center gap-3 max-w-xs animate-bounce-gentle">
                <div className="w-10 h-10 rounded-xl bg-[#fdf2ec] text-2xl flex items-center justify-center shrink-0">
                  🧁
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2c1f1b]">180+ Birthday Celebrations</p>
                  <p className="text-[10px] text-[#7c6a5d]">In {townLocation}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. CIRCULAR CATEGORY EXPLORER (Friendly Small-Town Terms) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c1f1b]">
              Explore Everyday Bakes
            </h2>
            <p className="text-xs sm:text-sm text-[#7c6a5d] mt-1">
              Freshly prepared with love in local home kitchens
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs sm:text-sm font-bold text-[#b84c26] hover:text-[#a33e1c] flex items-center gap-1 transition-colors"
          >
            <span>View All Treats</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Circular Cards Horizontal Scroll / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => handleCategoryClick(cat.label)}
              className="group cursor-pointer flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-[#eadecd] transition-all"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-white shadow-md group-hover:scale-105 group-hover:border-[#b84c26] transition-all duration-300 bg-[#f3ece1]">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-[#2c1f1b] mt-3 group-hover:text-[#b84c26] transition-colors leading-tight">
                {cat.label}
              </h3>
              <span className="text-[11px] text-[#7c6a5d] mt-0.5 font-medium">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED BESTSELLERS (4-Column Modern Boutique Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2ec] text-[#b84c26] text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Town Favorites</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c1f1b]">
              Freshly Baked Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#7c6a5d] mt-1">
              Guaranteed fresh out of the oven for your celebrations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7c6a5d]">Filter:</span>
            <button
              onClick={() => {
                setSelectedCategory('Birthday & Party Cakes')
                setCurrentPage('shop')
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f3ece1] text-[#8c4224] hover:bg-[#eadecd] transition-colors"
            >
              Cakes
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Brownies & Tea Cakes')
                setCurrentPage('shop')
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f3ece1] text-[#8c4224] hover:bg-[#eadecd] transition-colors"
            >
              Brownies
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Fresh Breads & Buns')
                setCurrentPage('shop')
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f3ece1] text-[#8c4224] hover:bg-[#eadecd] transition-colors"
            >
              Breads
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => setCurrentPage('product', product)}
              className="group cursor-pointer bg-white rounded-3xl p-3.5 border border-[#eadecd] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#f3ece1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-md text-[#2c1f1b] shadow-xs">
                      {product.leadTime}
                    </span>
                    {product.tag && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#b84c26] text-white shadow-xs">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  {/* Eggless Indicator */}
                  {product.isEggless && (
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[10px] font-semibold text-emerald-800 flex items-center gap-1 shadow-xs">
                      <span>🟢</span> 100% Eggless
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="pt-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-[#7c6a5d]">
                    <span className="truncate">{product.bakerName}</span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#2c1f1b] group-hover:text-[#b84c26] transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#7c6a5d] line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price & Quick Add */}
              <div className="pt-4 mt-3 border-t border-[#f3ece1] flex items-center justify-between">
                <div>
                  <span className="font-black text-lg text-[#2c1f1b]">
                    ₹{product.basePrice}
                  </span>
                  <span className="text-[10px] text-[#7c6a5d] block">
                    {product.defaultWeight}
                  </span>
                </div>

                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="px-3.5 py-2 rounded-xl bg-[#f8f4ee] hover:bg-[#b84c26] text-[#b84c26] hover:text-white border border-[#eadecd] hover:border-[#b84c26] font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY SMALL-TOWN NEIGHBORS LOVE LOCAL HOME BAKERS */}
      <section className="bg-[#f3ece1]/60 border-y border-[#eadecd] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#b84c26]">
              The Homemade Difference
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#2c1f1b]">
              Why Choose Your Neighborhood Baker?
            </h2>
            <p className="text-xs sm:text-sm text-[#7c6a5d]">
              Honest ingredients, customized care, and the warmth of a real home kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2ec] text-[#b84c26] flex items-center justify-center font-bold text-xl">
                🕒
              </div>
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                Baked After You Order
              </h3>
              <p className="text-xs text-[#7c6a5d] leading-relaxed">
                We don’t keep cakes sitting in display chillers for days. Every sponge is mixed and baked only after your order is confirmed.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2ec] text-[#b84c26] flex items-center justify-center font-bold text-xl">
                🧈
              </div>
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                Real Butter & Desi Ghee
              </h3>
              <p className="text-xs text-[#7c6a5d] leading-relaxed">
                Zero cheap vegetable shortening, zero palm oil, and zero premix powders. Just pure dairy butter, rich cocoa, and natural sweetness.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2ec] text-[#b84c26] flex items-center justify-center font-bold text-xl">
                🟢
              </div>
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                100% Pure Veg Care
              </h3>
              <p className="text-xs text-[#7c6a5d] leading-relaxed">
                Strict separation of eggless bakes with dedicated utensils and ovens. Fluffy, melt-in-mouth eggless cakes that grandparents and kids adore.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fdf2ec] text-[#b84c26] flex items-center justify-center font-bold text-xl">
                💬
              </div>
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                WhatsApp Photo Proof
              </h3>
              <p className="text-xs text-[#7c6a5d] leading-relaxed">
                Your baker personally sends you a photo of the finished cake and handwritten inscription on WhatsApp before it leaves the kitchen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. MEET BAKER ANANYA (Personal Touch & Hygiene Badge) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#ffffff] to-[#f8f4ee] rounded-3xl border border-[#eadecd] p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Baker Photo */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-md border-4 border-white bg-[#f3ece1]">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Baker Ananya in Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 right-4 bg-white px-3.5 py-1.5 rounded-xl shadow-md border border-[#eadecd] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#b84c26]" />
                <span className="text-xs font-bold text-[#2c1f1b]">FSSAI Reg. #20261109001</span>
              </div>
            </div>

            {/* Baker Story */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf2ec] text-[#b84c26] text-xs font-bold">
                <Heart className="w-3.5 h-3.5 fill-[#b84c26]" />
                <span>Meet Your Neighborhood Home Baker</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c1f1b]">
                "Every cake is baked with the exact same love I give to my family."
              </h2>

              <p className="text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
                Hello! I’m Baker Ananya. Four years ago, I began baking custom cakes from my home oven in Sector 4 for my children and neighbors. What began as a heartfelt passion has grown into over 180+ celebrations across our town.
              </p>

              <p className="text-xs sm:text-sm text-[#5e4d42] leading-relaxed">
                I personally inspect every batch of Dutch chocolate, whip each fresh cream frosting by hand, and write every name with care. When you order from The Home Oven, you are supporting local home entrepreneurship and getting genuine freshness.
              </p>

              {/* Baker Contact Action */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Ananya!%20I%20love%20your%20bakery%20and%20want%20to%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat with Baker Ananya (+91 98765 43210)</span>
                </a>

                <button
                  onClick={() => setCurrentPage('shop')}
                  className="px-5 py-2.5 rounded-xl bg-[#f8f4ee] hover:bg-[#eadecd] text-[#2c1f1b] border border-[#eadecd] text-xs font-bold transition-all"
                >
                  View Today’s Fresh Menu →
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. NEIGHBORHOOD REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-1">
          <span className="text-xs uppercase font-bold tracking-widest text-[#b84c26]">
            Community Love
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2c1f1b]">
            Loved by Families Across Town
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BAKERY_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#eadecd] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4a3b32] italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#f3ece1]">
                <h4 className="font-bold text-xs text-[#2c1f1b]">{rev.name}</h4>
                <p className="text-[11px] text-[#7c6a5d]">{rev.area}</p>
                <span className="inline-block mt-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOM CAKE CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#b84c26] to-[#d96b43] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-200">
              Have a Specific Birthday Theme in Mind? 🦄
            </span>
            <h2 className="font-serif font-black text-2xl sm:text-4xl leading-tight">
              Bring Your Pinterest & Instagram Cake Ideas to Life
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Upload any photo or sketch. Choose your favorite flavor (Dutch Chocolate, Rasmalai Fusion, Pineapple), tier count, and custom inscription. We provide transparent estimates with zero surprises!
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setCurrentPage('custom-cake')}
                className="px-6 py-3.5 rounded-xl bg-white text-[#b84c26] hover:bg-[#fff5ee] font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
              >
                Upload Photo & Get Quote →
              </button>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20a%20photo%20of%20a%20custom%20cake%20I%20want%20to%20make."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Share Photo on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
