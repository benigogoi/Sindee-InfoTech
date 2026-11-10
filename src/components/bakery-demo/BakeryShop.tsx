import { useState, useMemo } from 'react'
import { 
  Sparkles, 
  Star, 
  Plus, 
  RotateCcw, 
  MessageCircle, 
  Flame, 
  Check, 
  ChevronDown 
} from 'lucide-react'
import { useBakery } from './BakeryContext'
import { BAKERY_CATEGORIES, BAKERY_PRODUCTS } from './data'
import type { BakeryProduct } from './types'

export function BakeryShop() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    setCurrentPage, 
    addToCart, 
    townLocation,
    egglessOnlyFilter,
    setEgglessOnlyFilter,
    readyTodayFilter,
    setReadyTodayFilter
  } = useBakery()

  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'fastest'>('popular')
  const [priceRange, setPriceRange] = useState<'all' | 'under-300' | '300-700' | 'above-700'>('all')

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return BAKERY_PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'All Treats' && product.category !== selectedCategory) {
        return false
      }

      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(q)
        const matchesDesc = product.description.toLowerCase().includes(q)
        const matchesIngredients = product.ingredients.some(i => i.toLowerCase().includes(q))
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false
        }
      }

      // 100% Eggless toggle
      if (egglessOnlyFilter && !product.isEggless) {
        return false
      }

      // Ready Today toggle
      if (readyTodayFilter && !product.leadTime.toLowerCase().includes('ready') && !product.leadTime.toLowerCase().includes('fresh at 7')) {
        return false
      }

      // Price range
      if (priceRange === 'under-300' && product.basePrice > 300) return false
      if (priceRange === '300-700' && (product.basePrice < 300 || product.basePrice > 700)) return false
      if (priceRange === 'above-700' && product.basePrice < 700) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice
      if (sortBy === 'price-high') return b.basePrice - a.basePrice
      if (sortBy === 'fastest') {
        const isFastA = a.leadTime.toLowerCase().includes('ready') ? 0 : 1
        const isFastB = b.leadTime.toLowerCase().includes('ready') ? 0 : 1
        return isFastA - isFastB
      }
      return b.reviewCount - a.reviewCount // popular
    })
  }, [selectedCategory, searchQuery, egglessOnlyFilter, readyTodayFilter, priceRange, sortBy])

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

  const resetAllFilters = () => {
    setSelectedCategory('All Treats')
    setSearchQuery('')
    setEgglessOnlyFilter(false)
    setReadyTodayFilter(false)
    setPriceRange('all')
    setSortBy('popular')
  }

  const isAnyFilterActive = 
    selectedCategory !== 'All Treats' || 
    Boolean(searchQuery.trim()) || 
    egglessOnlyFilter || 
    readyTodayFilter || 
    priceRange !== 'all'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* 1. Header & Title Banner */}
      <div className="bg-gradient-to-r from-[#f8f4ee] to-[#f3ece1] border border-[#eadecd] rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#e2d5c3] text-xs font-semibold text-[#8c4224]">
            <Sparkles className="w-3.5 h-3.5 text-[#b84c26]" />
            <span>Delivering Fresh Bakes Across {townLocation}</span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-[#2c1f1b] tracking-tight">
            Fresh From the Home Oven
          </h1>

          <p className="text-xs sm:text-base text-[#5e4d42] leading-relaxed">
            Handcrafted celebration cakes, fudgy brownies, and daily soft breads prepared fresh in certified home kitchens. Never refrigerated shelf items, zero preservatives.
          </p>
        </div>

        {/* Decorative corner icon */}
        <div className="hidden lg:block absolute -right-6 -bottom-8 text-9xl opacity-20 pointer-events-none select-none">
          🥐
        </div>
      </div>

      {/* 2. Category Filter Pills (Horizontal Touch-friendly Carousel) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {BAKERY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#b84c26] text-white shadow-md shadow-[#b84c26]/20 scale-[1.02]'
                    : 'bg-white hover:bg-[#f8f4ee] text-[#4a3b32] border border-[#eadecd]'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* 3. Search & High-Impact Toggle Controls Bar */}
        <div className="bg-white rounded-2xl border border-[#eadecd] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Toggles: 100% Eggless & Ready Today */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Eggless Button Toggle */}
            <button
              onClick={() => setEgglessOnlyFilter(!egglessOnlyFilter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                egglessOnlyFilter
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-[#f8f4ee] hover:bg-[#f3ece1] text-[#2c1f1b] border border-[#eadecd]'
              }`}
            >
              <span>🟢</span>
              <span>100% Eggless (Pure Veg)</span>
              {egglessOnlyFilter && <Check className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Ready Today Toggle */}
            <button
              onClick={() => setReadyTodayFilter(!readyTodayFilter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                readyTodayFilter
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-[#f8f4ee] hover:bg-[#f3ece1] text-[#2c1f1b] border border-[#eadecd]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ Ready Today</span>
              {readyTodayFilter && <Check className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            {/* Price Filter Pills */}
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-[#eadecd]">
              <span className="text-xs text-[#7c6a5d] font-medium">Price:</span>
              {(['all', 'under-300', '300-700', 'above-700'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setPriceRange(r)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    priceRange === r
                      ? 'bg-[#b84c26] text-white'
                      : 'bg-[#f8f4ee] text-[#5e4d42] hover:bg-[#eadecd]'
                  }`}
                >
                  {r === 'all' && 'All'}
                  {r === 'under-300' && '< ₹300'}
                  {r === '300-700' && '₹300 - ₹700'}
                  {r === 'above-700' && '> ₹700'}
                </button>
              ))}
            </div>

          </div>

          {/* Right Controls: Sort Dropdown & Reset */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7c6a5d] font-medium hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#f8f4ee] border border-[#eadecd] rounded-xl pl-3 pr-8 py-1.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26] cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="fastest">Fastest Baking Time</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#7c6a5d] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Reset Filters Button */}
            {isAnyFilterActive && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-[#b84c26] bg-[#fdf2ec] hover:bg-[#fadacf] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* 4. Active Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-[#7c6a5d] px-1">
        <p>
          Showing <span className="font-bold text-[#2c1f1b]">{filteredProducts.length}</span> freshly baked items in <span className="font-bold text-[#b84c26]">{townLocation}</span>
        </p>
        {selectedCategory !== 'All Treats' && (
          <span className="text-[#b84c26] font-semibold">
            Filtered by: {selectedCategory}
          </span>
        )}
      </div>

      {/* 5. Product Grid (4-column desktop, 2-column mobile) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#eadecd] p-12 text-center space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#f8f4ee] flex items-center justify-center text-3xl">
            🧁
          </div>
          <h3 className="font-serif font-bold text-xl text-[#2c1f1b]">
            No bakes found matching your filter
          </h3>
          <p className="text-xs sm:text-sm text-[#7c6a5d] max-w-md mx-auto">
            Try turning off the 100% Eggless or Ready Today toggles, or search for different ingredients like chocolate, walnut, or bread.
          </p>
          <button
            onClick={resetAllFilters}
            className="px-6 py-2.5 rounded-xl bg-[#b84c26] text-white text-xs font-bold shadow-md hover:bg-[#a33e1c] transition-colors"
          >
            Show All Treats
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

                  {/* Eggless Badge */}
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
                    <span className="flex items-center gap-1 text-amber-600 font-bold shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#2c1f1b] group-hover:text-[#b84c26] transition-colors leading-snug line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#7c6a5d] line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1">
                    {product.ingredients.slice(0, 3).map((ing) => (
                      <span
                        key={ing}
                        className="text-[9px] font-medium bg-[#f8f4ee] text-[#7c6a5d] px-2 py-0.5 rounded-md"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
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
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          ))}

          {/* Custom Cake Assistance Card */}
          <div className="bg-gradient-to-br from-[#fdf2ec] to-[#fbf5ed] rounded-3xl p-5 border-2 border-dashed border-[#d96b43]/50 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-2xl">🎨</span>
              <h3 className="font-serif font-bold text-base text-[#2c1f1b]">
                Looking for a Custom Design?
              </h3>
              <p className="text-xs text-[#7c6a5d] leading-relaxed">
                Have a Pinterest or Instagram theme cake in mind? Share your inspiration photo and we’ll bake it for your party.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setCurrentPage('custom-cake')}
                className="w-full py-2.5 rounded-xl bg-[#b84c26] hover:bg-[#a33e1c] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Build Custom Cake
              </button>
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20order%20a%20custom%20cake%20in%20Jorhat."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-white hover:bg-[#f8f4ee] border border-[#eadecd] text-[#2c1f1b] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
