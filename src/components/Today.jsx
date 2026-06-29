import { useState } from 'react'
import { TODAY_MATCHES, UPCOMING_MATCHES } from '../data/matchData'
import { TEAMS } from '../data/teams'
import { TeamFlag, getFormationRows } from './shared'

function MatchCard({ match }) {
  const [expanded, setExpanded] = useState(false)

  const teamA = TEAMS[match.teamA]
  const teamB = TEAMS[match.teamB]
  const formationRowsA = match.lineupA ? getFormationRows(match.lineupA.formation, match.lineupA.players) : []
  const formationRowsB = match.lineupB ? getFormationRows(match.lineupB.formation, match.lineupB.players) : []

  return (
    <div className={`match-card ${match.status === 'LIVE' ? 'is-live' : ''}`} onClick={() => setExpanded(!expanded)}>
      <div className="match-card-main" style={{ height: match.status === 'LIVE' || match.status === 'FT' ? 120 : 96 }}>
        {match.status === 'LIVE' || match.status === 'FT' ? (
          <>
            <div className="match-team" style={{ flex: 1, paddingLeft: 12 }}>
              <TeamFlag teamName={match.teamA} size="medium" />
              <span className="team-name" style={{ fontSize: 20, marginLeft: 12 }}>{match.teamA}</span>
            </div>
            <div className="match-center" style={{ width: 200, flexShrink: 0 }}>
              <div className="match-score" style={{ fontSize: 72, letterSpacing: -2, fontWeight: 900 }}>{match.scoreA} — {match.scoreB}</div>
              {match.status === 'LIVE' && (
                <div style={{ marginTop: 8 }}>
                  <span className="status-live" style={{ color: '#000', fontWeight: 700, padding: '3px 10px', fontSize: 11, letterSpacing: 0, borderRadius: 2 }}>
                    ● LIVE {match.minute}'
                  </span>
                </div>
              )}
            </div>
            <div className="match-team right" style={{ flex: 1, paddingRight: 12 }}>
              <span className="team-name" style={{ fontSize: 20, marginRight: 12 }}>{match.teamB}</span>
              <TeamFlag teamName={match.teamB} size="medium" />
            </div>
          </>
        ) : (
          <>
            <div className="match-team left" style={{ flex: 1, paddingLeft: 12 }}>
              <TeamFlag teamName={match.teamA} size="medium" />
              <span className="team-name" style={{ fontSize: 18, marginLeft: 12 }}>{match.teamA}</span>
            </div>
            <div className="match-center" style={{ width: 200, flexShrink: 0, flexDirection: 'column', gap: 4 }}>
              <div className="match-vs" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>VS</div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{match.time}</div>
            </div>
            <div className="match-team right" style={{ flex: 1, paddingRight: 12 }}>
              <span className="team-name" style={{ fontSize: 18, marginRight: 12 }}>{match.teamB}</span>
              <TeamFlag teamName={match.teamB} size="medium" />
            </div>
          </>
        )}
      </div>
      <div style={{ height: 32, background: '#141414', borderTop: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {match.stadium ? `${match.stadium} · ${match.city} · ${match.date || 'JUNE 29'}` : 'NRG STADIUM · HOUSTON · JUNE 29'}
      </div>

      <div className="match-footer">
        <span>{match.stadium}</span>
        <span>{match.city}</span>
        <span>{match.date}</span>
      </div>

      {expanded && (
        <div className="match-expanded" onClick={(e) => e.stopPropagation()}>
          {/* H2H */}
          <div className="match-detail-section">
            <div className="detail-title">Head-to-Head</div>
            <div className="h2h-text">{match.h2h.summary}</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{match.h2h.detail}</div>
          </div>

          {/* Last 5 Form */}
          <div className="match-detail-section" style={{ display: 'flex', gap: 32 }}>
            <div>
              <div className="detail-title">{match.teamA} — Last 5</div>
              <div className="form-pills">
                {match.formA.map((r, i) => (
                  <div key={i} className={`form-pill ${r}`}>{r}</div>
                ))}
              </div>
            </div>
            <div>
              <div className="detail-title">{match.teamB} — Last 5</div>
              <div className="form-pills">
                {match.formB.map((r, i) => (
                  <div key={i} className={`form-pill ${r}`}>{r}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Lineups */}
          <div className="match-detail-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div className="detail-title">{match.teamA} — {match.lineupA?.formation}</div>
              <div className="formation-grid">
                {formationRowsA.map((row, i) => (
                  <div key={i} className="formation-row">
                    {row.map((p, j) => (
                      <div key={j} className="formation-player">{p}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="detail-title">{match.teamB} — {match.lineupB?.formation}</div>
              <div className="formation-grid">
                {formationRowsB.map((row, i) => (
                  <div key={i} className="formation-row">
                    {row.map((p, j) => (
                      <div key={j} className="formation-player">{p}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div className="match-detail-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div className="detail-title">{match.teamA} — Key Players</div>
              {match.keyPlayersA.map((p, i) => (
                <div key={i} className="key-player-card">
                  <div>
                    <span className="player-name">{p.name}</span>
                    <span className="player-pos" style={{ marginLeft: 8 }}>{p.pos}</span>
                  </div>
                  <span className="player-stat">{p.stat}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="detail-title">{match.teamB} — Key Players</div>
              {match.keyPlayersB.map((p, i) => (
                <div key={i} className="key-player-card">
                  <div>
                    <span className="player-name">{p.name}</span>
                    <span className="player-pos" style={{ marginLeft: 8 }}>{p.pos}</span>
                  </div>
                  <span className="player-stat">{p.stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Today() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📺 Today — June 29, 2026</h1>
        <p className="page-subtitle">Round of 32 • Live & Upcoming Matches</p>
      </div>

      {TODAY_MATCHES.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}

      <div className="upcoming-section">
        <h3 style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, marginBottom: 12, marginTop: 32 }}>UP NEXT</h3>
        {UPCOMING_MATCHES.map((day, i) => (
          <div key={i} className="upcoming-day">
            <div className="day-label">{day.date}</div>
            {day.matches.map((m, j) => (
              <div key={j} className="upcoming-match-row">
                <div className="upcoming-teams" style={{ flex: 1 }}>
                  <TeamFlag teamName={m.teamA} size="small" /> 
                  <span style={{ fontSize: 14 }}>{m.teamA}</span> 
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, width: 40, textAlign: 'center' }}>VS</div>
                <div className="upcoming-teams" style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 14 }}>{m.teamB}</span>
                  <TeamFlag teamName={m.teamB} size="small" />
                </div>
                <div className="upcoming-time" style={{ marginLeft: 24, fontSize: 14, color: 'var(--text-secondary)' }}>{m.time}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
