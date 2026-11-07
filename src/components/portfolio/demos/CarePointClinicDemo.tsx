import { useState } from 'react'
import {
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Smile,
  Activity,
  FileText,
  MessageCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { useDeviceMode } from '../DeviceModeContext'

interface ServiceItem {
  id: string
  name: string
  department: 'Dental Care' | 'General Medicine' | 'Diagnostic Lab'
  tariff: string
  duration: string
  description: string
  benefits: string[]
}

const SERVICES: ServiceItem[] = [
  {
    id: 'single-sitting-rct',
    name: 'Painless Single-Sitting Root Canal (RCT)',
    department: 'Dental Care',
    tariff: '₹2,500',
    duration: '45 mins',
    description:
      'Computerized rotary endodontics performed with digital apex locator and local anesthesia for rapid, pain-free tooth preservation in a single visit.',
    benefits: ['100% Painless Local Anesthesia', 'Digital RVG X-Ray Included', 'Preserves Natural Tooth'],
  },
  {
    id: 'scaling-polishing',
    name: 'Ultrasonic Scaling & Enamel Polishing',
    department: 'Dental Care',
    tariff: '₹1,200',
    duration: '30 mins',
    description:
      'Removal of stubborn tobacco stains, tea tartar, and calculus plaque using gentle high-frequency sound waves followed by fluoride polishing.',
    benefits: ['Eliminates Bad Breath', 'Prevents Bleeding Gums', 'Instantly Brighter Smile'],
  },
  {
    id: 'diabetes-hypertension',
    name: 'MD Physician Diabetes & Heart Screening',
    department: 'General Medicine',
    tariff: '₹500',
    duration: '20 mins',
    description:
      'Thorough clinical consultation with Senior MD Physician covering HbA1c glucose review, blood pressure management, and customized dietary charts.',
    benefits: ['Dietary Guidance Chart', 'Medication Optimization', 'Free 7-Day Follow-up'],
  },
  {
    id: 'executive-health-package',
    name: 'Executive Diagnostic Health Panel (64 Tests)',
    department: 'Diagnostic Lab',
    tariff: '₹1,199',
    duration: 'Same-day Report',
    description:
      'Comprehensive biochemical screening covering CBC, Lipid Profile, Liver Function, Kidney Function, Thyroid (TSH), and Fasting Blood Sugar.',
    benefits: ['100% NABL Quality Control', 'Free Home Sample Pickup', 'Digital WhatsApp Report in 4 Hours'],
  },
]

export function CarePointClinicDemo() {
  const deviceMode = useDeviceMode()
  const isMobile = deviceMode === 'mobile'

  const [selectedDept, setSelectedDept] = useState<string>('All')

  const filteredServices = selectedDept === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.department === selectedDept)

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans antialiased selection:bg-teal-600 selection:text-white">
      {/* 1. Clinical Notification Ribbon */}
      <div className={`bg-[#0b2545] text-white font-bold text-center tracking-wide flex items-center justify-center gap-2 ${
        isMobile ? 'py-1.5 px-3 text-[10px]' : 'py-2 px-4 text-[11px]'
      }`}>
        <Activity className="w-3.5 h-3.5 text-teal-400 shrink-0" />
        <span className="truncate">
          {isMobile
            ? 'OPD: Mon – Sat 9 AM to 8 PM • Digital X-Ray & NABL Lab Reports'
            : 'OPD Hours: Monday – Saturday 9:00 AM to 8:00 PM • Digital Dental X-Ray & Same-Day NABL Lab Reports • Zoo Road, Guwahati'}
        </span>
      </div>

      {/* 2. Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-30 px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm sm:text-lg shadow-md shrink-0">
            +
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-xs sm:text-xl tracking-tight text-[#0b2545] truncate">
                CAREPOINT CLINIC
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-teal-50 text-teal-700 font-bold border border-teal-200 shrink-0">
                DENTAL &amp; DIAGNOSTICS
              </span>
            </div>
            {!isMobile && (
              <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 text-teal-600" />
                Zoo Road (Opp. State Zoo), Guwahati, Assam
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {!isMobile && (
            <a
              href="tel:+919864000000"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>0361-245XXXX</span>
            </a>
          )}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span>{isMobile ? 'Book Visit' : 'Book Appointment'}</span>
          </button>
        </div>
      </header>

      {/* 3. Hero Section with Real Clinic Photo */}
      <section className={`relative bg-gradient-to-b from-teal-50/70 via-white to-white border-b border-slate-200 ${
        isMobile ? 'px-3 py-6' : 'px-4 sm:px-6 lg:px-8 py-10 sm:py-16'
      }`}>
        <div className={
          isMobile
            ? 'flex flex-col gap-6'
            : 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        }>
          <div className={isMobile ? 'space-y-3' : 'lg:col-span-7 space-y-4'}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-xs text-teal-900 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="truncate">Compassionate Care • 12,000+ Patients Treated</span>
            </div>

            <h1 className={
              isMobile
                ? 'text-xl sm:text-2xl font-black tracking-tight text-[#0b2545] leading-snug'
                : 'text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0b2545] leading-tight'
            }>
              Painless Dental Surgery &amp; <br />
              <span className="text-teal-600">Advanced Diagnostics</span> Under One Roof
            </h1>

            <p className={isMobile ? 'text-xs text-slate-600 leading-relaxed' : 'text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl'}>
              Experience modern, patient-first neighborhood healthcare. From single-sitting rotary root canals and orthodontic smile makeovers to automated blood pathology reports delivered on WhatsApp within 4 hours.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center sm:text-left">
                <Smile className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mb-1 mx-auto sm:mx-0" />
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Dentistry</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Painless RCT</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center sm:text-left">
                <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mb-1 mx-auto sm:mx-0" />
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Physicians</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Ex-GMCH MD</p>
              </div>
              <div className="p-2 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-center sm:text-left">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 mb-1 mx-auto sm:mx-0" />
                <h4 className="text-[11px] sm:text-xs font-bold text-slate-900">Digital Lab</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">Same-Day PDF</p>
              </div>
            </div>
          </div>

          {/* Hero Clinical Photo */}
          <div className={isMobile ? 'w-full' : 'lg:col-span-5'}>
            <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/portfolio/demos/clinic-room.jpg"
                  alt="Modern clean clinic consultation room"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-teal-700 uppercase font-bold block">
                    Sterilized Operatory
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">CarePoint Zoo Road Center</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Zero Wait
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Treatment & Tariff Showcase */}
      <section className={`border-b border-slate-200 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-3 mb-6' : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'}>
          <div>
            <h2 className={isMobile ? 'text-lg font-black text-[#0b2545]' : 'text-2xl font-black text-[#0b2545]'}>Transparent Clinical Tariffs</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Clear fees with zero hidden hospital room charges or unnecessary test prescriptions.
            </p>
          </div>

          <div className={`p-1 rounded-xl bg-slate-100 border border-slate-200 ${isMobile ? 'flex flex-wrap gap-1' : 'flex items-center gap-1.5'}`}>
            {['All', 'Dental Care', 'General Medicine', 'Diagnostic Lab'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-colors ${
                  selectedDept === dept
                    ? 'bg-teal-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:border-teal-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-200">
                    {service.department}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-600" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">{service.name}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{service.description}</p>

                <div className="mt-3.5 space-y-1">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Standard Tariff</span>
                  <span className="text-lg sm:text-xl font-black text-slate-900">{service.tariff}</span>
                </div>

                <button
                  type="button"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white text-xs font-bold transition-all border border-teal-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Slot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Senior Doctors Showcase (with photos!) */}
      <section className={`bg-white border-b border-slate-200 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <h2 className={isMobile ? 'text-lg font-black text-[#0b2545] text-center mb-6' : 'text-2xl font-black text-[#0b2545] text-center mb-8'}>
          Meet Our Senior Clinicians
        </h2>

        <div className={isMobile ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'}>
          {/* Doctor 1 */}
          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-300">
              <img
                src="/images/portfolio/demos/dentist-work.jpg"
                alt="Dr. Pranjal Barman, MDS"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Dr. Pranjal Barman, MDS</h4>
              <p className="text-xs text-teal-700 font-bold">Oral &amp; Maxillofacial Dental Surgeon</p>
              <p className="text-xs text-slate-500">12+ Years Experience • Ex-Resident GMCH</p>
              <div className="pt-1.5 text-[10px] sm:text-[11px] font-mono text-slate-600">
                Visiting: Mon – Sat (10 AM - 1 PM &amp; 5 PM - 8 PM)
              </div>
            </div>
          </div>

          {/* Doctor 2 */}
          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-300">
              <img
                src="/images/portfolio/demos/doctor-consult.jpg"
                alt="Dr. Nandita Kalita, MD"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Dr. Nandita Kalita, MD</h4>
              <p className="text-xs text-teal-700 font-bold">Consultant Physician &amp; Diabetologist</p>
              <p className="text-xs text-slate-500">14+ Years Experience • Gold Medalist</p>
              <div className="pt-1.5 text-[10px] sm:text-[11px] font-mono text-slate-600">
                Visiting: Mon, Wed, Fri (4:30 PM - 7:30 PM)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Diagnostic Pathology Lab & Home Collection (with photo!) */}
      <section className={`border-b border-slate-200 ${
        isMobile ? 'px-3 py-8' : 'px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto'
      }`}>
        <div className={isMobile ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-12 gap-8 items-center'}>
          <div className={isMobile ? 'w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-[16/10]' : 'md:col-span-5 rounded-3xl overflow-hidden border border-slate-200 shadow-xl'}>
            <img
              src="/images/portfolio/demos/lab-diagnostics.jpg"
              alt="Automated clinical lab diagnostics"
              className="w-full h-full object-cover"
            />
          </div>

          <div className={isMobile ? 'space-y-3' : 'md:col-span-7 space-y-4'}>
            <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-bold block">
              Automated Lab
            </span>
            <h2 className={isMobile ? 'text-lg font-black text-[#0b2545]' : 'text-2xl sm:text-3xl font-black text-[#0b2545]'}>
              ISO &amp; NABL Standard Pathology Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Equipped with fully automated biochemistry and hematology analyzers for error-free clinical reports:
            </p>

            <div className={isMobile ? 'grid grid-cols-1 gap-2.5 text-xs' : 'grid grid-cols-2 gap-3 text-xs'}>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-slate-900 block">Complete Blood Count (CBC)</span>
                <span className="text-teal-700 font-bold">₹250</span> • Report in 2 Hours
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-slate-900 block">Lipid Profile (Cholesterol)</span>
                <span className="text-teal-700 font-bold">₹450</span> • Same-Day Delivery
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-slate-900 block">HbA1c Diabetes Glycated</span>
                <span className="text-teal-700 font-bold">₹400</span> • Gold Standard
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="font-bold text-slate-900 block">Thyroid Profile (T3/T4/TSH)</span>
                <span className="text-teal-700 font-bold">₹350</span> • Fasting Morning
              </div>
            </div>

            <button
              type="button"
              className="mt-2 w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-[#0b2545] text-white hover:bg-[#081a30] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Home Blood Sample Pickup</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200 px-4 py-6 text-center text-xs text-slate-500">
        <p>© 2026 CarePoint Diagnostic &amp; Dental Clinic • Zoo Road (Near State Zoo), Guwahati, Assam</p>
      </footer>
    </div>
  )
}
