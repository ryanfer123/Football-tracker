import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(() => {
    const dismissed = localStorage.getItem('announcementDismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const now = Date.now()
      // Show again after 24 hours
      return now - dismissedTime > 24 * 60 * 60 * 1000
    }
    return true
  })

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('announcementDismissed', Date.now().toString())
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="announcement-bar"
        style={{
          background: 'var(--accent)',
          color: '#1A1F00',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.05em',
          padding: '6px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 100
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          style={{ display: 'inline-block', flex: 1 }}
        >
          <span style={{ margin: '0 24px' }}>BREAKING: NEYMAR RULED OUT OF ROUND OF 16 DUE TO INJURY</span>
          <span style={{ margin: '0 24px' }}>•</span>
          <span style={{ margin: '0 24px' }}>TICKETS FOR THE FINAL IN NEW YORK ARE NOW SOLD OUT</span>
          <span style={{ margin: '0 24px' }}>•</span>
          <span style={{ margin: '0 24px' }}>GOLDEN BOOT RACE: MESSI LEADS WITH 6 GOALS</span>
          <span style={{ margin: '0 24px' }}>•</span>
          {/* Duplicate for seamless looping */}
          <span style={{ margin: '0 24px' }}>BREAKING: NEYMAR RULED OUT OF ROUND OF 16 DUE TO INJURY</span>
          <span style={{ margin: '0 24px' }}>•</span>
          <span style={{ margin: '0 24px' }}>TICKETS FOR THE FINAL IN NEW YORK ARE NOW SOLD OUT</span>
          <span style={{ margin: '0 24px' }}>•</span>
          <span style={{ margin: '0 24px' }}>GOLDEN BOOT RACE: MESSI LEADS WITH 6 GOALS</span>
          <span style={{ margin: '0 24px' }}>•</span>
        </motion.div>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          style={{
            position: 'absolute',
            right: '12px',
            background: 'transparent',
            border: 'none',
            color: '#1A1F00',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(0,0,0,0.1)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
