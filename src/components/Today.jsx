import { useState, useEffect, useRef } from 'react'
import { FlagComponent } from './shared'

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
    date: 'JUNE 29, 2026'
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
    date: 'JUNE 29, 2026'
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
    date: 'JUNE 29, 2026'
  }
]

const UPCOMING_FIXTURES = [
  {
    date: 'JUN 30',
    matches: [
      { id: 'civ-nor', teamA: 'Ivory Coast', teamB: 'Norway', time: '17:00 ET', venue: 'Dallas', city: 'Dallas', date: 'JUNE 30, 2026' },
      { id: 'fra-swe', teamA: 'France', teamB: 'Sweden', time: '21:00 ET', venue: 'MetLife NJ', city: 'East Rutherford', date: 'JUNE 30, 2026' },
      { id: 'mex-ecu', teamA: 'Mexico', teamB: 'Ecuador', time: '01:00 ET+1', venue: 'Azteca', city: 'Mexico City', date: 'JUNE 30, 2026' }
    ]
  },
  {
    date: 'JUL 1',
    matches: [
      { id: 'eng-cod', teamA: 'England', teamB: 'DR Congo', time: '12:00 ET', venue: 'Atlanta', city: 'Atlanta', date: 'JULY 01, 2026' },
      { id: 'bel-sen', teamA: 'Belgium', teamB: 'Senegal', time: '16:00 ET', venue: 'Seattle', city: 'Seattle', date: 'JULY 01, 2026' },
      { id: 'usa-bih', teamA: 'USA', teamB: 'Bosnia and Herzegovina', time: '20:00 ET', venue: 'SF Bay', city: 'Santa Clara', date: 'JULY 01, 2026' }
    ]
  },
  {
    date: 'JUL 2',
    matches: [
      { id: 'esp-aut', teamA: 'Spain', teamB: 'Austria', time: '15:00 ET', venue: 'LA', city: 'Los Angeles', date: 'JULY 02, 2026' },
      { id: 'por-cro', teamA: 'Portugal', teamB: 'Croatia', time: '19:00 ET', venue: 'Toronto', city: 'Toronto', date: 'JULY 02, 2026' },
      { id: 'sui-alg', teamA: 'Switzerland', teamB: 'Algeria', time: '23:00 ET', venue: 'Vancouver', city: 'Vancouver', date: 'JULY 02, 2026' }
    ]
  },
  {
    date: 'JUL 3',
    matches: [
      { id: 'aus-egy', teamA: 'Australia', teamB: 'Egypt', time: '14:00 ET', venue: 'Dallas', city: 'Dallas', date: 'JULY 03, 2026' },
      { id: 'arg-cpv', teamA: 'Argentina', teamB: 'Cape Verde', time: '18:00 ET', venue: 'Miami', city: 'Miami', date: 'JULY 03, 2026' },
      { id: 'col-gha', teamA: 'Colombia', teamB: 'Ghana', time: '21:30 ET', venue: 'Kansas City', city: 'Kansas City', date: 'JULY 03, 2026' }
    ]
  }
]

const DETAIL_DATA = {
  Brazil: {
    wins: 14, draws: 6, vsWins: 3,
    form: ['W', 'W', 'W', 'D', 'W'],
    players: [
      { name: 'Vinicius Jr', pos: 'FWD', stats: '2G 2A' },
      { name: 'Rodri', pos: 'MID', stats: '0G 3A' }
    ],
    pred: 'BRAZIL WIN · 2-0 · CONFIDENCE: ',
    confidence: 'HIGH',
    prob: [64, 18, 18]
  },
  Japan: {
    wins: 3, draws: 6, vsWins: 14,
    form: ['W', 'L', 'W', 'W', 'D'],
    players: [
      { name: 'Kubo', pos: 'FWD', stats: '1G 1A' },
      { name: 'Endo', pos: 'MID', stats: '0G 2A' }
    ]
  },
  Germany: {
    wins: 4, draws: 2, vsWins: 1,
    form: ['W', 'W', 'D', 'W', 'W'],
    players: [
      { name: 'Musiala', pos: 'MID', stats: '2G 1A' },
      { name: 'Wirtz', pos: 'MID', stats: '1G 2A' }
    ],
    pred: 'GERMANY WIN · 3-1 · CONFIDENCE: ',
    confidence: 'MED',
    prob: [52, 28, 20]
  },
  Paraguay: {
    wins: 1, draws: 2, vsWins: 4,
    form: ['L', 'W', 'D', 'L', 'W'],
    players: [
      { name: 'Sanchez', pos: 'FWD', stats: '2G 0A' },
      { name: 'Alonso', pos: 'MID', stats: '0G 1A' }
    ]
  },
  Netherlands: {
    wins: 2, draws: 1, vsWins: 1,
    form: ['W', 'W', 'W', 'D', 'W'],
    players: [
      { name: 'Gakpo', pos: 'FWD', stats: '2G 1A' },
      { name: 'De Jong', pos: 'MID', stats: '0G 2A' }
    ],
    pred: 'NETHERLANDS WIN · 2-1 · CONFIDENCE: ',
    confidence: 'LOW',
    prob: [38, 34, 28]
  },
  Morocco: {
    wins: 1, draws: 1, vsWins: 2,
    form: ['W', 'D', 'W', 'W', 'L'],
    players: [
      { name: 'Ziyech', pos: 'FWD', stats: '1G 2A' },
      { name: 'Amrabat', pos: 'MID', stats: '0G 1A' }
    ]
  }
}

