import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetDate, label }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = target - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const renderBlock = (value, unit) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--surface-2)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1, fontFamily: 'Syne' }}>
        {value.toString().padStart(2, '0')}
      </span>
      <span style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, marginTop: 4, letterSpacing: '0.05em' }}>
        {unit}
      </span>
    </div>
  )

  return (
    <div style={{ marginBottom: 24, padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {renderBlock(timeLeft.days, 'DAYS')}
        <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--border)', alignSelf: 'center', margin: '0 -4px' }}>:</span>
        {renderBlock(timeLeft.hours, 'HOURS')}
        <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--border)', alignSelf: 'center', margin: '0 -4px' }}>:</span>
        {renderBlock(timeLeft.minutes, 'MINS')}
        <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--border)', alignSelf: 'center', margin: '0 -4px' }}>:</span>
        {renderBlock(timeLeft.seconds, 'SECS')}
      </div>
    </div>
  )
}
