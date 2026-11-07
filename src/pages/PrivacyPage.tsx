import { motion } from 'framer-motion'
import { ShieldCheck, Mail, Phone } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { CONTACT_CONFIG, EMAIL_URL, PHONE_URL } from '@/lib/config'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export function PrivacyPage() {
  return (
    <PageMeta
      title="Privacy Policy — Sindee Infotech"
      description="Privacy Policy for Sindee Infotech. Learn how we handle project enquiries, visitor data, and your privacy rights."
      canonicalUrl="https://sindeeinfotech.com/privacy"
    >
      <section className="pt-12 pb-12 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 bg-warm-ivory border-b border-border">
        <div className="container-main max-w-4xl">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight/5 border border-midnight/10 text-midnight text-xs font-semibold tracking-wider uppercase mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-midnight" />
              Legal & Transparency
            </motion.div>
            <motion.h1 variants={fadeUpVariants} className="text-display text-midnight tracking-tight">
              Privacy Policy
            </motion.h1>
            <motion.p variants={fadeUpVariants} className="text-body-large text-muted-dark mt-4">
              Last updated: November 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main max-w-4xl">
          <div className="prose prose-lg max-w-none text-muted-dark space-y-12 leading-relaxed">
            {/* Section 1 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">1. Introduction</h2>
              <p className="text-body text-muted-dark">
                Sindee Infotech ("we", "our", or "us") operates the website <strong className="text-midnight">sindeeinfotech.com</strong>. This Privacy Policy outlines our transparent approach regarding the collection, use, and handling of information when you browse our website, submit a project enquiry, or communicate with us.
              </p>
              <p className="text-body text-muted-dark mt-3">
                We respect your personal privacy and are committed to handling all project communications with straightforward confidentiality.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">2. Information We Collect</h2>
              <p className="text-body text-muted-dark">
                We only collect information that you knowingly and voluntarily provide to us when you fill out our project enquiry form or send us an email:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li><strong>Contact details:</strong> Full name, email address, phone or WhatsApp number (if voluntarily provided), and business or company name.</li>
                <li><strong>Project details:</strong> Type of website or service required, estimated budget range, and project descriptions or objectives.</li>
                <li><strong>Server diagnostic data:</strong> Standard web server access logs (including browser user-agent, operating system, referring URL, and IP address) generated automatically by our hosting platform to deliver web pages and ensure network stability. We do not use third-party behavioral profiling cookies or advertising trackers.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">3. How We Use Your Information</h2>
              <p className="text-body text-muted-dark">
                The information you provide is used exclusively for legitimate business communication:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li>To review your requirements and prepare itemized project proposals or technical advice.</li>
                <li>To correspond directly with you regarding project scope, milestones, or consultations.</li>
                <li>To maintain the reliability, uptime, and security of our website.</li>
              </ul>
              <p className="text-body text-midnight font-medium mt-3">
                We do not sell, rent, trade, or share your personal information with data brokers or marketing intermediaries under any circumstances.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">4. Data Storage and Security</h2>
              <p className="text-body text-muted-dark">
                We maintain reasonable administrative and technical measures to protect the information you submit against unauthorized access, loss, or alteration. All data transmitted between your browser and our website is encrypted in transit over standard TLS/HTTPS protocols.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">5. Third-Party Infrastructure</h2>
              <p className="text-body text-muted-dark">
                Our website utilizes selected technical infrastructure providers:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li><strong>Hosting infrastructure:</strong> Deployed on Vercel to serve static assets and code reliably across global edge points.</li>
                <li><strong>Email communications:</strong> Direct emails or enquiries transmitted through our email client fallback are processed through standard email network protocols and your chosen email provider.</li>
                <li><strong>No third-party tracking cookies:</strong> We do not load third-party advertising pixels, cross-site trackers, or commercial surveillance scripts on this website.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">6. Your Data Rights</h2>
              <p className="text-body text-muted-dark">
                You have the right to request access to the information you have shared with us, ask for updates or corrections, or request the deletion of your correspondence records at any time. To make a request, contact us directly at our verified email address.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-8 bg-warm-ivory rounded-2xl border border-border">
              <h2 className="text-heading-3 text-midnight mb-3">7. Privacy Inquiries & Contact</h2>
              <p className="text-body text-muted-dark">
                If you have questions, feedback, or requests regarding our privacy practices, please contact us directly:
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-midnight" />
                  <a
                    href={PHONE_URL}
                    className="font-semibold text-midnight hover:text-lime-dark underline"
                  >
                    {CONTACT_CONFIG.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-midnight" />
                  <a
                    href={EMAIL_URL}
                    className="font-semibold text-midnight hover:text-lime-dark underline"
                  >
                    {CONTACT_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageMeta>
  )
}