const getMatchDetails = (teamA, teamB) => {
  const dataA = DETAIL_DATA[teamA]
  const dataB = DETAIL_DATA[teamB]

  const winsA = dataA?.wins ?? 5
  const draws = dataA?.draws ?? 3
  const winsB = dataA?.vsWins ?? 4

  const formA = dataA?.form ?? ['W', 'D', 'W', 'L', 'D']
  const formB = dataB?.form ?? ['D', 'W', 'D', 'L', 'W']

  const playersA = dataA?.players ?? [
    { name: `${teamA} Fwd`, pos: 'FWD', stats: '1G 0A' },
    { name: `${teamA} Mid`, pos: 'MID', stats: '0G 1A' }
  ]
  const playersB = dataB?.players ?? [
    { name: `${teamB} Fwd`, pos: 'FWD', stats: '1G 0A' },
    { name: `${teamB} Mid`, pos: 'MID', stats: '0G 1A' }
  ]

  const pred = dataA?.pred ?? `${teamA.toUpperCase()} vs ${teamB.toUpperCase()} · DRAW · 1-1 · CONFIDENCE: `
  const confidence = dataA?.confidence ?? 'LOW'
  const prob = dataA?.prob ?? [33, 34, 33]

  return { winsA, draws, winsB, formA, formB, playersA, playersB, pred, confidence, prob }
}

