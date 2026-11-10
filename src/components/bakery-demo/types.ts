export type BakeryPage = 'home' | 'shop' | 'product' | 'custom-cake' | 'checkout' | 'order-success' | 'admin'

export type BakeryCategory = 
  | 'All Treats'
  | 'Birthday & Party Cakes'
  | 'Brownies & Tea Cakes'
  | 'Fresh Breads & Buns'
  | 'Homemade Cookies'
  | 'Custom Theme Cakes'
  | 'Evening Snacks & Puffs'

export interface BakeryProduct {
  id: string
  name: string
  category: BakeryCategory
  basePrice: number // in INR (₹)
  rating: number
  reviewCount: number
  image: string
  gallery?: string[]
  description: string
  leadTime: string
  tag?: string
  isEggless: boolean
  isEgglessAvailable: boolean
  servings?: string
  defaultWeight: string
  weights: {
    label: string
    multiplier: number
    servings: string
  }[]
  ingredients: string[]
  bakerName: string
  bakerLocation: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number // computed final price
  quantity: number
  weight: string
  isEggless: boolean
  cakeMessage?: string
  image: string
  leadTime: string
  addedSparklingCandle?: boolean
  addedGreetingCard?: boolean
}

export interface DeliveryDetails {
  mode: 'delivery' | 'pickup'
  fullName: string
  phone: string
  houseNo: string
  street: string
  landmark: string
  pincode: string
  deliveryDate: string
  deliverySlot: string
  bakingInstructions: string
  paymentMethod: 'upi' | 'cod' | 'card'
  upiApp?: 'gpay' | 'phonepe' | 'paytm' | 'other'
}

export interface CustomCakeInquiry {
  photoPreview?: string
  photoName?: string
  flavor: string
  isEggless: boolean
  weight: string
  tiers: string
  eventDate: string
  messageOnCake: string
  designNotes: string
  contactPhone: string
  estimatedPrice: string
}

export interface BakerUser {
  id: string
  name: string
  role: string
  email: string
  kitchenLocation: string
  avatar: string
  sessionExpiry: number
}

export interface CustomerUser {
  id: string
  name: string
  phone: string
  email?: string
  city: string
  address: string
  landmark: string
  activeOrders: string[]
}

