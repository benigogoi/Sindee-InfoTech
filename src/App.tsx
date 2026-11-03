import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { ServicesPage } from '@/pages/ServicesPage'
import { WorkPage } from '@/pages/WorkPage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function WorkSlugRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={`/portfolio/${slug || ''}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<WorkPage />} />
        <Route path="/work" element={<Navigate to="/portfolio" replace />} />
        <Route path="/portfolio/:slug" element={<CaseStudyPage />} />
        <Route path="/work/:slug" element={<WorkSlugRedirect />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
