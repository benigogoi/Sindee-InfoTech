import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Bell, 
  ChevronDown, 
  MoreHorizontal, 
  Upload, 
  Store, 
  Phone, 
  BarChart3, 
  Cake, 
  Calendar, 
  Settings, 
  CheckCircle2, 
  Palette, 
  LogOut, 
  Lock, 
  ShieldCheck, 
  Truck, 
  Check, 
  Plus, 
  X, 
  ArrowRight,
  Printer,
  CalendarRange
} from 'lucide-react'
import { useBakery } from './BakeryContext'
import { BAKERY_PRODUCTS } from './data'
import type { BakeryProduct, BakeryCategory } from './types'
import { BakeryTakeOrderPage, type PosOrderData } from './BakeryTakeOrderPage'

interface OrderItem {
  id: string
  orderNumber: string
  customerName: string
  customerPhone?: string
  isPhoneOrder?: boolean
  items: string
  image?: string
  weight: string
  isEggless: boolean
  cakeMessage?: string
  timing: string
  isoDate: string // YYYY-MM-DD
  deliveryType: 'delivery' | 'pickup'
  address: string
  status: 'received' | 'out_for_delivery' | 'delivered'
  amount: number
  discountAmount?: number
  discountReason?: string
  advanceAmount?: number
  pendingAmount?: number
  paymentMethod: string
  deliveredAt?: string
}

