import { useState, useMemo } from 'react'
import { TEAMS, ALL_TEAM_NAMES } from '../data/teams'
import { TeamFlag } from './shared'

const WC_YEARS = [1930,1934,1938,1950,1954,1958,1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022,2026]
const RESULT_LABELS = { WON: '🏆', FINAL: 'F', SF: 'SF', QF: 'QF', R16: 'R16', R32: 'R32', R2: 'R2', R1: 'R1', GROUP: 'GS', DNQ: '—' }

function RadarChart({ stats }) {
  const labels = ['Attack', 'Defence', 'Midfield', 'Pace', 'Experience', 'Cohesion']
  const keys = ['attack', 'defence', 'midfield', 'pace', 'experience', 'cohesion']
  const cx = 150, cy = 150, r = 110
  const angles = keys.map((_, i) => (Math.PI * 2 * i) / keys.length - Math.PI / 2)

  const points = keys.map((k, i) => {
    const val = (stats[k] || 50) / 100
    return {
      x: cx + r * val * Math.cos(angles[i]),
      y: cy + r * val * Math.sin(angles[i])
    }
  })

  const polygon = points.map(p => `${p.x},${p.y}`).join(' ')

  // Grid lines
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  return (
    <div className="radar-container">
      <svg width="300" height="300" className="radar-svg" viewBox="0 0 300 300">
        {/* Grid */}
        {gridLevels.map((level, li) => (
          <polygon key={li}
            points={angles.map(a => `${cx + r * level * Math.cos(a)},${cy + r * level * Math.sin(a)}`).join(' ')}
            fill="none" stroke="#000" strokeWidth="1" opacity={0.15} />
        ))}
        {/* Axes */}
        {angles.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)}
            stroke="#000" strokeWidth="1" opacity={0.2} />
        ))}
        {/* Data polygon */}
        <polygon points={polygon} fill="#F5F500" stroke="#000" strokeWidth="2.5" fillOpacity="0.7" />
        {/* Labels */}
        {labels.map((label, i) => {
          const lx = cx + (r + 20) * Math.cos(angles[i])
          const ly = cy + (r + 20) * Math.sin(angles[i])
          return (
            <text key={i} x={lx} y={ly} fontSize="9" fontWeight="700" fontFamily="Space Grotesk"
              textAnchor="middle" dominantBaseline="middle" fill="#000"
              style={{ textTransform: 'uppercase' }}>
              {label}
            </text>
          )
        })}
        {/* Values */}
        {points.map((p, i) => (
          <text key={`v-${i}`} x={p.x} y={p.y - 8} fontSize="9" fontWeight="700" fontFamily="Space Grotesk"
            textAnchor="middle" fill="#FF2D00">
            {stats[keys[i]] || 50}
          </text>
        ))}
      </svg>
    </div>
  )
}

