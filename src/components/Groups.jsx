import { useState } from 'react'
import { GROUPS } from '../data/matchData'
import { FlagComponent } from './shared'

const GROUP_LETTERS = Object.keys(GROUPS).sort()

// Generate realistic results for all 12 groups
const getGroupMatches = (letter, teams) => {
  const t = teams.map(x => x.name)
  const tA = t[0] || 'Team A'
  const tB = t[1] || 'Team B'
  const tC = t[2] || 'Team C'
  const tD = t[3] || 'Team D'

  if (letter === 'A') {
    return [
      { team1: 'Mexico', score1: 2, score2: 0, team2: 'South Africa', date: 'JUN 11' },
      { team1: 'Ecuador', score1: 2, score2: 1, team2: 'South Korea', date: 'JUN 11' },
      { team1: 'Mexico', score1: 1, score2: 0, team2: 'South Korea', date: 'JUN 15' },
      { team1: 'South Africa', score1: 2, score2: 1, team2: 'Ecuador', date: 'JUN 15' },
      { team1: 'Mexico', score1: 3, score2: 0, team2: 'Ecuador', date: 'JUN 19' },
      { team1: 'South Africa', score1: 1, score2: 1, team2: 'South Korea', date: 'JUN 19' }
    ]
  }
  if (letter === 'B') {
    return [
      { team1: 'Switzerland', score1: 2, score2: 0, team2: 'Qatar', date: 'JUN 12' },
      { team1: 'Canada', score1: 1, score2: 1, team2: 'USA', date: 'JUN 12' },
      { team1: 'Switzerland', score1: 1, score2: 0, team2: 'USA', date: 'JUN 16' },
      { team1: 'Canada', score1: 3, score2: 0, team2: 'Qatar', date: 'JUN 16' },
      { team1: 'Switzerland', score1: 1, score2: 0, team2: 'Canada', date: 'JUN 20' },
      { team1: 'USA', score1: 4, score2: 0, team2: 'Qatar', date: 'JUN 20' }
    ]
  }
  if (letter === 'C') {
    return [
      { team1: 'Brazil', score1: 2, score2: 0, team2: 'Nigeria', date: 'JUN 13' },
      { team1: 'Morocco', score1: 2, score2: 2, team2: 'Netherlands', date: 'JUN 13' },
      { team1: 'Brazil', score1: 1, score2: 0, team2: 'Netherlands', date: 'JUN 17' },
      { team1: 'Morocco', score1: 1, score2: 0, team2: 'Nigeria', date: 'JUN 17' },
      { team1: 'Brazil', score1: 3, score2: 1, team2: 'Morocco', date: 'JUN 21' },
      { team1: 'Netherlands', score1: 2, score2: 0, team2: 'Nigeria', date: 'JUN 21' }
    ]
  }
  if (letter === 'D') {
    return [
      { team1: 'Japan', score1: 2, score2: 0, team2: 'Cameroon', date: 'JUN 14' },
      { team1: 'Germany', score1: 3, score2: 1, team2: 'Paraguay', date: 'JUN 14' },
      { team1: 'Japan', score1: 1, score2: 1, team2: 'Germany', date: 'JUN 18' },
      { team1: 'Paraguay', score1: 1, score2: 0, team2: 'Cameroon', date: 'JUN 18' },
      { team1: 'Japan', score1: 1, score2: 0, team2: 'Paraguay', date: 'JUN 22' },
      { team1: 'Germany', score1: 2, score2: 0, team2: 'Cameroon', date: 'JUN 22' }
    ]
  }
  if (letter === 'E') {
    return [
      { team1: 'France', score1: 2, score2: 0, team2: 'Denmark', date: 'JUN 15' },
      { team1: 'Norway', score1: 2, score2: 1, team2: 'Ivory Coast', date: 'JUN 15' },
      { team1: 'France', score1: 2, score2: 0, team2: 'Ivory Coast', date: 'JUN 19' },
      { team1: 'Norway', score1: 3, score2: 1, team2: 'Denmark', date: 'JUN 19' },
      { team1: 'France', score1: 1, score2: 1, team2: 'Norway', date: 'JUN 23' },
      { team1: 'Ivory Coast', score1: 1, score2: 0, team2: 'Denmark', date: 'JUN 23' }
    ]
  }
  if (letter === 'F') {
    return [
      { team1: 'England', score1: 3, score2: 0, team2: 'IR Iran', date: 'JUN 16' },
      { team1: 'DR Congo', score1: 1, score2: 1, team2: 'Serbia', date: 'JUN 16' },
      { team1: 'England', score1: 2, score2: 0, team2: 'DR Congo', date: 'JUN 20' },
      { team1: 'Serbia', score1: 0, score2: 0, team2: 'IR Iran', date: 'JUN 20' },
      { team1: 'England', score1: 0, score2: 0, team2: 'Serbia', date: 'JUN 24' },
      { team1: 'DR Congo', score1: 1, score2: 1, team2: 'IR Iran', date: 'JUN 24' }
    ]
  }
  // Generative fallback for G-L
  return [
    { team1: tA, score1: 2, score2: 1, team2: tB, date: 'JUN 17' },
    { team1: tC, score1: 0, score2: 0, team2: tD, date: 'JUN 17' },
    { team1: tA, score1: 3, score2: 0, team2: tC, date: 'JUN 21' },
    { team1: tB, score1: 1, score2: 0, team2: tD, date: 'JUN 21' },
    { team1: tA, score1: 2, score2: 0, team2: tD, date: 'JUN 25' },
    { team1: tB, score1: 1, score2: 1, team2: tC, date: 'JUN 25' }
  ]
}