export function BakeryAdmin() {
  const { setCurrentPage, townLocation, logoutBaker, bakerUser } = useBakery()
  const location = useLocation()
  const navigate = useNavigate()

  const getInitialNav = () => {
    const p = location.pathname.toLowerCase()
    if (p.includes('/take-order') || p.includes('/pos') || p.includes('/take-new-order')) {
      return 'take-order'
    }
    if (p.includes('/upload-cake') || p.includes('/upload')) {
      return 'upload-cake'
    }
    if (p.includes('/orders')) {
      return 'orders'
    }
    return 'dashboard'
  }

  const [activeNav, setActiveNav] = useState(getInitialNav)

  // Keep activeNav synced with browser URL (including browser Back / Forward buttons)
  useEffect(() => {
    const p = location.pathname.toLowerCase()
    if (p.includes('/take-order') || p.includes('/pos') || p.includes('/take-new-order')) {
      setActiveNav('take-order')
    } else if (p.includes('/upload-cake') || p.includes('/upload')) {
      setActiveNav('upload-cake')
    } else if (p.includes('/orders')) {
      setActiveNav('orders')
    } else {
      setActiveNav('dashboard')
    }
  }, [location.pathname])

  const navigateToNav = (nav: 'dashboard' | 'orders' | 'take-order' | 'upload-cake') => {
    setActiveNav(nav)
    if (nav === 'take-order') {
      navigate('/demo/home-baker/admin/take-order')
    } else if (nav === 'upload-cake') {
      navigate('/demo/home-baker/admin/upload-cake')
    } else if (nav === 'orders') {
      navigate('/demo/home-baker/admin/orders')
    } else {
      navigate('/demo/home-baker/admin')
    }
  }

  const [showProfileMenu, setShowProfileMenu] = useState(false)
  
  // Orders Pipeline & Historical Delivered Records (Realistic Bakery Data with Food Photos)
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ord-1',
      orderNumber: 'HBO-829104',
      customerName: 'Aarav Sharma',
      customerPhone: '94350 11223',
      items: 'Classic Dutch Chocolate Truffle',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80',
      weight: '500g',
      isEggless: true,
      cakeMessage: 'Happy Birthday Aarav! 🎂',
      timing: 'Today 5:00 PM',
      isoDate: '2024-11-10',
      deliveryType: 'delivery',
      address: 'Home Delivery (Gar-Ali, Ward 4)',
      status: 'received',
      amount: 590,
      advanceAmount: 590,
      pendingAmount: 0,
      paymentMethod: 'UPI Paid (Full)',
    },
    {
      id: 'ord-2',
      orderNumber: 'HBO-829105',
      customerName: 'Pooja Bordoloi',
      customerPhone: '98765 22334',
      items: 'Royal Rasmalai Cake',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=240&q=80',
      weight: '1 kg',
      isEggless: true,
      cakeMessage: 'Happy 25th Anniversary Mom & Dad! 💕',
      timing: 'Today 6:00 PM',
      isoDate: '2024-11-10',
      deliveryType: 'pickup',
      address: 'Self-Pickup (Gar-Ali Studio)',
      status: 'out_for_delivery',
      amount: 1100,
      discountAmount: 50,
      discountReason: 'Regular Customer Discount',
      advanceAmount: 300,
      pendingAmount: 800,
      paymentMethod: 'Adv ₹300 (GPay) • Bal ₹800 Due',
    },
    {
      id: 'ord-3',
      orderNumber: 'PH-402',
      customerName: 'Dr. Priya',
      customerPhone: '94350 44210',
      isPhoneOrder: true,
      items: 'Walnut Brownies (Box of 6) + Milk Bread',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=240&q=80',
      weight: 'Box of 6 + Loaf',
      isEggless: true,
      timing: 'Today 4:30 PM',
      isoDate: '2024-11-10',
      deliveryType: 'delivery',
      address: 'Civil Hospital Road, Staff Quarters B-4',
      status: 'out_for_delivery',
      amount: 385,
      advanceAmount: 0,
      pendingAmount: 385,
      paymentMethod: 'COD ₹385',
    },
    {
      id: 'ord-4',
      orderNumber: 'HBO-829102',
      customerName: 'Meenakshi Saikia',
      customerPhone: '98640 55667',
      items: 'Butterscotch Crunch Celebration Cake',
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=240&q=80',
      weight: '1.5 lb',
      isEggless: true,
      cakeMessage: 'Best Wishes for New Home! 🏡',
      timing: 'Today 1:15 PM',
      isoDate: '2024-11-10',
      deliveryType: 'delivery',
      address: 'Near JB College Gate, Jorhat',
      status: 'delivered',
      amount: 720,
      advanceAmount: 720,
      pendingAmount: 0,
      paymentMethod: 'Fully Paid (GPay ₹720)',
      deliveredAt: 'Today 1:15 PM',
    },
    {
      id: 'ord-7',
      orderNumber: 'HBO-829108',
      customerName: 'Bikash Bordoloi',
      customerPhone: '98765 11223',
      items: 'Royal Rasmalai Tres Leches Cake',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=240&q=80',
      weight: '2 Pound',
      isEggless: true,
      cakeMessage: 'Happy 25th Anniversary Maa & Papa! 💕',
      timing: 'Tomorrow 11:30 AM',
      isoDate: '2024-11-11',
      deliveryType: 'pickup',
      address: 'Self-Pickup (Gar-Ali Studio)',
      status: 'received',
      amount: 1150,
      advanceAmount: 500,
      pendingAmount: 650,
      paymentMethod: 'Adv ₹500 (Cash) • Bal ₹650 Due',
    },
    {
      id: 'ord-8',
      orderNumber: 'HBO-829109',
      customerName: 'Ankita Dutta',
      customerPhone: '94350 77889',
      items: 'Pineapple Fresh Cream Gateau',
      image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&w=240&q=80',
      weight: '1.5 Pound',
      isEggless: true,
      cakeMessage: 'Congratulations on your Graduation! 🎓',
      timing: 'Tomorrow 4:00 PM',
      isoDate: '2024-11-11',
      deliveryType: 'delivery',
      address: 'Tarajan, Near KB Road',
      status: 'received',
      amount: 650,
      advanceAmount: 200,
      pendingAmount: 450,
      paymentMethod: 'Adv ₹200 (UPI) • Bal ₹450 Due',
    },
    {
      id: 'ord-9',
      orderNumber: 'PH-408',
      customerName: 'Rupam Saikia',
      customerPhone: '91234 56789',
      isPhoneOrder: true,
      items: 'Fudgy Walnut Brownies (Pack of 12)',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=240&q=80',
      weight: 'Box of 12',
      isEggless: true,
      timing: 'Tomorrow 2:30 PM',
      isoDate: '2024-11-11',
      deliveryType: 'pickup',
      address: 'Self-Pickup (Gar-Ali Studio)',
      status: 'out_for_delivery',
      amount: 620,
      advanceAmount: 300,
      pendingAmount: 320,
      paymentMethod: 'COD ₹320 (Adv ₹300)',
    },
    {
      id: 'ord-5',
      orderNumber: 'HBO-829098',
      customerName: 'Bikash Kalita',
      customerPhone: '91234 88990',
      items: 'Red Velvet Cream Cheese Heart Cake',
      image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=240&q=80',
      weight: '1 kg',
      isEggless: false,
      cakeMessage: 'Happy 1st Anniversary Dear! ❤️',
      timing: 'Yesterday 6:30 PM',
      isoDate: '2024-11-09',
      deliveryType: 'pickup',
      address: 'Self-Pickup (Gar-Ali Studio)',
      status: 'delivered',
      amount: 950,
      advanceAmount: 950,
      pendingAmount: 0,
      paymentMethod: 'Fully Paid (Cash ₹950)',
      deliveredAt: 'Yesterday 6:30 PM',
    },
    {
      id: 'ord-6',
      orderNumber: 'HBO-829090',
      customerName: 'Shalini Gogoi',
      customerPhone: '98765 99887',
      items: 'Custom 2-Tier Pastel Floral Theme Cake',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=240&q=80',
      weight: '2 kg',
      isEggless: true,
      cakeMessage: 'Little Princess Aarohi is 5! 🦄',
      timing: 'Nov 7, 2024',
      isoDate: '2024-11-07',
      deliveryType: 'delivery',
      address: 'Barpatra Ali, Near Court Field',
      status: 'delivered',
      amount: 2450,
      discountAmount: 150,
      discountReason: 'Festive Concession',
      advanceAmount: 1000,
      pendingAmount: 0,
      paymentMethod: 'Fully Settled (Adv ₹1000 + Bal ₹1450)',
      deliveredAt: 'Nov 7, 2024',
    },
    {
      id: 'ord-10',
      orderNumber: 'HBO-829075',
      customerName: 'Pranab Baruah',
      customerPhone: '98640 12345',
      items: 'Belgian Dark Chocolate Mousse Cake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80',
      weight: '1 kg',
      isEggless: true,
      timing: 'Nov 3, 2024',
      isoDate: '2024-11-03',
      deliveryType: 'delivery',
      address: 'Choladhara, Jorhat',
      status: 'delivered',
      amount: 880,
      advanceAmount: 880,
      pendingAmount: 0,
      paymentMethod: 'Fully Paid (UPI ₹880)',
      deliveredAt: 'Nov 3, 2024',
    },
    {
      id: 'ord-11',
      orderNumber: 'HBO-829040',
      customerName: 'Debojit Nath',
      customerPhone: '94351 98765',
      items: 'Black Forest Kirsch Cake',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=240&q=80',
      weight: '1.5 kg',
      isEggless: false,
      timing: 'Oct 28, 2024',
      isoDate: '2024-10-28',
      deliveryType: 'pickup',
      address: 'Self-Pickup (Gar-Ali Studio)',
      status: 'delivered',
      amount: 1250,
      advanceAmount: 1250,
      pendingAmount: 0,
      paymentMethod: 'Fully Paid (Cash ₹1250)',
      deliveredAt: 'Oct 28, 2024',
    },
  ])

  // Delivered Orders Performance Timeframe Selector (Week / Month / Year / Custom Period)
  const [deliveredTimeframe, setDeliveredTimeframe] = useState<'week' | 'month' | 'year' | 'custom'>('month')
  const [customStartDate, setCustomStartDate] = useState('2024-11-01')
  const [customEndDate, setCustomEndDate] = useState('2024-11-10')

  // Orders Tab Schedule & Date Filter
  const [scheduleDateFilter, setScheduleDateFilter] = useState<'today' | 'tomorrow' | 'week' | 'month' | 'custom' | 'all'>('today')
  const [orderCustomStartDate, setOrderCustomStartDate] = useState('2024-11-01')
  const [orderCustomEndDate, setOrderCustomEndDate] = useState('2024-11-11')

  // Dynamic metrics calculator for custom timeframe
  const computeCustomStats = (start: string, end: string) => {
    const sDate = new Date(start).getTime()
    const eDate = new Date(end).getTime()
    const daysDiff = Math.max(1, Math.round(Math.abs(eDate - sDate) / (1000 * 3600 * 24)) + 1)
    
    // Count matches in our local orders array
    const localDelivered = orders.filter(o => o.status === 'delivered' && o.isoDate >= start && o.isoDate <= end)
    const baseCount = Math.max(localDelivered.length, Math.round(daysDiff * 4.4))
    const baseRevenue = baseCount * 880
    const pickups = Math.round(baseCount * 0.6)
    const deliveries = baseCount - pickups

    return {
      label: `${start} to ${end}`,
      count: baseCount,
      revenue: `₹${baseRevenue.toLocaleString('en-IN')}`,
      onTimeRate: '99.5%',
      pickups,
      deliveries,
      avgDeliveryTime: '29 mins',
      growth: `${daysDiff} days range`,
    }
  }

  const deliveryStats = {
    week: {
      label: 'This Week',
      count: 38,
      revenue: '₹28,450',
      onTimeRate: '100%',
      pickups: 22,
      deliveries: 16,
      avgDeliveryTime: '32 mins',
      growth: '+14% vs last week',
    },
    month: {
      label: 'This Month (November)',
      count: 142,
      revenue: '₹1,24,650',
      onTimeRate: '99.3%',
      pickups: 86,
      deliveries: 56,
      avgDeliveryTime: '28 mins',
      growth: '+22% vs last month',
    },
    year: {
      label: 'This Year (2024)',
      count: 1280,
      revenue: '₹11,48,200',
      onTimeRate: '98.8%',
      pickups: 790,
      deliveries: 490,
      avgDeliveryTime: '30 mins',
      growth: '+48% YoY',
    },
    custom: computeCustomStats(customStartDate, customEndDate),
  }

  // Filter & Search states for Orders Page (Only 3 statuses: Order received, Out for delivery, Delivered)
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'received' | 'out_for_delivery' | 'delivered'>('all')
  const [orderSearchQuery, setOrderSearchQuery] = useState('')

  // Status changers
  const handleMarkOutForDelivery = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'out_for_delivery' } : o))
  }

  const handleMarkDelivered = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered', deliveredAt: 'Just now' } : o))
  }

  // Smart Date Schedule Filter logic (Show today's orders; if none, auto-fallback to tomorrow!)
  let scheduleOrders: OrderItem[] = []
  let isAutoShowingTomorrow = false

  if (scheduleDateFilter === 'today') {
    const todayOrders = orders.filter((o) => o.isoDate === '2024-11-10')
    if (todayOrders.length > 0) {
      scheduleOrders = todayOrders
    } else {
      const tomorrowOrders = orders.filter((o) => o.isoDate === '2024-11-11')
      scheduleOrders = tomorrowOrders
      isAutoShowingTomorrow = true
    }
  } else if (scheduleDateFilter === 'tomorrow') {
    scheduleOrders = orders.filter((o) => o.isoDate === '2024-11-11')
  } else if (scheduleDateFilter === 'week') {
    scheduleOrders = orders.filter((o) => o.isoDate >= '2024-11-04' && o.isoDate <= '2024-11-11')
  } else if (scheduleDateFilter === 'month') {
    scheduleOrders = orders.filter((o) => o.isoDate >= '2024-11-01' && o.isoDate <= '2024-11-30')
  } else if (scheduleDateFilter === 'custom') {
    scheduleOrders = orders.filter((o) => o.isoDate >= orderCustomStartDate && o.isoDate <= orderCustomEndDate)
  } else {
    scheduleOrders = orders
  }

  // Displayed orders filtered by status and search text
  const displayedOrders = scheduleOrders.filter((ord) => {
    if (orderStatusFilter !== 'all' && ord.status !== orderStatusFilter) {
      return false
    }
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase().trim()
      const matchName = ord.customerName.toLowerCase().includes(q)
      const matchNum = ord.orderNumber.toLowerCase().includes(q)
      const matchItems = ord.items.toLowerCase().includes(q)
      const matchPhone = ord.customerPhone?.toLowerCase().includes(q)
      return matchName || matchNum || matchItems || matchPhone
    }
    return true
  })

  // Dedicated Product / Cake Upload Form State (with 2 compound fields: Size Number + Unit Dropdown)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null)
  const [uploadName, setUploadName] = useState('')
  const [uploadPrice, setUploadPrice] = useState('650')
  const [uploadEggless, setUploadEggless] = useState(true)
  const [uploadCategory, setUploadCategory] = useState<BakeryCategory>('Birthday & Party Cakes')
  const [uploadSizeNumber, setUploadSizeNumber] = useState('500')
  const [uploadSizeUnit, setUploadSizeUnit] = useState('Grams')
  const [uploadLeadTime, setUploadLeadTime] = useState('Bakes in 4h')
  const [uploadDescription, setUploadDescription] = useState('')
  const [showUploadToast, setShowUploadToast] = useState(false)

  // Quick treat publish handler
  const handlePublishTreat = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const name = uploadName.trim() || `${uploadCategory.replace(' & Party Cakes', '')} Special Treat`
    const defaultWeight = `${uploadSizeNumber} ${uploadSizeUnit}`.trim()
    const newProduct: BakeryProduct = {
      id: `prod-${Date.now()}`,
      name,
      category: uploadCategory,
      basePrice: Number(uploadPrice) || 650,
      rating: 5.0,
      reviewCount: 1,
      image: uploadedPreview || 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      description: uploadDescription.trim() || 'Handcrafted fresh boutique treat created in Baker Ananya kitchen using pure butter and premium ingredients.',
      leadTime: uploadLeadTime,
      isEggless: uploadEggless,
      isEgglessAvailable: true,
      defaultWeight,
      weights: [
        { label: defaultWeight, multiplier: 1, servings: 'Serves 4-6' },
        { label: uploadSizeUnit === 'Pound' ? '2 Pound' : '1 kg', multiplier: 1.8, servings: 'Serves 8-10' },
      ],
      ingredients: ['Pure Amul Butter', 'Natural Cocoa', 'Zero Preservatives'],
      bakerName: "Ananya's Home Kitchen",
      bakerLocation: `Gar-Ali, ${townLocation}`,
    }

    BAKERY_PRODUCTS.unshift(newProduct)
    setShowUploadToast(true)
    setTimeout(() => {
      setShowUploadToast(false)
      navigateToNav('dashboard')
    }, 1800)
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle saving new POS order from full-fledged page
  const handleSavePosOrder = (posData: PosOrderData) => {
    const isTomorrow = posData.deliveryDate.toLowerCase().includes('tomorrow') || posData.timing.toLowerCase().includes('tomorrow')
    const newOrd: OrderItem = {
      id: posData.id,
      orderNumber: posData.orderNumber,
      customerName: posData.customerName,
      customerPhone: posData.customerPhone,
      isPhoneOrder: posData.orderSource === 'phone',
      items: posData.items,
      image: posData.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
      weight: posData.weight,
      isEggless: posData.isEggless,
      cakeMessage: posData.cakeMessage,
      timing: `${posData.deliveryDate} • ${posData.timing}`,
      isoDate: isTomorrow ? '2024-11-11' : '2024-11-10',
      deliveryType: posData.deliveryType,
      address: posData.address,
      status: posData.status,
      amount: posData.finalAmount,
      discountAmount: posData.discountAmount,
      discountReason: posData.discountReason,
      advanceAmount: posData.advanceAmount,
      pendingAmount: posData.pendingAmount,
      paymentMethod: posData.paymentMethod,
    }

    setOrders(prev => [newOrd, ...prev])
    navigateToNav('orders')
  }

  return (
    <div className="min-h-screen bg-[#f9f4ec] text-[#2c1f1b] font-sans flex antialiased selection:bg-[#d96b43]/30">
      
      {/* =========================================================================
          1. DARK ESPRESSO SIDEBAR (Matching Exact Mockup)
      ========================================================================= */}
      <aside className="w-64 bg-[#241a17] text-[#a89587] flex flex-col justify-between shrink-0 min-h-screen p-5 border-r border-[#382b26] print:hidden">
        
        <div className="space-y-6">
          {/* Logo & Subtitle */}
          <div className="space-y-0.5 px-2">
            <h1 className="font-serif italic text-2xl font-black text-[#d96b43] tracking-tight">
              The Home Oven
            </h1>
            <p className="text-xs text-[#baa99b] font-medium">
              Baker Studio Admin • {townLocation}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            
            {/* Dashboard */}
            <button
              onClick={() => navigateToNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeNav === 'dashboard'
                  ? 'bg-[#c85a32] text-white shadow-md shadow-[#c85a32]/25'
                  : 'text-[#baa99b] hover:bg-[#2d221e] hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* Live & Delivered Orders */}
            <button
              onClick={() => navigateToNav('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeNav === 'orders'
                  ? 'bg-[#c85a32] text-white font-bold shadow-md shadow-[#c85a32]/25'
                  : 'text-[#baa99b] hover:bg-[#2d221e] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Cake className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="text-[10px] font-bold text-white bg-[#3b2d28] px-2 py-0.5 rounded-full">
                {orders.length}
              </span>
            </button>

            {/* Take New Order (POS) */}
            <button
              onClick={() => navigateToNav('take-order')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeNav === 'take-order'
                  ? 'bg-[#c85a32] text-white shadow-md shadow-[#c85a32]/25 font-bold'
                  : 'text-[#baa99b] hover:bg-[#2d221e] hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 text-[#d96b43]" />
              <span>Take New Order (POS)</span>
            </button>

            {/* Dedicated Upload Cake / Product Page */}
            <button
              onClick={() => navigateToNav('upload-cake')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                activeNav === 'upload-cake'
                  ? 'bg-[#c85a32] text-white shadow-md shadow-[#c85a32]/25 font-bold'
                  : 'text-[#baa99b] hover:bg-[#2d221e] hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4 text-[#d96b43]" />
              <span>Upload New Cake</span>
            </button>

            {/* Custom Inquiries */}
            <button
              onClick={() => setCurrentPage('custom-cake')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#baa99b] hover:bg-[#2d221e] hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4" />
                <span>Custom Inquiries</span>
              </div>
              <span className="text-[10px] font-bold text-white bg-[#3b2d28] px-2 py-0.5 rounded-full">
                3
              </span>
            </button>

            {/* Menu & Catalog */}
            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#baa99b] hover:bg-[#2d221e] hover:text-white transition-colors"
            >
              <span className="text-base leading-none">🧁</span>
              <span>Menu & Catalog</span>
            </button>

            {/* Kitchen Settings */}
            <button
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#baa99b] hover:bg-[#2d221e] hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Kitchen Settings</span>
            </button>

          </nav>
        </div>

        {/* Bottom Switcher: Back to Customer Storefront & Logout */}
        <div className="pt-4 border-t border-[#382b26] space-y-2">
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full py-2.5 px-3 rounded-xl bg-[#2d221e] hover:bg-[#3b2d28] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-[#4a3b34]"
          >
            <Store className="w-3.5 h-3.5 text-[#d96b43]" />
            <span>View Storefront</span>
          </button>

          <button
            onClick={logoutBaker}
            className="w-full py-2 px-3 rounded-xl bg-[#1c1311] hover:bg-[#2e1d17] text-[#baa99b] hover:text-[#f87171] text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#382620]"
            title="Lock Studio & Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Log Out</span>
          </button>
        </div>

      </aside>

      {/* =========================================================================
          2. MAIN CONTENT AREA (Matching Exact Mockup Canvas)
      ========================================================================= */}
      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-6 overflow-y-auto">
        
        {/* Top Header: Search Bar & Baker Profile */}
        <div className="flex items-center justify-end gap-4 print:hidden">
          
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-4 h-4 text-[#9c897b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border border-[#e8dfd5] rounded-xl pl-9 pr-3.5 py-2 text-xs text-[#2c1f1b] placeholder:text-[#9c897b] focus:outline-none focus:border-[#c85a32] shadow-2xs"
            />
          </div>

          {/* Notification Bell with Badge */}
          <button className="relative p-2.5 rounded-xl bg-white border border-[#e8dfd5] text-[#2c1f1b] shadow-2xs hover:bg-[#fdfbf7]">
            <Bell className="w-4 h-4 text-[#5e4d42]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c85a32] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Baker Profile Avatar & Dropdown */}
          <div className="relative">
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 py-1 pr-1.5 rounded-xl hover:bg-white/80 cursor-pointer transition-colors"
            >
              <img
                src={bakerUser?.avatar || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=120&q=80"}
                alt="Baker Ananya"
                className="w-8 h-8 rounded-full object-cover border border-[#e8dfd5]"
              />
              <div className="flex items-center gap-1 text-xs">
                <span className="font-bold text-[#2c1f1b]">{bakerUser?.name.split(' ')[0] || 'Ananya'}</span>
                <span className="text-emerald-700 font-semibold text-[11px]">(Active)</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#7c6a5d] transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e8dfd5] p-3 space-y-3 z-30 animate-fade-in">
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#f0e7dc]">
                  <img
                    src={bakerUser?.avatar || "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=120&q=80"}
                    alt="Baker Ananya"
                    className="w-10 h-10 rounded-full object-cover border border-[#e8dfd5]"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#2c1f1b] truncate">{bakerUser?.name || 'Ananya Sharma'}</p>
                    <p className="text-[10px] text-[#7c6a5d] truncate">{bakerUser?.role || 'Head Baker & Studio Owner'}</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-0.5">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Studio Terminal Active</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-xs font-semibold">
                  <button
                    onClick={() => { setShowProfileMenu(false); setCurrentPage('home'); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#5e4d42] hover:text-[#b84c26] hover:bg-[#fdfbf7] transition-colors text-left"
                  >
                    <Store className="w-3.5 h-3.5 text-[#d96b43]" />
                    <span>View Customer Storefront</span>
                  </button>

                  <button
                    onClick={() => { setShowProfileMenu(false); logoutBaker(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#5e4d42] hover:text-[#b84c26] hover:bg-[#fdfbf7] transition-colors text-left"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#d96b43]" />
                    <span>Lock Terminal</span>
                  </button>

                  <button
                    onClick={() => { setShowProfileMenu(false); logoutBaker(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* =========================================================================
            VIEW 0: FULL-FLEDGED TAKE ORDER PAGE (POS)
        ========================================================================= */}
        {activeNav === 'take-order' && (
          <BakeryTakeOrderPage
            townLocation={townLocation}
            onSaveOrder={handleSavePosOrder}
            onCancel={() => navigateToNav('dashboard')}
          />
        )}

        {/* =========================================================================
            VIEW 1: ORDERS PAGE (ORDERS TABLE, SCHEDULE & DELIVERED STATS)
        ========================================================================= */}
        {activeNav === 'orders' && (
          <div className="space-y-6 pb-12 animate-fade-in">
            {/* Header with Print Baking Sheet & POS Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dfd5] pb-5 print:hidden">
              <div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#2c1f1b]">
                  Orders & Kitchen Baking Sheet
                </h2>
                <p className="text-xs text-[#7c6a5d] mt-1">
                  Daily production schedule, custom period delivery metrics, and instant kitchen sheet printing.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Print Baking Sheet CTA */}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-white border-2 border-[#e8dfd5] hover:border-[#c85a32] hover:bg-[#fdfbf7] text-[#2c1f1b] text-xs font-bold shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                  title="Print Kitchen Baking Sheet for Selected Schedule"
                >
                  <Printer className="w-4 h-4 text-[#c85a32]" />
                  <span>Print Baking Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigateToNav('take-order')}
                  className="px-5 py-2.5 rounded-xl bg-[#c85a32] hover:bg-[#b54f2a] text-white text-xs font-bold shadow-md shadow-[#c85a32]/25 flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Take Phone / Walk-in Order</span>
                </button>
              </div>
            </div>

            {/* Option to view how many orders delivered in a year/month/week OR Custom Period */}
            <div className="bg-gradient-to-br from-[#2c1f1b] to-[#1c1311] text-white rounded-3xl p-6 border border-[#3e2e28] shadow-md space-y-5 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#e87a54]" />
                    <h3 className="font-serif font-bold text-base text-white">
                      Delivered Orders Performance
                    </h3>
                  </div>
                  <p className="text-xs text-[#baa99b] mt-0.5">
                    Select a timeframe to view completed order counts, total collected revenue, and delivery rates
                  </p>
                </div>

                {/* Week / Month / Year / Custom Period Switcher */}
                <div className="inline-flex items-center p-1 bg-white/10 rounded-2xl border border-white/10 shrink-0 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setDeliveredTimeframe('week')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      deliveredTimeframe === 'week'
                        ? 'bg-[#c85a32] text-white shadow-sm'
                        : 'text-[#baa99b] hover:text-white'
                    }`}
                  >
                    This Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveredTimeframe('month')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      deliveredTimeframe === 'month'
                        ? 'bg-[#c85a32] text-white shadow-sm'
                        : 'text-[#baa99b] hover:text-white'
                    }`}
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveredTimeframe('year')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      deliveredTimeframe === 'year'
                        ? 'bg-[#c85a32] text-white shadow-sm'
                        : 'text-[#baa99b] hover:text-white'
                    }`}
                  >
                    This Year
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveredTimeframe('custom')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      deliveredTimeframe === 'custom'
                        ? 'bg-[#c85a32] text-white shadow-sm'
                        : 'text-[#baa99b] hover:text-white'
                    }`}
                  >
                    <CalendarRange className="w-3.5 h-3.5" />
                    <span>Custom Period</span>
                  </button>
                </div>
              </div>

              {/* Custom Date Range Picker when Custom Period is active */}
              {deliveredTimeframe === 'custom' && (
                <div className="p-3.5 bg-white/10 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#e87a54]" />
                      Custom Analysis Range:
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="text-[#baa99b] font-semibold text-[11px]">From:</label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#e87a54]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[#baa99b] font-semibold text-[11px]">To:</label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#e87a54]"
                      />
                    </div>
                  </div>

                  {/* Quick Preset Chips */}
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#baa99b] text-[10px]">Presets:</span>
                    <button
                      type="button"
                      onClick={() => { setCustomStartDate('2024-11-03'); setCustomEndDate('2024-11-10'); }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#baa99b] hover:text-white font-medium cursor-pointer"
                    >
                      Last 7 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCustomStartDate('2024-10-10'); setCustomEndDate('2024-11-10'); }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#baa99b] hover:text-white font-medium cursor-pointer"
                    >
                      Last 30 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCustomStartDate('2024-10-01'); setCustomEndDate('2024-10-31'); }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#baa99b] hover:text-white font-medium cursor-pointer"
                    >
                      October 2024
                    </button>
                  </div>
                </div>
              )}

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[11px] font-semibold text-[#baa99b] block">Total Delivered</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif font-black text-2xl sm:text-3xl text-white">
                      {deliveryStats[deliveredTimeframe].count}
                    </span>
                    <span className="text-xs font-bold text-emerald-400">
                      {deliveryStats[deliveredTimeframe].growth}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#baa99b] block mt-0.5">Delivered in {deliveryStats[deliveredTimeframe].label}</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[11px] font-semibold text-[#baa99b] block">Delivered Value</span>
                  <div className="font-serif font-black text-2xl sm:text-3xl text-[#e87a54] mt-1">
                    {deliveryStats[deliveredTimeframe].revenue}
                  </div>
                  <span className="text-[10px] text-[#baa99b] block mt-0.5">Total collected revenue</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[11px] font-semibold text-[#baa99b] block">On-Time Dispatches</span>
                  <div className="font-serif font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
                    {deliveryStats[deliveredTimeframe].onTimeRate}
                  </div>
                  <span className="text-[10px] text-[#baa99b] block mt-0.5">Avg prep {deliveryStats[deliveredTimeframe].avgDeliveryTime}</span>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[11px] font-semibold text-[#baa99b] block">Fulfillment Split</span>
                  <div className="text-xs font-bold text-white mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#baa99b]">Self Pickups:</span>
                      <span>{deliveryStats[deliveredTimeframe].pickups}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#baa99b]">Door Deliveries:</span>
                      <span>{deliveryStats[deliveredTimeframe].deliveries}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitchen Baking Schedule & Date Selection Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-[#e8dfd5] shadow-xs space-y-3 print:hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c85a32]" />
                  <span className="font-serif font-bold text-sm text-[#2c1f1b]">Kitchen Baking Schedule:</span>
                  <span className="text-xs text-[#7c6a5d]">Filter orders by target delivery / dispatch date</span>
                </div>

                {/* Schedule Tabs */}
                <div className="inline-flex items-center p-1 bg-[#fdfbf7] rounded-xl border border-[#e8dfd5] overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('today')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      scheduleDateFilter === 'today'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    Today (10 Nov)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('tomorrow')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      scheduleDateFilter === 'tomorrow'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    Tomorrow (11 Nov)
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('week')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      scheduleDateFilter === 'week'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    This Week
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('month')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      scheduleDateFilter === 'month'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('custom')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      scheduleDateFilter === 'custom'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    <CalendarRange className="w-3.5 h-3.5" />
                    <span>Custom Period</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      scheduleDateFilter === 'all'
                        ? 'bg-[#c85a32] text-white shadow-xs'
                        : 'text-[#5e4d42] hover:text-[#2c1f1b]'
                    }`}
                  >
                    All Schedule ({orders.length})
                  </button>
                </div>
              </div>

              {/* Custom Date Range Pickers if scheduleDateFilter === 'custom' */}
              {scheduleDateFilter === 'custom' && (
                <div className="pt-3 border-t border-[#f3ece1] flex flex-wrap items-center justify-between gap-3 text-xs animate-fade-in bg-[#fdfbf7] p-3 rounded-xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-bold text-[#2c1f1b]">Schedule Range:</span>
                    <div className="flex items-center gap-2">
                      <label className="text-[#7c6a5d] font-semibold text-[11px]">From:</label>
                      <input
                        type="date"
                        value={orderCustomStartDate}
                        onChange={(e) => setOrderCustomStartDate(e.target.value)}
                        className="bg-white border border-[#e8dfd5] rounded-lg px-2.5 py-1 text-xs font-medium text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-[#7c6a5d] font-semibold text-[11px]">To:</label>
                      <input
                        type="date"
                        value={orderCustomEndDate}
                        onChange={(e) => setOrderCustomEndDate(e.target.value)}
                        className="bg-white border border-[#e8dfd5] rounded-lg px-2.5 py-1 text-xs font-medium text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#7c6a5d] text-[10px]">Quick:</span>
                    <button
                      type="button"
                      onClick={() => { setOrderCustomStartDate('2024-11-01'); setOrderCustomEndDate('2024-11-10'); }}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#e8dfd5] hover:bg-[#f3ece1] text-[#5e4d42] cursor-pointer"
                    >
                      Past 10 Days
                    </button>
                    <button
                      type="button"
                      onClick={() => { setOrderCustomStartDate('2024-11-10'); setOrderCustomEndDate('2024-11-17'); }}
                      className="px-2.5 py-1 rounded-md bg-white border border-[#e8dfd5] hover:bg-[#f3ece1] text-[#5e4d42] cursor-pointer"
                    >
                      Next 7 Days
                    </button>
                  </div>
                </div>
              )}

              {/* Auto-Fallback Banner when Today has 0 orders */}
              {isAutoShowingTomorrow && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">📅</span>
                    <div>
                      <span className="font-bold">No active bakes scheduled for Today (10 Nov).</span>
                      <span className="ml-1 text-amber-900">
                        Auto-displaying <strong>Tomorrow's Baking Schedule (11 Nov)</strong> so you can prepare sponge batches, prep ganache & arrange deliveries in advance.
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScheduleDateFilter('all')}
                    className="px-3 py-1 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-lg font-bold text-xs whitespace-nowrap transition-colors cursor-pointer"
                  >
                    View All Orders
                  </button>
                </div>
              )}
            </div>

            {/* Print-Only Kitchen Baking Sheet Header */}
            <div className="hidden print:block mb-6 border-b-2 border-black pb-4 text-black">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black font-serif tracking-tight">The Home Oven • Kitchen Baking Sheet</h1>
                  <p className="text-xs text-gray-800 font-medium mt-1">
                    Baking Schedule: <span className="font-bold">{scheduleDateFilter === 'today' ? 'Today (10 Nov 2024)' : scheduleDateFilter === 'tomorrow' ? 'Tomorrow (11 Nov 2024)' : scheduleDateFilter === 'custom' ? `${orderCustomStartDate} to ${orderCustomEndDate}` : scheduleDateFilter === 'week' ? 'This Week' : scheduleDateFilter === 'month' ? 'This Month' : 'All Scheduled Dates'}</span> • Gar-Ali Studio, {townLocation}
                  </p>
                </div>
                <div className="text-right text-xs space-y-0.5">
                  <p className="font-bold">Total Kitchen Orders: {displayedOrders.length}</p>
                  <p className="text-gray-600">Printed: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Filter Bar & Search for Orders */}
            <div className="bg-white rounded-2xl p-3 border border-[#e8dfd5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    orderStatusFilter === 'all'
                      ? 'bg-[#c85a32] text-white shadow-xs'
                      : 'bg-[#fdfbf7] text-[#5e4d42] hover:bg-[#f3ece1]'
                  }`}
                >
                  All Orders ({scheduleOrders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('received')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    orderStatusFilter === 'received'
                      ? 'bg-[#c85a32] text-white shadow-xs'
                      : 'bg-[#e0f2fe] text-[#0369a1] hover:bg-[#bae6fd]'
                  }`}
                >
                  <span>1. Order Received ({scheduleOrders.filter(o => o.status === 'received').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('out_for_delivery')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    orderStatusFilter === 'out_for_delivery'
                      ? 'bg-[#c85a32] text-white shadow-xs'
                      : 'bg-[#ffedd5] text-[#c2410c] hover:bg-[#fed7aa]'
                  }`}
                >
                  <span>2. Out for Delivery ({scheduleOrders.filter(o => o.status === 'out_for_delivery').length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                    orderStatusFilter === 'delivered'
                      ? 'bg-[#c85a32] text-white shadow-xs'
                      : 'bg-[#f0f4f8] text-[#1e293b] hover:bg-[#e2e8f0]'
                  }`}
                >
                  <span>3. Order Delivered ({scheduleOrders.filter(o => o.status === 'delivered').length})</span>
                </button>
              </div>

              {/* Order Search Box */}
              <div className="relative md:w-72">
                <Search className="w-3.5 h-3.5 text-[#9c897b] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by order #, customer, cake..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full bg-[#fdfbf7] border border-[#e8dfd5] rounded-xl pl-8 pr-7 py-1.5 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#c85a32]"
                />
                {orderSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setOrderSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9c897b] hover:text-[#2c1f1b]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* ORDERS TABLE FORMAT (Clean Table Format with Instant Kitchen Printing) */}
            <div className="overflow-x-auto bg-white rounded-2xl border border-[#e8dfd5] shadow-xs print:border-black print:rounded-none print:shadow-none">
              <table className="w-full text-left border-collapse text-xs print:text-[11px]">
                <thead>
                  <tr className="bg-[#fcfaf7] border-b border-[#e8dfd5] print:bg-gray-100 print:border-black text-[11px] font-bold text-[#7c6a5d] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Order # & Source</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Customer & Contact</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Item & Weight</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b]">Cake Inscription / Notes</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Slot & Dispatch</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Billing & Ledger</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] whitespace-nowrap">Status</th>
                    <th className="py-3.5 px-4 font-bold text-[#2c1f1b] text-right print:hidden whitespace-nowrap">Kitchen Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3ece1] print:divide-gray-400">
                  {displayedOrders.length > 0 ? (
                    displayedOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#fefcf9] transition-colors print:hover:bg-transparent">
                        
                        {/* 1. Order # & Source */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-[#2c1f1b] font-mono text-xs">
                            #{ord.orderNumber}
                          </div>
                          <div className="text-[10px] text-[#7c6a5d] mt-0.5">
                            {ord.isoDate}
                          </div>
                          {ord.isPhoneOrder ? (
                            <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#f3ece1] text-[#2c1f1b]">
                              <Phone className="w-2.5 h-2.5 text-[#c85a32]" />
                              <span>Phone POS</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#f0f4f8] text-[#334155]">
                              <span>Online Store</span>
                            </span>
                          )}
                        </td>

                        {/* 2. Customer & Contact */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-[#2c1f1b] text-xs">
                            {ord.customerName}
                          </div>
                          {ord.customerPhone && (
                            <div className="text-[11px] text-[#7c6a5d] flex items-center gap-1 mt-0.5">
                              <span>{ord.customerPhone}</span>
                            </div>
                          )}
                        </td>

                        {/* 3. Item & Weight */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="flex items-center gap-3">
                            <img
                              src={ord.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80'}
                              alt={ord.items}
                              className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#e8dfd5] shadow-2xs"
                              loading="lazy"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-[#2c1f1b] text-xs">
                                {ord.items}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                <span className="px-2 py-0.5 rounded bg-[#f3ece1] text-[10px] font-bold text-[#5e4d42]">
                                  {ord.weight}
                                </span>
                                {ord.isEggless && (
                                  <span className="text-[10px] text-emerald-700 font-bold">
                                    🟢 Eggless
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 4. Cake Inscription / Notes */}
                        <td className="py-3.5 px-4 align-top max-w-xs">
                          {ord.cakeMessage ? (
                            <div className="italic text-[#5e4d42] bg-[#fdfbf7] p-1.5 rounded-lg border border-[#e8dfd5] text-[11px]">
                              "{ord.cakeMessage}"
                            </div>
                          ) : (
                            <span className="text-[#a89587] text-[11px] italic">—</span>
                          )}
                        </td>

                        {/* 5. Slot & Dispatch */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-[#2c1f1b]">
                            {ord.timing}
                          </div>
                          <div className="mt-1">
                            {ord.deliveryType === 'delivery' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                🏠 Delivery
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                                🛍️ Self-Pickup
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#7c6a5d] mt-1 max-w-[170px] truncate" title={ord.address}>
                            {ord.address}
                          </div>
                        </td>

                        {/* 6. Billing & Ledger */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-serif font-black text-sm text-[#2c1f1b]">
                            ₹{ord.amount}
                          </div>
                          <div className="flex flex-col gap-1 mt-1">
                            {ord.advanceAmount !== undefined && (
                              <span className="text-[10px] font-bold text-emerald-700">
                                Adv: ₹{ord.advanceAmount}
                              </span>
                            )}
                            {ord.pendingAmount !== undefined && ord.pendingAmount > 0 ? (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 w-fit">
                                Due: ₹{ord.pendingAmount}
                              </span>
                            ) : ord.advanceAmount !== undefined ? (
                              <span className="text-[10px] font-bold text-emerald-800">
                                Fully Paid
                              </span>
                            ) : null}
                            {ord.discountAmount ? (
                              <span className="text-[10px] font-bold text-rose-600">
                                -₹{ord.discountAmount} Disc
                              </span>
                            ) : null}
                          </div>
                        </td>

                        {/* 7. Kitchen Status (Only 3 statuses: Order received, Out for delivery, Delivered) */}
                        <td className="py-3.5 px-4 align-top">
                          {ord.status === 'received' && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e0f2fe] text-[#0369a1] whitespace-nowrap block w-fit">
                              📋 Order received
                            </span>
                          )}
                          {ord.status === 'out_for_delivery' && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ffedd5] text-[#c2410c] whitespace-nowrap block w-fit">
                              🛵 Out for delivery
                            </span>
                          )}
                          {ord.status === 'delivered' && (
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 whitespace-nowrap flex items-center gap-1 w-fit">
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>Order delivered</span>
                            </span>
                          )}
                        </td>

                        {/* 8. Actions (print:hidden) */}
                        <td className="py-3.5 px-4 align-top text-right print:hidden">
                          <div className="flex flex-col items-end gap-1.5">
                            {ord.status === 'received' && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleMarkOutForDelivery(ord.id)}
                                  className="px-3 py-1 rounded-lg bg-[#c85a32] hover:bg-[#b54f2a] text-white font-bold text-[11px] shadow-2xs whitespace-nowrap cursor-pointer transition-colors"
                                >
                                  Mark Out for Delivery →
                                </button>
                                <a
                                  href={`https://wa.me/91${(ord.customerPhone || '9876543210').replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(ord.customerName)}!%20Your%20order%20for%20${encodeURIComponent(ord.items)}%20has%20been%20received%20at%20The%20Home%20Oven.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-[#c85a32] hover:underline font-bold"
                                >
                                  WhatsApp Update
                                </a>
                              </>
                            )}

                            {ord.status === 'out_for_delivery' && (
                              <button
                                type="button"
                                onClick={() => handleMarkDelivered(ord.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] shadow-2xs whitespace-nowrap cursor-pointer transition-colors"
                              >
                                Mark as Delivered ✓
                              </button>
                            )}

                            {ord.status === 'delivered' && (
                              <span className="text-[11px] font-bold text-emerald-700">
                                Order Delivered ✓
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#7c6a5d]">
                        <div className="max-w-xs mx-auto space-y-2">
                          <span className="text-3xl block">🎂</span>
                          <p className="font-serif font-bold text-sm text-[#2c1f1b]">No orders found for this schedule</p>
                          <p className="text-xs text-[#7c6a5d]">Try selecting another date or clearing your status filter.</p>
                          <button
                            type="button"
                            onClick={() => { setScheduleDateFilter('all'); setOrderStatusFilter('all'); setOrderSearchQuery(''); }}
                            className="px-3 py-1.5 rounded-lg bg-[#f3ece1] text-[#c85a32] text-xs font-bold hover:bg-[#ebdcc8] cursor-pointer"
                          >
                            Show All Orders
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW 2: DEDICATED PRODUCT / CAKE UPLOAD PAGE (SEPARATE PAGE)
        ========================================================================= */}
        {activeNav === 'upload-cake' && (
          <div className="space-y-6 pb-12 animate-fade-in max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dfd5] pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#7c6a5d] mb-1">
                  <button
                    type="button"
                    onClick={() => navigateToNav('dashboard')}
                    className="hover:text-[#c85a32]"
                  >
                    Dashboard
                  </button>
                  <span>/</span>
                  <span className="text-[#c85a32]">Upload New Cake / Treat</span>
                </div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#2c1f1b]">
                  Upload New Cake / Treat to Menu
                </h2>
                <p className="text-xs text-[#7c6a5d] mt-1">
                  Publish handcrafted cakes, breads, or brownies directly to your online storefront and POS catalog.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateToNav('dashboard')}
                className="px-4 py-2 rounded-xl bg-[#f3ece1] hover:bg-[#ebdcc8] text-xs font-bold text-[#5e4d42]"
              >
                Back to Dashboard
              </button>
            </div>

            {showUploadToast && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-scale">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Treat successfully published to customer storefront & POS catalog!</span>
              </div>
            )}

            <form onSubmit={handlePublishTreat} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e8dfd5] shadow-xs space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Photo Upload Dropzone */}
                <div className="md:col-span-5 space-y-2">
                  <label className="font-bold text-xs text-[#2c1f1b] block">
                    Product Photo *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-2xl border-2 border-dashed border-[#e8dfd5] hover:border-[#c85a32] bg-[#fdfbf7] hover:bg-[#fdf2ec]/30 transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer overflow-hidden relative group"
                  >
                    {uploadedPreview ? (
                      <>
                        <img src={uploadedPreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold rounded-xl">
                          Click to change image
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#f3ece1] flex items-center justify-center text-[#c85a32]">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#2c1f1b]">Upload High-Res Cake Photo</p>
                          <p className="text-[10px] text-[#7c6a5d] mt-0.5">PNG, JPG or WEBP up to 5MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Form Fields */}
                <div className="md:col-span-7 space-y-4 text-xs">
                  
                  <div className="space-y-1">
                    <label className="font-bold text-[#2c1f1b]">Treat / Cake Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Belgian Dark Chocolate Sea-Salt Tart"
                      value={uploadName}
                      onChange={(e) => setUploadName(e.target.value)}
                      className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3.5 py-2.5 font-bold text-[#2c1f1b] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-[#2c1f1b]">Category *</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as BakeryCategory)}
                        className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3 py-2.5 font-bold text-[#2c1f1b] focus:outline-none cursor-pointer"
                      >
                        <option value="Birthday & Party Cakes">Birthday & Party Cakes</option>
                        <option value="Brownies & Tea Cakes">Brownies & Tea Cakes</option>
                        <option value="Fresh Breads & Buns">Fresh Breads & Buns</option>
                        <option value="Homemade Cookies">Homemade Cookies</option>
                        <option value="Custom Theme Cakes">Custom Theme Cakes</option>
                        <option value="Evening Snacks & Puffs">Evening Snacks & Puffs</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#2c1f1b]">Selling Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-[#7c6a5d]">₹</span>
                        <input
                          type="number"
                          required
                          min="1"
                          placeholder="650"
                          value={uploadPrice}
                          onChange={(e) => setUploadPrice(e.target.value)}
                          className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl pl-8 pr-3 py-2.5 font-bold text-[#2c1f1b] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compound 2-Field Portion / Weight Input (Same as Take Order POS) */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-7 space-y-1">
                        <label className="font-bold text-[#2c1f1b] flex items-center justify-between">
                          <span>Default Portion / Weight *</span>
                          <span className="text-[10px] font-normal text-[#7c6a5d]">Size + Unit</span>
                        </label>
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-6 sm:col-span-7">
                            <input
                              type="number"
                              step="0.1"
                              min="0.1"
                              value={uploadSizeNumber}
                              onChange={(e) => setUploadSizeNumber(e.target.value)}
                              placeholder="e.g. 500, 1.5, 2"
                              className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3 py-2 font-bold text-[#2c1f1b] focus:outline-none focus:bg-white text-xs"
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-5">
                            <select
                              value={uploadSizeUnit}
                              onChange={(e) => setUploadSizeUnit(e.target.value)}
                              className="w-full bg-[#fdfbf7] border-2 border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-2.5 py-2 font-bold text-[#2c1f1b] focus:outline-none text-xs cursor-pointer"
                            >
                              <option value="Grams">Grams (g)</option>
                              <option value="Pound">Pound (lb)</option>
                              <option value="Kg">Kg</option>
                              <option value="Pieces / Box">Pieces / Box</option>
                              <option value="Loaf / Pack">Loaf / Pack</option>
                            </select>
                          </div>
                        </div>

                        {/* Quick fill presets */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                          <span className="text-[#7c6a5d]">Quick fill:</span>
                          <button
                            type="button"
                            onClick={() => { setUploadSizeNumber('500'); setUploadSizeUnit('Grams'); }}
                            className="px-2 py-0.5 rounded-md bg-[#fdfbf7] border border-[#e8dfd5] hover:border-[#c85a32] font-semibold text-[#5e4d42] cursor-pointer"
                          >
                            500g
                          </button>
                          <button
                            type="button"
                            onClick={() => { setUploadSizeNumber('1'); setUploadSizeUnit('Kg'); }}
                            className="px-2 py-0.5 rounded-md bg-[#fdfbf7] border border-[#e8dfd5] hover:border-[#c85a32] font-semibold text-[#5e4d42] cursor-pointer"
                          >
                            1 kg
                          </button>
                          <button
                            type="button"
                            onClick={() => { setUploadSizeNumber('1.5'); setUploadSizeUnit('Pound'); }}
                            className="px-2 py-0.5 rounded-md bg-[#fdfbf7] border border-[#e8dfd5] hover:border-[#c85a32] font-semibold text-[#5e4d42] cursor-pointer"
                          >
                            1.5 Pound
                          </button>
                          <button
                            type="button"
                            onClick={() => { setUploadSizeNumber('2'); setUploadSizeUnit('Pound'); }}
                            className="px-2 py-0.5 rounded-md bg-[#fdfbf7] border border-[#e8dfd5] hover:border-[#c85a32] font-semibold text-[#5e4d42] cursor-pointer"
                          >
                            2 Pound
                          </button>
                          <button
                            type="button"
                            onClick={() => { setUploadSizeNumber('6'); setUploadSizeUnit('Pieces / Box'); }}
                            className="px-2 py-0.5 rounded-md bg-[#fdfbf7] border border-[#e8dfd5] hover:border-[#c85a32] font-semibold text-[#5e4d42] cursor-pointer"
                          >
                            Box of 6
                          </button>
                        </div>
                      </div>

                      {/* Lead Time */}
                      <div className="sm:col-span-5 space-y-1">
                        <label className="font-bold text-[#2c1f1b]">Lead Time</label>
                        <input
                          type="text"
                          placeholder="e.g. Bakes in 4h, Ready Today"
                          value={uploadLeadTime}
                          onChange={(e) => setUploadLeadTime(e.target.value)}
                          className="w-full bg-[#fdfbf7] border border-[#e8dfd5] focus:border-[#c85a32] rounded-xl px-3 py-2 font-medium text-[#2c1f1b] focus:outline-none text-xs"
                        />
                        <p className="text-[10px] text-[#7c6a5d] pt-0.5">Estimated time to bake, cool & pack.</p>
                      </div>
                    </div>
                  </div>

                  {/* Eggless toggle */}
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#e8dfd5] flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-[#2c1f1b] block">100% Eggless (Pure Veg)</span>
                      <span className="text-[10px] text-[#7c6a5d]">Displays green vegetarian mark on storefront</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadEggless(!uploadEggless)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        uploadEggless ? 'bg-[#c85a32]' : 'bg-[#e8dfd5]'
                      }`}
                    >
                      <span className={`block w-5 h-5 rounded-full bg-white shadow-xs transition-transform absolute top-0.5 ${
                        uploadEggless ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="font-bold text-[#2c1f1b]">Artisanal Description & Key Ingredients</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Pure Amul butter, French cocoa, fresh cream, zero chemical emulsifiers."
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-[#e8dfd5] focus:border-[#c85a32] rounded-xl p-3 text-xs text-[#2c1f1b] focus:outline-none"
                    />
                  </div>

                </div>
              </div>

              <div className="pt-4 border-t border-[#f3ece1] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigateToNav('dashboard')}
                  className="px-5 py-2.5 rounded-xl border border-[#e8dfd5] text-xs font-bold text-[#5e4d42] hover:bg-[#fdfbf7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#c85a32] hover:bg-[#b54f2a] text-white text-xs font-bold shadow-md shadow-[#c85a32]/25 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Publish to Shop Catalog</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            VIEW 3: DASHBOARD OVERVIEW (Clean Studio Dashboard)
        ========================================================================= */}
        {activeNav === 'dashboard' && (
          <div className="space-y-6 pb-12 animate-fade-in">
            {/* Header: KPI & Take Phone Order CTA */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif font-black text-xl sm:text-2xl text-[#2c1f1b]">
                  KPI & Studio Overview
                </h2>
                <p className="text-xs text-[#7c6a5d] mt-0.5">
                  Live metrics for today's orders, revenue, and dispatches in {townLocation}.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigateToNav('upload-cake')}
                  className="px-4 py-2.5 rounded-xl bg-white border border-[#e8dfd5] hover:bg-[#fdfbf7] text-[#2c1f1b] text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span className="hidden sm:inline">Upload New Cake</span>
                </button>

                <button
                  onClick={() => navigateToNav('take-order')}
                  className="px-5 py-2.5 rounded-xl bg-[#c85a32] hover:bg-[#b54f2a] text-white text-xs font-bold shadow-md shadow-[#c85a32]/25 flex items-center gap-1.5 transition-transform hover:scale-[1.02]"
                >
                  <span>+ Take Phone / Walk-in Order</span>
                </button>
              </div>
            </div>

            {/* 3 KPI CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Today's Revenue */}
              <div className="bg-white rounded-2xl p-5 border border-[#e8dfd5] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#7c6a5d]">
                  <span>Today's Revenue</span>
                  <MoreHorizontal className="w-4 h-4 text-[#9c897b]" />
                </div>
                <div className="font-serif font-black text-3xl text-[#2c1f1b]">
                  ₹8,650
                </div>
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e8f7ee] text-[#16a34a]">
                    +18% vs yesterday
                  </span>
                </div>
              </div>

              {/* Card 2: Active Orders */}
              <div className="bg-white rounded-2xl p-5 border border-[#e8dfd5] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#7c6a5d]">
                  <span>Active Orders</span>
                  <MoreHorizontal className="w-4 h-4 text-[#9c897b]" />
                </div>
                <div className="font-serif font-black text-3xl text-[#2c1f1b]">
                  {orders.filter(o => o.status !== 'delivered').length} Active
                </div>
                <p className="text-xs text-[#7c6a5d] font-medium">
                  {orders.filter(o => o.status === 'received').length} Order Received • {orders.filter(o => o.status === 'out_for_delivery').length} Out for Delivery
                </p>
              </div>

              {/* Card 3: Pickups & Deliveries */}
              <div className="bg-white rounded-2xl p-5 border border-[#e8dfd5] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#7c6a5d]">
                  <span>Pickups & Deliveries</span>
                  <MoreHorizontal className="w-4 h-4 text-[#9c897b]" />
                </div>
                <div className="font-serif font-black text-3xl text-[#2c1f1b]">
                  4 Today
                </div>
                <p className="text-xs text-[#7c6a5d] font-medium">
                  Next dispatch 4:30 PM
                </p>
              </div>
            </div>

            {/* Quick Delivery Summary Strip (Week / Month / Year / Custom Period) */}
            <div className="bg-white rounded-2xl p-5 border border-[#e8dfd5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#fdf2ec] text-[#c85a32] flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#2c1f1b]">
                    Delivered Orders: 142 This Month • 38 This Week • 1,280 This Year
                  </h4>
                  <p className="text-[11px] text-[#7c6a5d]">
                    99.3% On-Time fulfillment rate. View breakdown for any custom date range on the orders page.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => { setDeliveredTimeframe('custom'); navigateToNav('orders'); }}
                  className="px-3.5 py-2 rounded-xl bg-[#fdfbf7] hover:bg-[#f3ece1] border border-[#e8dfd5] text-[#5e4d42] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CalendarRange className="w-3.5 h-3.5 text-[#c85a32]" />
                  <span>Custom Period</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateToNav('orders')}
                  className="px-4 py-2 rounded-xl bg-[#241a17] hover:bg-[#382b26] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Orders Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live Order Pipeline Overview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-[#2c1f1b]">
                  Active Kitchen Pipeline
                </h3>
                <button
                  onClick={() => navigateToNav('orders')}
                  className="text-xs font-bold text-[#c85a32] hover:underline flex items-center gap-1"
                >
                  <span>View All Orders ({orders.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {orders.filter(o => o.status !== 'delivered').map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl p-4 border border-[#e8dfd5] shadow-xs space-y-3 hover:border-[#c85a32]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#2c1f1b]">
                        #{ord.orderNumber}
                      </span>
                      {ord.status === 'received' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e0f2fe] text-[#0369a1]">
                          Order Received
                        </span>
                      )}
                      {ord.status === 'out_for_delivery' && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffedd5] text-[#c2410c]">
                          Out for Delivery
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={ord.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=240&q=80'}
                        alt={ord.items}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#e8dfd5] shadow-2xs"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-xs text-[#2c1f1b] truncate">{ord.items}</p>
                        <p className="text-[11px] text-[#7c6a5d] truncate">
                          {ord.customerName} • {ord.timing}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#f3ece1] text-[9px] font-bold text-[#5e4d42]">{ord.weight}</span>
                          {ord.isEggless && <span className="text-[9px] text-emerald-700 font-bold">🟢 Eggless</span>}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#f3ece1] flex items-center justify-between text-xs">
                      <span className="font-serif font-black text-[#2c1f1b]">₹{ord.amount}</span>
                      <button
                        type="button"
                        onClick={() => navigateToNav('orders')}
                        className="text-[11px] font-bold text-[#c85a32] hover:underline"
                      >
                        Manage & Update →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  )
}
