import { motion } from 'framer-motion'

export default function EmptyState({ 
  icon = '📭', 
  title = 'NO DATA FOUND', 
  description = 'There\'s nothing to display here yet.',
  action = null,
  size = 'medium'
}) {
  const sizeStyles = {
    small: { icon: '32px', title: '16px', description: '12px' },
    medium: { icon: '48px', title: '20px', description: '14px' },
    large: { icon: '64px', title: '24px', description: '16px' }
  }

  const currentSize = sizeStyles[size] || sizeStyles.medium

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        minHeight: '300px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{
        fontSize: currentSize.icon,
        marginBottom: '16px',
        opacity: 0.6
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: currentSize.title,
        fontWeight: '700',
        color: 'var(--text-1)',
        fontFamily: 'Syne, sans-serif',
        marginBottom: '8px',
        letterSpacing: '0.02em'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: currentSize.description,
        color: 'var(--text-2)',
        maxWidth: '400px',
        lineHeight: 1.5,
        marginBottom: action ? '24px' : '0'
      }}>
        {description}
      </p>
      
      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  )
}