function TeamProfile({ team, teamName, onBack }) {
  const [tooltipYear, setTooltipYear] = useState(null)

  const formationParts = (team.formation || '4-3-3').split('-').map(Number)
  const squad = team.squad || {}

  // Build flat player list for formation
  const allPlayers = [
    ...(squad.GK || ['GK']),
    ...(squad.DEF || ['DEF','DEF','DEF','DEF']),
    ...(squad.MID || ['MID','MID','MID']),
    ...(squad.FW || ['FW','FW','FW'])
  ]

  // Build rows from formation
  const rows = [allPlayers.slice(0, 1)] // GK
  let idx = 1
  for (const count of formationParts) {
    rows.push(allPlayers.slice(idx, idx + count))
    idx += count
  }

  return (
    <div className="team-profile">
      <button className="back-btn" onClick={onBack}>← ALL TEAMS</button>

      <div className="profile-header">
        <TeamFlag teamName={teamName} size="large" className="profile-flag" />
        <div>
          <div className="profile-name">{teamName}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <span className="ranking-badge">FIFA #{team.ranking}</span>
            {team.titles > 0 && <span className="ranking-badge" style={{ background: '#C9A84C', color: '#000' }}>⭐ {team.titles} TITLE{team.titles > 1 ? 'S' : ''}</span>}
            <span className={`status-chip ${team.status === 'IN' ? 'in' : 'out'}`}>{team.status}</span>
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#888' }}>Coach: {team.coach}</div>
        </div>
      </div>

      {/* WC History Timeline */}
      <div className="profile-section">
        <div className="profile-section-title">World Cup History</div>
        <div className="wc-timeline">
          {WC_YEARS.map(year => {
            const result = team.wcHistory?.[year]
            if (!result) return null
            return (
              <div key={year} className={`wc-year-chip ${result}`}
                onMouseEnter={() => setTooltipYear(year)}
                onMouseLeave={() => setTooltipYear(null)}>
                <span className="year-label">{year}</span>
                <span className="result-label">{RESULT_LABELS[result]}</span>
                {tooltipYear === year && (
                  <div className="chip-tooltip">{year}: {result}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Squad / Formation */}
      <div className="profile-section">
        <div className="profile-section-title">WC 2026 Squad — {team.formation}</div>
        <div className="pitch">
          {rows.reverse().map((row, i) => (
            <div key={i} className="pitch-row">
              {row.map((p, j) => (
                <div key={j} className="pitch-player">{p}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Key Players */}
      <div className="profile-section">
        <div className="profile-section-title">Key Players</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {(team.keyPlayers || []).map((p, i) => (
            <div key={i} className="card-static" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', color: '#888' }}>{p.position} · {p.club}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 700 }}>
                  <div>{p.goals}G · {p.assists}A</div>
                  <div style={{ color: '#FF2D00' }}>★ {p.rating}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, marginTop: 8, lineHeight: 1.5, color: '#444' }}>{p.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Radar */}
      <div className="profile-section">
        <div className="profile-section-title">Stats Radar</div>
        <RadarChart stats={team.stats || {}} />
      </div>

      {/* Tournament Path */}
      <div className="profile-section">
        <div className="profile-section-title">Tournament Path</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="detail-title">Group Stage — Group {team.group}</div>
          {(team.groupResults || []).map((r, i) => (
            <div key={i} className="upcoming-match-row" style={{ cursor: 'default' }}>
              <div className={`form-pill ${r.result}`} style={{ width: 28, height: 28 }}>{r.result}</div>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 13 }}>vs {r.vs}</span>
              <span style={{ fontWeight: 700, fontSize: 14, marginLeft: 'auto' }}>{r.score}</span>
            </div>
          ))}
          <div style={{ marginTop: 12 }}>
            <div className="detail-title">Knockout Stage</div>
            <div className="upcoming-match-row" style={{ cursor: 'default', opacity: 0.5 }}>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 13, color: '#888' }}>
                Round of 32 — vs TBD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Teams() {
  const [search, setSearch] = useState('')
  const [selectedTeam, setSelectedTeam] = useState(null)

  const filteredTeams = useMemo(() => {
    return ALL_TEAM_NAMES.filter(name =>
      name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  if (selectedTeam) {
    const team = TEAMS[selectedTeam]
    return <TeamProfile team={team} teamName={selectedTeam} onBack={() => setSelectedTeam(null)} />
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">👥 Teams</h1>
        <p className="page-subtitle">32 teams • profiles & history</p>
      </div>

      <div className="search-bar">
        <input className="input" style={{ width: '100%' }}
          placeholder="SEARCH TEAM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filteredTeams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⚽</div>
          <div className="empty-text">NO DATA</div>
        </div>
      ) : (
        <div className="teams-grid">
          {filteredTeams.map(name => {
            const team = TEAMS[name]
            return (
              <div key={name} className="team-card" onClick={() => setSelectedTeam(name)}>
                <TeamFlag teamName={name} size="large" className="flag-large" />
                <div className="team-card-name">{name}</div>
                {team.titles > 0 && (
                  <div className="titles-badge">⭐ {team.titles} TITLE{team.titles > 1 ? 'S' : ''}</div>
                )}
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span className="group-badge">GROUP {team.group}</span>
                  <span className={`status-chip ${team.status === 'IN' ? 'in' : 'out'}`}>{team.status}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
