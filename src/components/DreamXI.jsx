import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { PLAYERS } from '../data/players'

// Coordinates in % (x, y) relative to pitch container
const FORMATION_SLOTS = {
  '4-3-3': [
    { id: 0, role: 'GK', x: 50, y: 90, name: 'GK' },
    { id: 1, role: 'DEF', x: 15, y: 70, name: 'LB' },
    { id: 2, role: 'DEF', x: 35, y: 70, name: 'LCB' },
    { id: 3, role: 'DEF', x: 65, y: 70, name: 'RCB' },
    { id: 4, role: 'DEF', x: 85, y: 70, name: 'RB' },
    { id: 5, role: 'MID', x: 25, y: 45, name: 'LCM' },
    { id: 6, role: 'MID', x: 50, y: 55, name: 'CDM' },
    { id: 7, role: 'MID', x: 75, y: 45, name: 'RCM' },
    { id: 8, role: 'FWD', x: 25, y: 20, name: 'LW' },
    { id: 9, role: 'FWD', x: 50, y: 15, name: 'ST' },
    { id: 10, role: 'FWD', x: 75, y: 20, name: 'RW' }
  ],
  '4-4-2': [
    { id: 0, role: 'GK', x: 50, y: 90, name: 'GK' },
    { id: 1, role: 'DEF', x: 15, y: 70, name: 'LB' },
    { id: 2, role: 'DEF', x: 35, y: 70, name: 'LCB' },
    { id: 3, role: 'DEF', x: 65, y: 70, name: 'RCB' },
    { id: 4, role: 'DEF', x: 85, y: 70, name: 'RB' },
    { id: 5, role: 'MID', x: 15, y: 45, name: 'LM' },
    { id: 6, role: 'MID', x: 35, y: 45, name: 'LCM' },
    { id: 7, role: 'MID', x: 65, y: 45, name: 'RCM' },
    { id: 8, role: 'MID', x: 85, y: 45, name: 'RM' },
    { id: 9, role: 'FWD', x: 35, y: 20, name: 'ST1' },
    { id: 10, role: 'FWD', x: 65, y: 20, name: 'ST2' }
  ],
  '4-2-3-1': [
    { id: 0, role: 'GK', x: 50, y: 90, name: 'GK' },
    { id: 1, role: 'DEF', x: 15, y: 75, name: 'LB' },
    { id: 2, role: 'DEF', x: 35, y: 75, name: 'LCB' },
    { id: 3, role: 'DEF', x: 65, y: 75, name: 'RCB' },
    { id: 4, role: 'DEF', x: 85, y: 75, name: 'RB' },
    { id: 5, role: 'MID', x: 35, y: 55, name: 'LDM' },
    { id: 6, role: 'MID', x: 65, y: 55, name: 'RDM' },
    { id: 7, role: 'MID', x: 20, y: 35, name: 'LAM' },
    { id: 8, role: 'MID', x: 50, y: 35, name: 'AM' },
    { id: 9, role: 'MID', x: 80, y: 35, name: 'RAM' },
    { id: 10, role: 'FWD', x: 50, y: 15, name: 'ST' }
  ]
}

