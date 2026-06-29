import { useState } from 'react'
import { GROUPS } from '../data/matchData'
import { FlagComponent } from './shared'

const GROUP_LETTERS = Object.keys(GROUPS).sort()

export default function Groups() {
  const [filter, setFilter] = useState('ALL')

  const shouldShowGroup = (group) => {
    if (filter === 'ALL') return true
    const teams = GROUPS[group].teams
    if (filter === 'ADVANCED') return teams.some(t => t.status === 'winner' || t.status === 'runnerup' || t.status === 'third')
    if (filter === 'ELIMINATED') return teams.some(t => t.status === 'eliminated')
    return true
  }

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          GROUPS
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          12 GROUPS · FINAL STANDINGS
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="filter-bar" style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['ALL', 'ADVANCED', 'ELIMINATED'].map(f => {
          const isActive = filter === f
          return (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: isActive ? '#1A1F00' : 'var(--surface)',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '6px 12px',
                cursor: 'pointer',
                transition: 'border-color 80ms ease, color 80ms ease'
              }}
            >
              {f === 'ALL' ? 'ALL GROUPS' : f}
            </button>
          )
        })}
      </div>

      {/* 12-GROUP GRID (4 COLUMNS, GAP AS BORDER) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--border)'
        }}
      >
        {GROUP_LETTERS.filter(shouldShowGroup).map(letter => {
          const group = GROUPS[letter]
          return (
            <div key={letter} style={{ background: 'var(--surface)' }}>
              {/* Header */}
              <div 
                style={{ 
                  fontSize: 11, 
                  fontWeight: 700, 
                  color: 'var(--text-1)', 
                  textTransform: 'uppercase',
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--border)' 
                }}
              >
                GROUP {letter}
              </div>

              {/* Column Headers */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 9,
                  fontWeight: 400,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase'
                }}
              >
                <span style={{ width: 16 }}>#</span>
                <span style={{ flex: 1, marginLeft: 22 }}>TEAM</span>
                <div style={{ display: 'flex', gap: 8, textAlign: 'center' }}>
                  <span style={{ width: 14 }}>P</span>
                  <span style={{ width: 14 }}>W</span>
                  <span style={{ width: 14 }}>D</span>
                  <span style={{ width: 14 }}>L</span>
                  <span style={{ width: 16 }}>GD</span>
                  <span style={{ width: 20 }}>PTS</span>
                </div>
              </div>

              {/* Team Rows */}
              <div>
                {group.teams.map((team, i) => {
                  const isEliminated = team.status === 'eliminated'
                  const rank = i + 1
                  
                  // Row border-left decoration
                  let borderLeftStyle = '2px solid var(--border)'
                  if (rank === 1) borderLeftStyle = '2px solid var(--accent)'
                  else if (rank === 2) borderLeftStyle = '2px solid var(--border-2)'
                  else if (rank === 3) borderLeftStyle = '2px dashed var(--text-3)'

                  return (
                    <div 
                      key={team.name}
                      style={{
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        borderBottom: '1px solid var(--border)',
                        borderLeft: borderLeftStyle,
                        opacity: isEliminated ? 0.4 : 1
                      }}
                    >
                      <span style={{ fontSize: 11, color: 'var(--text-3)', width: 16 }}>
                        {rank}
                      </span>
                      <FlagComponent teamName={team.name} size="small" style={{ width: 16, height: 11, marginRight: 6, marginLeft: 6 }} />
                      <span 
                        style={{ 
                          fontSize: 12, 
                          fontWeight: 600, 
                          color: isEliminated ? 'var(--text-3)' : 'var(--text-1)',
                          textDecoration: isEliminated ? 'line-through' : 'none',
                          flex: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {team.name}
                      </span>
                      
                      <div style={{ display: 'flex', gap: 8, fontSize: 11, color: 'var(--text-2)', textAlign: 'center' }}>
                        <span style={{ width: 14 }}>{team.p}</span>
                        <span style={{ width: 14 }}>{team.w}</span>
                        <span style={{ width: 14 }}>{team.d}</span>
                        <span style={{ width: 14 }}>{team.l}</span>
                        <span style={{ width: 16 }}>{team.gd > 0 ? `+${team.gd}` : team.gd}</span>
                        <span style={{ width: 20, fontWeight: 700, color: isEliminated ? 'var(--text-3)' : 'var(--text-1)' }}>{team.pts}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
