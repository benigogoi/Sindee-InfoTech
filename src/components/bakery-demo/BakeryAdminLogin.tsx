import React, { useState } from 'react'
import { 
  Lock, 
  ShieldCheck, 
  ArrowLeft, 
  KeyRound, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  AlertCircle,
  Delete,
  Store
} from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryAdminLogin() {
  const { setCurrentPage, loginBaker, townLocation } = useBakery()

  const [mode, setMode] = useState<'pin' | 'password'>('pin')
  const [pin, setPin] = useState<string>('')
  const [email, setEmail] = useState<string>('ananya@thehomeoven.com')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Handle on-screen keypad click
  const handleDigitClick = async (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit
      setPin(nextPin)
      setErrorMsg(null)

      // Auto-submit on 4th digit
      if (nextPin.length === 4) {
        setIsLoading(true)
        const result = await loginBaker(nextPin)
        setIsLoading(false)
        if (!result.success) {
          setErrorMsg(result.error || 'Invalid PIN')
          setPin('')
        }
      }
    }
  }

  const handleDeleteDigit = () => {
    setPin((prev) => prev.slice(0, -1))
    setErrorMsg(null)
  }

  const handleClearPin = () => {
    setPin('')
    setErrorMsg(null)
  }

  // Handle password submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    const result = await loginBaker(password, email)
    setIsLoading(false)
    if (!result.success) {
      setErrorMsg(result.error || 'Invalid credentials')
    }
  }

  // Quick Demo Instant Login
  const handleQuickDemoLogin = async () => {
    setIsLoading(true)
    await loginBaker('1234', 'ananya@thehomeoven.com')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f9f4ec] text-[#2c1f1b] font-sans flex flex-col justify-between p-4 sm:p-6 md:p-8 antialiased selection:bg-[#d96b43]/30">
      
      {/* Top Header: Return to Storefront */}
      <div className="flex items-center justify-between max-w-md w-full mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e8dfd5] text-[#5e4d42] hover:text-[#b84c26] hover:border-[#b84c26] text-xs font-bold shadow-2xs transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#7c6a5d] font-medium">
          <Store className="w-3.5 h-3.5 text-[#d96b43]" />
          <span>{townLocation} Kitchen</span>
        </div>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md w-full mx-auto my-6">
        <div className="bg-[#241a17] text-[#fdfbf7] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3d2d27] space-y-6 relative overflow-hidden">
          
          {/* Subtle decorative glow in top corner */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#c85a32]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Logo & Kitchen Studio Identity */}
          <div className="text-center space-y-1 relative">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#d96b43] to-[#c85a32] text-white flex items-center justify-center shadow-lg shadow-[#c85a32]/30 text-2xl font-black mb-3">
              👩‍🍳
            </div>
            <h1 className="font-serif italic text-2xl sm:text-3xl font-black text-[#d96b43] tracking-tight">
              The Home Oven
            </h1>
            <p className="text-xs text-[#baa99b] font-medium">
              Baker Studio Admin Terminal • {townLocation}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#352520] border border-[#4a352c] text-[11px] font-semibold text-[#f0ba8b] mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Staff & Kitchen Protected Area</span>
            </div>
          </div>

          {/* Tabs: Kitchen Quick PIN vs Password Login */}
          <div className="grid grid-cols-2 p-1 bg-[#1a1210] rounded-2xl border border-[#382822]">
            <button
              type="button"
              onClick={() => { setMode('pin'); setErrorMsg(null); }}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                mode === 'pin'
                  ? 'bg-[#c85a32] text-white shadow-md'
                  : 'text-[#baa99b] hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Kitchen PIN</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('password'); setErrorMsg(null); }}
              className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                mode === 'password'
                  ? 'bg-[#c85a32] text-white shadow-md'
                  : 'text-[#baa99b] hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Password</span>
            </button>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs font-medium flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MODE 1: KITCHEN PIN PAD */}
          {mode === 'pin' && (
            <div className="space-y-5">
              <div className="text-center space-y-2">
                <p className="text-xs text-[#baa99b] font-medium">
                  Enter 4-digit Kitchen Passcode:
                </p>

                {/* 4 PIN Dots */}
                <div className="flex items-center justify-center gap-3.5 py-1">
                  {[0, 1, 2, 3].map((index) => {
                    const filled = pin.length > index
                    return (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          filled
                            ? 'bg-[#d96b43] scale-110 shadow-sm shadow-[#d96b43]'
                            : 'border-2 border-[#523d34] bg-[#1a1210]'
                        }`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* 3x4 On-Screen Tactile Keypad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleDigitClick(digit)}
                    className="h-12 rounded-2xl bg-[#2e211d] hover:bg-[#3d2c26] active:scale-95 text-white font-bold text-lg border border-[#42312b] transition-all flex items-center justify-center shadow-xs"
                  >
                    {digit}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleClearPin}
                  disabled={isLoading || pin.length === 0}
                  className="h-12 rounded-2xl bg-[#231714] hover:bg-[#2d1f1a] text-[#baa99b] text-xs font-semibold border border-[#382620] transition-colors flex items-center justify-center"
                >
                  Clear
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDigitClick('0')}
                  className="h-12 rounded-2xl bg-[#2e211d] hover:bg-[#3d2c26] active:scale-95 text-white font-bold text-lg border border-[#42312b] transition-all flex items-center justify-center shadow-xs"
                >
                  0
                </button>

                <button
                  type="button"
                  onClick={handleDeleteDigit}
                  disabled={isLoading || pin.length === 0}
                  className="h-12 rounded-2xl bg-[#231714] hover:bg-[#2d1f1a] text-[#baa99b] hover:text-white border border-[#382620] transition-colors flex items-center justify-center"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-[#917d70]">
                  Default Kitchen Demo PIN: <strong className="text-[#d96b43]">1234</strong>
                </span>
              </div>
            </div>
          )}

          {/* MODE 2: EMAIL & PASSWORD LOGIN */}
          {mode === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-[#baa99b] font-bold">Studio Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#756155] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@thehomeoven.com"
                    className="w-full bg-[#1c1311] border border-[#3d2b24] text-white rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#d96b43]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[#baa99b] font-bold">Password</label>
                  <span className="text-[10px] text-[#756155]">Demo: baker123</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#756155] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#1c1311] border border-[#3d2b24] text-white rounded-xl pl-9 pr-10 py-2.5 focus:outline-none focus:border-[#d96b43]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#756155] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#c85a32] hover:bg-[#b84e28] text-white font-bold text-xs shadow-md shadow-[#c85a32]/25 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Sign In to Studio</span>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo One-Click Access Button */}
          <div className="pt-2 border-t border-[#382822]">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#2e211d] hover:bg-[#3d2c26] text-[#f5c29a] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-[#4d362e] shadow-xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>⚡ One-Click Demo Access as Baker Ananya</span>
            </button>
          </div>

        </div>

        {/* Security Badging Footer */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-[11px] text-[#7c6a5d] flex items-center justify-center gap-1.5 font-medium">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Encrypted Local Session • Session valid for 8 hours</span>
          </p>
          <p className="text-[10px] text-[#9c897b]">
            Terminal: JRH-KITCHEN-01 • FSSAI Certified Assam Studio
          </p>
        </div>

      </div>

      {/* Bottom spacer for balance */}
      <div className="hidden sm:block" />

    </div>
  )
}
