import React, { useState } from 'react'
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck 
} from 'lucide-react'
import { useBakery } from './BakeryContext'

export function BakeryCustomerAuthModal() {
  const { 
    showCustomerLogin, 
    setShowCustomerLogin, 
    loginCustomer, 
    townLocation 
  } = useBakery()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [otp, setOtp] = useState('4455')
  const [isLoading, setIsLoading] = useState(false)

  if (!showCustomerLogin) return null

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('otp')
    }, 350)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await loginCustomer(phoneNumber || '98765 43210', customerName || 'Aarav Sharma')
    setIsLoading(false)
    setStep('input')
  }

  const handleOneClickLogin = async (name: string, phone: string) => {
    setIsLoading(true)
    await loginCustomer(phone, name)
    setIsLoading(false)
    setStep('input')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#fdfbf7] text-[#2c1f1b] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#eadecd] space-y-5 animate-scale relative">
        
        {/* Close Button */}
        <button
          onClick={() => setShowCustomerLogin(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#7c6a5d] hover:text-[#2c1f1b] hover:bg-[#f2e7d8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#fdf2ec] border border-[#f5ded5] flex items-center justify-center text-xl shadow-xs mb-2">
            🎂
          </div>
          <h3 className="font-serif font-black text-xl text-[#2c1f1b]">
            Sign In to The Home Oven
          </h3>
          <p className="text-xs text-[#7c6a5d]">
            Track your custom bakes, save {townLocation} addresses & reorder in 1 click.
          </p>
        </div>

        {/* STEP 1: Enter Phone Number */}
        {step === 'input' && (
          <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#2c1f1b]">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white border border-[#eadecd] rounded-xl px-3.5 py-2.5 text-xs text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-[#2c1f1b]">Mobile Number (WhatsApp) *</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-xs font-bold text-[#7c6a5d]">🇮🇳 +91</span>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white border border-[#eadecd] rounded-xl pl-16 pr-3.5 py-2.5 text-xs font-semibold text-[#2c1f1b] focus:outline-none focus:border-[#b84c26]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#b84c26] hover:bg-[#a13f1d] text-white font-bold text-xs shadow-md shadow-[#b84c26]/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send OTP via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Simulated OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#e8f7ee] text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Demo OTP sent to your number: <strong>4455</strong></span>
            </div>

            <div className="space-y-1 text-center">
              <label className="font-bold text-[#2c1f1b]">Enter 4-Digit Code</label>
              <input
                type="text"
                maxLength={4}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-32 mx-auto text-center tracking-widest text-lg font-black bg-white border-2 border-[#b84c26] rounded-xl py-2 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#b84c26] hover:bg-[#a13f1d] text-white font-bold text-xs shadow-md shadow-[#b84c26]/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Verify & Sign In</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep('input')}
              className="w-full text-center text-[11px] text-[#7c6a5d] hover:underline"
            >
              Edit phone number
            </button>
          </form>
        )}

        {/* Demo Fast Login Shortcuts */}
        <div className="pt-3 border-t border-[#eadecd] space-y-2">
          <p className="text-[11px] font-bold text-[#7c6a5d] text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-[#d96b43]" />
            <span>Fast One-Click Demo Profiles</span>
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleOneClickLogin('Aarav Sharma', '98765 43210')}
              className="p-2.5 rounded-xl bg-white hover:bg-[#f8f4ee] border border-[#eadecd] text-left transition-colors flex items-center gap-2 group shadow-2xs"
            >
              <UserCheck className="w-4 h-4 text-[#b84c26] shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#2c1f1b] truncate">Aarav Sharma</p>
                <p className="text-[10px] text-[#7c6a5d] truncate">Jorhat Regular</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleOneClickLogin('Pooja Bordoloi', '94350 12345')}
              className="p-2.5 rounded-xl bg-white hover:bg-[#f8f4ee] border border-[#eadecd] text-left transition-colors flex items-center gap-2 group shadow-2xs"
            >
              <UserCheck className="w-4 h-4 text-[#b84c26] shrink-0 group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#2c1f1b] truncate">Pooja Bordoloi</p>
                <p className="text-[10px] text-[#7c6a5d] truncate">Sivasagar Regular</p>
              </div>
            </button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7c6a5d] text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local simulated authentication • Zero spam guaranteed</span>
        </div>

      </div>
    </div>
  )
}
