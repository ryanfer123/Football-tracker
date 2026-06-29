import { useState, useEffect } from 'react'
import { FlagComponent } from './shared'
import { TEAMS } from '../data/teams'

const FALLBACK_TODAY = [
  {
    id: 'bra-jpn',
    teamA: 'Brazil',
    teamB: 'Japan',
    scoreA: 1,
    scoreB: 0,
    status: 'LIVE',
    minute: "63'",
    time: '12:00',
    venue: 'NRG Stadium',
    city: 'Houston',
    date: 'JUNE 29, 2026',
    h2h: 'Brazil leads H2H: W14 D6 L3',
    formA: ['W', 'W', 'W', 'D', 'W'],
    formB: ['W', 'L', 'D', 'W', 'L']
  },
  {
    id: 'ger-par',
    teamA: 'Germany',
    teamB: 'Paraguay',
    scoreA: 0,
    scoreB: 0,
    status: 'PRE',
    time: '16:30',
    venue: 'Gillette Stadium',
    city: 'Boston',
    date: 'JUNE 29, 2026',
    h2h: 'Germany leads H2H: W4 D2 L1',
    formA: ['W', 'D', 'W', 'W', 'L'],
    formB: ['D', 'W', 'L', 'D', 'W']
  },
  {
    id: 'ned-mar',
    teamA: 'Netherlands',
    teamB: 'Morocco',
    scoreA: 0,
    scoreB: 0,
    status: 'PRE',
    time: '21:00',
    venue: 'Estadio BBVA',
    city: 'Monterrey',
    date: 'JUNE 29, 2026',
    h2h: 'Netherlands leads H2H: W2 D1 L1',
    formA: ['W', 'W', 'D', 'L', 'W'],
    formB: ['W', 'W', 'W', 'D', 'D']
  }
]

const UPCOMING_FIXTURES = [
  {
    date: 'JUN 30',
    matches: [
      { id: 'civ-nor', teamA: 'Ivory Coast', teamB: 'Norway', time: '17:00 ET', venue: 'Dallas' },
      { id: 'fra-swe', teamA: 'France', teamB: 'Sweden', time: '21:00 ET', venue: 'MetLife NJ' },
      { id: 'mex-ecu', teamA: 'Mexico', teamB: 'Ecuador', time: '01:00 ET+1', venue: 'Azteca' }
    ]
  },
  {
    date: 'JUL 1',
    matches: [
      { id: 'eng-cod', teamA: 'England', teamB: 'DR Congo', time: '12:00 ET', venue: 'Atlanta' },
      { id: 'bel-sen', teamA: 'Belgium', teamB: 'Senegal', time: '16:00 ET', venue: 'Seattle' },
      { id: 'usa-bih', teamA: 'USA', teamB: 'Bosnia and Herzegovina', time: '20:00 ET', venue: 'SF Bay' }
    ]
  },
  {
    date: 'JUL 2',
    matches: [
      { id: 'esp-aut', teamA: 'Spain', teamB: 'Austria', time: '15:00 ET', venue: 'LA' },
      { id: 'por-cro', teamA: 'Portugal', teamB: 'Croatia', time: '19:00 ET', venue: 'Toronto' },
      { id: 'sui-alg', teamA: 'Switzerland', teamB: 'Algeria', time: '23:00 ET', venue: 'Vancouver' }
    ]
  },
  {
    date: 'JUL 3',
    matches: [
      { id: 'aus-egy', teamA: 'Australia', teamB: 'Egypt', time: '14:00 ET', venue: 'Dallas' },
      { id: 'arg-cpv', teamA: 'Argentina', teamB: 'Cape Verde', time: '18:00 ET', venue: 'Miami' },
      { id: 'col-gha', teamA: 'Colombia', teamB: 'Ghana', time: '21:30 ET', venue: 'Kansas City' }
    ]
  }
]

