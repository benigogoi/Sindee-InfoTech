import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { 
  BakeryPage, 
  BakeryProduct, 
  CartItem, 
  DeliveryDetails, 
  CustomCakeInquiry,
  BakerUser,
  CustomerUser
} from './types'
import { BAKERY_PRODUCTS } from './data'

interface BakeryContextType {
  currentPage: BakeryPage
  setCurrentPage: (page: BakeryPage, product?: BakeryProduct) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  egglessOnlyFilter: boolean
  setEgglessOnlyFilter: (val: boolean) => void
  readyTodayFilter: boolean
  setReadyTodayFilter: (val: boolean) => void
  selectedProduct: BakeryProduct
  setSelectedProduct: (product: BakeryProduct) => void
  cart: CartItem[]
  isCartOpen: boolean
  toggleCart: (open?: boolean) => void
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  cartSubtotal: number
  cartItemCount: number
  deliveryDetails: DeliveryDetails
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>
  customInquiry: CustomCakeInquiry
  setCustomInquiry: React.Dispatch<React.SetStateAction<CustomCakeInquiry>>
  lastOrderNumber: string | null
  placeOrder: () => void
  townLocation: string
  setTownLocation: (loc: string) => void
  availableCities: string[]

  // Authentication & Security Layer
  bakerUser: BakerUser | null
  isBakerAuthenticated: boolean
  loginBaker: (pinOrPassword: string, email?: string) => Promise<{ success: boolean; error?: string }>
  logoutBaker: () => void
  customerUser: CustomerUser | null
  isCustomerAuthenticated: boolean
  loginCustomer: (phoneOrEmail: string, name?: string) => Promise<boolean>
  logoutCustomer: () => void
  showCustomerLogin: boolean
  setShowCustomerLogin: (show: boolean) => void
}

export const ASSAM_CITIES = [
  'Jorhat',
  'Sivasagar',
  'Sonari',
  'Dibrugarh',
  'Guwahati',
]

const defaultDeliveryDetails: DeliveryDetails = {
  mode: 'delivery',
  fullName: 'Aarav Sharma',
  phone: '98765 43210',
  houseNo: 'House No. 12, Ward 4',
  street: 'Gar-Ali Road',
  landmark: 'Near JB College / Central Market',
  pincode: '785001',
  deliveryDate: 'Tomorrow, 10 Nov',
  deliverySlot: '5:00 PM - 7:00 PM',
  bakingInstructions: 'Please write "Happy Birthday Aarav!" in neat white chocolate cursive.',
  paymentMethod: 'upi',
  upiApp: 'gpay',
}

const defaultCustomInquiry: CustomCakeInquiry = {
  flavor: 'Dutch Chocolate Truffle',
  isEggless: true,
  weight: '1.5 kg',
  tiers: 'Single Tall Tier',
  eventDate: 'Weekend Special (15 Nov)',
  messageOnCake: 'Aarohi Turns 5! 🦄',
  designNotes: 'Pastel pink and lavender colors with edible gold leaf and unicorn horn.',
  contactPhone: '98765 43210',
  estimatedPrice: '₹1,350 - ₹1,550',
}

const BakeryContext = createContext<BakeryContextType | null>(null)