export default function Groups({ onNavigateToTeam }) {
  const [filter, setFilter] = useState('ALL')
  const [expandedGroup, setExpandedGroup] = useState(null)

  const shouldShowGroup = (group) => {
    if (filter === 'ALL') return true
    const teams = GROUPS[group].teams
    if (filter === 'ADVANCED') return teams.some(t => t.status === 'winner' || t.status === 'runnerup' || t.status === 'third')
    if (filter === 'ELIMINATED') return teams.some(t => t.status === 'eliminated')
    return true
  }

  const toggleGroupExpand = (letter) => {
    if (expandedGroup === letter) {
      setExpandedGroup(null)
    } else {
      setExpandedGroup(letter)
    }
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
          const isExpanded = expandedGroup === letter
          const matches = getGroupMatches(letter, group.teams)

          return (
            <div key={letter} style={{ background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
              {/* Clickable Header */}
              <div 
                onClick={() => toggleGroupExpand(letter)}
                style={{ 
                  fontSize: 11, 
                  fontWeight: 700, 
                  color: 'var(--text-1)', 
                  textTransform: 'uppercase',
                  padding: '8px 12px',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isExpanded ? 'var(--surface-2)' : 'transparent',
                  transition: 'background 80ms ease'
                }}
              >
                <span>GROUP {letter}</span>
                <span style={{ fontSize: 9, color: 'var(--text-3)' }}>{isExpanded ? '▼ RESULTS' : '▲ CLICK TO EXPAND'}</span>
              </div>

              {/* Table */}
              <div style={{ flex: 1 }}>
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
                          onClick={() => onNavigateToTeam && onNavigateToTeam(team.name)}
                          style={{ 
                            fontSize: 12, 
                            fontWeight: 600, 
                            color: isEliminated ? 'var(--text-3)' : 'var(--text-1)',
                            textDecoration: isEliminated ? 'line-through' : 'none',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            transition: 'color 80ms ease'
                          }}
                          onMouseEnter={(e) => { if (!isEliminated) e.currentTarget.style.color = 'var(--accent)' }}
                          onMouseLeave={(e) => { if (!isEliminated) e.currentTarget.style.color = 'var(--text-1)' }}
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

              {/* FEATURE 8: EXPANDED GROUP MATCHES TABLE */}
              {isExpanded && (
                <div style={{ background: '#111', borderTop: '1px solid var(--border)', padding: '8px 0' }}>
                  <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8, padding: '0 12px' }}>GROUP MATCHES</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {matches.map((m, mIdx) => {
                      const isAWin = m.score1 > m.score2
                      const isBWin = m.score2 > m.score1

                      return (
                        <div 
                          key={mIdx}
                          style={{
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 12px',
                            borderBottom: mIdx === 5 ? 'none' : '1px solid var(--border)'
                          }}
                        >
                          {/* Date */}
                          <span style={{ fontSize: 10, color: 'var(--text-3)', width: 48, flexShrink: 0 }}>
                            {m.date}
                          </span>

                          {/* Team A */}
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', textAlign: 'right' }}>
                            <span 
                              onClick={() => onNavigateToTeam && onNavigateToTeam(m.team1)}
                              style={{ fontSize: 13, fontWeight: 600, color: isAWin ? 'var(--accent)' : 'var(--text-1)', cursor: 'pointer' }}
                            >
                              {m.team1}
                            </span>
                            <FlagComponent teamName={m.team1} size="small" />
                          </div>

                          {/* Score */}
                          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', width: 60, textAlign: 'center', letterSpacing: '0.1em' }}>
                            {m.score1}–{m.score2}
                          </span>

                          {/* Team B */}
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start', textAlign: 'left' }}>
                            <FlagComponent teamName={m.team2} size="small" />
                            <span 
                              onClick={() => onNavigateToTeam && onNavigateToTeam(m.team2)}
                              style={{ fontSize: 13, fontWeight: 600, color: isBWin ? 'var(--accent)' : 'var(--text-1)', cursor: 'pointer' }}
                            >
                              {m.team2}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
