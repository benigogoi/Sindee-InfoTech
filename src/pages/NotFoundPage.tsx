import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui/PageMeta'
import { Button } from '@/components/ui/Button'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

export function NotFoundPage() {
  return (
    <PageMeta
      title="404 — Page Not Found | Sindee Infotech"
      description="The page you are looking for does not exist. Return to Sindee Infotech homepage."
    >
      <section className="min-h-[85vh] flex items-center justify-center pt-32 pb-20 bg-warm-ivory relative overflow-hidden">
        {/* Subtle geometric background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main text-center relative z-10 max-w-2xl mx-auto">
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Dramatic 404 Display */}
            <motion.div variants={fadeUpVariants} className="relative inline-block">
              <span className="text-[120px] sm:text-[160px] md:text-[200px] font-extrabold text-midnight/10 leading-none select-none tracking-tighter">
                404
              </span>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase tracking-widest text-midnight font-bold bg-lime px-4 py-1.5 rounded-full my-auto h-fit shadow-md">
                Page Not Located
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-heading-1 text-midnight"
            >
              The page you're looking for doesn't exist.
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="text-body-large text-muted-dark max-w-lg mx-auto"
            >
              It may have been moved, renamed, or temporarily discontinued. You can navigate back to our homepage or explore our services.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Button to="/" variant="dark">
                Back to Home
              </Button>
              <Button to="/contact" variant="secondary">
                Contact Us
              </Button>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="pt-8">
              <Link
                to="/services"
                className="text-xs font-mono uppercase tracking-widest text-muted-dark hover:text-midnight underline"
              >
                Or browse all services →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageMeta>
  )
}
