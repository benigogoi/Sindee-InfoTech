import { motion } from 'framer-motion'
import { ShieldCheck, Mail } from 'lucide-react'
import { PageMeta } from '@/components/ui/PageMeta'
import { CONTACT_CONFIG, EMAIL_URL } from '@/lib/config'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export function PrivacyPage() {
  return (
    <PageMeta
      title="Privacy Policy — Sindee Infotech"
      description="Privacy Policy for Sindee Infotech. Learn how we handle project enquiries, visitor data, and your privacy rights."
    >
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-warm-ivory border-b border-border">
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
                Sindee Infotech ("we", "our", or "us") operates the website <strong className="text-midnight">sindeeinfotech.com</strong>. This Privacy Policy explains our practices regarding the collection, use, and disclosure of personal information when you visit our website, submit a project enquiry, or communicate with us.
              </p>
              <p className="text-body text-muted-dark mt-3">
                We respect your personal privacy and are committed to maintaining the confidentiality of any information you share with us.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">2. Information We Collect</h2>
              <p className="text-body text-muted-dark">
                We only collect information that you knowingly and voluntarily provide to us. This typically occurs when you fill out our project enquiry form, reach out via WhatsApp, or send us an email:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li><strong>Contact details:</strong> Full name, email address, phone number, and business or company name.</li>
                <li><strong>Project details:</strong> Website type requirements, approximate budget range, and project descriptions.</li>
                <li><strong>Technical data:</strong> Non-personally identifiable diagnostic data such as browser type, device information, and pages visited (via privacy-compliant web analytics).</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">3. How We Use Your Information</h2>
              <p className="text-body text-muted-dark">
                The information you provide is utilized exclusively for legitimate business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li>To evaluate your project requirements and prepare customized proposals or estimates.</li>
                <li>To communicate with you directly regarding project consultations, milestones, or technical inquiries.</li>
                <li>To maintain and improve the performance, usability, and security of our website.</li>
              </ul>
              <p className="text-body text-midnight font-medium mt-3">
                We do not sell, rent, trade, or monetize your personal information to third parties or marketing brokers under any circumstances.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">4. Data Storage and Security</h2>
              <p className="text-body text-muted-dark">
                We implement appropriate administrative, technical, and physical safeguards designed to protect the information you submit against unauthorized access, loss, alteration, or misuse. All communications through this website are transmitted over secure TLS/HTTPS encryption protocols.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">5. Third-Party Services</h2>
              <p className="text-body text-muted-dark">
                Our website may utilize standard third-party infrastructure providers to support our operations:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-body text-muted-dark">
                <li><strong>Hosting infrastructure:</strong> Fast, globally distributed web hosting services.</li>
                <li><strong>Analytics:</strong> Aggregated anonymous web performance analytics to understand traffic trends without tracking individual identities.</li>
                <li><strong>Communication channels:</strong> WhatsApp (Meta) when you click direct messaging links.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-heading-3 text-midnight mb-4">6. Your Data Rights</h2>
              <p className="text-body text-muted-dark">
                You have the right to request access to the information we hold about you, request corrections, or ask for the deletion of your enquiry records at any time. To make such a request, simply contact us via the email address listed below.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-8 bg-warm-ivory rounded-2xl border border-border">
              <h2 className="text-heading-3 text-midnight mb-3">7. Privacy Inquiries & Contact</h2>
              <p className="text-body text-muted-dark">
                If you have questions, concerns, or requests regarding this Privacy Policy, please reach out to us directly:
              </p>
              <div className="mt-4 flex items-center gap-2">
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
      </section>
    </PageMeta>
  )
}