function MatchCard({ match }) {
  const [expanded, setExpanded] = useState(false)
  const isLive = match.status === 'LIVE'

  const renderFormSquare = (result, idx) => {
    let bg = 'var(--border-2)'
    if (result === 'W') bg = 'var(--accent)'
    if (result === 'L') bg = 'var(--red)'
    
    return (
      <div 
        key={idx}
        style={{
          width: 20,
          height: 20,
          background: bg,
          color: result === 'W' ? '#000' : 'var(--text-1)',
          fontSize: 10,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border)'
        }}
      >
        {result}
      </div>
    )
  }

  return (
    <div className={`match-card ${isLive ? 'is-live' : ''}`} onClick={() => setExpanded(!expanded)}>
      {isLive ? (
        <div style={{ display: 'flex', height: 88, alignItems: 'center' }}>
          {/* Team A */}
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          {/* Score & Live info */}
          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="score-text" style={{ fontSize: 56 }}>
              {match.scoreA} — {match.scoreB}
            </div>
            <div className="live-badge">
              <span className="live-dot" style={{ display: 'inline-block', width: 6, height: 6, background: '#000', borderRadius: '50%' }}>●</span>
              LIVE {match.minute}
            </div>
          </div>

          {/* Team B */}
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse', textAlign: 'right' }}>
            <FlagComponent teamName={match.teamB} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamB}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', height: 72, alignItems: 'center' }}>
          {/* Team A */}
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          {/* Score / Time Zone */}
          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-2)', lineHeight: 1 }}>
              {match.time}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>
              ET
            </div>
          </div>

          {/* Team B */}
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse', textAlign: 'right' }}>
            <FlagComponent teamName={match.teamB} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamB}
            </span>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div 
        style={{ 
          borderTop: '1px solid var(--border)', 
          height: 30, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 20px',
          background: '#141414',
          fontSize: 10,
          color: 'var(--text-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}
      >
        {match.venue}  ·  {match.city}  ·  {match.date}
      </div>

      {/* Expanded view */}
      {expanded && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          style={{ 
            borderTop: '1px solid var(--border)', 
            padding: 16, 
            background: 'var(--surface-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {match.h2h}
          </div>
          
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase' }}>
                {match.teamA} Form
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {match.formA?.map((r, idx) => renderFormSquare(r, idx))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase' }}>
                {match.teamB} Form
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {match.formB?.map((r, idx) => renderFormSquare(r, idx))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FixtureRow({ match }) {
  const [expanded, setExpanded] = useState(false)
  
  // Predict logic for H2H
  const h2h = `${match.teamA} vs ${match.teamB} · Head to Head data unavailable`
  const formA = ['W', 'D', 'L', 'W', 'W']
  const formB = ['D', 'W', 'D', 'L', 'W']

  const renderFormSquare = (result, idx) => {
    let bg = 'var(--border-2)'
    if (result === 'W') bg = 'var(--accent)'
    if (result === 'L') bg = 'var(--red)'
    
    return (
      <div 
        key={idx}
        style={{
          width: 20,
          height: 20,
          background: bg,
          color: result === 'W' ? '#000' : 'var(--text-1)',
          fontSize: 10,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border)'
        }}
      >
        {result}
      </div>
    )
  }

  return (
    <div 
      style={{ borderBottom: '1px solid var(--border)', background: expanded ? 'var(--surface-2)' : 'transparent' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div 
        className="upcoming-row"
        style={{ 
          height: 48, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 12px',
          cursor: 'pointer',
          transition: 'background 80ms ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FlagComponent teamName={match.teamA} size="small" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{match.teamA}</span>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>VS</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'row-reverse', textAlign: 'right' }}>
          <FlagComponent teamName={match.teamB} size="small" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{match.teamB}</span>
        </div>
        <div style={{ width: 70, textAlign: 'right', fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>
          {match.time}
        </div>
      </div>

      {expanded && (
        <div 
          onClick={(e) => e.stopPropagation()} 
          style={{ 
            padding: 12, 
            background: 'var(--surface-2)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {h2h}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
            Venue: {match.venue}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase' }}>
                {match.teamA} Form
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {formA.map((r, idx) => renderFormSquare(r, idx))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase' }}>
                {match.teamB} Form
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {formB.map((r, idx) => renderFormSquare(r, idx))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Today() {
  const [loading, setLoading] = useState(true)
  const [todayMatches, setTodayMatches] = useState(FALLBACK_TODAY)

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard')
        const data = await res.json()
        if (!active) return

        if (data && data.events && data.events.length > 0) {
          const mapped = data.events.map(event => {
            const competition = event.competitions[0]
            const teamAObj = competition.competitors[0]
            const teamBObj = competition.competitors[1]
            
            const isLiveState = event.status.type.state === 'in'
            const isFtState = event.status.type.state === 'post'
            
            return {
              id: event.id,
              teamA: teamAObj.team.displayName,
              teamB: teamBObj.team.displayName,
              scoreA: parseInt(teamAObj.score) || 0,
              scoreB: parseInt(teamBObj.score) || 0,
              status: isLiveState ? 'LIVE' : isFtState ? 'FT' : 'PRE',
              minute: event.status.displayClock || "0'",
              time: new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
              venue: competition.venue?.fullName || 'Stadium',
              city: competition.venue?.address?.city || 'Host City',
              date: 'JUNE 29, 2026',
              h2h: `${teamAObj.team.displayName} vs ${teamBObj.team.displayName} Head to Head`,
              formA: ['W', 'D', 'W', 'L', 'W'],
              formB: ['D', 'W', 'L', 'W', 'D']
            }
          })
          setTodayMatches(mapped)
        } else {
          setTodayMatches(FALLBACK_TODAY)
        }
      } catch (err) {
        if (active) {
          setTodayMatches(FALLBACK_TODAY)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Setup auto-refresh if live match exists
    const intervalId = setInterval(() => {
      const hasLive = todayMatches.some(m => m.status === 'LIVE')
      if (hasLive) {
        fetchData()
      }
    }, 60000)

    return () => {
      active = false
      clearInterval(intervalId)
    }
  }, [todayMatches])

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 4 }}>
          JUNE 29, 2026
        </div>
        <h1 className="text-2xl" style={{ color: 'var(--text-1)' }}>
          TODAY
        </h1>
        <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 4 }}>
          ROUND OF 32 · {todayMatches.length} MATCHES
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="skeleton" style={{ height: 118, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {todayMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}

      {/* UPCOMING SECTION */}
      <div className="upcoming-section">
        <h3 className="text-xs" style={{ color: 'var(--text-3)', margin: '24px 0 8px' }}>
          UP NEXT
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {UPCOMING_FIXTURES.map((day, idx) => (
            <div key={idx} className="upcoming-day">
              <div 
                className="text-xs"
                style={{ 
                  height: 28, 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)',
                  color: 'var(--text-3)',
                  paddingLeft: 12,
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 8
                }}
              >
                {day.date}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {day.matches.map(m => (
                  <FixtureRow key={m.id} match={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
