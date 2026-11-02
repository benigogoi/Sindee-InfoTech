import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost'
  to?: string
  href?: string
  onClick?: () => void
  icon?: boolean
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  to,
  href,
  onClick,
  icon = true,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center gap-2 font-semibold text-[0.9375rem] rounded-full transition-all duration-300 cursor-pointer select-none'

  const variantClasses = {
    primary:
      'px-7 py-3.5 bg-lime text-midnight hover:bg-lime-dark hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(199,243,107,0.3)]',
    secondary:
      'px-7 py-3.5 bg-transparent text-midnight border-[1.5px] border-border hover:border-midnight hover:bg-midnight hover:text-white hover:-translate-y-0.5',
    dark: 'px-7 py-3.5 bg-midnight text-white hover:bg-midnight-light hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(16,24,39,0.2)]',
    ghost:
      'px-0 py-0 text-midnight hover:text-lime-dark gap-3 group',
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  const content = (
    <>
      {children}
      {icon && (
        <ArrowRight
          className={`w-4 h-4 transition-transform duration-300 ${
            variant === 'ghost' ? 'group-hover:translate-x-1' : ''
          }`}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  )
}
