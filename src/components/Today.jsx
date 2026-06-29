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
      <div className="match-card-main">
        {match.status === 'LIVE' || match.status === 'FT' ? (
          <>
            <div className="match-team left" style={{ flex: 1 }}>
              <TeamFlag teamName={match.teamA} size="medium" />
              <span className="team-name">{match.teamA}</span>
            </div>
            <div className="match-center" style={{ width: 200, flexShrink: 0 }}>
              <div className="match-score">{match.scoreA} — {match.scoreB}</div>
              {match.status === 'LIVE' && (
                <div style={{ marginTop: 8 }}>
                  <span className="status-live">
                    ● LIVE {match.minute}'
                  </span>
                </div>
              )}
            </div>
            <div className="match-team right" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <span className="team-name" style={{ marginRight: 12 }}>{match.teamB}</span>
              <TeamFlag teamName={match.teamB} size="medium" />
            </div>
          </>
        ) : (
          <>
            <div className="match-team left" style={{ flex: 1 }}>
              <TeamFlag teamName={match.teamA} size="medium" />
              <span className="team-name">{match.teamA}</span>
            </div>
            <div className="match-center" style={{ width: 200, flexShrink: 0, flexDirection: 'column', gap: 4 }}>
              <div className="match-vs">VS</div>
              <div className="match-time">{match.time}</div>
            </div>
            <div className="match-team right" style={{ flex: 1, justifyContent: 'flex-end' }}>
              <span className="team-name" style={{ marginRight: 12 }}>{match.teamB}</span>
              <TeamFlag teamName={match.teamB} size="medium" />
            </div>
          </>
        )}
      </div>
      <div className="match-card-footer">
        {match.stadium ? `${match.stadium} · ${match.city} · ${match.date || 'JUNE 29, 2026'}` : 'NRG STADIUM · HOUSTON · JUNE 29, 2026'}
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
    <div className="today-page">
      <div className="hero-panel">
        <div className="hero-kicker">FIFA World Cup 2026</div>
        <h1 className="hero-title">Knockout football, live.</h1>
        <p className="hero-copy">Track scores, lineups, form, bracket paths, Golden Boot drama, and fan-ready match stories in one place.</p>
        <div className="hero-stats">
          <span>Round of 32</span>
          <span>3 live windows</span>
          <span>32 contenders</span>
        </div>
      </div>

      <div className="page-header">
        <h1 className="page-title">Today — June 29, 2026</h1>
        <p className="page-subtitle">Round of 32 · live and upcoming matches</p>
      </div>

      <div className="match-list">
        {TODAY_MATCHES.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      <div className="upcoming-section">
        <h3 className="section-title">Up Next</h3>
        {UPCOMING_MATCHES.map(day => (
          <div key={day.date} className="upcoming-day">
            <div className="day-label">{day.date}</div>
            {day.matches.map(match => (
              <div key={`${day.date}-${match.teamA}-${match.teamB}`} className="upcoming-match-row">
                <div className="upcoming-teams"><TeamFlag teamName={match.teamA} size="small" /> <span>{match.teamA}</span></div>
                <div className="upcoming-vs">VS</div>
                <div className="upcoming-teams right"><span>{match.teamB}</span> <TeamFlag teamName={match.teamB} size="small" /></div>
                <div className="upcoming-time">{match.time}</div>
                <div className="upcoming-venue">{match.stadium} · {match.city}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