export default function DreamXI() {
  const [formation, setFormation] = useState('4-3-3')
  
  // Renders 11 slots for selected formation
  const [squad, setSquad] = useState(() => {
    const saved = localStorage.getItem('dreamXI_squad')
    return saved ? JSON.parse(saved) : Array(11).fill(null)
  })

  const [search, setSearch] = useState('')
  const [posFilter, setPosFilter] = useState('ALL')
  const [chemistry, setChemistry] = useState(0.0)

  // Recalculate chemistry whenever squad changes
  useEffect(() => {
    let score = 0
    let filledCount = 0
    let teamCounts = {}
    let totalRatings = 0

    squad.forEach((player, idx) => {
      if (player) {
        filledCount++
        totalRatings += player.rating
        
        // National diversity/balance
        teamCounts[player.team] = (teamCounts[player.team] || 0) + 1

        // Position role match bonus
        const slotRole = FORMATION_SLOTS[formation][idx]?.role
        if (player.position === slotRole) {
          score += 0.4
        }
      }
    })

    if (filledCount > 0) {
      // Base slots score
      score += filledCount * 0.4
      // Ratings average contribution
      score += (totalRatings / filledCount) * 0.25
      // National chemistry links
      Object.values(teamCounts).forEach(cnt => {
        if (cnt >= 2) score += 0.5
        if (cnt >= 3) score += 0.8
      })
    }

    const finalScore = Math.min(10.0, score)
    setChemistry(parseFloat(finalScore.toFixed(1)))
  }, [squad, formation])

  // Save selection
  const saveSquad = () => {
    localStorage.setItem('dreamXI_squad', JSON.stringify(squad))
    localStorage.setItem('dreamXI_formation', formation)
    alert('Dream XI Saved Successfully!')
  }

  const shareSquad = () => {
    const filledNames = squad.map(p => p ? p.name : 'Empty').join(', ')
    alert(`My WC2026 Dream XI (${formation}):\n${filledNames}\nChemistry: ${chemistry}/10`);
  }

  const selectPlayer = (player) => {
    // Find next empty slot compatible with position or first empty slot
    const slots = FORMATION_SLOTS[formation]
    let targetSlotIdx = squad.findIndex((slot, idx) => slot === null && slots[idx].role === player.position)
    
    // Fallback to any empty slot
    if (targetSlotIdx === -1) {
      targetSlotIdx = squad.findIndex(slot => slot === null)
    }

    if (targetSlotIdx !== -1) {
      setSquad(prev => {
        const next = [...prev]
        next[targetSlotIdx] = player
        return next
      })
    }
  }

  const removePlayer = (idx) => {
    setSquad(prev => {
      const next = [...prev]
      next[idx] = null
      return next
    })
  }

  // Filter player list
  const filteredPlayers = PLAYERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase())
    const matchesPos = posFilter === 'ALL' || p.position === posFilter
    return matchesSearch && matchesPos
  })

  const slots = FORMATION_SLOTS[formation]

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ paddingBottom: 10 }}>
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          DREAM XI BUILDER
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          CHOOSE YOUR BEST WORLD CUP SQUAD
        </div>
      </div>

      <div style={{ display: 'flex', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        {/* LEFT PANEL: PITCH */}
        <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Formation selector */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['4-3-3', '4-4-2', '4-2-3-1', '3-5-2'].map(f => {
              const isActive = formation === f
              return (
                <button
                  key={f}
                  onClick={() => {
                    setFormation(f)
                    setSquad(Array(11).fill(null)) // Reset squad when changing formations
                  }}
                  style={{
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                    background: isActive ? '#1A1F00' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-3)',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '4px 10px',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>

          {/* Visual Pitch Container */}
          <div 
            style={{
              height: 520,
              background: '#0A1A0A',
              border: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Pitch markings */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {/* Halfway line */}
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
              {/* Centre circle */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
              {/* Penalty boxes */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 220, height: 80, border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 220, height: 80, border: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none' }} />
              {/* Goal lines */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 5, background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 80, height: 5, background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Render slots */}
            {slots.map((slot, idx) => {
              const player = squad[idx]
              const isFilled = player !== null

              return (
                <div
                  key={slot.id}
                  onClick={() => isFilled && removePlayer(idx)}
                  style={{
                    position: 'absolute',
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 80,
                    height: 26,
                    background: isFilled ? 'var(--surface-2)' : 'var(--surface)',
                    border: isFilled ? '1.5px solid var(--accent)' : '1px dashed var(--border-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isFilled ? 'pointer' : 'default',
                    zIndex: 2
                  }}
                  title={isFilled ? 'Click to remove player' : `Empty ${slot.name} slot`}
                >
                  {isFilled ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 10 }}>
                        <FlagComponent teamName={player.team} size="small" style={{ width: 12, height: 8, border: 'none' }} />
                        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{slot.name}</span>
                      </div>
                      <span 
                        style={{ 
                          fontSize: 10, 
                          fontWeight: 700, 
                          color: 'var(--text-1)', 
                          maxWidth: '100%', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap',
                          marginTop: 2
                        }}
                      >
                        {player.name.split(' ').pop()}
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)' }}>PICK {slot.name}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Chemistry & Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="text-xs" style={{ color: 'var(--text-3)', fontWeight: 600, cursor: 'help' }} title="Chemistry increases by filling slots, placing players in correct positions, and matching nationalities.">
                CHEMISTRY: {chemistry}/10 ⓘ
              </span>
            </div>
            <div style={{ height: 4, width: '100%', background: 'var(--border)' }}>
              <div style={{ width: `${chemistry * 10}%`, height: '100%', background: 'var(--accent)' }} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={saveSquad}
                style={{
                  background: 'var(--accent)',
                  color: '#000',
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '8px 20px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                SAVE XI
              </button>
              <button
                onClick={shareSquad}
                style={{
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--text-1)',
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '8px 20px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                SHARE
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: PLAYER LIST */}
        <div 
          style={{ 
            width: 320, 
            borderLeft: '1px solid var(--border)', 
            display: 'flex', 
            flexDirection: 'column' 
          }}
        >
          {/* Search + Filter */}
          <div style={{ padding: 12, borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input 
              type="text" 
              placeholder="SEARCH PLAYER..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-1)',
                fontSize: 12,
                padding: '6px 10px',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: 2 }}>
              {['ALL', 'GK', 'DEF', 'MID', 'FWD'].map(pos => {
                const isActive = posFilter === pos
                return (
                  <button
                    key={pos}
                    onClick={() => setPosFilter(pos)}
                    style={{
                      flex: 1,
                      border: 'none',
                      borderBottom: isActive ? '2px solid var(--accent)' : 'none',
                      background: 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text-3)',
                      fontSize: 10,
                      fontWeight: 600,
                      cursor: 'pointer',
                      height: 24
                    }}
                  >
                    {pos}
                  </button>
                )
              })}
            </div>
          </div>

          {/* List */}
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 440 }}>
            {filteredPlayers.map(p => {
              const isSelected = squad.some(s => s && s.name === p.name)
              return (
                <div
                  key={p.name}
                  onClick={() => !isSelected && selectPlayer(p)}
                  style={{
                    height: 48,
                    padding: '0 12px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: isSelected ? 'default' : 'pointer',
                    opacity: isSelected ? 0.3 : 1,
                    background: 'transparent',
                    transition: 'background 80ms ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = 'var(--surface-2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <FlagComponent teamName={p.team} size="small" style={{ marginRight: 8 }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{p.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{p.team.toUpperCase()} · {p.position}</span>
                  </div>

                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginRight: 12 }}>
                    {p.goals > 0 ? `⚽ ${p.goals}G` : ''}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700 }}>
                    ★ {p.rating}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