function MatchExpansionContent({ match, onNavigateToTeam }) {
  const details = getMatchDetails(match.teamA, match.teamB)
  const isBrazilJapan = match.teamA === 'Brazil' && match.teamB === 'Japan'

  const renderFormSquare = (result, idx) => {
    let bg = 'var(--surface-2)'
    let color = 'var(--text-2)'
    let border = '1px solid var(--border)'

    if (result === 'W') {
      bg = '#1A1F00'
      color = 'var(--accent)'
      border = '1px solid var(--accent)'
    } else if (result === 'L') {
      bg = '#1F0A0A'
      color = 'var(--red)'
      border = '1px solid var(--red)'
    }

    return (
      <div 
        key={idx}
        style={{
          width: 22,
          height: 22,
          background: bg,
          color: color,
          border: border,
          fontSize: 10,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {result}
      </div>
    )
  }

  const confidenceColors = {
    HIGH: 'var(--accent)',
    MED: 'var(--amber)',
    LOW: 'var(--text-3)'
  }

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ROW 1: HEAD TO HEAD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="text-xs" style={{ color: 'var(--text-3)', width: 32, flexShrink: 0 }}>H2H</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.winsA}</div>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>{match.teamA.substring(0, 3).toUpperCase()} WINS</div>
          </div>
          <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.draws}</div>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>DRAWS</div>
          </div>
          <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', lineHeight: 1 }}>{details.winsB}</div>
            <div className="text-xs" style={{ color: 'var(--text-3)', marginTop: 2 }}>{match.teamB.substring(0, 3).toUpperCase()} WINS</div>
          </div>
        </div>
      </div>

      {/* ROW 2: FORM GUIDE */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px 12px', borderBottom: '1px solid var(--border)' }}>
        {/* Team A Form */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => onNavigateToTeam(match.teamA)}>
            <FlagComponent teamName={match.teamA} size="small" />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{match.teamA.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {details.formA.map((r, idx) => renderFormSquare(r, idx))}
          </div>
        </div>

        {/* Team B Form */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: 'row-reverse' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexDirection: 'row-reverse', cursor: 'pointer' }} onClick={() => onNavigateToTeam(match.teamB)}>
            <FlagComponent teamName={match.teamB} size="small" />
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>{match.teamB.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {details.formB.map((r, idx) => renderFormSquare(r, idx))}
          </div>
        </div>
      </div>

      {/* ROW 3: KEY PLAYERS TO WATCH */}
      <div style={{ display: 'flex', padding: '12px 20px', gap: 20, borderBottom: '1px solid var(--border)' }}>
        {/* Col A */}
        <div style={{ flex: 1 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>{match.teamA.toUpperCase()} KEY PLAYERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {details.playersA.map((p, idx) => (
              <div key={idx}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{p.pos}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>GOALS: {p.stats.split(' ')[0]}  ASSISTS: {p.stats.split(' ')[1]} in WC2026</div>
              </div>
            ))}
          </div>
        </div>

        {/* Col B */}
        <div style={{ flex: 1 }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 6 }}>{match.teamB.toUpperCase()} KEY PLAYERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {details.playersB.map((p, idx) => (
              <div key={idx}>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>{p.name}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-3)', marginLeft: 6 }}>{p.pos}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>GOALS: {p.stats.split(' ')[0]}  ASSISTS: {p.stats.split(' ')[1]} in WC2026</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: AI QUICK PREDICTION */}
      <div style={{ padding: '12px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="text-xs" style={{ color: 'var(--accent)' }}>AI PREDICTION</span>
          <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
            {details.pred}
            <span style={{ color: confidenceColors[details.confidence], fontWeight: 700 }}>
              {details.confidence}
            </span>
          </span>
        </div>
        <div style={{ display: 'flex', height: 4, width: '100%', background: 'var(--border)' }}>
          <div style={{ width: `${details.prob[0]}%`, background: 'var(--accent)' }} />
          <div style={{ width: `${details.prob[1]}%`, background: 'var(--border-2)' }} />
          <div style={{ width: `${details.prob[2]}%`, background: 'var(--red)' }} />
        </div>
      </div>

      {/* FEATURE 3: MATCH EVENTS TIMELINE (Brazil vs Japan only) */}
      {isBrazilJapan && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', padding: '12px 20px 8px' }}>MATCH EVENTS</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { min: "12'", type: 'G', pName: 'Vinicius Jr', team: 'BRAZIL', iconBg: 'var(--accent)', iconColor: '#000', iconText: 'G' },
              { min: "34'", type: 'Y', pName: 'Endo', team: 'JAPAN', iconBg: 'var(--amber)', iconColor: '#000', iconText: 'Y' },
              { min: "45+2'", type: 'Y', pName: 'Casemiro', team: 'BRAZIL', iconBg: 'var(--amber)', iconColor: '#000', iconText: 'Y' },
              { min: "58'", type: 'S', pName: 'Rodrygo → Savinho', team: 'BRAZIL', iconBg: 'var(--surface-2)', iconColor: 'var(--text-2)', iconText: '↕' }
            ].map((ev, idx) => (
              <div 
                key={idx} 
                style={{ 
                  height: 32, 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0 20px', 
                  borderBottom: '1px solid var(--border)' 
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', width: 32 }}>{ev.min}</span>
                <div 
                  style={{ 
                    width: 16, 
                    height: 16, 
                    background: ev.iconBg, 
                    color: ev.iconColor, 
                    fontSize: 10, 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginRight: 12 
                  }}
                >
                  {ev.iconText}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>{ev.pName}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{ev.team}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEATURE 4: LIVE MATCH STATS (Brazil vs Japan only) */}
      {isBrazilJapan && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 20px' }}>
          <div className="text-xs" style={{ color: 'var(--text-3)', marginBottom: 8 }}>MATCH STATS</div>
          {[
            { label: 'POSSESSION', valA: '62%', valB: '38%', pctA: 62, pctB: 38 },
            { label: 'SHOTS', valA: '9', valB: '4', pctA: 69, pctB: 31 },
            { label: 'ON TARGET', valA: '4', valB: '2', pctA: 67, pctB: 33 },
            { label: 'CORNERS', valA: '5', valB: '3', pctA: 62, pctB: 38 },
            { label: 'FOULS', valA: '8', valB: '11', pctA: 42, pctB: 58 },
            { label: 'xG', valA: '1.8', valB: '0.6', pctA: 75, pctB: 25 }
          ].map((st, idx) => (
            <div key={idx} style={{ height: 28, display: 'flex', alignItems: 'center' }}>
              {/* Team A Value */}
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', width: 36, textAlign: 'right' }}>
                {st.valA}
              </span>

              {/* Progress Bars */}
              <div style={{ flex: 1, height: 4, background: 'var(--border)', margin: '0 12px', display: 'flex' }}>
                <div style={{ width: `${st.pctA}%`, height: '100%', background: 'var(--accent)' }} />
                <div style={{ flex: 1 }} />
                <div style={{ width: `${st.pctB}%`, height: '100%', background: 'var(--text-3)' }} />
              </div>

              {/* Team B Value */}
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', width: 36, textAlign: 'left' }}>
                {st.valB}
              </span>

              {/* Label */}
              <span className="text-xs" style={{ width: 100, textAlign: 'center', color: 'var(--text-3)', marginLeft: 8 }}>
                {st.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MatchCard({ match, onNavigateToTeam }) {
  const [expanded, setExpanded] = useState(false)
  const isLive = match.status === 'LIVE'

  return (
    <div 
      className={`match-card ${isLive ? 'is-live' : ''}`} 
      onClick={() => setExpanded(!expanded)}
      style={{
        overflow: 'hidden',
        transition: 'max-height 200ms ease'
      }}
    >
      {isLive ? (
        <div style={{ display: 'flex', height: 88, alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div className="score-text" style={{ fontSize: 56 }}>
              {match.scoreA} — {match.scoreB}
            </div>
            <div className="live-badge">
              <span className="live-dot" style={{ display: 'inline-block', width: 6, height: 6, background: '#000', borderRadius: '50%' }}>●</span>
              LIVE {match.minute}
            </div>
          </div>

          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, flexDirection: 'row-reverse', textAlign: 'right' }}>
            <FlagComponent teamName={match.teamB} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamB}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', height: 72, alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <FlagComponent teamName={match.teamA} />
            <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', textTransform: 'uppercase' }}>
              {match.teamA}
            </span>
          </div>

          <div style={{ width: 200, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-2)', lineHeight: 1 }}>
              {match.time}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginTop: 2 }}>
              ET
            </div>
          </div>

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
        <MatchExpansionContent match={match} onNavigateToTeam={onNavigateToTeam} />
      )}
    </div>
  )
}

function FixtureRow({ match, onNavigateToTeam }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div 
      style={{ borderBottom: '1px solid var(--border)', background: expanded ? 'var(--surface-2)' : 'transparent', overflow: 'hidden' }}
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
        <MatchExpansionContent match={match} onNavigateToTeam={onNavigateToTeam} />
      )}
    </div>
  )
}

export default function Today({ onNavigateToTeam }) {
  const [loading, setLoading] = useState(true)
  const [todayMatches, setTodayMatches] = useState(FALLBACK_TODAY)
  const [filter, setFilter] = useState('ALL')

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
              date: 'JUNE 29, 2026'
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

  // Filtering Logic
  const filteredToday = todayMatches.filter(m => {
    if (filter === 'LIVE') return m.status === 'LIVE'
    return true // ALL, TODAY, THIS WEEK include today's matches
  })

  const showUpcoming = filter === 'ALL' || filter === 'THIS WEEK'

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header" style={{ paddingBottom: 10 }}>
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

      {/* FEATURE 9: SEARCH & FILTER BAR */}
      <div 
        style={{ 
          height: 36, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8, 
          marginBottom: 12 
        }}
      >
        {['ALL', 'LIVE', 'TODAY', 'THIS WEEK'].map(f => {
          const isActive = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: isActive ? '#1A1F00' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-3)',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'border-color 80ms ease, color 80ms ease'
              }}
            >
              {f}
            </button>
          )
        })}

        <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          32 TEAMS REMAINING
        </span>
      </div>

      {/* FEATURE 2: STICKY TICKER BAR */}
      <div 
        className="ticker-container"
        style={{
          marginBottom: 16,
          maskImage: 'linear-gradient(to right, transparent, var(--bg) 5%, var(--bg) 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, var(--bg) 5%, var(--bg) 95%, transparent)'
        }}
      >
        <div className="ticker-wrap">
          <div className="ticker-move">
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--accent)', marginRight: 4 }}>●</span>
              BRAZIL 1-0 JAPAN · 63' · NRG Stadium &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              GERMANY vs PARAGUAY · Kicks off 16:30 ET &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              NETHERLANDS vs MOROCCO · Kicks off 21:00 ET &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Messi leads Golden Boot with 5 goals &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Canada advance to Round of 16 after 1-0 win &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>
              <span style={{ color: 'var(--accent)', marginRight: 4 }}>●</span>
              BRAZIL 1-0 JAPAN · 63' · NRG Stadium &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              GERMANY vs PARAGUAY · Kicks off 16:30 ET &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              NETHERLANDS vs MOROCCO · Kicks off 21:00 ET &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Messi leads Golden Boot with 5 goals &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp; 
              Canada advance to Round of 16 after 1-0 win &nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* TODAY'S MATCH CARDS */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="skeleton" style={{ height: 118, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
          <div className="skeleton" style={{ height: 102, width: '100%' }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredToday.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-3)', fontSize: 13 }}>
              NO MATCHES MATCHING THIS FILTER
            </div>
          ) : (
            filteredToday.map(match => (
              <MatchCard key={match.id} match={match} onNavigateToTeam={onNavigateToTeam} />
            ))
          )}
        </div>
      )}

      {/* UPCOMING SECTION */}
      {showUpcoming && (
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
                    <FixtureRow key={m.id} match={m} onNavigateToTeam={onNavigateToTeam} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
