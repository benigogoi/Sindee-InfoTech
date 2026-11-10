import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { WorkPage } from '@/pages/WorkPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { BakeryApp } from '@/components/bakery-demo/BakeryApp'

export default function App() {
  return (
    <Routes>
      {/* Standalone Full-Screen Demo Route for Home Baker E-commerce with Real Sub-Routing */}
      <Route path="/demo/home-baker/*" element={<BakeryApp />} />
      <Route path="/demo/bakery/*" element={<Navigate to="/demo/home-baker" replace />} />

      {/* Main Agency Portfolio Site */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<WorkPage />} />
        <Route path="/work" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio/:slug" element={<Navigate to="/portfolio" replace />} />
        <Route path="/work/:slug" element={<Navigate to="/portfolio" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
