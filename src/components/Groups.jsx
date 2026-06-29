import { useState } from 'react'
import { GROUPS, GROUP_MATCHES } from '../data/matchData'
import { FlagComponent } from './shared'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const GROUP_LETTERS = Object.keys(GROUPS).sort()

export default function Groups({ onNavigateToTeam }) {
  const [filter, setFilter] = useState('ALL')
  const [expandedGroup, setExpandedGroup] = useState(null)
  const [sortBy, setSortBy] = useState('PTS')

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

      {/* FILTER & SORT BAR */}
      <div className="filter-bar group-selector" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['ALL', 'ADVANCED', 'ELIMINATED'].map(f => {
            const isActive = filter === f
            return (
              <button
                className="group-tab"
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>SORT BY:</span>
          {['PTS', 'GF'].map(s => {
            const isActive = sortBy === s
            return (
              <button 
                key={s}
                onClick={() => setSortBy(s)}
                style={{
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: isActive ? '#1A1F00' : 'var(--surface)',
                  color: isActive ? 'var(--accent)' : 'var(--text-2)',
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* 12-GROUP GRID (3 COLUMNS, GAP AS BORDER) */}
      <div
        className="groups-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--border)'
        }}
      >
        {GROUP_LETTERS.map(letter => {
          const group = GROUPS[letter]
          const isExpanded = expandedGroup === letter
          const matches = GROUP_MATCHES[letter] || []

          let displayTeams = group.teams.filter(t => {
            if (filter === 'ADVANCED') return t.status === 'winner' || t.status === 'runnerup' || t.status === 'third'
            if (filter === 'ELIMINATED') return t.status === 'eliminated'
            return true
          })

          if (displayTeams.length === 0) return null

          if (sortBy === 'GF') {
            displayTeams = [...displayTeams].sort((a, b) => b.gf - a.gf)
          } else {
            displayTeams = [...displayTeams].sort((a, b) => {
              if (b.pts !== a.pts) return b.pts - a.pts
              if (b.gd !== a.gd) return b.gd - a.gd
              return b.gf - a.gf
            })
          }

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
                  {displayTeams.map((team, i) => {
                    const isEliminated = team.status === 'eliminated'
                    const rank = i + 1
                    
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

              {/* EXPANDED GROUP MATCHES TABLE */}
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
                            borderBottom: mIdx === matches.length - 1 ? 'none' : '1px solid var(--border)'
                          }}
                        >
                          <span style={{ fontSize: 10, color: 'var(--text-3)', width: 48, flexShrink: 0 }}>
                            {m.date}
                          </span>

                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', textAlign: 'right' }}>
                            <span 
                              onClick={() => onNavigateToTeam && onNavigateToTeam(m.team1)}
                              style={{ fontSize: 13, fontWeight: 600, color: isAWin ? 'var(--accent)' : 'var(--text-1)', cursor: 'pointer' }}
                            >
                              {m.team1}
                            </span>
                            <FlagComponent teamName={m.team1} size="small" />
                          </div>

                          <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', width: 60, textAlign: 'center', letterSpacing: '0.1em' }}>
                            {m.score1}–{m.score2}
                          </span>

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

                  {/* CHART JS: Group Goals Analysis */}
                  <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>
                      GROUP GOALS ANALYSIS
                    </div>
                    <div className="chart-container" style={{ height: 160 }}>
                      <Bar 
                        data={{
                          labels: displayTeams.map(t => t.name.substring(0, 3).toUpperCase()),
                          datasets: [{
                            label: 'Goals Scored',
                            data: displayTeams.map(t => t.gf),
                            backgroundColor: 'rgba(212, 255, 38, 0.6)',
                            borderColor: '#D4FF26',
                            borderWidth: 1,
                            borderRadius: 4
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: { beginAtZero: true, grid: { color: '#333333' }, ticks: { color: '#888888', stepSize: 1 } },
                            x: { grid: { display: false }, ticks: { color: '#888888', font: { family: 'Space Grotesk', weight: 600 } } }
                          },
                          plugins: {
                            legend: { display: false }
                          }
                        }}
                      />
                    </div>
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
