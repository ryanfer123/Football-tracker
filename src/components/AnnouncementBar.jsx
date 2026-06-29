import { motion } from 'framer-motion'

export default function AnnouncementBar() {
  return (
    <div 
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
        style={{ display: 'inline-block' }}
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
    </div>
  )
}
