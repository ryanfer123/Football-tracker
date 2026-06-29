import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'
import { GROUP_MATCHES } from '../data/matchData'
import { getTeamGroupResults, statsFromGroupResults, parseScore } from '../utils/groupStats'

export default function Teams({ selectedTeamName, setSelectedTeamName }) {
  const [search, setSearch] = useState('')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [hoveredYear, setHoveredYear] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (selectedTeamName) {
      setSelectedTeam(selectedTeamName)
    }
  }, [selectedTeamName])

  const handleBack = () => {
    setSelectedTeam(null)
    if (setSelectedTeamName) {
      setSelectedTeamName(null)
    }
  }

  const teamNames = Object.keys(TEAMS).sort()
  const filteredTeams = teamNames.filter(name => 
    name.toLowerCase().includes(search.toLowerCase()) ||
    TEAMS[name].code.toLowerCase().includes(search.toLowerCase())
  )

  const handleYearHover = (year, stage, e) => {
    setHoveredYear({ year, stage })
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 })
  }

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 })
  }

  const handleYearLeave = () => {
    setHoveredYear(null)
  }

  // Build tournament path from actual group + knockout results
  const getTournamentPath = (teamName) => {
    const groupResults = getTeamGroupResults(GROUP_MATCHES, teamName)
    const path = groupResults.map((r, i) => ({
      round: `GS MD${i + 1}`,
      score: r.score.replace('–', '-'),
      vs: `vs ${r.vs.substring(0, 3).toUpperCase()}`,
      state: r.res === 'W' ? 'WON' : r.res === 'D' ? 'DREW' : 'LOST'
    }))

    path.push({ round: 'R32', score: 'TBD', vs: 'vs TBD', state: 'TBD' })
    return path
  }

  const getTournamentStats = (teamName) => {
    const groupResults = getTeamGroupResults(GROUP_MATCHES, teamName)
    const stats = statsFromGroupResults(groupResults)
    const cleanSheets = groupResults.filter(r => {
      const { ga } = parseScore(r.score)
      return ga === 0
    }).length

    return [
      { label: 'GOALS SCORED', value: String(stats.gf), best: stats.gf >= 6 },
      { label: 'GOALS CONCEDED', value: String(stats.ga), best: stats.ga <= 2 },
      { label: 'POINTS', value: String(stats.pts), best: stats.pts >= 7 },
      { label: 'GOAL DIFFERENCE', value: stats.gd > 0 ? `+${stats.gd}` : String(stats.gd), best: stats.gd >= 3 },
      { label: 'CLEAN SHEETS', value: String(cleanSheets), best: cleanSheets >= 2 },
      { label: 'MATCHES PLAYED', value: String(groupResults.length), best: false }
    ]
  }

  // Pitch layout rows
  const renderSquadPitch = (team) => {
    const isSpecialTeam = ['Brazil', 'France', 'Germany', 'Argentina', 'Spain'].includes(selectedTeam)
    if (!isSpecialTeam) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 230, border: '1px solid var(--border)', background: '#0A0A0A', color: 'var(--text-3)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          LINEUP DATA UNAVAILABLE
        </div>
      )
    }

    const { squad } = team
    const rows = [
      { key: 'FW', players: squad.FW || [] },
      { key: 'MID', players: squad.MID || [] },
      { key: 'DEF', players: squad.DEF || [] },
      { key: 'GK', players: squad.GK || [] }
    ]

    return (
      <div 
        style={{ 
          background: '#0A1A0A', 
          border: '1px solid #1F3F1F', 
          height: 280, 
          padding: 16, 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        {/* Pitch markings */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, borderLeft: '1px dashed rgba(31,63,31,0.6)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, border: '1px solid rgba(31,63,31,0.6)', borderRadius: '50%', pointerEvents: 'none' }} />

        {rows.map((row) => (
          <div key={row.key} style={{ display: 'flex', justifyContent: 'space-around', width: '100%', zIndex: 1 }}>
            {row.players.map((p, idx) => (
              <div 
                key={idx}
                style={{
                  width: 80,
                  height: 32,
                  background: 'var(--surface)',
                  border: '1px solid var(--border-2)',
                  color: 'var(--text-1)',
                  fontSize: 10,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 80ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-2)'}
              >
                {p.substring(0, 12)}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // Details profile view
  if (selectedTeam) {
    const team = TEAMS[selectedTeam]
    const historyYears = Object.keys(team.wcHistory).sort()
    const path = getTournamentPath(selectedTeam)
    const stats = getTournamentStats(selectedTeam)

    return (
      <div>
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="text-xs"
          style={{ 
            color: 'var(--text-2)', 
            marginBottom: 20, 
            cursor: 'pointer',
            transition: 'color 80ms ease' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-1)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-2)'}
        >
          ← ALL TEAMS
        </button>

        {/* Header Row */}
        <div className="team-detail" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <FlagComponent teamName={selectedTeam} size="large" style={{ width: 64, height: 42 }} />
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-1)', textTransform: 'uppercase', lineHeight: 1 }}>
              {selectedTeam}
            </h1>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 6 }}>
              {team.titles} WORLD CUP TITLES · FIFA RANK #{team.ranking}
            </div>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid var(--border)', margin: '16px 0' }} />

        {/* Section: WC History Timeline */}
        <div style={{ marginBottom: 28 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
            WORLD CUP HISTORY
          </div>
          
          <div 
            style={{ 
              display: 'flex', 
              gap: 4, 
              overflowX: 'auto', 
              paddingBottom: 8 
            }}
          >
            {historyYears.map(year => {
              const stage = team.wcHistory[year]
              let bgColor = 'var(--bg)'
              let borderColor = 'var(--border)'
              let textColor = 'var(--text-3)'
              let opacity = 1

              if (stage === 'WON') {
                bgColor = '#1A1F00'
                borderColor = 'var(--accent)'
                textColor = 'var(--accent)'
              } else if (stage === 'FINAL') {
                bgColor = 'var(--surface-2)'
                textColor = 'var(--text-1)'
              } else if (stage === 'SF') {
                bgColor = 'var(--surface)'
                textColor = 'var(--text-2)'
              } else if (stage === 'QF') {
                bgColor = 'var(--surface)'
                textColor = 'var(--text-3)'
              } else if (stage === 'GROUP' || stage === 'R16' || stage === 'R32' || stage === 'R2' || stage === 'R1') {
                bgColor = 'var(--bg)'
                textColor = 'var(--text-3)'
                opacity = 0.5
              } else if (stage === 'DNQ') {
                bgColor = 'var(--bg)'
                textColor = 'var(--text-3)'
                opacity = 0.25
              }

              return (
                <div 
                  key={year}
                  onMouseEnter={(e) => handleYearHover(year, stage, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleYearLeave}
                  style={{
                    width: 42,
                    height: 26,
                    border: `1px solid ${borderColor}`,
                    background: bgColor,
                    color: textColor,
                    fontSize: 11,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    opacity: opacity,
                    cursor: 'pointer'
                  }}
                >
                  {year.substring(2)}
                </div>
              )
            })}
          </div>
        </div>

        {/* Section: Squad */}
        <div style={{ marginBottom: 28 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
            SQUAD — {team.formation}
          </div>
          {renderSquadPitch(team)}
        </div>

        {/* Section: Key Players */}
        <div style={{ marginBottom: 28 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
            KEY PLAYERS
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {team.keyPlayers?.map((player, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: 12,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>
                    {player.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', marginTop: 2 }}>
                    {player.position} · {player.club}
                  </div>
                </div>

                <div style={{ borderBottom: '1px solid var(--border)' }} />

                <div style={{ fontSize: 11, color: 'var(--text-2)' }}>
                  Goals: {player.goals} &nbsp; Assists: {player.assists} &nbsp; Rating: {player.rating}
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{player.note}"
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURE 5: TOURNAMENT PATH */}
        <div style={{ marginBottom: 28 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
            WC 2026 PATH
          </div>
          <div className="tournament-path" style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
            {path.map((step, idx) => {
              let chipBorder = '1px solid var(--border)'
              let scoreColor = 'var(--text-1)'

              if (step.state === 'WON') {
                chipBorder = '1px solid var(--accent)'
                scoreColor = 'var(--accent)'
              } else if (step.state === 'DREW') {
                chipBorder = '1px solid var(--border-2)'
                scoreColor = 'var(--text-2)'
              } else if (step.state === 'LOST') {
                chipBorder = '1px solid var(--red)'
                scoreColor = 'var(--red)'
              } else if (step.state === 'TBD') {
                chipBorder = '1px dashed var(--border)'
                scoreColor = 'var(--text-3)'
              }

              return (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div 
                    style={{
                      width: 80,
                      height: 40,
                      border: chipBorder,
                      background: 'var(--surface)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <span className="text-xs" style={{ color: 'var(--text-3)', fontSize: 9 }}>{step.round}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: scoreColor, lineHeight: 1.2 }}>{step.score}</span>
                    <span style={{ fontSize: 9, color: 'var(--text-3)' }}>{step.vs}</span>
                  </div>
                  {idx < path.length - 1 && (
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>→</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* FEATURE 5: STATS COMPARISON */}
        <div style={{ marginBottom: 28 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>
            TOURNAMENT STATS
          </div>
          <div
            className="team-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 8
            }}
          >
            {stats.map((st, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  padding: 12
                }}
              >
                <div 
                  style={{ 
                    fontSize: 28, 
                    fontWeight: 900, 
                    color: st.best ? 'var(--accent)' : 'var(--text-1)',
                    lineHeight: 1 
                  }}
                >
                  {st.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip Overlay */}
        {hoveredYear && (
          <div 
            style={{
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y,
              background: 'var(--surface-2)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              padding: '4px 8px',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              zIndex: 1000,
              pointerEvents: 'none',
              boxShadow: 'var(--shadow-dim)'
            }}
          >
            {hoveredYear.year} — {hoveredYear.stage}
          </div>
        )}
      </div>
    )
  }

  // Grid Grid-as-border view
  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          TEAMS
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          32 NATIONS
        </div>
      </div>

      {/* SEARCH BAR */}
      <input 
        type="text"
        placeholder="SEARCH NATIONS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '10px 14px',
          fontSize: 14,
          color: 'var(--text-1)',
          marginBottom: 16
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--border-2)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />

      {/* TEAMS GRID (GAP AS BORDER) */}
      <div
        className="teams-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          background: 'var(--border)'
        }}
      >
        {filteredTeams.map(name => {
          const team = TEAMS[name]
          const isWinner = team.status === 'IN'

          return (
            <div 
              key={name}
              onClick={() => setSelectedTeam(name)}
              style={{
                background: 'var(--surface)',
                padding: '16px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                minHeight: 100,
                cursor: 'pointer',
                transition: 'background 80ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface)'}
            >
              <FlagComponent teamName={name} style={{ width: 48, height: 32, border: '1px solid var(--border-2)' }} />
              <div 
                style={{ 
                  fontSize: 11, 
                  fontWeight: 700, 
                  color: 'var(--text-1)', 
                  textAlign: 'center', 
                  marginTop: 4,
                  textTransform: 'uppercase'
                }}
              >
                {name}
              </div>

              {/* Status Row */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <span 
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: 'var(--text-3)',
                    border: '1px solid var(--border)',
                    padding: '1px 4px',
                    textTransform: 'uppercase'
                  }}
                >
                  GRP {team.group}
                </span>

                <span 
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: isWinner ? 'var(--accent)' : 'var(--red)',
                    border: `1px solid ${isWinner ? 'var(--accent)' : 'var(--red)'}`,
                    padding: '1px 4px'
                  }}
                >
                  {team.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
