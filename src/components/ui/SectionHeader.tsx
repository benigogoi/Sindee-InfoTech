import { motion } from 'framer-motion'
import { fadeUpVariants, staggerContainerVariants } from '@/lib/animations'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}
    >
      {label && (
        <motion.p
          variants={fadeUpVariants}
          className={`text-label mb-4 ${dark ? 'text-lime' : 'text-muted'}`}
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUpVariants}
        className={`text-heading-1 ${dark ? 'text-white' : 'text-midnight'}`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUpVariants}
          className={`text-body-large mt-5 ${dark ? 'text-muted-light' : 'text-muted-dark'}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
