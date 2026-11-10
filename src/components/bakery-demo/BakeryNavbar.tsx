import { useState } from 'react'
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown,
  User,
  LogOut,
  Lock,
  Package
} from 'lucide-react'
import { useBakery } from './BakeryContext'
import type { BakeryPage } from './types'

export function BakeryNavbar() {
  const { 
    currentPage, 
    setCurrentPage, 
    cartItemCount, 
    toggleCart, 
    searchQuery, 
    setSearchQuery,
    townLocation,
    setTownLocation,
    isCustomerAuthenticated,
    customerUser,
    logoutCustomer,
    setShowCustomerLogin,
    isBakerAuthenticated
  } = useBakery()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)

  const navLinks: { label: string; page: BakeryPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Menu', page: 'shop' },
    { label: 'Custom Cakes', page: 'custom-cake' },
  ]

  const handleNavClick = (page: BakeryPage) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
  }

  const cities = [
    'Jorhat',
    'Sivasagar',
    'Sonari',
    'Dibrugarh',
    'Guwahati',
  ]

  return (
    <>
      {/* 1. Warm Announcement Bar */}
      <div className="bg-[#b84c26] text-[#fff8f2] text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 tracking-wide border-b border-[#a33e1c]">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
        <span>
          Baking Fresh on Order • 100% Pure Butter & Desi Ghee • Free Delivery on Orders Over ₹800
        </span>
      </div>

      {/* 2. Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#eadecd] shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-2 sm:gap-4">
            
            {/* Brand Logo & Name */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#d96b43] to-[#b84c26] text-white flex items-center justify-center shadow-md shadow-[#d96b43]/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="font-serif font-black text-lg sm:text-xl">🧁</span>
              </div>
              <div className="min-w-0">
                <span className="font-serif font-bold text-lg sm:text-xl lg:text-2xl text-[#2c1f1b] tracking-tight block whitespace-nowrap">
                  The Home Oven
                </span>
                <p className="hidden xl:block text-[10px] text-[#7c6a5d] font-sans truncate -mt-0.5">
                  Artisanal Neighborhood Bakes
                </p>
              </div>
            </div>

            {/* City Selector Pill */}
            <div className="relative hidden md:block shrink-0">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f3ece1]/80 hover:bg-[#f3ece1] border border-[#e2d5c3] text-xs text-[#2c1f1b] transition-all hover:scale-[1.02] shadow-2xs whitespace-nowrap cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#b84c26] shrink-0" />
                <span className="font-bold text-[#2c1f1b]">{townLocation}</span>
                <ChevronDown className="w-3 h-3 text-[#7c6a5d] shrink-0" />
              </button>

              {showLocationDropdown && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#eadecd] p-2 z-50 animate-scale">
                  <p className="text-[10px] uppercase font-bold text-[#7c6a5d] px-3 py-1.5 tracking-wider">
                    Select Your City
                  </p>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setTownLocation(city)
                        setShowLocationDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        townLocation === city
                          ? 'bg-[#b84c26] text-white shadow-xs'
                          : 'text-[#2c1f1b] hover:bg-[#f8f4ee]'
                      }`}
                    >
                      <span>{city}</span>
                      {townLocation === city && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#b84c26] text-white shadow-xs'
                        : 'text-[#4a3b32] hover:text-[#b84c26] hover:bg-[#f8f4ee]'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5 shrink-0">
              
              {/* Search Bar */}
              <div className="relative hidden xl:block w-36 2xl:w-48 shrink-0">
                <Search className="w-3.5 h-3.5 text-[#7c6a5d] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search treats..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (currentPage !== 'shop') {
                      setCurrentPage('shop')
                    }
                  }}
                  className="w-full bg-[#f8f4ee] border border-[#eadecd] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#2c1f1b] placeholder:text-[#9c897b] focus:outline-none focus:border-[#b84c26] focus:bg-white transition-all"
                />
              </div>

              {/* Customer Account / Sign In */}
              <div className="relative hidden sm:block shrink-0">
                {!isCustomerAuthenticated ? (
                  <button
                    onClick={() => setShowCustomerLogin(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f4ee] hover:bg-[#f3ece1] border border-[#eadecd] text-[#2c1f1b] text-xs font-semibold whitespace-nowrap transition-all shadow-2xs hover:border-[#b84c26] cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#b84c26] shrink-0" />
                    <span>Sign In</span>
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fdf2ec] border border-[#f5ded5] text-[#b84c26] text-xs font-bold whitespace-nowrap transition-all shadow-2xs cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#b84c26] shrink-0" />
                      <span className="truncate max-w-[80px]">{customerUser?.name.split(' ')[0]}</span>
                      <ChevronDown className="w-3 h-3 text-[#b84c26] shrink-0" />
                    </button>

                    {showCustomerDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e8dfd5] p-3 space-y-2 z-40 animate-fade-in">
                        <div className="pb-2 border-b border-[#f0e7dc]">
                          <p className="font-bold text-xs text-[#2c1f1b]">{customerUser?.name}</p>
                          <p className="text-[10px] text-[#7c6a5d]">{customerUser?.phone}</p>
                          <p className="text-[10px] text-[#7c6a5d] truncate mt-0.5">{customerUser?.address}</p>
                        </div>

                        <div className="space-y-1 text-xs">
                          <button
                            onClick={() => {
                              setShowCustomerDropdown(false)
                              setCurrentPage('order-success')
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[#2c1f1b] hover:bg-[#fdfbf7] font-medium cursor-pointer"
                          >
                            <Package className="w-3.5 h-3.5 text-[#b84c26]" />
                            <span>Track Order (#HBO-829104)</span>
                          </button>

                          <button
                            onClick={() => {
                              setShowCustomerDropdown(false)
                              logoutCustomer()
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5 text-rose-500" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Baker Admin Switcher with Security Indicator */}
              <button
                onClick={() => setCurrentPage('admin')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer ${
                  isBakerAuthenticated
                    ? 'bg-[#fdf2ec] border-emerald-300 text-[#b84c26]'
                    : 'bg-[#f8f4ee] border-[#eadecd] text-[#7c6a5d] hover:text-[#b84c26]'
                }`}
                title={isBakerAuthenticated ? "Baker Studio (Unlocked)" : "Open Baker Studio (Security PIN Protected)"}
              >
                <span>👩‍🍳</span>
                <span className="hidden sm:inline">Admin</span>
                {isBakerAuthenticated ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" title="Session Active" />
                ) : (
                  <Lock className="w-3 h-3 text-[#9c897b]" />
                )}
              </button>

              {/* Cart Drawer Button */}
              <button
                onClick={() => toggleCart(true)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f8f4ee] hover:bg-[#f3ece1] border border-[#eadecd] text-[#2c1f1b] font-bold text-xs sm:text-sm whitespace-nowrap transition-all shrink-0 cursor-pointer"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#b84c26]" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#b84c26] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Bag</span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-[#f8f4ee] border border-[#eadecd] text-[#4a3b32] shrink-0 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#eadecd] bg-[#fdfbf7] px-4 pt-3 pb-5 space-y-3 shadow-lg">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7c6a5d] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cakes, snacks..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (currentPage !== 'shop') {
                    setCurrentPage('shop')
                  }
                }}
                className="w-full bg-[#f8f4ee] border border-[#eadecd] rounded-xl pl-9 pr-3 py-2 text-sm text-[#2c1f1b]"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-1 pt-1">
              {/* Mobile Customer Sign In / Account */}
              {!isCustomerAuthenticated ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setShowCustomerLogin(true)
                  }}
                  className="px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center justify-between bg-[#f8f4ee] text-[#2c1f1b] border border-[#eadecd]"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#b84c26]" />
                    <span>Customer Sign In</span>
                  </div>
                  <span className="text-[10px] bg-[#b84c26] text-white px-2 py-0.5 rounded-full font-bold">1-Click</span>
                </button>
              ) : (
                <div className="px-4 py-2.5 rounded-xl bg-[#fdf2ec] border border-[#f5ded5] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#2c1f1b]">👤 {customerUser?.name}</p>
                    <p className="text-[10px] text-[#7c6a5d]">{customerUser?.phone}</p>
                  </div>
                  <button
                    onClick={() => {
                      logoutCustomer()
                      setMobileMenuOpen(false)
                    }}
                    className="text-rose-600 font-bold hover:underline text-[11px]"
                  >
                    Log Out
                  </button>
                </div>
              )}

              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                    currentPage === link.page
                      ? 'bg-[#b84c26] text-white'
                      : 'text-[#2c1f1b] hover:bg-[#f8f4ee]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('admin')}
                className={`px-4 py-2.5 rounded-xl text-left text-sm font-bold flex items-center justify-between transition-colors ${
                  currentPage === 'admin'
                    ? 'bg-[#b84c26] text-white'
                    : 'text-[#b84c26] bg-[#fdf2ec]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>👩‍🍳 Baker Admin & POS</span>
                  {isBakerAuthenticated ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  ) : (
                    <Lock className="w-3 h-3 text-[#9c897b]" />
                  )}
                </div>
                <span className="text-[10px] bg-[#b84c26] text-white px-2 py-0.5 rounded-full font-bold">
                  {isBakerAuthenticated ? 'Unlocked' : 'PIN Lock'}
                </span>
              </button>
            </div>

            {/* Mobile City Selector */}
            <div className="pt-2 border-t border-[#eadecd]/60">
              <div className="flex items-center gap-1.5 text-xs text-[#7c6a5d] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#b84c26]" />
                <span>Your City:</span>
              </div>
              <select
                value={townLocation}
                onChange={(e) => setTownLocation(e.target.value)}
                className="w-full bg-[#f8f4ee] border border-[#eadecd] rounded-xl px-3 py-2 text-xs font-semibold text-[#2c1f1b]"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