export function BakeryProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  // Initialize page directly from URL if already loaded at /demo/home-baker/shop etc.
  const getInitialPage = (): BakeryPage => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/demo/home-baker')) {
      const sub = window.location.pathname.replace(/^\/demo\/home-baker\/?/, '').toLowerCase()
      if (sub.startsWith('shop')) return 'shop'
      if (sub.startsWith('product/')) return 'product'
      if (sub.startsWith('custom-cake')) return 'custom-cake'
      if (sub.startsWith('checkout')) return 'checkout'
      if (sub.startsWith('order-success')) return 'order-success'
      if (sub.startsWith('admin') || sub.startsWith('take-order') || sub.startsWith('pos') || sub.startsWith('orders') || sub.startsWith('upload-cake')) return 'admin'
    }
    return 'home'
  }

  const [currentPage, setCurrentPageState] = useState<BakeryPage>(getInitialPage)
  const [selectedCategory, setSelectedCategory] = useState<string>('All Treats')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [egglessOnlyFilter, setEgglessOnlyFilter] = useState<boolean>(false)
  const [readyTodayFilter, setReadyTodayFilter] = useState<boolean>(false)

  // Initialize selected product from URL if at /product/:id
  const getInitialProduct = (): BakeryProduct => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/demo/home-baker/product/')) {
      const id = window.location.pathname.replace('/demo/home-baker/product/', '').split('/')[0]
      const found = BAKERY_PRODUCTS.find((p) => p.id === id)
      if (found) return found
    }
    return BAKERY_PRODUCTS[0]
  }

  const [selectedProduct, setSelectedProduct] = useState<BakeryProduct>(getInitialProduct)
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>(defaultDeliveryDetails)
  const [customInquiry, setCustomInquiry] = useState<CustomCakeInquiry>(defaultCustomInquiry)
  const [lastOrderNumber, setLastOrderNumber] = useState<string | null>(null)
  const [townLocation, setTownLocation] = useState<string>('Jorhat')

  // --- Security & Auth Layer (Backend-less with LocalStorage Persistence) ---
  const [bakerUser, setBakerUser] = useState<BakerUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('the_home_oven_baker_session')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (parsed && parsed.sessionExpiry && parsed.sessionExpiry > Date.now()) {
            return parsed
          }
        } catch {
          // invalid
        }
      }
    }
    return null
  })

  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('the_home_oven_customer_session')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // invalid
        }
      }
    }
    return null
  })

  const [showCustomerLogin, setShowCustomerLogin] = useState<boolean>(false)

  const isBakerAuthenticated = !!bakerUser
  const isCustomerAuthenticated = !!customerUser

  const loginBaker = async (pinOrPassword: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    // Simulated authentication network delay (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300))

    const cleanInput = pinOrPassword.trim()
    const isPinMatch = cleanInput === '1234' || cleanInput === '0000' || cleanInput === '2024'
    const isPasswordMatch = cleanInput.toLowerCase() === 'baker123' || cleanInput.toLowerCase() === 'ananya2024' || cleanInput.toLowerCase() === 'admin123'

    if (isPinMatch || isPasswordMatch || cleanInput === 'demo') {
      const session: BakerUser = {
        id: 'baker-ananya',
        name: 'Ananya Sharma',
        role: 'Head Baker & Studio Owner',
        email: email || 'ananya@thehomeoven.com',
        kitchenLocation: `Gar-Ali, ${townLocation} (Assam)`,
        avatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=120&q=80',
        sessionExpiry: Date.now() + 8 * 60 * 60 * 1000, // 8 hours valid session
      }
      localStorage.setItem('the_home_oven_baker_session', JSON.stringify(session))
      setBakerUser(session)
      return { success: true }
    }

    return {
      success: false,
      error: 'Invalid Kitchen PIN or Password. (Hint: Try PIN 1234 or click Quick Demo Access)',
    }
  }

  const logoutBaker = () => {
    localStorage.removeItem('the_home_oven_baker_session')
    setBakerUser(null)
  }

  const loginCustomer = async (phoneOrEmail: string, name?: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const cust: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: name || 'Aarav Sharma',
      phone: phoneOrEmail.includes('@') ? '98765 43210' : phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : 'aarav.sharma@example.com',
      city: townLocation || 'Jorhat',
      address: 'House No. 12, Ward 4, Gar-Ali Road',
      landmark: 'Near JB College / Central Market',
      activeOrders: ['HBO-829104'],
    }
    localStorage.setItem('the_home_oven_customer_session', JSON.stringify(cust))
    setCustomerUser(cust)
    setDeliveryDetails((prev) => ({
      ...prev,
      fullName: cust.name,
      phone: cust.phone,
      street: cust.address,
      landmark: cust.landmark,
    }))
    setShowCustomerLogin(false)
    return true
  }

  const logoutCustomer = () => {
    localStorage.removeItem('the_home_oven_customer_session')
    setCustomerUser(null)
  }


  // Keep state synchronized with browser back/forward and direct URL changes
  useEffect(() => {
    if (location.pathname.startsWith('/demo/home-baker')) {
      const subPath = location.pathname.replace(/^\/demo\/home-baker\/?/, '').toLowerCase()
      if (subPath.startsWith('shop')) {
        setCurrentPageState('shop')
      } else if (subPath.startsWith('product/')) {
        const pId = subPath.replace('product/', '').split('/')[0]
        const found = BAKERY_PRODUCTS.find((p) => p.id === pId)
        if (found) {
          setSelectedProduct(found)
        }
        setCurrentPageState('product')
      } else if (subPath.startsWith('custom-cake')) {
        setCurrentPageState('custom-cake')
      } else if (subPath.startsWith('checkout')) {
        setCurrentPageState('checkout')
      } else if (subPath.startsWith('order-success')) {
        setCurrentPageState('order-success')
      } else if (subPath.startsWith('admin') || subPath.startsWith('take-order') || subPath.startsWith('pos') || subPath.startsWith('orders') || subPath.startsWith('upload-cake')) {
        setCurrentPageState('admin')
      } else if (!subPath || subPath === 'home') {
        setCurrentPageState('home')
      }
    }
  }, [location.pathname])

  // Pre-seed cart with sample items so checkout is interactive right away
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
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
      id: 'cart-init-2',
      productId: 'fudge-brownie-box',
      name: 'Fudgy Walnut Brownies (Pack of 6)',
      price: 320,
      quantity: 1,
      weight: 'Box of 6',
      isEggless: true,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
      leadTime: 'Ready Today',
    },
  ])

  const setCurrentPage = (page: BakeryPage, product?: BakeryProduct) => {
    if (product) {
      setSelectedProduct(product)
    }
    setCurrentPageState(page)

    // Update real browser URL if operating under /demo/home-baker
    if (location.pathname.startsWith('/demo/home-baker')) {
      let targetPath = '/demo/home-baker'
      if (page === 'shop') targetPath = '/demo/home-baker/shop'
      else if (page === 'custom-cake') targetPath = '/demo/home-baker/custom-cake'
      else if (page === 'checkout') targetPath = '/demo/home-baker/checkout'
      else if (page === 'order-success') targetPath = '/demo/home-baker/order-success'
      else if (page === 'admin') targetPath = '/demo/home-baker/admin'
      else if (page === 'product') {
        const pId = product?.id || selectedProduct.id
        targetPath = `/demo/home-baker/product/${pId}`
      }

      if (location.pathname !== targetPath) {
        navigate(targetPath)
      }
    }

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCart = (open?: boolean) => {
    setIsCartOpen((prev) => (open !== undefined ? open : !prev))
  }

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    }
    setCart((prev) => [...prev, newItem])
    setIsCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    )
  }

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const placeOrder = () => {
    const orderNo = `HBO-${Math.floor(100000 + Math.random() * 900000)}`
    setLastOrderNumber(orderNo)
    setCurrentPageState('order-success')
    setIsCartOpen(false)
  }

  return (
    <BakeryContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        egglessOnlyFilter,
        setEgglessOnlyFilter,
        readyTodayFilter,
        setReadyTodayFilter,
        selectedProduct,
        setSelectedProduct,
        cart,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartSubtotal,
        cartItemCount,
        deliveryDetails,
        setDeliveryDetails,
        customInquiry,
        setCustomInquiry,
        lastOrderNumber,
        placeOrder,
        townLocation,
        setTownLocation,
        availableCities: ASSAM_CITIES,

        // Authentication & Security Layer
        bakerUser,
        isBakerAuthenticated,
        loginBaker,
        logoutBaker,
        customerUser,
        isCustomerAuthenticated,
        loginCustomer,
        logoutCustomer,
        showCustomerLogin,
        setShowCustomerLogin,
      }}
    >
      {children}
    </BakeryContext.Provider>
  )
}

export function useBakery() {
  const context = useContext(BakeryContext)
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider')
  }
  return context
}
